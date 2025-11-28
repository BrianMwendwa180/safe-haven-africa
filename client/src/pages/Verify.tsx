import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Verify: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await auth.verifyCode(code.trim());
    setLoading(false);
    if (!res.ok) {
      setError(res.error || 'Verification failed');
      return;
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="w-full max-w-md bg-card p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-2">Verify your account</h1>
        <p className="text-sm text-muted-foreground mb-4">Enter the 6-digit code sent to your email to continue.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Verification code</label>
            <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" required />
          </div>
          {error && <div className="text-destructive">{error}</div>}
          <div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Verifying…' : 'Verify and continue'}</Button>
          </div>
        </form>
        <div className="mt-4 text-sm text-muted-foreground">
          {auth.pending ? (
            <div>Verification code was sent to <strong>{auth.pending.email}</strong></div>
          ) : (
            <div>No pending verification. Start at <a href="/signup" className="text-primary">Sign up</a> or <a href="/login" className="text-primary">Login</a>.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;
