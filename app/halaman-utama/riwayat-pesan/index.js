// app/chats/index.js
import React, { useState, useEffect } from 'react';
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
  SafeAreaView,
  TextInput,
  FlatList
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MaterialIcons, FontAwesome5, Ionicons, Feather, Entypo } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ChatsScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
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
      online: true,
      isPinned: true,
      orderId: 'ORD-12345',
      date: '24/11/2023',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
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
      online: false,
      isPinned: false,
      orderId: 'ORD-67890',
      date: '23/11/2023',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
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
      online: true,
      isPinned: true,
      orderId: 'ORD-34567',
      date: '12/05/2023',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      id: '4',
      driverId: 'DRV101',
      driverName: 'Bu Siti',
      vehicleType: 'Becak Listrik',
      vehicleId: 'BL789',
      lastMessage: 'Mohon konfirmasi alamat tujuan',
      time: '1 jam lalu',
      unread: 1,
      online: false,
      isPinned: false,
      orderId: 'ORD-89012',
      date: '24/11/2023',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      id: '5',
      driverId: 'DRV112',
      driverName: 'Pak Rudi',
      vehicleType: 'Andong Premium',
      vehicleId: 'AP456',
      lastMessage: 'Pesanan Anda telah selesai',
      time: '1 minggu lalu',
      unread: 0,
      online: true,
      isPinned: false,
      orderId: 'ORD-23456',
      date: '17/11/2023',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
    },
  ]);

  const [filteredChats, setFilteredChats] = useState(chats);

  useEffect(() => {
    filterChats();
  }, [searchQuery, activeTab, chats]);

  const filterChats = () => {
    let result = [...chats];
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(chat => 
        chat.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.vehicleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.orderId.toLowerCase().includes(searchQuery.toLowerCase())
      ); // ← Tambahkan tanda tutup kurung di sini
    }    
    
    // Filter by tab
    if (activeTab === 'unread') {
      result = result.filter(chat => chat.unread > 0);
    } else if (activeTab === 'pinned') {
      result = result.filter(chat => chat.isPinned);
    }
    
    setFilteredChats(result);
  };

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
        vehicleId: chat.vehicleId,
        orderId: chat.orderId
      }
    });
  };

  const togglePin = (id) => {
    setChats(chats.map(chat => 
      chat.id === id ? {...chat, isPinned: !chat.isPinned} : chat
    ));
  };

  const getVehicleIcon = (type) => {
    if (type.includes('Becak')) {
      return <FontAwesome5 name="car-side" size={16} color="#B1944D" />;
    } else if (type.includes('Andong')) {
      return <FontAwesome5 name="horse" size={16} color="#B1944D" />;
    }
    return <FontAwesome5 name="car-side" size={16} color="#B1944D" />;
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => openChat(item)}
      onLongPress={() => togglePin(item.id)}
    >
      <View style={styles.avatarContainer}>
        <Image 
          source={{ uri: item.avatar }} 
          style={styles.avatar}
        />
        {item.online && <View style={styles.onlineDot} />}
      </View>
      
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.driverName} numberOfLines={1}>
            {item.driverName}
            {item.isPinned && <MaterialIcons name="push-pin" size={14} color="#B1944D" style={styles.pinIcon} />}
          </Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        
        <View style={styles.chatDetails}>
          <View style={styles.vehicleInfo}>
            {getVehicleIcon(item.vehicleType)}
            <Text style={styles.vehicleText} numberOfLines={1}>
              {item.vehicleType} • {item.vehicleId}
            </Text>
          </View>
        </View>
        
        <View style={styles.messageContainer}>
          <Text 
            style={[
              styles.lastMessage,
              item.unread > 0 && styles.unreadMessage
            ]} 
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unread}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>#{item.orderId}</Text>
          <Text style={styles.orderDate}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
            <TouchableOpacity style={styles.headerButton}>
              <Feather name="more-vertical" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari pesan, driver, atau order"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <MaterialIcons name="cancel" size={20} color="#999" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>Semua</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'unread' && styles.activeTab]}
            onPress={() => setActiveTab('unread')}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.tabText, activeTab === 'unread' && styles.activeTabText]}>Belum dibaca</Text>
              {chats.filter(c => c.unread > 0).length > 0 && (
                <View style={styles.tabBadge}>
                  <Text style={styles.tabBadgeText}>{chats.filter(c => c.unread > 0).length}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'pinned' && styles.activeTab]}
            onPress={() => setActiveTab('pinned')}
          >
            <Text style={[styles.tabText, activeTab === 'pinned' && styles.activeTabText]}>Disematkan</Text>
          </TouchableOpacity>
        </View>
        
        {/* Chat List */}
        <FlatList
          data={filteredChats}
          renderItem={renderChatItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons name="chat-bubble-outline" size={48} color="#CCC" />
              <Text style={styles.emptyText}>Tidak ada pesan ditemukan</Text>
            </View>
          }
        />
        
        {/* New Chat Button */}
        <TouchableOpacity style={styles.newChatButton}>
          <LinearGradient
            colors={['#B1944D', '#D4AF37']}
            style={styles.newChatGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <MaterialIcons name="chat" size={24} color="#FFF" />
            <Text style={styles.newChatText}>Pesan Baru</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  headerButton: {
    padding: 5,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontFamily: 'serif',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#B1944D',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'serif',
  },
  activeTabText: {
    color: '#B1944D',
    fontWeight: 'bold',
  },
  tabBadge: {
    backgroundColor: '#B1944D',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 5,
  },
  tabBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 80,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
  pinIcon: {
    marginLeft: 5,
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
    marginBottom: 5,
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
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
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
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  orderId: {
    fontSize: 12,
    color: '#B1944D',
    fontFamily: 'serif',
  },
  orderDate: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'serif',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 15,
    fontFamily: 'serif',
  },
  newChatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  newChatGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  newChatText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
    fontFamily: 'serif',
  },
});

export default ChatsScreen;