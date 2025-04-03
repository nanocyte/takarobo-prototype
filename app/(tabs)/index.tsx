import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter, Href } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { contacts } from '../../src/data/mockData'; // Adjust path if needed
import Avatar from '../../src/components/Avatar'; // Import the Avatar component
import { Colors } from '../../constants/Colors'; // Import Colors
import { useColorScheme } from '@/hooks/useColorScheme'; // Import hook

const ContactsScreen = () => {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light'; // Get current color scheme
  const colors = Colors[colorScheme]; // Get color palette
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter contacts based on search query when search is active
  const filteredContacts = searchVisible 
    ? contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : contacts;

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
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity 
              style={{ marginLeft: 15 }}
              onPress={() => setSearchVisible(!searchVisible)}>
              <Ionicons name="search" size={24} color={colors.headerTint} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity 
              style={{ marginRight: 15 }}
              onPress={() => router.push('/contacts')}>
              <Ionicons name="create" size={24} color={colors.headerTint} />
            </TouchableOpacity>
          ),
        }}
      />
      
      {/* Search bar - only visible when search is active */}
      {searchVisible && (
        <View style={[styles.searchBar, { backgroundColor: colors.inputBackground, borderBottomColor: colors.divider }]}>
          <Ionicons name="search" size={20} color={colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search conversations..."
            placeholderTextColor={colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery !== '' ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.secondaryText} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setSearchVisible(false)}>
              <Text style={[styles.cancelSearch, { color: colors.tint }]}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      
      <FlatList
        data={filteredContacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={
          searchVisible && filteredContacts.length === 0 ? (
            <View style={styles.emptySearch}>
              <Text style={[styles.emptySearchText, { color: colors.secondaryText }]}>
                No results found for "{searchQuery}"
              </Text>
            </View>
          ) : null
        }
      />

      {/* Floating action button for new chat */}
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: colors.tint }]}
        onPress={() => router.push('/contacts')}
      >
        <Ionicons name="chatbubble" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    height: 40,
  },
  cancelSearch: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  listContentContainer: {
    paddingBottom: 80, // Add space for FAB
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
    marginLeft: 15,
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
  emptySearch: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptySearchText: {
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 30,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1,
  },
});

export default ContactsScreen; 