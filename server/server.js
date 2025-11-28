const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const journalRoutes = require('./routes/journal');
const cbtRoutes = require('./routes/cbt');
const { errorHandler, notFound } = require('./middleware/errorHandler');

dotenv.config();

const app = express();

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

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// 404
app.use(notFound);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
