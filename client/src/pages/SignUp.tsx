import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SignUp: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await auth.register(username.trim(), email.trim(), password);
    setLoading(false);
    if (!res.ok) {
      setError(res.error || 'Unable to register');
      return;
    }
    // goto login (prefilled) so the user requests OTP
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="w-full max-w-md bg-card p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-2">Create your account</h1>
        <p className="text-sm text-muted-foreground mb-4">Sign up with email and set a password. Then login to receive a verification code.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g., janedoe" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Choose a strong password" required />
          </div>
          {error && <div className="text-destructive">{error}</div>}
          <div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Creating…' : 'Create account'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
