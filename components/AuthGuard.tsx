import React, { useEffect, useRef } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useLogout } from '@/contexts/LogoutContext';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: '/login' | '/logout-redirect';
}


export default function AuthGuard({ 
  children, 
  redirectTo = '/login' 
}: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const { isLoggingOut } = useLogout();
  const router = useRouter();
  const hasCheckedAuth = useRef(false);


  useEffect(() => {

    if (!hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      
      // Don't redirect if user is in the process of logging out
      if (!isLoading && !user && !isLoggingOut) {
        router.replace(redirectTo);
      }
    }
  }, [user, isLoading, redirectTo, router, isLoggingOut]);


  // Show loading only if not logging out
  if (isLoading && !isLoggingOut) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  // Don't render anything if user is logging out or no user
  // This prevents the black screen flash
  if (!user || isLoggingOut) {
    return null;
  }


  return <>{children}</>;
}