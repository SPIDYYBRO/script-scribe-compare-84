
import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photoUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithPhone: (phone: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock auth functions for now - would be replaced with real auth provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check session storage for mock logged in user
    const savedUser = sessionStorage.getItem('script-check-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - would connect to a real auth system in production
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockUser = {
        id: '123',
        name: 'Test User',
        email
      };
      setUser(mockUser);
      sessionStorage.setItem('script-check-user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockUser = {
        id: '123',
        name,
        email
      };
      setUser(mockUser);
      sessionStorage.setItem('script-check-user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockUser = {
        id: '456',
        name: 'Google User',
        email: 'google@example.com',
        photoUrl: 'https://via.placeholder.com/150'
      };
      setUser(mockUser);
      sessionStorage.setItem('script-check-user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithPhone = async (phone: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockUser = {
        id: '789',
        name: 'Phone User',
        email: '',
        phone
      };
      setUser(mockUser);
      sessionStorage.setItem('script-check-user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    // Mock logout
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      setUser(null);
      sessionStorage.removeItem('script-check-user');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        sessionStorage.setItem('script-check-user', JSON.stringify(updatedUser));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login, 
        register, 
        loginWithGoogle, 
        loginWithPhone, 
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
