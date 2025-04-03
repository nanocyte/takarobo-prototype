import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { messages as mockMessages } from '../../src/data/mockData'; // Adjust path
import { Ionicons } from '@expo/vector-icons'; // Assuming usage of Expo's vector icons
import { Colors } from '../../constants/Colors'; // Import Colors
import { useColorScheme } from '@/hooks/useColorScheme'; // Import hook

// Remove hardcoded color constants
// const PRIMARY_COLOR = '#007AFF';
// ... remove others ...

interface Message {
    id: string;
    text: string;
    timestamp: string;
    sender: 'user' | 'other';
}

const ChatScreen = () => {
  const router = useRouter();
  const { id: contactId, name: contactName } = useLocalSearchParams<{ id: string, name: string }>();
  const colorScheme = useColorScheme() ?? 'light'; // Get current color scheme
  const colors = Colors[colorScheme]; // Get color palette for the scheme

  // State for messages and input text
  const [currentMessages, setCurrentMessages] = useState<Message[]>(mockMessages[contactId] || []);
  const [inputText, setInputText] = useState('');

  const handleSend = useCallback(() => {
    if (inputText.trim().length === 0) {
      return; // Don't send empty messages
    }

    const newMessage: Message = {
      id: `m${Date.now()}`,
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'user',
    };

    const dummyResponse: Message = {
      id: `m${Date.now() + 1}`, // Ensure unique ID
      text: `You said: "${inputText}"? Cool.`, // Simple dummy response
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'other',
    };

    // Update state with new message and dummy response
    setCurrentMessages(prevMessages => [
      ...prevMessages, 
      newMessage, 
      // dummyResponse // Add response immediately
    ]);
    setInputText(''); // Clear input

    // Simulate delay for response
    setTimeout(() => {
        setCurrentMessages(prevMessages => [
            ...prevMessages,
            dummyResponse
        ]);
    }, 1000); // 1 second delay

  }, [inputText]);

  const renderMessageItem = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.messageRow, isUser ? styles.userMessageRow : styles.otherMessageRow]}>
        <View 
          style={[
            styles.messageBubble,
            isUser ? styles.userMessageBubble : styles.otherMessageBubble,
            // Apply background colors from theme
            { backgroundColor: isUser ? colors.userBubble : colors.otherBubble }
          ]}
        >
          <Text style={isUser ? styles.userMessageText : { ...styles.otherMessageText, color: colors.text }}>
            {item.text}
          </Text>
        </View>
        <Text style={[styles.messageTimestamp, { color: colors.secondaryText }]}>{item.timestamp}</Text>
      </View>
    );
  };

  return (
    // Use theme colors for SafeAreaView and header
    <SafeAreaView style={[styles.container, { backgroundColor: colors.headerBackground }]} edges={['top', 'right', 'left']}>
      <Stack.Screen
        options={{
          title: contactName || 'Chat',
          headerStyle: { backgroundColor: colors.headerBackground },
          headerTintColor: colors.headerTint,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            color: colors.headerTint, // Ensure title color uses theme
          },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 15 }}>
               <Ionicons name="arrow-back" size={24} color={colors.headerTint} />
            </TouchableOpacity>
          ),
        }}
      />
      {/* Use theme background for KeyboardAvoidingView */}
      <KeyboardAvoidingView 
        style={[styles.chatContainer, { backgroundColor: colors.background }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // Adjusted offset potentially needed due to tabs
      >
        <FlatList
          data={currentMessages} // Use state for messages
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id}
          style={styles.messageList}
          contentContainerStyle={{ paddingVertical: 10, paddingBottom: 10 }} // Add bottom padding
          inverted={false} // Keep messages starting from top for now
          ref={(ref) => { /* Store ref if needed for scrollToEnd */ }}
        />
        {/* Use theme colors for Input Area */}
        <View style={[styles.inputArea, { backgroundColor: colors.inputBackground, borderTopColor: colors.divider }]}>
          <TextInput
            style={[styles.textInput, {
              backgroundColor: colors.inputBackground, 
              borderColor: colors.inputBorder,
              color: colors.text
            }]}
            placeholder="Type a message..." 
            placeholderTextColor={colors.secondaryText}
            value={inputText} 
            onChangeText={setInputText} 
          />
          <TouchableOpacity 
            style={[styles.sendButton, { backgroundColor: colors.tint }]} 
            onPress={handleSend} // Attach send handler
            // disabled={inputText.trim().length === 0} // Optionally disable button if input is empty
          >
             <Ionicons name="arrow-up" size={20} color={colors.headerTint} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Update StyleSheet to remove hardcoded colors and potentially adjust styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: PRIMARY_COLOR, // Removed, applied dynamically
  },
  chatContainer: {
    flex: 1,
    // backgroundColor: BACKGROUND_COLOR, // Removed, applied dynamically
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 10, // Add horizontal padding to list container
  },
  messageRow: {
    marginVertical: 8, // Increase vertical spacing
    // marginHorizontal: 10, // Removed, applied to messageList
    alignItems: 'flex-start',
  },
  userMessageRow: {
    alignItems: 'flex-end',
  },
  otherMessageRow: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '75%', // Slightly increase max width
    paddingVertical: 8, // Adjust padding
    paddingHorizontal: 12,
    borderRadius: 18, // Slightly more rounded
    marginBottom: 4, // Adjust space for timestamp
  },
  userMessageBubble: {
    // backgroundColor: USER_BUBBLE_COLOR, // Removed
    borderBottomRightRadius: 4, // Slightly less sharp corner
  },
  otherMessageBubble: {
    // backgroundColor: OTHER_BUBBLE_COLOR, // Removed
    borderBottomLeftRadius: 4, // Slightly less sharp corner
  },
  userMessageText: {
    color: '#FFFFFF', // Keep user text white for contrast on blue
    fontSize: 16,
  },
  otherMessageText: {
    // color: TEXT_COLOR, // Removed, applied dynamically via theme
    fontSize: 16,
  },
  messageTimestamp: {
    fontSize: 11, // Smaller timestamp
    // color: SECONDARY_TEXT_COLOR, // Removed, applied dynamically
    alignSelf: 'auto', // Reset alignment, will be controlled by row alignment
    marginHorizontal: 15, // Add horizontal margin to timestamp
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8, // Adjust padding
    // backgroundColor: INPUT_BACKGROUND, // Removed
    borderTopWidth: StyleSheet.hairlineWidth, // Use hairline width
    // borderTopColor: INPUT_BORDER_COLOR, // Removed
    minHeight: 50,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    // borderColor: INPUT_BORDER_COLOR, // Removed
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 15, // Slightly larger input font
    // color: TEXT_COLOR, // Removed
    // backgroundColor: '#FFFFFF', // Removed
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // backgroundColor: PRIMARY_COLOR, // Removed
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen; 