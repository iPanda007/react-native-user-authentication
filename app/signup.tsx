import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import StunningAlert from '@/components/StunningAlert';
import InputField from '@/components/InputField';
import { useFormValidation, emailValidation, passwordValidation, nameValidation } from '@/hooks/useFormValidation';

const ICON_SIZE = 96; // Approximate width * 0.2

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorAlertData, setErrorAlertData] = useState({ title: '', message: '' });
  const { signup } = useAuth();
  const router = useRouter();

  // Form validation using the custom hook
  const { errors, validateAll, clearFieldError } = useFormValidation([
    { name: 'name', value: name, validation: nameValidation },
    { name: 'email', value: email, validation: emailValidation },
    { name: 'password', value: password, validation: passwordValidation },
  ]);

  const handleSignup = async () => {
    const validation = validateAll();
    if (!validation.isValid) return;

    setIsLoading(true);

    try {
      const result = await signup(name.trim(), email, password);
      
      if (result.success) {
        setShowSuccessAlert(true);
      } else {
        setErrorAlertData({
          title: 'Sign Up Failed',
          message: result.error || 'Account creation failed. Please try again.'
        });
        setShowErrorAlert(true);
      }
    } catch {
      setErrorAlertData({
        title: 'Sign Up Failed',
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
    router.push('./login');
  };

  const handleErrorAlert = () => {
    setShowErrorAlert(false);
    clearFieldError('name');
    clearFieldError('email');
    clearFieldError('password');
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* White Background */}
      <View className="absolute inset-0 bg-white" />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-3 justify-center min-h-[600px]">
          {/* Header */}
          <View className="items-center mb-6 pt-10">
            <View className="mb-8">
              <View className="bg-white/80 rounded-full p-2 border border-white/30">
                <Ionicons name="person-add" size={ICON_SIZE} color="#2563eb" />
              </View>
            </View>
            <Text className="text-4xl font-black text-gray-900 mb-2 text-center">Create Account</Text>
            <Text className="text-lg text-gray-600 text-center leading-6">Sign up to get started</Text>
          </View>

          {/* Form */}
          <View className="w-full bg-white/80 backdrop-blur-lg rounded-3xl p-4 border border-white/20">

            {/* Name Input */}
            <InputField
              label="Full Name"
              value={name}
              onChangeText={(text: string) => {
                setName(text);
                if (errors.name) {
                  clearFieldError('name');
                }
              }}
              placeholder="Enter your full name"
              error={errors.name}
              icon="person-outline"
              autoCapitalize="words"
              autoCorrect={false}
            />

            {/* Email Input */}
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

            {/* Password Input */}
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

            <Text className="text-gray-500 text-xs mt-1 ml-1">
              Password must be at least 6 characters long
            </Text>

            {/* Signup Button */}
            <TouchableOpacity
              className={`bg-blue-600 py-3.5 rounded-2xl items-center mt-2.5 border-2 border-white/10 ${isLoading ? 'bg-gray-400' : 'bg-blue-600'}`}
              onPress={handleSignup}
              disabled={isLoading}
            >
              <Text className="text-white text-base font-semibold">
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View className="flex-row justify-center items-center mt-4">
              <Text className="text-gray-600 text-base">Already have an account? </Text>
              <Link href="./login" asChild>
                <TouchableOpacity>
                  <Text className="text-blue-600 text-base font-semibold">Sign In</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Stunning Success Alert */}
      <StunningAlert
        visible={showSuccessAlert}
        title="Account Created Successfully! 🎉"
        message="Your account has been created successfully. Please login with your credentials."
        icon="checkmark-circle"
        type="success"
        buttonText="Go to Login"
        onButtonPress={handleSuccessAlert}
      />

      {/* Stunning Error Alert */}
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