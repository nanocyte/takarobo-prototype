/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#007AFF';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#333333',
    secondaryText: '#666666',
    background: '#F5F5F5',
    inputBackground: '#FFFFFF',
    inputBorder: '#E0E0E0',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    userBubble: '#007AFF',
    otherBubble: '#E5E5EA',
    headerBackground: '#007AFF',
    headerTint: '#FFFFFF',
    divider: '#E0E0E0',
  },
  dark: {
    text: '#ECEDEE',
    secondaryText: '#999999',
    background: '#151718',
    inputBackground: '#25282a',
    inputBorder: '#3a3d40',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    userBubble: '#007AFF',
    otherBubble: '#3a3d40',
    headerBackground: '#151718',
    headerTint: '#FFFFFF',
    divider: '#3a3d40',
  },
};
