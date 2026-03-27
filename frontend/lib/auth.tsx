"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiLogin, apiSignup } from "./api";

type Role = "student" | "faculty";
type User = { id: string; name: string; email: string; role: Role } | null;

interface AuthContextType {
  user: User;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string, role: Role) => Promise<void>;
  signup: (name: string, email: string, password: string, role: Role) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch {}
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: Role) => {
    const res = await apiLogin(email, password);
    const userData = { ...res.user, role };
    setToken(res.token);
    setUser(userData);
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const signup = async (name: string, email: string, password: string, role: Role) => {
    const res = await apiSignup(name, email, password, role);
    const userData = { ...res.user, role };
    setToken(res.token);
    setUser(userData);
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
