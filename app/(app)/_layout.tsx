import React from 'react';
import { Stack } from 'expo-router';
import AppScreen from '@/components/AppScreen';
import SwipeWrapper from '@/components/SwipeWrapper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AppLayout() {
  return (
    <AppScreen>
      <GestureHandlerRootView style={{ flex: 1 }}>
          <SwipeWrapper>
        <Stack>
          <Stack.Screen
            name="home"
            options={{
              headerShown: false,
              gestureEnabled:false
            }}
          />
          <Stack.Screen
            name="shop"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="profile"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='about'
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </SwipeWrapper>
      </GestureHandlerRootView>
    </AppScreen>
  );
}