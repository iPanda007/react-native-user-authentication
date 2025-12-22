import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

type RedirectPath = '/login' | '/logout-redirect';

/**
 * Custom hook to handle authentication guard logic
 * Redirects to login if user is not authenticated
 * Returns loading state while checking authentication
 */
export function useAuthGuard(redirectTo: RedirectPath = '/login') {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect after auth check is complete
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