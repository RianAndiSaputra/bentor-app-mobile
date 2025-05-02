import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const CancelledScreen = () => {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#0F3222', '#1A4D2E']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pembatalan</Text>
          <View style={{width: 24}} />
        </View>
      </LinearGradient>
      
      <View style={styles.container}>
        <View style={styles.content}>
          <MaterialIcons name="cancel" size={80} color="#B1944D" style={styles.icon} />
          <Text style={styles.title}>Perjalanan Dibatalkan</Text>
          <Text style={styles.subtitle}>Anda telah membatalkan perjalanan dengan Becak Royal</Text>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push('/booking')}
          >
            <Text style={styles.buttonText}>Pesan Becak Lagi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F3222',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F3222',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'serif',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#B1944D',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'serif',
  },
});

export default CancelledScreen;