import React from 'react';
import { HomeContent, AboutContent, ProfileContent, ShopContent } from '@/components/TabContent';
import { useAuth } from '@/contexts/AuthContext';
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
  

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 16, fontSize: 16, color: '#6b7280' }}>Loading...</Text>
      </View>
    );
  }
  

  if (!user && activeTab !== 'about') {
    return null;
  }
  
  const ContentComponent = contentMap[activeTab];
  return <ContentComponent activeTab={activeTab} />;
}