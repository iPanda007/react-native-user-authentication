import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useLogout } from '@/contexts/LogoutContext';

type RedirectPath = '/login' | '/logout-redirect';


export function useAuthGuard(redirectTo: RedirectPath = '/login') {
  const { user, isLoading } = useAuth();
  const { isLoggingOut } = useLogout();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect if user is logging out
    if (!isLoading && !user && !isLoggingOut) {
      router.replace(redirectTo);
    }
  }, [user, isLoading, redirectTo, router, isLoggingOut]);

  return {
    isAuthenticated: !!user,
    isLoading,
    user,
  };
}