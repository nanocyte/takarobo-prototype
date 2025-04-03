// Define types for better type safety
interface Contact {
  id: string;
  name: string;
  avatar: string | null;
  lastMessage: string;
  timestamp: string;
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: 'user' | 'other';
}

interface MessageMap {
  [key: string]: Message[]; // Index signature allowing string keys
}

export const contacts: Contact[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: null, // Placeholder for avatar URL or component
    lastMessage: "Hey, how's it going?",
    timestamp: '10:32 AM',
  },
  {
    id: '2',
    name: 'Sam Carter',
    avatar: null,
    lastMessage: 'See you tomorrow!',
    timestamp: 'Yesterday',
  },
  {
    id: '3',
    name: 'Taylor Lee',
    avatar: null,
    lastMessage: 'Can we reschedule?',
    timestamp: 'Mar 31',
  },
];

export const messages: MessageMap = {
  '1': [ // Messages for contact with id '1' (Alex Johnson)
    { id: 'm1', text: "Hey, how's it going?", timestamp: '10:30 AM', sender: 'other' },
    { id: 'm2', text: 'Pretty good, you?', timestamp: '10:31 AM', sender: 'user' },
    { id: 'm3', text: 'Same here. Busy day?', timestamp: '10:31 AM', sender: 'other' },
    { id: 'm4', text: 'Yeah, tons of work. You?', timestamp: '10:32 AM', sender: 'user' },
    { id: 'm5', text: 'Not too bad, just chilling.', timestamp: '10:32 AM', sender: 'other' },
  ],
  '2': [ // Mock messages for Sam Carter
    { id: 'm6', text: 'See you tomorrow!', timestamp: 'Yesterday', sender: 'other' },
  ],
  '3': [ // Mock messages for Taylor Lee
    { id: 'm7', text: 'Can we reschedule?', timestamp: 'Mar 31', sender: 'other' },
  ],
};

// Add more mock data as needed for other contacts 