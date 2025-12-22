import React, { createContext, useContext, useState, ReactNode } from 'react';
import StunningAlert from '@/components/StunningAlert';
import { useAuth } from './AuthContext';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LogoutContextType {
  showLogoutAlert: boolean;
  isLoggingOut: boolean;
  handleLogout: () => void;
  confirmLogout: () => Promise<void>;
  cancelLogout: () => void;
}

const LogoutContext = createContext<LogoutContextType | undefined>(undefined);

export function LogoutProvider({ children }: { children: ReactNode }) {
  const { logout } = useAuth();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  
  const handleLogout = () => {
    setShowLogoutAlert(true);
  };

  const confirmLogout = async () => {
    setShowLogoutAlert(false);
    setIsLoggingOut(true);
    
    try {
      // Navigate to logout-redirect page first
      router.replace('/logout-redirect');
      
      // Clear auth state first (this is most important)
      await logout();
      
    } catch (error) {
      console.error('Logout error:', error);
      
      // Force logout even if there's an error
      try {
        await logout();
      } catch (authError) {
        // Suppress auth errors - they're not critical
      }
      
      // Navigate to login as fallback
      setTimeout(() => {
        router.replace('/login');
      }, 100);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const cancelLogout = () => {
    setShowLogoutAlert(false);
  };

  return (
    <LogoutContext.Provider value={{
      showLogoutAlert,
      isLoggingOut,
      handleLogout,
      confirmLogout,
      cancelLogout
    }}>
      {children}
      <StunningAlert
        visible={showLogoutAlert}
        title="Sign Out?"
        message="Are you sure you want to sign out of your account?"
        icon="log-out"
        iconColor="#ef4444"
        type="error"
        buttonText="Sign Out"
        cancelButtonText="Cancel"
        onButtonPress={confirmLogout}
        onCancelPress={cancelLogout}
      />
    </LogoutContext.Provider>
  );
}

export function useLogout() {
  const context = useContext(LogoutContext);
  if (context === undefined) {
    throw new Error('useLogout must be used within a LogoutProvider');
  }
  return context;
}