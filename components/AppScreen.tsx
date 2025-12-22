import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '@/components/BottomNav';
import { useActiveTab } from '@/hooks/useActiveTab';

interface AppScreenProps {
  children: React.ReactNode;
}

export default function AppScreen({ children }: AppScreenProps) {
  const { activeTab, handleTabChange } = useActiveTab();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Animated Background */}
      <View className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" pointerEvents="none" />

      {/* Header */}
      <View className="items-center pt-4 pb-2" pointerEvents="none">
        <View className="flex-row items-center justify-center">
          <View className="bg-white/80 backdrop-blur-lg rounded-full p-2 mr-3">
            <Ionicons name="apps" size={24} color="#2563eb" />
          </View>
          <Text className="text-2xl font-bold text-gray-900">
            {activeTab === 'home' && 'Dashboard'}
            {activeTab === 'profile' && 'Profile'}
            {activeTab === 'shop' && 'Shop'}
            {activeTab === 'about' && 'About'}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 bg-white" style={{ pointerEvents: 'box-none' }}>
        {children}
      </View>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}