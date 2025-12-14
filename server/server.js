const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const journalRoutes = require('./routes/journal');
const cbtRoutes = require('./routes/cbt');
const messageRoutes = require('./routes/messages');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const auth = require('./middleware/auth');
const Message = require('./models/Message');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || process.env.NODE_ENV === 'production' ? false : "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Connect to DB
connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message || err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/cbt', cbtRoutes);
app.use('/api/messages', messageRoutes);

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// 404
app.use(notFound);

// Error handler
app.use(errorHandler);
// Socket.io handlers - basic chat and typing indicators
const jwt = require('jsonwebtoken');
const User = require('./models/User');

io.on('connection', async (socket) => {
  try {
    const token = socket.handshake.auth?.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
        const user = await User.findById(decoded.id).select('-password');
        socket.user = user;
      } catch (err) {
        // token invalid — continue as guest
        socket.user = null;
      }
    }

    console.log('Socket connected', socket.id, socket.user ? socket.user.email : 'guest');

    // Join user-specific room for private support chat
    const room = socket.user ? `support-${socket.user._id}` : 'support-guest';
    socket.join(room);

    // Load previous messages for the room
    try {
      const messages = await Message.find({ room }).sort({ timestamp: 1 }).limit(50);
      socket.emit('loadMessages', messages.map(msg => ({
        userId: String(msg.userId),
        username: msg.username,
        message: msg.message,
        timestamp: msg.timestamp.toISOString(),
      })));
    } catch (err) {
      console.error('Error loading messages:', err);
    }

    socket.on('sendMessage', async (data) => {
      // Build message payload with server-sourced timestamp and user info when possible
      const message = {
        userId: socket.user ? String(socket.user._id) : data.userId || 'guest',
        username: socket.user ? socket.user.name : data.username || 'Guest',
        message: data.message || '',
        timestamp: new Date().toISOString(),
      };

      // Save to DB
      try {
        const newMessage = new Message({
          userId: socket.user ? socket.user._id : null,
          username: message.username,
          message: message.message,
          room,
        });
        await newMessage.save();
      } catch (err) {
        console.error('Error saving message:', err);
      }

      // Emit to room instead of all clients
      io.to(room).emit('receiveMessage', message);
    });

    socket.on('typing', (payload) => {
      const info = {
        userId: socket.user ? String(socket.user._id) : payload.userId || 'guest',
        username: socket.user ? socket.user.name : payload.username || 'Guest',
      };
      socket.to(room).emit('typing', info);
    });

    socket.on('stopTyping', (payload) => {
      const info = {
        userId: socket.user ? String(socket.user._id) : payload.userId || 'guest',
        username: socket.user ? socket.user.name : payload.username || 'Guest',
      };
      socket.to(room).emit('stopTyping', info);
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected', socket.id, reason);
    });
  } catch (err) {
    console.error('Socket handler error', err);
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server (with sockets) running on port ${PORT}`);
});

module.exports = app;
