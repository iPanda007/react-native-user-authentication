import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useLogoutHandler() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = useCallback(async () => {
    try {

      setTimeout(() => {
        router.replace('/login');
      }, 100);
      

      await logout();
      
    } catch {

    }
  }, [router, logout]);

  return { handleLogout };
}