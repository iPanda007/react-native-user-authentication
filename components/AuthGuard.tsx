import React, { useEffect, useRef } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: '/login' | '/logout-redirect';
}

/**
 * AuthGuard component that handles authentication flow
 * - Only checks authentication on initial mount
 * - Shows loading spinner while checking auth status
 * - Redirects to login if not authenticated
 * - Renders children if authenticated
 * 
 * This component should wrap the main app entry point to ensure
 * authentication is checked once, not on every navigation
 */
export default function AuthGuard({ 
  children, 
  redirectTo = '/login' 
}: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const hasCheckedAuth = useRef(false);

  // Handle authentication check only once on mount
  useEffect(() => {
    // Only check authentication once when component mounts
    if (!hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      
      // Only redirect after auth check is complete
      if (!isLoading && !user) {
        router.replace(redirectTo);
      }
    }
  }, [user, isLoading, redirectTo, router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  // Don't render anything while redirecting or if not authenticated
  if (!user) {
    return null;
  }

  // Render children when authenticated
  return <>{children}</>;
}