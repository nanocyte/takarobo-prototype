# React Native Chat App UI Specification

## Overview
This specification outlines a mobile chat application UI built with React Native and Expo. The app will feature two main screens: a Contacts screen showing available chat contacts, and a Chat screen displaying a conversation with mock messages. The design will be clean, modern, and intuitive.

---

## General UI Requirements
- **Platform**: iOS and Android (cross-platform via React Native)
- **Framework**: Expo (managed workflow)
- **Navigation**: React Navigation (stack navigation between screens)
- **Styling**: Use `StyleSheet` for consistent styling; adopt a minimalistic design with a light theme
- **Font**: Use a system font (e.g., San Francisco for iOS, Roboto for Android) for simplicity
- **Colors**:
  - Primary: `#007AFF` (blue)
  - Background: `#F5F5F5` (light gray)
  - Text: `#333333` (dark gray)
  - Secondary Text: `#666666` (medium gray)
  - Message Bubble (User): `#007AFF`
  - Message Bubble (Other): `#E5E5EA`
- **Screen Dimensions**: Responsive design using percentage-based or flex layouts
- **Safe Area**: Respect safe area insets for notched devices

---

## Screens

### 1. Contacts Screen
**Purpose**: Displays a list of contacts the user can chat with.

#### Layout
- **Header**:
  - Background: `#007AFF`
  - Height: 60px
  - Title: "Chats" (white, bold, 18pt, centered)
  - Left: Back arrow icon (hidden for now, as this is the root screen)
- **Body**:
  - Background: `#F5F5F5`
  - Scrollable list of contact items
- **Contact Item**:
  - Height: 70px
  - Layout: Horizontal flex row
  - Left: Circular avatar (50x50px, 10px margin from left)
  - Middle: 
    - Name (16pt, `#333333`, bold)
    - Last Message Preview (14pt, `#666666`, truncated to 1 line)
  - Right: Timestamp (12pt, `#666666`, 10px margin from right)
  - Bottom: Thin divider line (`#E0E0E0`, 1px)
- **Mock Data**:
  - Contact 1: 
    - Name: "Alex Johnson"
    - Avatar: Placeholder (gray circle)
    - Last Message: "Hey, how's it going?"
    - Timestamp: "10:32 AM"
  - Contact 2:
    - Name: "Sam Carter"
    - Avatar: Placeholder
    - Last Message: "See you tomorrow!"
    - Timestamp: "Yesterday"
  - Contact 3:
    - Name: "Taylor Lee"
    - Avatar: Placeholder
    - Last Message: "Can we reschedule?"
    - Timestamp: "Mar 31"

#### Interactions
- **Tap on Contact**: Navigates to Chat Screen for that contact
- **Swipe to Refresh**: (Optional for now, can be added later)

---

### 2. Chat Screen
**Purpose**: Displays a conversation with a selected contact using mock messages.

#### Layout
- **Header**:
  - Background: `#007AFF`
  - Height: 60px
  - Left: Back arrow icon (white, 24x24px, 15px margin from left)
  - Middle: Contact Name (white, bold, 18pt, centered)
  - Right: Placeholder for future options (e.g., info icon, hidden for now)
- **Body**:
  - Background: `#F5F5F5`
  - Scrollable list of message bubbles
  - Messages scroll to bottom by default (newest at bottom)
- **Message Bubble**:
  - **User (Sent)**:
    - Background: `#007AFF`
    - Text: White, 16pt
    - Alignment: Right side of screen
    - Max Width: 70% of screen width
    - Padding: 10px
    - Border Radius: 15px (top-left, top-right, bottom-left rounded; bottom-right sharp)
    - Margin: 5px vertical, 10px from right edge
  - **Other (Received)**:
    - Background: `#E5E5EA`
    - Text: `#333333`, 16pt
    - Alignment: Left side of screen
    - Max Width: 70% of screen width
    - Padding: 10px
    - Border Radius: 15px (top-left, top-right, bottom-right rounded; bottom-left sharp)
    - Margin: 5px vertical, 10px from left edge
  - **Timestamp**: Below each message (12pt, `#666666`, centered under bubble, 5px margin)
- **Input Area**:
  - Fixed at bottom
  - Background: `#FFFFFF`
  - Height: 50px
  - Layout: Horizontal flex row
  - Left: Text input (flex: 1, 14pt, 10px padding, `#333333`, border: 1px `#E0E0E0`, border-radius: 20px)
  - Right: Send button (blue circle, 40x40px, white arrow icon, 10px margin from right)
  - Top Border: 1px `#E0E0E0`

#### Mock Messages
For Contact: "Alex Johnson"
- Other: "Hey, how's it going?" (10:30 AM)
- User: "Pretty good, you?" (10:31 AM)
- Other: "Same here. Busy day?" (10:31 AM)
- User: "Yeah, tons of work. You?" (10:32 AM)
- Other: "Not too bad, just chilling." (10:32 AM)

#### Interactions
- **Back Arrow**: Returns to Contacts Screen
- **Text Input**: Placeholder "Type a message..." (disabled for now, just UI)
- **Send Button**: Disabled (visual only for mock UI)
- **Scroll**: Smooth scrolling with momentum

---

## Navigation Flow
- **Root**: Contacts Screen
- **Tap Contact**: Push Chat Screen onto stack with selected contact’s data
- **Back**: Pop Chat Screen off stack, return to Contacts

---

## Additional Notes
- **Performance**: Use `FlatList` for both Contacts and Chat message lists to optimize rendering.
- **Accessibility**: 
  - Add `accessibilityLabel` to interactive elements (e.g., "Back", "Chat with [Name]").
  - Ensure sufficient color contrast (e.g., white text on blue header).
- **Mock Data**: Hardcode data in a separate file (e.g., `mockData.js`) for easy replacement with API later.
- **Future Expansion**: 
  - Input area can be wired to an LLM API.
  - Contacts can be fetched dynamically.
  - Add status indicators (e.g., online/offline).
