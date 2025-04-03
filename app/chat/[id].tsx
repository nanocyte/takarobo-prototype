import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { messages as mockMessages } from '../../src/data/mockData'; // Adjust path
import { Ionicons } from '@expo/vector-icons'; // Assuming usage of Expo's vector icons

// Define colors based on spec
const PRIMARY_COLOR = '#007AFF';
const BACKGROUND_COLOR = '#F5F5F5';
const TEXT_COLOR = '#333333';
const SECONDARY_TEXT_COLOR = '#666666';
const USER_BUBBLE_COLOR = '#007AFF';
const OTHER_BUBBLE_COLOR = '#E5E5EA';
const INPUT_BACKGROUND = '#FFFFFF';
const INPUT_BORDER_COLOR = '#E0E0E0';

interface Message {
    id: string;
    text: string;
    timestamp: string;
    sender: 'user' | 'other';
}

const ChatScreen = () => {
  const router = useRouter();
  const { id: contactId, name: contactName } = useLocalSearchParams<{ id: string, name: string }>();

  // Fetch messages for the current contactId - ensure fallback for safety
  const messages = mockMessages[contactId] || [];

  const renderMessageItem = ({ item }: { item: Message }) => (
    <View style={[styles.messageRow, item.sender === 'user' ? styles.userMessageRow : styles.otherMessageRow]}>
      <View style={[styles.messageBubble, item.sender === 'user' ? styles.userMessageBubble : styles.otherMessageBubble]}>
        <Text style={item.sender === 'user' ? styles.userMessageText : styles.otherMessageText}>
          {item.text}
        </Text>
      </View>
      <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: contactName || 'Chat', // Use contact name from params
          headerStyle: { backgroundColor: PRIMARY_COLOR },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerTitleAlign: 'center',
          headerLeft: () => (
            // Use TouchableOpacity for custom back button behavior if needed
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 15 }}>
               <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <KeyboardAvoidingView 
        style={styles.chatContainer} 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // Adjust offset as needed
      >
        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id}
          style={styles.messageList}
          contentContainerStyle={{ paddingVertical: 10 }}
          // automaticallyScrollsToBottom
          // inverted // Often used for chats, but check spec/preference
        />
        <View style={styles.inputArea}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..." 
            placeholderTextColor={SECONDARY_TEXT_COLOR}
            editable={false} // Per spec, input is disabled for now
          />
          <TouchableOpacity style={styles.sendButton} disabled={true}>
             <Ionicons name="arrow-up" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR, // Match header for SafeAreaView background
  },
  chatContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  messageList: {
    flex: 1,
  },
  messageRow: {
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: 'flex-start', // Default alignment
  },
  userMessageRow: {
    alignItems: 'flex-end',
  },
  otherMessageRow: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 15,
    marginBottom: 5, // Space for timestamp
  },
  userMessageBubble: {
    backgroundColor: USER_BUBBLE_COLOR,
    borderBottomRightRadius: 0, // Sharp corner as per spec
  },
  otherMessageBubble: {
    backgroundColor: OTHER_BUBBLE_COLOR,
    borderBottomLeftRadius: 0, // Sharp corner as per spec
  },
  userMessageText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  otherMessageText: {
    color: TEXT_COLOR,
    fontSize: 16,
  },
  messageTimestamp: {
    fontSize: 12,
    color: SECONDARY_TEXT_COLOR,
    alignSelf: 'center', // Center timestamp below bubble
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: INPUT_BACKGROUND,
    borderTopWidth: 1,
    borderTopColor: INPUT_BORDER_COLOR,
    minHeight: 50,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: INPUT_BORDER_COLOR,
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 14,
    color: TEXT_COLOR,
    backgroundColor: '#FFFFFF', // Ensure input background is white
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen; 