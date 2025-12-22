import React, { useEffect, useRef } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: '/login' | '/logout-redirect';
}


export default function AuthGuard({ 
  children, 
  redirectTo = '/login' 
}: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const hasCheckedAuth = useRef(false);


  useEffect(() => {

    if (!hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      

      if (!isLoading && !user) {
        router.replace(redirectTo);
      }
    }
  }, [user, isLoading, redirectTo, router]);


  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }


  if (!user) {
    return null;
  }


  return <>{children}</>;
}