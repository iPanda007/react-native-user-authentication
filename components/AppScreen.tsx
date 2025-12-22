import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '@/components/BottomNav';
import { useTabNavigationManager } from '@/hooks/useTabNavigationManager';

interface AppScreenProps {
  children: React.ReactNode;
}


export default function AppScreen({ children }: AppScreenProps) {

  const {
    currentRoute,
  } = useTabNavigationManager();


  const getTitle = (route: string) => {
    switch (route) {
      case 'home': return 'Home';
      case 'profile': return 'Profile';
      case 'shop': return 'Shop';
      case 'about': return 'About';
      default: return 'App';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      

      <View className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" pointerEvents="none" />


      <View className="items-center pt-4 pb-2" pointerEvents="none">
        <View className="flex-row items-center justify-center">
          <View className="bg-white/80 backdrop-blur-lg rounded-full p-2 mr-3">
            <Ionicons name="apps" size={24} color="#2563eb" />
          </View>
          <Text className="text-2xl font-bold text-gray-900">
            {getTitle(currentRoute)}
          </Text>
        </View>
      </View>


      <View 
        className="flex-1 bg-white" 
        style={{ pointerEvents: 'box-none' }}
      >
        {children}
      </View>


      <BottomNav activeTab={currentRoute} onTabChange={() => {}} />
    </SafeAreaView>
  );
}