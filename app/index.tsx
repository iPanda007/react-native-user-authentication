import SplashScreen from '@/components/SplashScreen';
import { useAuth } from '@/contexts/AuthContext';
import { useLogout } from '@/contexts/LogoutContext';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Index() {
  const { user, isLoading } = useAuth();
  const { isLoggingOut } = useLogout();
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Show splash for minimum time, then navigate
      const timer = setTimeout(() => {
        setShowSplash(false);
        // Don't redirect if user is logging out - let LogoutContext handle it
        if (!isLoggingOut) {
          if (user) {
            router.replace('/(app)/home');
          } else {
            router.replace('/login');
          }
        }
      }, 2500); // Minimum splash display time

      return () => clearTimeout(timer);
    }
  }, [user, isLoading, router, isLoggingOut]);


  if (isLoading || showSplash) {
    return (
      <SplashScreen 
        message={isLoading ? "Checking authentication..." : "Welcome back!"}
        onAnimationComplete={() => setShowSplash(false)}
      />
    );
  }

  return null; // Will redirect immediately
}