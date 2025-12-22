import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface BottomNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}


export default function BottomNav({ activeTab = 'home', onTabChange }: BottomNavProps) {
  const router = useRouter();


  const navItems = [
    {
      key: 'home',
      label: 'Home',
      icon: 'home-outline' as const,
      activeIcon: 'home' as const,
      route: '/home' as const,
    },
    {
      key: 'shop',
      label: 'Shop',
      icon: 'storefront-outline' as const,
      activeIcon: 'storefront' as const,
      route: '/shop' as const,
    },
    {
      key: 'about',
      label: 'About',
      icon: 'information-circle-outline' as const,
      activeIcon: 'information-circle' as const,
      route: '/about' as const,
    },
    {
      key: 'profile',
      label: 'Profile',
      icon: 'person-outline' as const,
      activeIcon: 'person' as const,
      route: '/profile' as const,
    },
  ];

  const handleNavigation = (route: '/home' | '/shop' | '/about' | '/profile') => {

    if (onTabChange) {
      const tabKey = route.replace('/', '') as string;
      onTabChange(tabKey);
    }

    router.navigate(route);
  };

  return (
    <View style={styles.container}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={styles.navItem}
          onPress={() => handleNavigation(item.route)}
        >
          <Ionicons
            name={activeTab === item.key ? item.activeIcon : item.icon}
            size={24}
            color={activeTab === item.key ? '#2563eb' : '#6b7280'}
          />
          <Text
            style={[
              styles.navLabel,
              { color: activeTab === item.key ? '#2563eb' : '#6b7280' }
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    minWidth: 60,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});