import React, { createContext, useState, ReactNode } from 'react';
import client from '../api/client';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) return null;

    try {
      const decoded: any = jwtDecode(storedToken);
      const now = Date.now() / 1000;
      if (decoded.exp && decoded.exp < now) {
        localStorage.removeItem('token');
        return null;
      }
      return storedToken;
    } catch {
      localStorage.removeItem('token');
      return null;
    }
  });

  const login = async (email: string, password: string) => {
    const { data } = await client.post('/auth/login', { email, password });
    localStorage.setItem('token', data.access_token);
    setToken(data.access_token);
  };

  const register = async (email: string, password: string, name?: string) => {
    const { data } = await client.post('/auth/register', { email, password, name });
    localStorage.setItem('token', data.access_token);
    setToken(data.access_token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
