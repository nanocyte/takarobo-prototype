import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { messages as mockMessages } from '../../src/data/mockData'; // Adjust path
import { Ionicons } from '@expo/vector-icons'; // Assuming usage of Expo's vector icons
import { Colors } from '../../constants/Colors'; // Import Colors
import { useColorScheme } from '@/hooks/useColorScheme'; // Import hook
import Avatar from '../../src/components/Avatar';

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

  // Add new state for menu
  const [menuVisible, setMenuVisible] = useState(false);

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
            color: colors.headerTint,
          },
          headerTitleAlign: 'center',
          // Custom header left with back button
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 15 }}>
              <Ionicons name="arrow-back" size={24} color={colors.headerTint} />
            </TouchableOpacity>
          ),
          // Custom header right with call and menu buttons
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity style={styles.headerButton} onPress={() => {/* Audio call action */}}>
                <Ionicons name="call" size={22} color={colors.headerTint} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton} onPress={() => {/* Video call action */}}>
                <Ionicons name="videocam" size={22} color={colors.headerTint} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton} onPress={() => setMenuVisible(true)}>
                <Ionicons name="ellipsis-vertical" size={22} color={colors.headerTint} />
              </TouchableOpacity>
            </View>
          ),
          // Custom header title showing contact with avatar
          headerTitle: () => (
            <TouchableOpacity style={styles.headerTitleContainer} onPress={() => {/* View contact profile */}}>
              <Avatar name={contactName || ""} size={32} />
              <View style={styles.headerNameContainer}>
                <Text style={[styles.headerName, { color: colors.headerTint }]} numberOfLines={1}>
                  {contactName || 'Chat'}
                </Text>
                <Text style={[styles.headerStatus, { color: colors.headerTint + '80' }]}>
                  Online
                </Text>
              </View>
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
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="add-circle" size={24} color={colors.tint} />
          </TouchableOpacity>
          
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
            multiline
          />
          
          {inputText.trim().length > 0 ? (
            <TouchableOpacity style={[styles.sendButton, { backgroundColor: colors.tint }]} onPress={handleSend}>
              <Ionicons name="arrow-up" size={20} color={colors.headerTint} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.micButton}>
              <Ionicons name="mic" size={24} color={colors.tint} />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
      
      {/* Chat options menu modal */}
      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setMenuVisible(false)}
        >
          <View style={[styles.menuContainer, { backgroundColor: colors.inputBackground }]}>
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => {
                setMenuVisible(false);
                /* View contact info action */
              }}
            >
              <Ionicons name="person" size={20} color={colors.text} />
              <Text style={[styles.menuText, { color: colors.text }]}>View Contact</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => {
                setMenuVisible(false);
                /* Search conversation */
              }}
            >
              <Ionicons name="search" size={20} color={colors.text} />
              <Text style={[styles.menuText, { color: colors.text }]}>Search</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => {
                setMenuVisible(false);
                /* Share contact action */
              }}
            >
              <Ionicons name="share-social" size={20} color={colors.text} />
              <Text style={[styles.menuText, { color: colors.text }]}>Share Contact</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => {
                setMenuVisible(false);
                /* Block/report action */
              }}
            >
              <Ionicons name="alert-circle" size={20} color="#FF3B30" />
              <Text style={[styles.menuText, { color: "#FF3B30" }]}>Block Contact</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
    maxHeight: 100,
    borderWidth: 1,
    // borderColor: INPUT_BORDER_COLOR, // Removed
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
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
  // Add new header styles
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
  },
  headerButton: {
    marginLeft: 15,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerNameContainer: {
    marginLeft: 10,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerStatus: {
    fontSize: 12,
  },
  // Enhanced input area styles
  attachButton: {
    padding: 5,
    marginRight: 5,
  },
  micButton: {
    padding: 5,
    marginLeft: 5,
  },
  // Menu modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  menuContainer: {
    marginTop: 50,
    marginRight: 15,
    borderRadius: 10,
    width: 170,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 15,
  },
});

export default ChatScreen; 