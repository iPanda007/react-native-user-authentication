import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

type RedirectPath = '/login' | '/logout-redirect';


export function useAuthGuard(redirectTo: RedirectPath = '/login') {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {

    if (!isLoading && !user) {
      router.replace(redirectTo);
    }
  }, [user, isLoading, redirectTo, router]);

  return {
    isAuthenticated: !!user,
    isLoading,
    user,
  };
}