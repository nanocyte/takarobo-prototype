import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: colors.inputBackground, // Or specific tab bar background color
          borderTopColor: colors.divider,
        },
        headerShown: false, // We use the Stack.Screen header defined in each tab screen
      }}>
      <Tabs.Screen
        name="index" // This matches app/(tabs)/index.tsx
        options={{
          title: 'Chats',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'chatbubbles' : 'chatbubbles-outline'} size={24} color={color} />
          ),
        }}
      />
      {/* Add other tabs here if needed, e.g., Settings */}
      {/* <Tabs.Screen
        name="settings" // Example: matches app/(tabs)/settings.tsx
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'settings' : 'settings-outline'} size={24} color={color} />
          ),
        }}
      /> */}
    </Tabs>
  );
} 