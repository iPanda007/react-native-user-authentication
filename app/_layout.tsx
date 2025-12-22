import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import './global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { LogoutProvider } from '@/contexts/LogoutContext';
import AppScreen from '@/components/AppScreen';

// Layout wrapper for routes that should use AppScreen
function AppScreenLayout({ children }: { children: React.ReactNode }) {
  return <AppScreen>{children}</AppScreen>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <LogoutProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
          <Stack.Screen name="login" options={{ headerShown: false,gestureEnabled:false }} />
          <Stack.Screen name="signup" options={{ headerShown: false,gestureEnabled:false }} />
          
          {/* Routes wrapped with AppScreen layout */}
          <Stack.Screen 
            name="(app)" 
            options={{ 
              headerShown: false,
              header: () => null
            }}
          />
          
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </LogoutProvider>
    </AuthProvider>
  );
}
