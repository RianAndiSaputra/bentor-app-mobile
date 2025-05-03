// app/chats/index.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Platform,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ChatsScreen = () => {
  const router = useRouter();
  
  // Mock data for chat list
  const [chats, setChats] = useState([
    {
      id: '1',
      driverId: 'DRV123',
      driverName: 'Pak Santoso',
      vehicleType: 'Becak Royal',
      vehicleId: 'BR1234',
      lastMessage: 'Saya sudah sampai di lokasi',
      time: '10:30',
      unread: 2,
      online: true
    },
    {
      id: '2',
      driverId: 'DRV456',
      driverName: 'Pak Budi',
      vehicleType: 'Andong',
      vehicleId: 'AND789',
      lastMessage: 'Baik, tunggu sebentar ya',
      time: 'Kemarin',
      unread: 0,
      online: false
    },
    {
      id: '3',
      driverId: 'DRV789',
      driverName: 'Pak Joko',
      vehicleType: 'Becak Tour',
      vehicleId: 'BT456',
      lastMessage: 'Terima kasih atas perjalanannya',
      time: '12 Mei',
      unread: 0,
      online: true
    },
  ]);

  const navigateBack = () => {
    router.back();
  };

  const openChat = (chat) => {
    router.push({
      pathname: '/chat',
      params: {
        driverId: chat.driverId,
        driverName: chat.driverName,
        vehicleType: chat.vehicleType,
        vehicleId: chat.vehicleId
      }
    });
  };

  const getVehicleIcon = (type) => {
    if (type.includes('Becak')) {
      return <FontAwesome5 name="car-side" size={16} color="#B1944D" />;
    } else if (type.includes('Andong')) {
      return <FontAwesome5 name="horse" size={16} color="#B1944D" />;
    }
    return <FontAwesome5 name="car-side" size={16} color="#B1944D" />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        
        {/* Header */}
        <LinearGradient
          colors={['#0F3222', '#1A4D2E']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Pesan</Text>
            <View style={{width: 24}} />
          </View>
        </LinearGradient>
        
        {/* Chat List */}
        <ScrollView style={styles.content}>
          {chats.map((chat) => (
            <TouchableOpacity 
              key={chat.id}
              style={styles.chatItem}
              onPress={() => openChat(chat)}
            >
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <MaterialIcons name="person" size={24} color="#0F3222" />
                </View>
                {chat.online && <View style={styles.onlineDot} />}
              </View>
              
              <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                  <Text style={styles.driverName} numberOfLines={1}>{chat.driverName}</Text>
                  <Text style={styles.timeText}>{chat.time}</Text>
                </View>
                
                <View style={styles.chatDetails}>
                  <View style={styles.vehicleInfo}>
                    {getVehicleIcon(chat.vehicleType)}
                    <Text style={styles.vehicleText} numberOfLines={1}>
                      {chat.vehicleType} • {chat.vehicleId}
                    </Text>
                  </View>
                  
                  <Text 
                    style={[
                      styles.lastMessage,
                      chat.unread > 0 && styles.unreadMessage
                    ]} 
                    numberOfLines={1}
                  >
                    {chat.lastMessage}
                  </Text>
                </View>
              </View>
              
              {chat.unread > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadCount}>{chat.unread}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F3222',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight + 10,
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
  content: {
    flex: 1,
    paddingTop: 10,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    marginBottom: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
    flex: 1,
    fontFamily: 'serif',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 10,
    fontFamily: 'serif',
  },
  chatDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  vehicleText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
    fontFamily: 'serif',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: '#999',
    fontFamily: 'serif',
  },
  unreadMessage: {
    color: '#0F3222',
    fontWeight: 'bold',
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#B1944D',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  unreadCount: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
});

export default ChatsScreen;