import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useAuth } from '@/contexts/AuthContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export function useSplashScreen() {
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);
  const { isLoading } = useAuth();

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need here
        await new Promise(resolve => setTimeout(resolve, 2000)); // Minimum splash time
        
        // Artificially delay for demo purposes
        // In a real app, you'd want to load necessary data here
        
        setIsAppReady(true);
      } catch (e) {
        console.warn(e);
        setIsAppReady(true);
      } finally {
        // Hide the splash screen
        setTimeout(() => {
          setIsSplashScreenVisible(false);
          SplashScreen.hideAsync();
        }, 500);
      }
    }

    prepare();
  }, []);

  return {
    isSplashScreenVisible,
    isAppReady,
    isLoading,
  };
}