// app/history/index.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Platform,
  SafeAreaView,
  TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MaterialIcons, FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HistoryScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for history items
  const [historyItems, setHistoryItems] = useState([
    {
      id: 'ORD-12345',
      type: 'GoFood',
      merchant: 'Mie Gacoan Gejayan, Yogya',
      date: '24/11/2023',
      time: '12:30',
      status: 'completed',
      price: 29000,
      discount: 30,
      discountMax: 45000,
      items: [
        { name: 'MIE GACOAN LV 4', quantity: 2, price: 14500 },
      ],
      paymentMethod: 'GoPay',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841'
    },
    {
      id: 'ORD-67890',
      type: 'GoMart',
      merchant: 'GoMart',
      date: '23/11/2023',
      time: '09:15',
      status: 'completed',
      price: 12400,
      discount: 100,
      discountMax: 15000,
      items: [
        { name: 'Aqua Air Mineral 1500 ml', quantity: 2, price: 6200 },
      ],
      paymentMethod: 'GoPay',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950'
    },
    {
      id: 'ORD-34567',
      type: 'GoRide',
      merchant: 'Becak Tour',
      date: '22/11/2023',
      time: '16:45',
      status: 'completed',
      price: 25000,
      driver: 'Pak Joko',
      vehicle: 'Becak Tour • BT456',
      pickup: 'Malioboro, Yogyakarta',
      dropoff: 'Keraton Yogyakarta',
      distance: '2.5 km',
      duration: '15 menit',
      paymentMethod: 'GoPay',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8'
    },
    {
      id: 'ORD-89012',
      type: 'GoFood',
      merchant: 'KFC Gejayan',
      date: '20/11/2023',
      time: '18:30',
      status: 'cancelled',
      price: 45000,
      discount: 20,
      discountMax: 20000,
      items: [
        { name: 'Paket Hemat 1', quantity: 1, price: 45000 },
      ],
      paymentMethod: 'GoPay',
      rating: null,
      image: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb'
    },
    {
      id: 'ORD-23456',
      type: 'GoCar',
      merchant: 'Becak Royal',
      date: '18/11/2023',
      time: '08:15',
      status: 'in_progress',
      price: 35000,
      driver: 'Pak Budi',
      vehicle: 'Becak Royal • BR789',
      pickup: 'Stasiun Tugu',
      dropoff: 'Bandara Adisutjipto',
      distance: '8.2 km',
      duration: '25 menit',
      paymentMethod: 'Cash',
      rating: null,
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a'
    },
  ]);

  const filteredItems = historyItems.filter(item => {
    // Filter by search query
    if (searchQuery && !item.merchant.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.id.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by tab
    if (activeTab === 'in_progress') {
      return item.status === 'in_progress';
    } else if (activeTab === 'scheduled') {
      return item.status === 'scheduled';
    } else if (activeTab === 'draft') {
      return item.status === 'draft';
    }
    return true;
  });

  const formatCurrency = (value) => {
    return 'Rp' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#1A4D2E';
      case 'in_progress': return '#B1944D';
      case 'cancelled': return '#E74C3C';
      case 'scheduled': return '#3498DB';
      default: return '#666';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Selesai';
      case 'in_progress': return 'Dalam Proses';
      case 'cancelled': return 'Dibatalkan';
      case 'scheduled': return 'Terjadwal';
      default: return status;
    }
  };

  const getServiceIcon = (type) => {
    switch(type) {
      case 'GoFood': return <FontAwesome5 name="hamburger" size={16} color="#E74C3C" />;
      case 'GoMart': return <FontAwesome5 name="shopping-basket" size={16} color="#3498DB" />;
      case 'GoRide': return <FontAwesome5 name="motorcycle" size={16} color="#1A4D2E" />;
      case 'GoCar': return <FontAwesome5 name="car" size={16} color="#1A4D2E" />;
      default: return <FontAwesome5 name="shopping-bag" size={16} color="#666" />;
    }
  };

  const renderHistoryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.historyItem}
      onPress={() => router.push(`/history/${item.id}`)}
    >
      <View style={styles.itemHeader}>
        <View style={styles.serviceBadge}>
          {getServiceIcon(item.type)}
          <Text style={styles.serviceText}>{item.type}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>
      
      <View style={styles.itemContent}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.merchantImage}
          resizeMode="cover"
        />
        
        <View style={styles.merchantInfo}>
          <Text style={styles.merchantName} numberOfLines={1}>{item.merchant}</Text>
          <Text style={styles.orderId}>#{item.id}</Text>
          <Text style={styles.orderDate}>{item.date} • {item.time}</Text>
          
          {item.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                Diskon {item.discount}% maks. {formatCurrency(item.discountMax)}
              </Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.itemFooter}>
        <Text style={styles.priceText}>{formatCurrency(item.price)}</Text>
        <View style={styles.footerAction}>
          {item.status === 'completed' && item.rating ? (
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, i) => (
                <MaterialIcons 
                  key={i}
                  name={i < item.rating ? "star" : "star-border"}
                  size={16} 
                  color="#B1944D" 
                />
              ))}
            </View>
          ) : (
            <Text style={styles.actionText}>Lanjut</Text>
          )}
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
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Aktivitas</Text>
            <TouchableOpacity style={styles.headerButton}>
              <Feather name="filter" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari pesanan, merchant, atau ID"
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
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}
          contentContainerStyle={styles.tabContent}
        >
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>Riwayat</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'in_progress' && styles.activeTab]}
            onPress={() => setActiveTab('in_progress')}
          >
            <Text style={[styles.tabText, activeTab === 'in_progress' && styles.activeTabText]}>Dalam Proses</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'scheduled' && styles.activeTab]}
            onPress={() => setActiveTab('scheduled')}
          >
            <Text style={[styles.tabText, activeTab === 'scheduled' && styles.activeTabText]}>Terjadwal</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'draft' && styles.activeTab]}
            onPress={() => setActiveTab('draft')}
          >
            <Text style={[styles.tabText, activeTab === 'draft' && styles.activeTabText]}>Draf</Text>
          </TouchableOpacity>
        </ScrollView>
        
        {/* History List */}
        <FlatList
          data={filteredItems}
          renderItem={renderHistoryItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons name="receipt" size={48} color="#CCC" />
              <Text style={styles.emptyText}>Tidak ada aktivitas ditemukan</Text>
              <Text style={styles.emptySubtext}>Pesanan Anda akan muncul di sini</Text>
            </View>
          }
        />
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
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  tabContent: {
    paddingHorizontal: 15,
  },
  tab: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginRight: 15,
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
  listContent: {
    padding: 15,
    paddingBottom: 30,
  },
  historyItem: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  serviceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  serviceText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 5,
    fontFamily: 'serif',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  itemContent: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  merchantImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
  },
  merchantInfo: {
    flex: 1,
  },
  merchantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
    marginBottom: 5,
    fontFamily: 'serif',
  },
  orderId: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
    fontFamily: 'serif',
  },
  orderDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
    fontFamily: 'serif',
  },
  discountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 5,
  },
  discountText: {
    fontSize: 12,
    color: '#B1944D',
    fontFamily: 'serif',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingTop: 10,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
    fontFamily: 'serif',
  },
  footerAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: '#B1944D',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  ratingContainer: {
    flexDirection: 'row',
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
  emptySubtext: {
    fontSize: 14,
    color: '#CCC',
    marginTop: 5,
    fontFamily: 'serif',
  },
});

export default HistoryScreen;