import React, { createContext, useState, useEffect, ReactNode } from 'react';
import client from '../api/client';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  exp: number;
  role?: string;
  [key: string]: any;
}

interface AuthContextType {
  token: string | null;
  userRole: string | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(storedToken);
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
          localStorage.removeItem('token');
          setLoading(false);
        } else {
          setToken(storedToken);
          setUserRole(decoded.role || null);
          setLoading(false);
        }
      } catch {
        localStorage.removeItem('token');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await client.post('/auth/login', { email, password });
    localStorage.setItem('token', data.access_token);
    const decoded = jwtDecode<DecodedToken>(data.access_token);
    setToken(data.access_token);
    setUserRole(decoded.role || null);
  };

  const register = async (email: string, password: string, name?: string) => {
    const { data } = await client.post('/auth/register', { email, password, name });
    localStorage.setItem('token', data.access_token);
    const decoded = jwtDecode<DecodedToken>(data.access_token);
    setToken(data.access_token);
    setUserRole(decoded.role || null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUserRole(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userRole,
        isAdmin: userRole === 'admin',
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
