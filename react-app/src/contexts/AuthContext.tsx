import React, { createContext, useState, ReactNode } from 'react';
import client from '../api/client';

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
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

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
