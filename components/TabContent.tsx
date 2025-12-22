import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useLogout } from '@/contexts/LogoutContext';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface TabContentProps {
  activeTab?: string;
}


function LoadingContent() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#2563eb" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

export function HomeContent({ activeTab }: TabContentProps) {
  const { user, isLoading } = useAuth();
  const { handleLogout, isLoggingOut } = useLogout();

  if (isLoading && !isLoggingOut) {
    return <LoadingContent />;
  }

  // Don't show black screen during logout or when no user
  if (!user || isLoggingOut) {
    return null;
  }

  return (
    <ScrollView 
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20, backgroundColor: '#ffffff' }}
    >
      {/* Header Section */}
      <View className="items-center mb-8 px-3">
        <View className="relative mb-6">
          <View className="bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-full">
            <View className="bg-white/20 backdrop-blur-lg rounded-full p-1">
              <Ionicons 
                name="person-circle" 
                size={width * 0.25} 
                color="#2563eb" 
              />
            </View>
          </View>
        </View>
        
        <Text className="text-4xl font-black text-gray-900 mb-2 text-center">
          Welcome Back! ✨
        </Text>
        <Text className="text-lg text-gray-600 text-center mb-4">
          You're successfully logged in
        </Text>
        
        <View className="bg-white/80 backdrop-blur-lg rounded-2xl px-6 py-3 border border-gray-200">
          <Text className="text-gray-900 font-semibold text-lg">
            Hello, {user.name}! 👋
          </Text>
        </View>
      </View>


      <View className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 mx-3 mb-6 border border-gray-200">
        <View className="flex-row items-center mb-8">
          <View className="bg-blue-500/20 p-3 rounded-2xl mr-4">
            <Ionicons name="person-circle" size={28} color="#2563eb" />
          </View>
          <Text className="text-2xl font-bold text-gray-900">Profile Information</Text>
        </View>
        
        <View className="space-y-6">
          <View className="flex-row items-center p-5 bg-gray-50 rounded-2xl border border-gray-100">
            <View className="bg-blue-500/20 p-3 rounded-xl mr-5">
              <Ionicons name="person-outline" size={22} color="#2563eb" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-500 text-sm font-medium mb-1">Full Name</Text>
              <Text className="text-gray-900 text-lg font-semibold">{user.name}</Text>
            </View>
          </View>

          <View className="flex-row items-center justify-center">
            <View className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <Ionicons name="ellipsis-horizontal" size={16} color="rgba(107,114,128,0.5)" className="mx-4" />
            <View className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </View>

          <View className="flex-row items-center p-5 bg-gray-50 rounded-2xl border border-gray-100">
            <View className="bg-blue-500/20 p-3 rounded-xl mr-5">
              <Ionicons name="mail-outline" size={22} color="#2563eb" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-500 text-sm font-medium mb-1">Email Address</Text>
              <Text className="text-gray-900 text-lg font-semibold">{user.email}</Text>
            </View>
          </View>

          <View className="flex-row items-center justify-center">
            <View className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <Ionicons name="ellipsis-horizontal" size={16} color="rgba(107,114,128,0.5)" className="mx-4" />
            <View className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </View>

          <View className="flex-row items-center p-5 bg-gray-50 rounded-2xl border border-gray-100">
            <View className="bg-blue-500/20 p-3 rounded-xl mr-5">
              <Ionicons name="id-card-outline" size={22} color="#2563eb" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-500 text-sm font-medium mb-1">User ID</Text>
              <Text className="text-gray-900 text-lg font-semibold">{user.id}</Text>
            </View>
          </View>
        </View>
      </View>


      <View className="bg-emerald-50 backdrop-blur-lg rounded-3xl p-6 mx-3 mb-6 border border-emerald-200">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <View className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse" />
            <Text className="text-emerald-600 font-bold text-lg">Online & Active</Text>
          </View>
          <View className="bg-emerald-100 px-4 py-2 rounded-full flex-row items-center">
            <Ionicons name="shield-checkmark" size={16} color="#059669" />
            <Text className="text-emerald-600 font-semibold ml-2">Secured</Text>
          </View>
        </View>
        <Text className="text-gray-600">
          Last activity: {new Date().toLocaleDateString()}
        </Text>
      </View>


      <View className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 mx-3 mb-6 border border-gray-200">
        <View className="flex-row items-center mb-6">
          <View className="bg-yellow-500/20 p-3 rounded-2xl mr-4">
            <Ionicons name="star" size={24} color="#f59e0b" />
          </View>
          <Text className="text-2xl font-bold text-gray-900">App Features</Text>
        </View>
        
        <View className="grid grid-cols-2 gap-4">
          {[
            { icon: 'shield-checkmark' as const, text: 'Secure Auth', color: 'bg-blue-500/20' },
            { icon: 'cloud' as const, text: 'Cloud Sync', color: 'bg-purple-500/20' },
            { icon: 'phone-portrait' as const, text: 'Responsive', color: 'bg-green-500/20' },
            { icon: 'color-palette' as const, text: 'Modern UI', color: 'bg-pink-500/20' },
          ].map((feature, index) => (
            <View 
              key={index}
              className={`${feature.color} p-4 rounded-2xl items-center border border-gray-200`}
            >
              <Ionicons name={feature.icon} size={24} color="#374151" />
              <Text className="text-gray-900 font-semibold mt-2 text-center">
                {feature.text}
              </Text>
            </View>
          ))}
        </View>
      </View>


      <View className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 mx-3 mb-6 border border-gray-200">
        <Text className="text-2xl font-bold text-center text-gray-900 mb-6">Your Activity</Text>
        <View className="grid grid-cols-3 gap-4">
          <View className="items-center">
            <View className="bg-blue-100 p-3 rounded-2xl mb-2">
              <Ionicons name="time-outline" size={24} color="#2563eb" />
            </View>
            <Text className="text-gray-900 font-bold text-lg">24/7</Text>
            <Text className="text-gray-500 text-sm">Online</Text>
          </View>
          <View className="items-center">
            <View className="bg-green-100 p-3 rounded-2xl mb-2">
              <Ionicons name="checkmark-circle-outline" size={24} color="#059669" />
            </View>
            <Text className="text-gray-900 font-bold text-lg">100%</Text>
            <Text className="text-gray-500 text-sm">Secure</Text>
          </View>
          <View className="items-center">
            <View className="bg-purple-100 p-3 rounded-2xl mb-2">
              <Ionicons name="flash-outline" size={24} color="#7c3aed" />
            </View>
            <Text className="text-gray-900 font-bold text-lg">Fast</Text>
            <Text className="text-gray-500 text-sm">Performance</Text>
          </View>
        </View>
      </View>

      {/* Bottom Spacing */}
      <View className="h-8" />
    </ScrollView>
  );
}

