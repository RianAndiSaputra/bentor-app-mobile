// app/account/points.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, SafeAreaView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5, Ionicons, Feather, AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PointsScreen = () => {
  const [points, setPoints] = useState(4200);
  const [showPoints, setShowPoints] = useState(true);
  const [activeTab, setActiveTab] = useState('hadiah');

  const tabs = [
    { id: 'hadiah', label: 'Tukar Hadiah' },
    { id: 'riwayat', label: 'Riwayat Poin' },
    { id: 'info', label: 'Info Poin' },
  ];

  const rewards = [
    {
      id: '1',
      name: 'Voucher Royal 50K',
      points: 1000,
      image: require('../../../assets/images/logo.png'),
      stock: 'Tersedia',
    },
    {
      id: '2',
      name: 'Gratis Ongkir Royal Mart',
      points: 500,
      image: require('../../../assets/images/logo.png'),
      stock: 'Tersedia',
    },
    {
      id: '3',
      name: 'Diskon 30% Becak Royal',
      points: 750,
      image: require('../../../assets/images/logo.png'),
      stock: 'Habis',
    },
    {
      id: '4',
      name: 'Cashback 20% Royal Food',
      points: 1200,
      image: require('../../../assets/images/logo.png'),
      stock: 'Tersedia',
    },
  ];

  const history = [
    {
      id: '1',
      type: 'earn',
      points: 100,
      description: 'Pemesanan Becak Royal',
      date: '20 Nov 2023',
    },
    {
      id: '2',
      type: 'redeem',
      points: -500,
      description: 'Tukar Voucher Makanan',
      date: '18 Nov 2023',
    },
    {
      id: '3',
      type: 'earn',
      points: 200,
      description: 'Pemesanan Royal Food',
      date: '15 Nov 2023',
    },
    {
      id: '4',
      type: 'bonus',
      points: 100,
      description: 'Bonus Mingguan',
      date: '10 Nov 2023',
    },
  ];

  const renderReward = ({ item }) => (
    <TouchableOpacity style={styles.rewardCard}>
      <Image source={item.image} style={styles.rewardImage} />
      <View style={styles.rewardInfo}>
        <Text style={styles.rewardName}>{item.name}</Text>
        <View style={styles.rewardPoints}>
          <FontAwesome5 name="coins" size={16} color="#B1944D" />
          <Text style={styles.pointsText}>{item.points} Poin</Text>
        </View>
        <Text style={[styles.rewardStock, item.stock === 'Habis' && styles.outOfStock]}>
          {item.stock}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <View style={styles.historyIcon}>
        <FontAwesome5 
          name={item.type === 'earn' ? 'plus-circle' : item.type === 'redeem' ? 'minus-circle' : 'gift'} 
          size={20} 
          color={item.type === 'earn' || item.type === 'bonus' ? '#4CAF50' : '#F44336'} 
        />
      </View>
      <View style={styles.historyInfo}>
        <Text style={styles.historyDesc}>{item.description}</Text>
        <Text style={styles.historyDate}>{item.date}</Text>
      </View>
      <Text style={[styles.historyPoints, { color: item.points > 0 ? '#4CAF50' : '#F44336' }]}>
        {item.points > 0 ? '+' : ''}{item.points}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Poin Royal</Text>
      </View>

      <View style={styles.pointsCard}>
        <LinearGradient
          colors={['#B1944D', '#D4BF83']}
          style={styles.pointsGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.pointsHeader}>
            <Text style={styles.pointsTitle}>Total Poin Anda</Text>
            <TouchableOpacity onPress={() => setShowPoints(!showPoints)}>
              <MaterialIcons 
                name={showPoints ? 'visibility' : 'visibility-off'} 
                size={24} 
                color="#FFF" 
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.pointsAmount}>
            {showPoints ? points.toLocaleString('id-ID') : '•••••'}
          </Text>
          <Text style={styles.pointsInfo}>1 Poin = Rp 100</Text>
        </LinearGradient>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabButton, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.container}>
        {activeTab === 'hadiah' && (
          <FlatList
            data={rewards}
            renderItem={renderReward}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.rewardsContainer}
            scrollEnabled={false}
          />
        )}

        {activeTab === 'riwayat' && (
          <FlatList
            data={history}
            renderItem={renderHistoryItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        )}

        {activeTab === 'info' && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Cara Mendapatkan Poin</Text>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <FontAwesome5 name="car" size={20} color="#B1944D" />
              </View>
              <Text style={styles.infoText}>10 Poin untuk setiap Rp 10.000 pembelian Becak Royal</Text>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <MaterialIcons name="delivery-dining" size={20} color="#B1944D" />
              </View>
              <Text style={styles.infoText}>5 Poin untuk setiap Rp 10.000 pembelian Royal Delivery</Text>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <MaterialIcons name="restaurant" size={20} color="#B1944D" />
              </View>
              <Text style={styles.infoText}>8 Poin untuk setiap Rp 10.000 pembelian Royal Food</Text>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <MaterialIcons name="shopping-bag" size={20} color="#B1944D" />
              </View>
              <Text style={styles.infoText}>3 Poin untuk setiap Rp 10.000 pembelian Royal Mart</Text>
            </View>

            <Text style={[styles.infoTitle, { marginTop: 30 }]}>Syarat & Ketentuan</Text>
            <Text style={styles.termsText}>
              1. Poin akan kadaluarsa setelah 6 bulan jika tidak ada transaksi
            </Text>
            <Text style={styles.termsText}>
              2. Poin tidak dapat ditukar dengan uang tunai
            </Text>
            <Text style={styles.termsText}>
              3. Poin dapat digabungkan dengan promo lainnya
            </Text>
          </View>
        )}

        <View style={styles.promoSection}>
          <Text style={styles.sectionTitle}>Promo Double Poin</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.promoCard}>
              <Image source={require('../../../assets/images/logo.png')} style={styles.promoImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.promoCard}>
              <Image source={require('../../../assets/images/logo.png')} style={styles.promoImage} />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F3222',
    textAlign: 'center',
  },
  pointsCard: {
    borderRadius: 12,
    overflow: 'hidden',
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pointsGradient: {
    padding: 20,
  },
  pointsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pointsTitle: {
    color: '#FFF',
    fontSize: 16,
  },
  pointsAmount: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pointsInfo: {
    color: '#FFF',
    fontSize: 14,
    opacity: 0.8,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tabButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#B1944D',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#B1944D',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  rewardsContainer: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  rewardCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  rewardImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  rewardInfo: {
    padding: 10,
  },
  rewardName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  rewardPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pointsText: {
    fontSize: 12,
    color: '#B1944D',
    marginLeft: 5,
  },
  rewardStock: {
    fontSize: 12,
    color: '#4CAF50',
  },
  outOfStock: {
    color: '#F44336',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  historyIcon: {
    marginRight: 15,
  },
  historyInfo: {
    flex: 1,
  },
  historyDesc: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  historyDate: {
    fontSize: 12,
    color: '#999',
  },
  historyPoints: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  promoSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
    marginBottom: 15,
  },
  promoCard: {
    width: 250,
    height: 120,
    borderRadius: 10,
    marginRight: 15,
    overflow: 'hidden',
  },
  promoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default PointsScreen;