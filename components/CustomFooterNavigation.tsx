import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const tabs = [
  { name: 'home', label: 'Beranda', icon: 'home' },
  { name: 'history', label: 'Aktivitas', icon: 'time' },
  { name: 'riwayat-pesan', label: 'Chat', icon: 'chatbubble' },
  { name: 'account', label: 'Akun', icon: 'person' },
];

export default function CustomFooterNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const handlePress = (tabName: string) => {
    router.push(`/${tabName}` as any);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const focused = pathname === `/${tab.name}`;
        const iconName = focused ? tab.icon : `${tab.icon}-outline`;
        const color = focused ? '#3A7D44' : '#6B7280';

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => handlePress(tab.name)}
            activeOpacity={0.7}
          >
            <Ionicons name={iconName as any} size={24} color={color} />
            <Text style={[styles.label, { color }]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    borderTopWidth: 0,
    backgroundColor: '#FFFFFF',
    paddingBottom: 12,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});
