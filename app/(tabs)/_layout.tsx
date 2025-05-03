import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import CustomFooterNavigation from '../../components/CustomFooterNavigation';

export default function Layout() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{ headerShown: false }}
          />
        </Stack>
      </View>
      <CustomFooterNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
