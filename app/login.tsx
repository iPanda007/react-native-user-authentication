import InputField from '@/components/InputField';
import StunningAlert from '@/components/StunningAlert';
import { useAuth } from '@/contexts/AuthContext';
import { useLogout } from '@/contexts/LogoutContext';
import { emailValidation, passwordValidation, useFormValidation } from '@/hooks/useFormValidation';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';



const ICON_SIZE = 96;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorAlertData, setErrorAlertData] = useState({ title: '', message: '' });
  const { login } = useAuth();
  const { resetLogoutState } = useLogout();
  const router = useRouter();

  // Auto-dismiss success alert when user becomes authenticated
  useEffect(() => {
    if (showSuccessAlert) {
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000); // Auto-dismiss after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [showSuccessAlert]);


  const { errors, validateAll, clearFieldError } = useFormValidation([
    { name: 'email', value: email, validation: emailValidation },
    { name: 'password', value: password, validation: passwordValidation },
  ]);

  const handleLogin = async () => {
    const validation = validateAll();
    if (!validation.isValid) return;

    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        resetLogoutState(); // Reset any previous logout state
        setShowSuccessAlert(true);
      } else {
        setErrorAlertData({
          title: 'Sign In Failed',
          message: result.error || 'Login failed. Please check your credentials and try again.'
        });
        setShowErrorAlert(true);
      }
    } catch {
      setErrorAlertData({
        title: 'Sign In Failed',
        message: 'An unexpected error occurred. Please try again.'
      });
      setShowErrorAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSuccessAlert = () => {
    setShowSuccessAlert(false);
    router.push('/')
    // Let index.tsx handle navigation based on authentication state
  };

  const handleErrorAlert = () => {
    setShowErrorAlert(false);
    clearFieldError('email');
    clearFieldError('password');
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />


      <View className="absolute inset-0 bg-white" />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-3 justify-center min-h-[600px]">

          <View className="items-center mb-6 pt-10">
            <View className="mb-8">
              <View className="bg-white/80 rounded-full p-2 border border-white/30">
                <Ionicons name="person-circle" size={ICON_SIZE} color="#2563eb" />
              </View>
            </View>
            <Text className="text-4xl font-black text-gray-900 mb-2 text-center">Welcome Back</Text>
            <Text className="text-lg text-gray-600 text-center leading-6">Sign in to your account</Text>
          </View>


          <View className="w-full bg-white/80 backdrop-blur-lg rounded-3xl p-4 border border-white/20">


            <InputField
              label="Email"
              value={email}
              onChangeText={(text: string) => {
                setEmail(text);
                if (errors.email) {
                  clearFieldError('email');
                }
              }}
              placeholder="Enter your email"
              error={errors.email}
              icon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <InputField
              label="Password"
              value={password}
              onChangeText={(text: string) => {
                setPassword(text);
                if (errors.password) {
                  clearFieldError('password');
                }
              }}
              placeholder="Enter your password"
              error={errors.password}
              icon="lock-closed-outline"
              secureTextEntry={!showPassword}
              showPasswordToggle={true}
              onTogglePassword={togglePasswordVisibility}
              showPassword={showPassword}
              autoCapitalize="none"
            />


            <TouchableOpacity
              className={`bg-blue-600 py-3.5 rounded-2xl items-center mt-2.5 border-2 border-white/10 ${isLoading ? 'bg-gray-400' : 'bg-blue-600'}`}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text className="text-white text-base font-semibold">
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>


            <View className="flex-row justify-center items-center mt-4">
              <Text className="text-gray-600 text-base">Don&apos;t have an account? </Text>
              <Link href="./signup" asChild>
                <TouchableOpacity>
                  <Text className="text-blue-600 text-base font-semibold">Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>

      <StunningAlert
        visible={showSuccessAlert}
        title="Welcome Back! 🎉"
        message="You have been successfully logged in. Enjoy your experience!"
        icon="checkmark-circle"
        type="success"
        buttonText="Continue"
        onButtonPress={handleSuccessAlert}
      />


      <StunningAlert
        visible={showErrorAlert}
        title={errorAlertData.title}
        message={errorAlertData.message}
        icon="alert-circle"
        iconColor="#ef4444"
        type="error"
        buttonText="Try Again"
        onButtonPress={handleErrorAlert}
      />
    </KeyboardAvoidingView>
  );
}