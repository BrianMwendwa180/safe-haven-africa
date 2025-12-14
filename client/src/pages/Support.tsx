import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { messagesAPI, Message, API_BASE_URL } from "@/services/api";



const Support = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [otherTyping, setOtherTyping] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();
  const token = localStorage.getItem('auth_token');

  // Fetch messages from API on mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await messagesAPI.getMessages();
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (user) {
      fetchMessages();
    }
  }, [user]);

  // Manage socket lifecycle
  useEffect(() => {
    setConnectionStatus('connecting');
    const serverUrl = API_BASE_URL.replace('/api', '');
    const s = io(serverUrl, {
      auth: { token },
      reconnectionAttempts: 5,
      transports: ['websocket', 'polling'],
    });

    socketRef.current = s;

    s.on('connect', () => {
      setConnectionStatus('connected');
      // Server handles room joining automatically
    });

    s.on('disconnect', () => setConnectionStatus('disconnected'));
    s.on('connect_error', (err: unknown) => {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn('Socket connect_error', msg);
    });

    s.on('receiveMessage', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    s.on('typing', (info: { userId: string; username: string }) => {
      // don't show typing for ourselves
      if (info.userId !== user?.id) setOtherTyping(info.username || 'Someone');
    });

    s.on('stopTyping', (info: { userId: string; username: string }) => {
      if (info.userId !== user?.id) setOtherTyping(null);
    });

    return () => {
      s.removeAllListeners();
      s.close();
      socketRef.current = null;
    };
  }, [token, user, API_BASE_URL]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // typing debounce
  const typingTimeout = useRef<number | null>(null);

  const notifyTyping = () => {
    const s = socketRef.current;
    if (!s || !s.connected) return;
    s.emit('typing', { userId: user?.id, username: user?.name });
    if (typingTimeout.current) window.clearTimeout(typingTimeout.current);
    typingTimeout.current = window.setTimeout(() => {
      s.emit('stopTyping', { userId: user?.id, username: user?.name });
    }, 1000);
  };

  const sendMessage = () => {
    const s = socketRef.current;
    if (!inputMessage.trim() || !s || !s.connected) return;

    const payload = {
      message: inputMessage.trim(),
      userId: user?.id,
      username: user?.name,
    };

    s.emit('sendMessage', payload);
    // Server will broadcast back, so no need to locally append

    setInputMessage("");
    // stop typing
    if (typingTimeout.current) {
      window.clearTimeout(typingTimeout.current);
      typingTimeout.current = null;
    }
    s.emit('stopTyping', { userId: user?.id, username: user?.name });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    } else {
      notifyTyping();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Chat Interface */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Live Support Chat
            </h1>
            <p className="text-muted-foreground">
              Connect with our support team for immediate help. Messages are private and saved for continuity.
            </p>
          </div>

          <Card className="h-[600px] md:h-[700px] flex flex-col">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <p>Welcome to live support! Send a message to get started.</p>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.userId === user?.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.userId === user?.id
                            ? 'bg-primary text-primary-foreground ml-auto'
                            : 'bg-muted mr-auto'
                        }`}
                      >
                        <div className="text-sm font-medium mb-1">{msg.username}</div>
                        <div>{msg.message}</div>
                        <div className="text-xs opacity-70 mt-1">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={connectionStatus !== 'connected'}
                />
                <Button onClick={sendMessage} disabled={!inputMessage.trim() || connectionStatus !== 'connected'}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* typing indicator and connection status */}
          <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
            <div>{otherTyping ? `${otherTyping} is typing...` : null}</div>
            <div>
              <span className={`inline-flex items-center gap-2`}> 
                <span className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' : connectionStatus === 'connecting' ? 'bg-yellow-400' : 'bg-red-500'}`} />
                <span className="capitalize">{connectionStatus}</span>
              </span>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              For urgent emergencies, please contact local authorities or use the resources on our{" "}
              <Link to="/resources" className="text-primary hover:underline">
                Resources page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
