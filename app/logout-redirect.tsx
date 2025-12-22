import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function LogoutRedirect() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {

      router.replace('/login');
    }
  }, [isLoading, router]);

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#ffffff'
    }}>
      <ActivityIndicator size="large" color="#2563eb" />
      <Text style={{ 
        marginTop: 16, 
        fontSize: 16, 
        color: '#6b7280' 
      }}>
        Signing you out...
      </Text>
    </View>
  );
}