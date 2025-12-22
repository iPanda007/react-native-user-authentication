import { useState, useEffect } from 'react';
import { useSegments } from 'expo-router';

/**
 * Custom hook to manage active tab state based on current route
 * Syncs the active tab with the current screen name
 */
export function useActiveTab() {
  const [activeTab, setActiveTab] = useState('home');
  const segments = useSegments();

  useEffect(() => {
    const currentScreen = segments[1]; // Get the current screen name
    if (currentScreen && ['home', 'shop', 'profile', 'about'].includes(currentScreen)) {
      setActiveTab(currentScreen);
    }
  }, [segments]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Navigation is handled by the component using this hook
  };

  return {
    activeTab,
    handleTabChange,
  };
}