export function ProfileContent({ activeTab }: { activeTab: string }) {
  const { user, isLoading } = useAuth();
  const { handleLogout, isLoggingOut } = useLogout();

  if (isLoading && !isLoggingOut) {
    return <LoadingContent />;
  }

  // Don't show black screen during logout or when no user
  if (!user || isLoggingOut) {
    return null;
  }

  return (
    <ScrollView 
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20, backgroundColor: '#ffffff' }}
    >
      {/* Header Section */}
      <View className="items-center mb-8 px-3">
        <View className="relative mb-6">
          <View className="bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-full">
            <View className="bg-white/20 backdrop-blur-lg rounded-full p-1">
              <Ionicons 
                name="person-circle" 
                size={width * 0.25} 
                color="#2563eb" 
              />
            </View>
          </View>
        </View>
        
        <Text className="text-4xl font-black text-gray-900 mb-2 text-center">
          {user.name}
        </Text>
        <Text className="text-lg text-gray-600 text-center mb-4">
          {user.email}
        </Text>
        
        <View className="bg-white/80 backdrop-blur-lg rounded-2xl px-6 py-3 border border-gray-200">
          <Text className="text-gray-900 font-semibold text-lg">
            User ID: {user.id}
          </Text>
        </View>
      </View>


      <View className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 mx-3 mb-6 border border-gray-200">
        <Text className="text-2xl font-bold text-center text-gray-900 mb-6">Account Statistics</Text>
        <View className="grid grid-cols-2 gap-4">
          <View className="items-center">
            <View className="bg-blue-100 p-3 rounded-2xl mb-2">
              <Ionicons name="calendar-outline" size={24} color="#2563eb" />
            </View>
            <Text className="text-gray-900 font-bold text-lg">Today</Text>
            <Text className="text-gray-500 text-sm">Active</Text>
          </View>
          <View className="items-center">
            <View className="bg-green-100 p-3 rounded-2xl mb-2">
              <Ionicons name="time-outline" size={24} color="#059669" />
            </View>
            <Text className="text-gray-900 font-bold text-lg">24/7</Text>
            <Text className="text-gray-500 text-sm">Online</Text>
          </View>
          <View className="items-center">
            <View className="bg-purple-100 p-3 rounded-2xl mb-2">
              <Ionicons name="shield-checkmark-outline" size={24} color="#7c3aed" />
            </View>
            <Text className="text-gray-900 font-bold text-lg">100%</Text>
            <Text className="text-gray-500 text-sm">Secure</Text>
          </View>
          <View className="items-center">
            <View className="bg-yellow-100 p-3 rounded-2xl mb-2">
              <Ionicons name="star-outline" size={24} color="#f59e0b" />
            </View>
            <Text className="text-gray-900 font-bold text-lg">Premium</Text>
            <Text className="text-gray-500 text-sm">Member</Text>
          </View>
        </View>
      </View>


      <View className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 mx-3 mb-6 border border-gray-200">
        <Text className="text-2xl font-bold text-gray-900 mb-6">Settings</Text>
        
        {[
          { icon: 'person-outline', label: 'Edit Profile', color: '#2563eb' },
          { icon: 'notifications-outline', label: 'Notifications', color: '#f59e0b' },
          { icon: 'shield-outline', label: 'Privacy & Security', color: '#059669' },
          { icon: 'help-circle-outline', label: 'Help & Support', color: '#7c3aed' },
          { icon: 'information-circle-outline', label: 'About App', color: '#ef4444' },
        ].map((item, index) => (
          <TouchableOpacity 
            key={index}
            className="flex-row items-center p-4 bg-gray-50 rounded-2xl mb-3 border border-gray-100"
            activeOpacity={0.7}
          >
            <View className="bg-white p-2 rounded-xl mr-4">
              <Ionicons name={item.icon as any} size={20} color={item.color} />
            </View>
            <Text className="text-gray-900 font-semibold text-lg flex-1">
              {item.label}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        ))}
      </View>


      <View className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 mx-3 mb-6 border border-gray-200">
        <Text className="text-2xl font-bold  text-center text-gray-900 mb-6">Quick Actions</Text>
        <TouchableOpacity 
          onPress={handleLogout}
          className="bg-gradient-to-r from-red-500 to-pink-500 py-4 rounded-2xl flex-row items-center justify-center"
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={24} color="#000" />
          <Text className="text-black font-bold text-lg ml-3">Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Spacing */}
      <View className="h-8" />
    </ScrollView>
  );
}

