// app/account/wallet.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, SafeAreaView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5, Ionicons, Feather, AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const WalletScreen = () => {
  const [balance, setBalance] = useState(1250000);
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('dompet');

  const tabs = [
    { id: 'dompet', label: 'Dompet' },
    { id: 'pembayaran', label: 'Pembayaran' },
    { id: 'riwayat', label: 'Riwayat' },
  ];

  const transactions = [
    {
      id: '1',
      type: 'topup',
      amount: 500000,
      description: 'Isi Saldo - Bank BCA',
      date: '20 Nov 2023',
      time: '14:30',
      icon: 'account-balance-wallet',
      color: '#4CAF50',
    },
    {
      id: '2',
      type: 'payment',
      amount: -75000,
      description: 'Becak Royal - Pak Santoso',
      date: '18 Nov 2023',
      time: '09:15',
      icon: 'directions-car',
      color: '#F44336',
    },
    {
      id: '3',
      type: 'payment',
      amount: -120000,
      description: 'Royal Food - Warung Makan Royal',
      date: '15 Nov 2023',
      time: '19:45',
      icon: 'restaurant',
      color: '#F44336',
    },
    {
      id: '4',
      type: 'cashback',
      amount: 25000,
      description: 'Cashback Royal Mart',
      date: '10 Nov 2023',
      time: '11:20',
      icon: 'shopping-bag',
      color: '#4CAF50',
    },
  ];

  const paymentMethods = [
    {
      id: '1',
      name: 'Dompet Royal',
      number: '***-****-7890',
      type: 'wallet',
      icon: 'account-balance-wallet',
    },
    {
      id: '2',
      name: 'Bank BCA',
      number: '****-****-1234',
      type: 'bank',
      icon: 'account-balance',
    },
    {
      id: '3',
      name: 'Gopay',
      number: '08*********',
      type: 'ewallet',
      icon: 'smartphone',
    },
    {
      id: '4',
      name: 'Kartu Kredit',
      number: '****-****-****-5678',
      type: 'creditcard',
      icon: 'credit-card',
    },
  ];

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={[styles.transactionIcon, { backgroundColor: `${item.color}20` }]}>
        <MaterialIcons name={item.icon} size={24} color={item.color} />
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionDesc}>{item.description}</Text>
        <Text style={styles.transactionDate}>{item.date} • {item.time}</Text>
      </View>
      <Text style={[styles.transactionAmount, { color: item.amount > 0 ? '#4CAF50' : '#F44336' }]}>
        {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).replace(',00', '')}
      </Text>
    </View>
  );

  const renderPaymentMethod = ({ item }) => (
    <TouchableOpacity style={styles.paymentMethod}>
      <View style={styles.methodLeft}>
        <View style={styles.methodIcon}>
          <MaterialIcons name={item.icon} size={24} color="#B1944D" />
        </View>
        <View>
          <Text style={styles.methodName}>{item.name}</Text>
          <Text style={styles.methodNumber}>{item.number}</Text>
        </View>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#B1944D" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dompet & Pembayaran</Text>
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
        {activeTab === 'dompet' && (
          <>
            <View style={styles.balanceCard}>
              <LinearGradient
                colors={['#0F3222', '#1A4D2E']}
                style={styles.balanceGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <View style={styles.balanceHeader}>
                  <Text style={styles.balanceTitle}>Saldo Dompet Royal</Text>
                  <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                    <MaterialIcons 
                      name={showBalance ? 'visibility' : 'visibility-off'} 
                      size={24} 
                      color="#FFF" 
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.balanceAmount}>
                  {showBalance ? 
                    balance.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).replace(',00', '') : 
                    '••••••••'}
                </Text>
                <View style={styles.balanceActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <MaterialIcons name="add" size={24} color="#FFF" />
                    <Text style={styles.actionText}>Isi Saldo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <MaterialIcons name="swap-horiz" size={24} color="#FFF" />
                    <Text style={styles.actionText}>Transfer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <MaterialIcons name="history" size={24} color="#FFF" />
                    <Text style={styles.actionText}>Riwayat</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Fitur Dompet</Text>
              <View style={styles.features}>
                <TouchableOpacity style={styles.feature}>
                  <View style={styles.featureIcon}>
                    <MaterialIcons name="qr-code" size={24} color="#B1944D" />
                  </View>
                  <Text style={styles.featureText}>Bayar QR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.feature}>
                  <View style={styles.featureIcon}>
                    <MaterialIcons name="savings" size={24} color="#B1944D" />
                  </View>
                  <Text style={styles.featureText}>Royal Tabungan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.feature}>
                  <View style={styles.featureIcon}>
                    <MaterialIcons name="payments" size={24} color="#B1944D" />
                  </View>
                  <Text style={styles.featureText}>Cicilan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.feature}>
                  <View style={styles.featureIcon}>
                    <MaterialIcons name="card-giftcard" size={24} color="#B1944D" />
                  </View>
                  <Text style={styles.featureText}>Voucher</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

        {activeTab === 'pembayaran' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
            <FlatList
              data={paymentMethods}
              renderItem={renderPaymentMethod}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
            <TouchableOpacity style={styles.addPaymentMethod}>
              <MaterialIcons name="add" size={24} color="#B1944D" />
              <Text style={styles.addPaymentText}>Tambah Metode Pembayaran</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'riwayat' && (
          <View style={styles.section}>
            <View style={styles.filterContainer}>
              <Text style={styles.sectionTitle}>Riwayat Transaksi</Text>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterText}>Filter</Text>
                <MaterialIcons name="filter-list" size={20} color="#B1944D" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={transactions}
              renderItem={renderTransaction}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        <View style={styles.promoSection}>
          <Text style={styles.sectionTitle}>Promo Pembayaran</Text>
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
  balanceCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceGradient: {
    padding: 20,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  balanceTitle: {
    color: '#FFF',
    fontSize: 16,
  },
  balanceAmount: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  balanceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 5,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
    marginBottom: 15,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feature: {
    alignItems: 'center',
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  methodName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  methodNumber: {
    fontSize: 12,
    color: '#999',
  },
  addPaymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#B1944D',
    borderRadius: 10,
    borderStyle: 'dashed',
    justifyContent: 'center',
    marginTop: 10,
  },
  addPaymentText: {
    fontSize: 14,
    color: '#B1944D',
    fontWeight: '600',
    marginLeft: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    color: '#B1944D',
    marginRight: 5,
  },
  transactionItem: {
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
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDesc: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
  promoSection: {
    marginBottom: 20,
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

export default WalletScreen;