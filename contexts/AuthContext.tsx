import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock database for demonstration purposes
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com'
  },
  {
    id: '2', 
    name: 'Test User',
    email: 'test@example.com'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from AsyncStorage on app start
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUser = async (userData: User) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Find user in mock database
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (!foundUser) {
        return { success: false, error: 'Invalid email or password. Please check your credentials.' };
      }

      // In a real app, you'd verify the password hash
      // For this demo, we'll assume any password works for existing users
      if (password.length < 1) {
        return { success: false, error: 'Password is required.' };
      }

      await saveUser(foundUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An error occurred during login.' };
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        return { success: false, error: 'User with this email already exists.' };
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(), // Simple ID generation
        name,
        email,
      };

      // Add to mock database
      mockUsers.push(newUser);
      
      // Don't auto-login after signup - user needs to login manually
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An error occurred during signup.' };
    }
  };

  const logout = async () => {
    try {
      // Clear user state first (most important)
      setUser(null);
      
      // Try to clear storage silently
      try {
        await AsyncStorage.clear();
      } catch {
        // Silently ignore storage errors - they're not critical
        // The user state being cleared is what actually logs them out
      }
    } catch {
      // Even if there's an error, ensure user state is cleared
      setUser(null);
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
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