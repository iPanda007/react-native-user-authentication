import { useState, useEffect } from 'react';
import { useSegments } from 'expo-router';

export function useActiveTab() {
  const [activeTab, setActiveTab] = useState('home');
  const segments = useSegments();

  useEffect(() => {
    const currentScreen = segments[1];
    if (currentScreen && ['home', 'shop', 'profile', 'about'].includes(currentScreen)) {
      setActiveTab(currentScreen);
    }
  }, [segments]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return {
    activeTab,
    handleTabChange,
  };
}