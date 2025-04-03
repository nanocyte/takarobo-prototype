import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { contacts as initialContacts } from '../../src/data/mockData';
import Avatar from '../../src/components/Avatar';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Define interface for contact items
interface ContactItem {
  id: string;
  name: string;
  avatar: string | null;
  lastMessage: string;
  timestamp: string;
}

const ContactsScreen = () => {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const [contacts, setContacts] = useState(initialContacts);
  const [modalVisible, setModalVisible] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter contacts based on search query
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const addNewContact = () => {
    if (newContactName.trim() === '') return;
    
    const newContact = {
      id: `${Date.now()}`, // Generate a unique ID
      name: newContactName.trim(),
      avatar: null,
      lastMessage: "No messages yet",
      timestamp: "New"
    };
    
    setContacts([...contacts, newContact]);
    setNewContactName('');
    setModalVisible(false);
  };
  
  const renderItem = ({ item }: { item: ContactItem }) => (
    <TouchableOpacity 
      style={[styles.contactItem, { backgroundColor: colors.inputBackground, borderBottomColor: colors.divider }]}
      onPress={() => router.push({
        pathname: '/chat/[id]',
        params: { id: item.id, name: item.name }
      })}
    >
      <Avatar name={item.name} size={50} />
      <View style={styles.contactInfo}>
        <Text style={[styles.contactName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.lastMessage, { color: colors.secondaryText }]}>
          {item.lastMessage}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.contactAction}
        onPress={() => {/* Add action for contact options */}}
      >
        <Ionicons name="ellipsis-vertical" size={20} color={colors.secondaryText} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'right', 'left']}>
      <Stack.Screen 
        options={{
          title: 'Contacts',
          headerStyle: { backgroundColor: colors.headerBackground },
          headerTintColor: colors.headerTint,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            color: colors.headerTint,
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => setModalVisible(true)}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="add" size={24} color={colors.headerTint} />
            </TouchableOpacity>
          )
        }}
      />
      
      {/* Search bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.inputBackground, borderBottomColor: colors.divider }]}>
        <Ionicons name="search" size={20} color={colors.secondaryText} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search contacts..."
          placeholderTextColor={colors.secondaryText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={colors.secondaryText} />
          </TouchableOpacity>
        )}
      </View>
      
      <FlatList
        data={filteredContacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <Text style={[styles.emptyListText, { color: colors.secondaryText }]}>
              {searchQuery ? "No contacts found" : "You don't have any contacts yet"}
            </Text>
          </View>
        }
      />
      
      {/* Add Contact Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: colors.inputBackground }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Add New Contact</Text>
            
            <TextInput
              style={[styles.modalInput, { color: colors.text, borderColor: colors.divider }]}
              placeholder="Contact Name"
              placeholderTextColor={colors.secondaryText}
              value={newContactName}
              onChangeText={setNewContactName}
              autoFocus
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel, { borderColor: colors.divider }]}
                onPress={() => {
                  setModalVisible(false);
                  setNewContactName('');
                }}
              >
                <Text style={[styles.buttonText, { color: colors.secondaryText }]}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.buttonAdd, { backgroundColor: colors.tint }]}
                onPress={addNewContact}
              >
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  listContentContainer: {
    paddingBottom: 20,
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
  contactAction: {
    padding: 5,
  },
  emptyList: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: '48%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonCancel: {
    borderWidth: 1,
  },
  buttonAdd: {
    // backgroundColor will be set dynamically
  },
  buttonText: {
    fontWeight: '500',
    color: 'white',
  },
});

export default ContactsScreen; 