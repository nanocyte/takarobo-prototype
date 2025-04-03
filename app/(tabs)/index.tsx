import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter, Href } from 'expo-router';
import { contacts } from '../../src/data/mockData'; // Adjust path if needed
import Avatar from '../../src/components/Avatar'; // Import the Avatar component
import { Colors } from '../../constants/Colors'; // Import Colors
import { useColorScheme } from '@/hooks/useColorScheme'; // Import hook

const ContactsScreen = () => {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light'; // Get current color scheme
  const colors = Colors[colorScheme]; // Get color palette

  // Define an interface for the contact item data
  interface ContactItem {
    id: string;
    name: string;
    lastMessage: string;
    timestamp: string;
    // Add other properties if they exist in your data
  }

  const renderItem = ({ item }: { item: ContactItem }) => (
    <TouchableOpacity 
      style={[styles.contactItem, { backgroundColor: colors.inputBackground, borderBottomColor: colors.divider }]}
      onPress={() => router.push({ 
        pathname: '/chat/[id]',
        params: { id: item.id, name: item.name } 
      })}
      accessibilityLabel={`Chat with ${item.name}`}
    >
      <Avatar name={item.name} size={50} />
      <View style={styles.contactInfo}>
        <Text style={[styles.contactName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.lastMessage, { color: colors.secondaryText }]} numberOfLines={1}>{item.lastMessage}</Text>
      </View>
      <Text style={[styles.timestamp, { color: colors.secondaryText }]}>{item.timestamp}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'right', 'left']}>
      <Stack.Screen 
        options={{
          title: 'Chats',
          headerStyle: { backgroundColor: colors.headerBackground },
          headerTintColor: colors.headerTint,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            color: colors.headerTint,
          },
          headerTitleAlign: 'center' // Center title
        }}
      />
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContentContainer: {
    paddingBottom: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  contactInfo: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 0,
  },
  contactName: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 2,
  },
  lastMessage: {
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
    marginLeft: 10,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
});

export default ContactsScreen; 