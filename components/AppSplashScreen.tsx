import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import { useSplashScreen } from '@/hooks/useSplashScreen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

interface AppSplashScreenProps {
  onHide?: () => void;
}

export default function AppSplashScreen({ onHide }: AppSplashScreenProps) {
  const { isSplashScreenVisible, isAppReady } = useSplashScreen();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isAppReady) {
      // Animate out when app is ready
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        SplashScreen.hideAsync();
        onHide?.();
      });
    }
  }, [isAppReady]);

  if (!isSplashScreenVisible) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      {/* Background */}
      <View style={styles.gradientBackground} />
      
      {/* Content */}
      <View style={styles.content}>
        {/* Logo container */}
        <View style={styles.logoContainer}>
          <View style={styles.glassCard}>
            <Ionicons name="person-circle" size={80} color="#2563eb" />
          </View>
        </View>

        {/* App title */}
        <View style={styles.titleContainer}>
          <View style={styles.glassCard}>
            <Text style={styles.appTitle}>User Authentication</Text>
            <Text style={styles.appSubtitle}>Secure login system</Text>
          </View>
        </View>
      </View>

      {/* Background decorative elements */}
      <View style={styles.backgroundElement1} />
      <View style={styles.backgroundElement2} />
      <View style={styles.backgroundElement3} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#f8fafc',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f8fafc',
  },
  content: {
    alignItems: 'center',
    zIndex: 2,
    paddingHorizontal: 20,
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(20px)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  logoContainer: {
    marginBottom: 24,
  },
  titleContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  backgroundElement1: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
  },
  backgroundElement2: {
    position: 'absolute',
    bottom: -60,
    left: -60,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
  },
  backgroundElement3: {
    position: 'absolute',
    top: '40%',
    left: -40,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(236, 72, 153, 0.06)',
  },
});