'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { Employee } from '@/types';
import { authApi } from './api';

interface AuthContextType {
  user: Employee | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Employee | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = Cookies.get('token');
    if (savedToken && savedToken.length > 10) {
      setToken(savedToken);
      authApi.me(savedToken)
        .then((userData) => {
          setUser(userData);
          setIsLoading(false);
        })
        .catch(() => {
          Cookies.remove('token');
          setToken(null);
          setIsLoading(false);
        });
    } else {
      if (savedToken) {
        Cookies.remove('token');
      }
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    Cookies.set('token', response.accessToken, { expires: 1 });
    setToken(response.accessToken);
    setUser(response.employee);
  };

  const logout = () => {
    Cookies.remove('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
