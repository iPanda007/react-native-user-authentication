import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useLogoutHandler() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = useCallback(async () => {
    try {
      // Force navigation to login with a slight delay
      setTimeout(() => {
        router.replace('/login');
      }, 100);
      
      // Clear auth state first (this is most important)
      await logout();
      
    } catch {
      // Suppress all logout errors - they're not critical
      // The user state being cleared is what actually logs them out
    }
  }, [router, logout]);

  return { handleLogout };
}