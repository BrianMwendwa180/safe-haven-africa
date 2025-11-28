import React, { createContext, useContext, useEffect, useState } from 'react';
import { sendEmail } from './email';

type User = { username: string; email: string } | null;

type Pending = { username?: string; email: string; password?: string; code?: string; expiresAt?: number } | null;

type AuthContextValue = {
  user: User;
  pending: Pending;
  register: (username: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  verifyCode: (code: string) => Promise<{ ok: boolean; error?: string }>;
  signout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function genCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

const USERS_KEY = 'sh_users_v1';
const PENDING_KEY = 'sh_pending_v1';
const AUTH_USER_KEY = 'sh_auth_user_v1';

function readUsers(): Array<{ username: string; email: string; password: string }> {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeUsers(users: Array<{ username: string; email: string; password: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    try {
      const raw = localStorage.getItem(AUTH_USER_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  const [pending, setPending] = useState<Pending>(() => {
    try {
      const raw = localStorage.getItem(PENDING_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(AUTH_USER_KEY);
  }, [user]);

  useEffect(() => {
    if (pending) localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
    else localStorage.removeItem(PENDING_KEY);
  }, [pending]);

  async function register(username: string, email: string, password: string) {
    // basic duplicate check
    const users = readUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'Email already registered' };
    }

    // Save pending registration locally. OTP will be generated and emailed when the user
    // performs login (so they confirm the same email/password combination).
    const p: Pending = { username, email, password };
    setPending(p);
    return { ok: true };
  }

  async function login(email: string, password: string) {
    const users = readUsers();

    // If there's a pending registration that matches provided credentials, generate OTP
    // for that pending registration (this is the signup->login step flow).
    if (pending && pending.email.toLowerCase() === email.toLowerCase() && pending.password === password) {
      const code = genCode();
      const expiresAt = Date.now() + 1000 * 60 * 10;
      const p: Pending = { ...pending, code, expiresAt };
      setPending(p);

      const subject = 'Your Safe Haven verification code';
      const body = `Your verification code is ${code}. It expires in 10 minutes.`;
      const res = await sendEmail(email, subject, body);
      if (!res.ok) return { ok: false, error: res.error };

      return { ok: true };
    }

    // Otherwise treat this as a normal login for an existing user
    const match = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!match) return { ok: false, error: 'Invalid email or password' };

    const code = genCode();
    const expiresAt = Date.now() + 1000 * 60 * 10;
    const p: Pending = { username: match.username, email: match.email, code, expiresAt };
    setPending(p);

    const subject = 'Your Safe Haven login code';
    const body = `Your login verification code is ${code}. It expires in 10 minutes.`;
    const res = await sendEmail(email, subject, body);
    if (!res.ok) return { ok: false, error: res.error };

    return { ok: true };
  }

  async function verifyCode(code: string) {
    if (!pending) return { ok: false, error: 'No pending verification' };
    if (!pending.code || !pending.expiresAt) return { ok: false, error: 'No verification code generated. Please login to request a code.' };
    if (Date.now() > pending.expiresAt) {
      setPending(null);
      return { ok: false, error: 'Code expired' };
    }
    if (pending.code !== code) return { ok: false, error: 'Incorrect code' };

    // finalize sign-up (if password present, treat it as new user)
    const users = readUsers();
    if (pending.password && !users.find((u) => u.email.toLowerCase() === pending.email.toLowerCase())) {
      users.push({ username: pending.username || '', email: pending.email, password: pending.password });
      writeUsers(users);
    }

    const authenticatedUser: User = { username: pending.username || '', email: pending.email };
    setUser(authenticatedUser);
    setPending(null);
    return { ok: true };
  }

  function signout() {
    setUser(null);
  }

  const value: AuthContextValue = { user, pending, register, login, verifyCode, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
