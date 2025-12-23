import StunningAlert from '@/components/StunningAlert';
import { useRouter } from 'expo-router';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

interface LogoutContextType {
  showLogoutAlert: boolean;
  isLoggingOut: boolean;
  handleLogout: () => void;
  confirmLogout: () => Promise<void>;
  cancelLogout: () => void;
  resetLogoutState: () => void;
}

const LogoutContext = createContext<LogoutContextType | undefined>(undefined);

export function LogoutProvider({ children }: { children: ReactNode }) {
  const { logout } = useAuth();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  
  // Reset logout state on mount to ensure clean state
  React.useEffect(() => {
    setIsLoggingOut(false);
    setShowLogoutAlert(false);
  }, []);
  
  const handleLogout = () => {
    setShowLogoutAlert(true);
  };

  const confirmLogout = async () => {
    // Immediately hide the alert
    setShowLogoutAlert(false);
    
    // Set logout state FIRST to prepare components
    setIsLoggingOut(true);
    
    try {
      await logout();
      
      // Small delay to let React process state changes
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Navigate after state is processed
      router.replace('/login');
      
    } catch (error) {
      console.error('Logout error:', error);
      
      // Even on error, redirect to login for security
      await new Promise(resolve => setTimeout(resolve, 100));
      router.replace('/login');
      
    }
  };

  const cancelLogout = () => {
    setShowLogoutAlert(false);
  };

  const resetLogoutState = () => {
    setIsLoggingOut(false);
    setShowLogoutAlert(false);
  };

  return (
    <LogoutContext.Provider value={{
      showLogoutAlert,
      isLoggingOut,
      handleLogout,
      confirmLogout,
      cancelLogout,
      resetLogoutState
    }}>
      {children}
      {/* Don't render StunningAlert during logout to prevent black screen */}
      {!isLoggingOut && (
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
      )}
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