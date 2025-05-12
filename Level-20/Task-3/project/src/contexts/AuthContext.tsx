import React, { createContext, useState, useCallback, useEffect, ReactNode } from 'react';
import axios from '../utils/axiosConfig';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  skills?: string[];
  social?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextProps {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuthStatus: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

export const AuthContext = createContext<AuthContextProps>({
  authState: initialState,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  checkAuthStatus: () => {},
  updateUser: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  const setAuthToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  const checkAuthStatus = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: null,
        });
        return;
      }
      
      // Check if token is expired
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      if (decoded.exp < currentTime) {
        setAuthToken(null);
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: 'Session expired, please login again',
        });
        toast.error('Session expired, please login again');
        return;
      }
      
      // Token is valid, set auth header
      setAuthToken(token);
      
      // Get current user data
      const res = await axios.get('/api/auth');
      
      setAuthState({
        isAuthenticated: true,
        user: res.data,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      setAuthToken(null);
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: err.response?.data?.message || 'Authentication failed',
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      const { token } = res.data;
      
      setAuthToken(token);
      await checkAuthStatus();
      
      toast.success('Successfully logged in!');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
      }));
      
      toast.error(errorMessage);
      throw err;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await axios.post('/api/auth/register', { name, email, password });
      const { token } = res.data;
      
      setAuthToken(token);
      await checkAuthStatus();
      
      toast.success('Successfully registered!');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setAuthState(prev => ({
        ...prev,
        error: errorMessage,
      }));
      
      toast.error(errorMessage);
      throw err;
    }
  };

  const logout = useCallback(() => {
    setAuthToken(null);
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
    toast.info('You have been logged out');
  }, []);

  const updateUser = (updatedUser: Partial<User>) => {
    if (authState.user) {
      setAuthState(prev => ({
        ...prev,
        user: { ...prev.user!, ...updatedUser },
      }));
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <AuthContext.Provider value={{ authState, login, register, logout, checkAuthStatus, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};