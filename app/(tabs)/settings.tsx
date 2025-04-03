import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface SettingItemProps {
  icon: string;
  title: string;
  description?: string;
  isSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  onPress?: () => void;
  colors: any;
}

const SettingItem = ({ icon, title, description, isSwitch, switchValue, onSwitchChange, onPress, colors }: SettingItemProps) => (
  <TouchableOpacity 
    style={[styles.settingItem, { borderBottomColor: colors.divider }]}
    onPress={onPress}
    disabled={isSwitch}
  >
    <View style={styles.settingIconContainer}>
      <Ionicons name={icon as any} size={22} color={colors.tint} />
    </View>
    <View style={styles.settingContent}>
      <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
      {description && (
        <Text style={[styles.settingDescription, { color: colors.secondaryText }]}>{description}</Text>
      )}
    </View>
    {isSwitch ? (
      <Switch
        value={switchValue}
        onValueChange={onSwitchChange}
        trackColor={{ false: '#767577', true: colors.tint }}
      />
    ) : (
      <Ionicons name="chevron-forward" size={18} color={colors.secondaryText} />
    )}
  </TouchableOpacity>
);

const SettingsScreen = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  // State for toggle settings
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');
  const [readReceipts, setReadReceipts] = useState(true);
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'right', 'left']}>
      <Stack.Screen 
        options={{
          title: 'Settings',
          headerStyle: { backgroundColor: colors.headerBackground },
          headerTintColor: colors.headerTint,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            color: colors.headerTint,
          },
          headerTitleAlign: 'center',
        }}
      />
      
      <ScrollView style={styles.scrollView}>
        {/* Account Section */}
        <View style={[styles.section, { backgroundColor: colors.inputBackground }]}>
          <Text style={[styles.sectionHeader, { color: colors.secondaryText }]}>ACCOUNT</Text>
          
          <SettingItem
            icon="person"
            title="Profile"
            description="Edit your profile information"
            colors={colors}
            onPress={() => {/* Navigate to profile screen */}}
          />
          
          <SettingItem
            icon="lock-closed"
            title="Privacy"
            description="Manage privacy settings"
            colors={colors}
            onPress={() => {/* Navigate to privacy screen */}}
          />
          
          <SettingItem
            icon="key"
            title="Security"
            description="Password and authentication"
            colors={colors}
            onPress={() => {/* Navigate to security screen */}}
          />
        </View>
        
        {/* Preferences Section */}
        <View style={[styles.section, { backgroundColor: colors.inputBackground }]}>
          <Text style={[styles.sectionHeader, { color: colors.secondaryText }]}>PREFERENCES</Text>
          
          <SettingItem
            icon="notifications"
            title="Notifications"
            description={notifications ? "On" : "Off"}
            isSwitch
            switchValue={notifications}
            onSwitchChange={setNotifications}
            colors={colors}
          />
          
          <SettingItem
            icon="moon"
            title="Dark Mode"
            description={darkMode ? "On" : "Off"}
            isSwitch
            switchValue={darkMode}
            onSwitchChange={setDarkMode}
            colors={colors}
          />
          
          <SettingItem
            icon="eye"
            title="Read Receipts"
            description={readReceipts ? "On" : "Off"}
            isSwitch
            switchValue={readReceipts}
            onSwitchChange={setReadReceipts}
            colors={colors}
          />
        </View>
        
        {/* Data & Storage Section */}
        <View style={[styles.section, { backgroundColor: colors.inputBackground }]}>
          <Text style={[styles.sectionHeader, { color: colors.secondaryText }]}>DATA & STORAGE</Text>
          
          <SettingItem
            icon="cloud-download"
            title="Storage Usage"
            description="Manage data and storage"
            colors={colors}
            onPress={() => {/* Navigate to storage screen */}}
          />
          
          <SettingItem
            icon="refresh"
            title="Clear Cache"
            description="Free up space by clearing cached data"
            colors={colors}
            onPress={() => {/* Show clear cache confirmation */}}
          />
        </View>
        
        {/* About Section */}
        <View style={[styles.section, { backgroundColor: colors.inputBackground }]}>
          <Text style={[styles.sectionHeader, { color: colors.secondaryText }]}>ABOUT</Text>
          
          <SettingItem
            icon="information-circle"
            title="Help & Support"
            colors={colors}
            onPress={() => {/* Navigate to help screen */}}
          />
          
          <SettingItem
            icon="document-text"
            title="Terms of Service"
            colors={colors}
            onPress={() => {/* Show terms of service */}}
          />
          
          <SettingItem
            icon="shield"
            title="Privacy Policy"
            colors={colors}
            onPress={() => {/* Show privacy policy */}}
          />
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: colors.secondaryText }]}>App Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 15,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '600',
    marginVertical: 8,
    paddingHorizontal: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingIconContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: 10,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 13,
    marginTop: 2,
  },
  versionContainer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  versionText: {
    fontSize: 14,
  },
});

export default SettingsScreen; 