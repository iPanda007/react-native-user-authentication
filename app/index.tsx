import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import SplashScreen from '@/components/SplashScreen';

export default function Index() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Show splash for minimum time, then navigate
      const timer = setTimeout(() => {
        setShowSplash(false);
        if (user) {
          router.push('/home');
        } else {
          router.push('/login');
        }
      }, 2500); // Minimum splash display time

      return () => clearTimeout(timer);
    }
  }, [user, isLoading, router]);


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