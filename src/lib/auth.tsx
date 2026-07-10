"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { api, setToken, getToken, type ApiUser } from "./api";

type AuthContextValue = {
  user: ApiUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<ApiUser>;
  register: (name: string, email: string, password: string) => Promise<ApiUser>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existing = getToken();
    if (!existing) {
      setLoading(false);
      return;
    }
    setTokenState(existing);
    api<{ data: { user: ApiUser } }>("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch((err) => {
        // Only clear token on actual auth failures, not network errors
        if (err?.status === 401 || err?.status === 403) {
          setToken(null);
          setTokenState(null);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api<{ token: string; data: { user: ApiUser } }>(
      "/auth/login",
      {
        method: "POST",
        body: { email, password },
      }
    );
    setToken(res.token);
    setTokenState(res.token);
    setUser(res.data.user);
    return res.data.user;
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const res = await api<{ token: string; data: { user: ApiUser } }>(
        "/auth/register",
        {
          method: "POST",
          body: { name, email, password },
        }
      );
      setToken(res.token);
      setTokenState(res.token);
      setUser(res.data.user);
      return res.data.user;
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setTokenState(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
