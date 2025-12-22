import React from 'react';
import { HomeContent, AboutContent, ProfileContent, ShopContent } from '@/components/TabContent';
import { useAuth } from '@/contexts/AuthContext';
import { useLogout } from '@/contexts/LogoutContext';
import { View, Text, ActivityIndicator } from 'react-native';

interface TabScreenProps {
  activeTab: 'home' | 'about' | 'profile' | 'shop';
}

const contentMap = {
  home: HomeContent,
  about: AboutContent,
  profile: ProfileContent,
  shop: ShopContent,
};

export default function TabScreen({ activeTab }: TabScreenProps) {
  const { user, isLoading } = useAuth();
  const { isLoggingOut } = useLogout();
  

  if (isLoading && !isLoggingOut) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 16, fontSize: 16, color: '#6b7280' }}>Loading...</Text>
      </View>
    );
  }
  

  // Don't show content during logout or when no user (except for about page)
  if ((!user && activeTab !== 'about') || isLoggingOut) {
    return null;
  }
  
  const ContentComponent = contentMap[activeTab];
  return <ContentComponent activeTab={activeTab} />;
}