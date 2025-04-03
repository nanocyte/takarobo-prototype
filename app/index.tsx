import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { contacts } from '../src/data/mockData'; // Adjust path if needed
// import { Colors } from '@/constants/Colors'; // Import your colors if defined elsewhere

const PRIMARY_COLOR = '#007AFF';
const BACKGROUND_COLOR = '#F5F5F5';
const TEXT_COLOR = '#333333';
const SECONDARY_TEXT_COLOR = '#666666';
const DIVIDER_COLOR = '#E0E0E0';

const ContactsScreen = () => {
  const router = useRouter();

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
      style={styles.contactItem}
      onPress={() => router.push({ pathname: `/chat/${item.id}`, params: { name: item.name } })}
      accessibilityLabel={`Chat with ${item.name}`}
    >
      <View style={styles.avatarPlaceholder} />
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Chats',
          headerStyle: { backgroundColor: PRIMARY_COLOR },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerTitleAlign: 'center' // Center title
        }}
      />
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 70,
    backgroundColor: '#FFFFFF', 
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: DIVIDER_COLOR, // Placeholder color
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TEXT_COLOR,
  },
  lastMessage: {
    fontSize: 14,
    color: SECONDARY_TEXT_COLOR,
  },
  timestamp: {
    fontSize: 12,
    color: SECONDARY_TEXT_COLOR,
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: DIVIDER_COLOR,
    marginLeft: 80, // Indent separator to align with text
  },
});

export default ContactsScreen; 