import React, { createContext, useContext, useEffect, useState } from 'react';
import { sendEmail } from './email';

type User = { username: string; email: string } | null;

type AuthContextValue = {
  user: User;
  register: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USERS_KEY = 'sh_users_v1';
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



  useEffect(() => {
    if (user) localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(AUTH_USER_KEY);
  }, [user]);



  async function register(email: string, password: string) {
    // basic duplicate check
    const users = readUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'Email already registered' };
    }

    const username = email; // Use email as username for simplicity
    users.push({ username, email, password });
    writeUsers(users);

    const authenticatedUser: User = { username, email };
    setUser(authenticatedUser);
    return { ok: true };
  }

  async function login(email: string, password: string) {
    const users = readUsers();

    const match = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!match) return { ok: false, error: 'Invalid email or password' };

    const authenticatedUser: User = { username: match.username, email: match.email };
    setUser(authenticatedUser);
    return { ok: true };
  }

  function signout() {
    setUser(null);
  }

  const value: AuthContextValue = { user, register, login, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