export function ShopContent({ activeTab }: { activeTab: string }) {
  const { user, isLoading } = useAuth();
  const { isLoggingOut } = useLogout();

  if (isLoading && !isLoggingOut) {
    return <LoadingContent />;
  }

  // Don't show black screen during logout or when no user
  if (!user || isLoggingOut) {
    return null;
  }

  const shopItems = [
    { id: 1, name: 'Premium Theme', price: '$9.99', icon: 'color-palette', color: '#f59e0b' },
    { id: 2, name: 'Extra Storage', price: '$4.99', icon: 'cloud', color: '#3b82f6' },
    { id: 3, name: 'Advanced Analytics', price: '$14.99', icon: 'stats-chart', color: '#10b981' },
    { id: 4, name: 'Priority Support', price: '$19.99', icon: 'headset', color: '#8b5cf6' },
    { id: 5, name: 'Custom Branding', price: '$24.99', icon: 'brush', color: '#ef4444' },
    { id: 6, name: 'API Access', price: '$29.99', icon: 'code-slash', color: '#06b6d4' },
  ];

  return (
    <ScrollView 
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20, backgroundColor: '#ffffff' }}
    >
      {/* Header Section */}
      <View className="items-center mb-8 px-3">
        <View className="relative mb-6">
          <View className="bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-full">
            <View className="bg-white/20 backdrop-blur-lg rounded-full p-1">
              <Ionicons 
                name="storefront" 
                size={width * 0.25} 
                color="#2563eb" 
              />
            </View>
          </View>
        </View>
        
        <Text className="text-4xl font-black text-gray-900 mb-2 text-center">
          Shop
        </Text>
        <Text className="text-lg text-gray-600 text-center mb-4">
          Discover premium features
        </Text>
        
        <View className="bg-white/80 backdrop-blur-lg rounded-2xl px-6 py-3 border border-gray-200">
          <Text className="text-gray-900 font-semibold text-lg">
            Welcome, {user.name}! 🛍️
          </Text>
        </View>
      </View>


      <View className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 mx-3 mb-6 border border-gray-200">
        <View className="flex-row items-center mb-6">
          <View className="bg-yellow-500/20 p-3 rounded-2xl mr-4">
            <Ionicons name="star" size={24} color="#f59e0b" />
          </View>
          <Text className="text-2xl font-bold text-gray-900">Featured Items</Text>
        </View>
        
        <View className="grid gap-3">
          {shopItems.slice(0, 4).map((item) => (
            <TouchableOpacity 
              key={item.id}
              className="bg-gray-50 p-4 rounded-2xl border border-gray-100 items-center"
              activeOpacity={0.7}
            >
              <View className="bg-white p-3 rounded-xl mb-3">
                <Ionicons name={item.icon as any} size={24} color={item.color} />
              </View>
              <Text className="text-gray-900 font-semibold text-center text-sm mb-2">
                {item.name}
              </Text>
              <Text className="text-gray-600 font-bold">
                {item.price}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>


      <View className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 mx-3 mb-6 border border-gray-200">
        <Text className="text-2xl font-bold text-gray-900 mb-6">All Products</Text>
        
        <View className="space-y-6">
          {shopItems.map((item) => (
            <TouchableOpacity 
              key={item.id}
              className="flex-row mb-3 items-center p-4 bg-gray-50 rounded-2xl border border-gray-100"
              activeOpacity={0.7}
            >
              <View className="bg-white p-3 rounded-xl mr-4">
                <Ionicons name={item.icon as any} size={24} color={item.color} />
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-semibold text-lg">
                  {item.name}
                </Text>
                <Text className="text-gray-500">
                  Premium feature
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-gray-900 font-bold text-lg">
                  {item.price}
                </Text>
                <TouchableOpacity 
                  className="bg-blue-500 px-4 py-2 rounded-xl mt-2"
                  activeOpacity={0.8}
                >
                  <Text className="text-white font-semibold text-sm">
                    Buy
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Bottom Spacing */}
      <View className="h-8" />
    </ScrollView>
  );
}

export function AboutContent({ activeTab }: { activeTab: string }) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingContent />;
  }


  const appInfo = {
    name: 'User Authentication App',
    version: '1.0.0',
    description: 'A modern, secure authentication system built with React Native and Expo.',
    features: [
      'Secure user registration and login',
      'Modern flat UI design',
      'Local storage for session management',
      'Responsive design for all devices',
      'Beautiful gradient backgrounds',
      'Glass morphism effects',
      'Error handling with modal dialogs',
      'Smooth tab navigation',
    ],
  };

  const techStack = [
    { name: 'React Native', icon: 'logo-react', color: '#61dafb' },
    { name: 'Expo', icon: 'phone-portrait', color: '#000020' },
    { name: 'TypeScript', icon: 'code-slash', color: '#3178c6' },
    { name: 'NativeWind', icon: 'color-palette', color: '#06b6d4' },
    { name: 'AsyncStorage', icon: 'save-outline', color: '#4ade80' },
  ];

  const contactInfo = [
    {
      label: 'Documentation',
      value: 'docs.expo.dev',
      icon: 'book-outline',
      color: '#2563eb',
    },
    {
      label: 'Support',
      value: 'support@expo.dev',
      icon: 'mail-outline',
      color: '#059669',
    },
    {
      label: 'Website',
      value: 'expo.dev',
      icon: 'globe-outline',
      color: '#7c3aed',
    },
  ];

  return (
    <ScrollView 
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20, backgroundColor: '#ffffff' }}
    >
      {/* Header Section */}
      <View className="items-center mb-8 px-3">
        <View className="bg-white/80 backdrop-blur-lg rounded-full p-4 mb-6 border border-gray-200">
          <Ionicons 
            name="information-circle" 
            size={width * 0.15} 
            color="#2563eb" 
          />
        </View>
        
        <Text className="text-4xl font-black text-gray-900 mb-2 text-center">
          About App
        </Text>
        <Text className="text-lg text-gray-600 text-center mb-4 px-4">
          {appInfo.description}
        </Text>
        
        <View className="bg-white/80 backdrop-blur-lg rounded-2xl px-6 py-3 border border-gray-200">
          <Text className="text-gray-900 font-semibold text-lg text-center">
            Version {appInfo.version}
          </Text>
        </View>
      </View>


      <View className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 mx-3 mb-6 border border-gray-200">
        <View className="flex-row items-center mb-6">
          <View className="bg-blue-500/20 p-3 rounded-2xl mr-4">
            <Ionicons name="star" size={24} color="#2563eb" />
          </View>
          <Text className="text-2xl font-bold text-gray-900">Features</Text>
        </View>
        
        <View className="space-y-3">
          {appInfo.features.map((feature, index) => (
            <View key={index} className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              <Text className="text-gray-700 ml-3 flex-1">
                {feature}
              </Text>
            </View>
          ))}
        </View>
      </View>


      <View className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 mx-3 mb-6 border border-gray-200">
        <View className="flex-row items-center mb-6">
          <View className="bg-purple-500/20 p-3 rounded-2xl mr-4">
            <Ionicons name="code-slash" size={24} color="#7c3aed" />
          </View>
          <Text className="text-2xl font-bold text-gray-900">Tech Stack</Text>
        </View>
        
        <View className="grid grid-cols-2 gap-3">
          {techStack.map((tech, index) => (
            <View 
              key={index}
              className="bg-gray-50 p-4 rounded-2xl border border-gray-100 items-center"
            >
              <Ionicons name={tech.icon as any} size={24} color={tech.color} />
              <Text className="text-gray-900 font-semibold mt-2 text-center">
                {tech.name}
              </Text>
            </View>
          ))}
        </View>
      </View>


      <View className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 mx-3 mb-6 border border-gray-200">
        <View className="flex-row items-center mb-6">
          <View className="bg-green-500/20 p-3 rounded-2xl mr-4">
            <Ionicons name="call-outline" size={24} color="#059669" />
          </View>
          <Text className="text-2xl font-bold text-gray-900">Contact</Text>
        </View>
        
        <View className=" grid gap-3">
          {contactInfo.map((contact, index) => (
            <View 
              key={index}
              className="flex-row items-center p-4 bg-gray-50 rounded-2xl border border-gray-100"
            >
              <View className="bg-white p-2 rounded-xl mr-4">
                <Ionicons name={contact.icon as any} size={20} color={contact.color} />
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-sm font-medium">
                  {contact.label}
                </Text>
                <Text className="text-gray-900 font-semibold">
                  {contact.value}
                </Text>
              </View>
              <Ionicons name="open-outline" size={20} color="#9ca3af" />
            </View>
          ))}
        </View>
      </View>


      <View className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 mx-3 mb-6 border border-gray-200">
        <Text className="text-2xl font-bold text-gray-900 mb-6">Statistics</Text>
        <View className="grid grid-cols-3 gap-4">
          <View className="items-center">
            <View className="bg-blue-100 p-3 rounded-2xl mb-2">
              <Ionicons name="people-outline" size={24} color="#2563eb" />
            </View>
            <Text className="text-gray-900 font-bold text-lg">100%</Text>
            <Text className="text-gray-500 text-sm">Reliable</Text>
          </View>
          <View className="items-center">
            <View className="bg-green-100 p-3 rounded-2xl mb-2">
              <Ionicons name="shield-checkmark-outline" size={24} color="#059669" />
            </View>
            <Text className="text-gray-900 font-bold text-lg">100%</Text>
            <Text className="text-gray-500 text-sm">Secure</Text>
          </View>
          <View className="items-center">
            <View className="bg-purple-100 p-3 rounded-2xl mb-2">
              <Ionicons name="flash-outline" size={24} color="#7c3aed" />
            </View>
            <Text className="text-gray-900 font-bold text-lg">100%</Text>
            <Text className="text-gray-500 text-sm">Fast</Text>
          </View>
        </View>
      </View>


      <View className="items-center mb-8 px-3">
        <Text className="text-gray-500 text-center">
          © 2025 User Authentication App
        </Text>
        <Text className="text-gray-400 text-center text-sm mt-1">
          Built with ❤️ using React Native & Expo
        </Text>
      </View>

      {/* Bottom Spacing */}
      <View className="h-8" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
});