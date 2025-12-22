import React, { Component, ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class RouteErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Route error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <RouteErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

function RouteErrorFallback({ error }: { error?: Error }) {
  const router = useRouter();

  const handleGoHome = () => {
    router.replace('/login');
  };

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#ffffff',
      padding: 20
    }}>
      <Text style={{ 
        fontSize: 18, 
        fontWeight: 'bold',
        color: '#ef4444',
        marginBottom: 10,
        textAlign: 'center'
      }}>
        Oops! Something went wrong
      </Text>
      <Text style={{ 
        fontSize: 14, 
        color: '#6b7280',
        marginBottom: 20,
        textAlign: 'center'
      }}>
        We're redirecting you to the login page
      </Text>
      <TouchableOpacity 
        onPress={handleGoHome}
        style={{
          backgroundColor: '#2563eb',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 8
        }}
      >
        <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
          Go to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default RouteErrorBoundary;