import React from 'react';
import { Stack } from 'expo-router';
import AppScreen from '@/components/AppScreen';

export default function AppLayout() {
  return (
    <AppScreen>
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false ,gestureEnabled:false, }} />
        <Stack.Screen name="shop" options={{ headerShown: false,gestureEnabled:false }} />
        <Stack.Screen name="profile" options={{ headerShown: false,gestureEnabled:false }} />
        <Stack.Screen name='about' options={{headerShown:false ,gestureEnabled:false}}/>
      </Stack>
    </AppScreen>
  );
}