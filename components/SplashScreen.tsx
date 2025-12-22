import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationComplete?: () => void;
  message?: string;
}

export default function SplashScreen({ 
  onAnimationComplete, 
  message = "Loading..." 
}: SplashScreenProps) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [logoOpacity] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Start entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 80,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Start pulsing animation for the logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Call completion handler after animations
    const timer = setTimeout(() => {
      onAnimationComplete?.();
    }, 3000); // Extended splash display time

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Background with gradient overlay */}
      <View style={styles.gradientBackground} />
      
      {/* Content */}
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo container with glassmorphism effect */}
        <Animated.View 
          style={[
            styles.logoContainer,
            { 
              opacity: logoOpacity,
              transform: [{ scale: pulseAnim }]
            }
          ]}
        >
          <View style={styles.glassCard}>
            <View style={styles.logoBackground}>
              <Ionicons name="person-circle" size={100} color="#2563eb" />
            </View>
          </View>
        </Animated.View>

        {/* App title with glassmorphism */}
        <Animated.View 
          style={[
            styles.titleContainer,
            { opacity: logoOpacity }
          ]}
        >
          <View style={styles.glassCard}>
            <Text style={styles.appTitle}>User Authentication</Text>
            <Text style={styles.appSubtitle}>Welcome back!</Text>
          </View>
        </Animated.View>
        
        {/* Loading indicator with glassmorphism */}
        <Animated.View 
          style={[
            styles.loadingContainer,
            { opacity: logoOpacity }
          ]}
        >
          <View style={styles.glassCard}>
            <ActivityIndicator size="large" color="#2563eb" />
            <Text style={styles.loadingText}>{message}</Text>
          </View>
        </Animated.View>
      </Animated.View>

      {/* Animated background elements */}
      <Animated.View 
        style={[
          styles.backgroundElement1,
          { 
            opacity: fadeAnim,
            transform: [{
              rotate: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
              })
            }]
          }
        ]}
      />
      <Animated.View 
        style={[
          styles.backgroundElement2,
          { 
            opacity: fadeAnim,
            transform: [{
              scale: pulseAnim
            }]
          }
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
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
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(20px)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logoBackground: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#475569',
    marginTop: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  backgroundElement1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
  },
  backgroundElement2: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(139, 92, 246, 0.06)',
  },
});