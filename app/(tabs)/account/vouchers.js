// app/account/vouchers.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, SafeAreaView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5, Ionicons, Feather, AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const VouchersScreen = () => {
  const [activeTab, setActiveTab] = useState('aktif');
  const [expandedVoucher, setExpandedVoucher] = useState(null);

  const tabs = [
    { id: 'aktif', label: 'Aktif' },
    { id: 'akanDatang', label: 'Akan Datang' },
    { id: 'kedaluwarsa', label: 'Kedaluwarsa' },
  ];

  const activeVouchers = [
    {
      id: '1',
      title: 'Diskon 50% Becak Royal',
      code: 'ROYAL50',
      description: 'Dapatkan diskon 50% untuk semua perjalanan dengan Becak Royal',
      expiryDate: 'Berlaku hingga 30 Des 2023',
      terms: 'Min. pembelian Rp 50.000. Maks. diskon Rp 25.000',
      image: require('../../../assets/images/logo.png'),
      isExpanded: false,
    },
    {
      id: '2',
      title: 'Gratis Ongkir Royal Mart',
      code: 'GRATISONGKIR',
      description: 'Gratis ongkir tanpa minimum pembelian di Royal Mart',
      expiryDate: 'Berlaku hingga 15 Jan 2024',
      terms: 'Maks. diskon Rp 15.000. Tidak bisa digabung dengan promo lain',
      image: require('../../../assets/images/logo.png'),
      isExpanded: false,
    },
  ];

  const upcomingVouchers = [
    {
      id: '3',
      title: 'Cashback 30% Royal Food',
      code: 'MAKANENAK',
      description: 'Dapatkan cashback 30% untuk pesanan Royal Food',
      expiryDate: 'Mulai 1 Des 2023',
      terms: 'Min. pembelian Rp 75.000. Maks. cashback Rp 30.000',
      image: require('../../../assets/images/logo.png'),
      isExpanded: false,
    },
  ];

  const expiredVouchers = [
    {
      id: '4',
      title: 'Diskon 20% Pertama',
      code: 'ROYALBARU',
      description: 'Diskon 20% untuk pengguna baru',
      expiryDate: 'Kedaluwarsa 30 Nov 2023',
      terms: 'Min. pembelian Rp 40.000. Maks. diskon Rp 20.000',
      image: require('../../../assets/images/logo.png'),
      isExpanded: false,
    },
  ];

  const renderVoucher = ({ item }) => (
    <TouchableOpacity 
      style={styles.voucherCard}
      onPress={() => setExpandedVoucher(expandedVoucher === item.id ? null : item.id)}
    >
      <Image source={item.image} style={styles.voucherImage} />
      <View style={styles.voucherContent}>
        <Text style={styles.voucherTitle}>{item.title}</Text>
        <Text style={styles.voucherCode}>Kode: {item.code}</Text>
        <Text style={styles.voucherDesc}>{item.description}</Text>
        <Text style={styles.voucherExpiry}>{item.expiryDate}</Text>
        
        {expandedVoucher === item.id && (
          <View style={styles.voucherDetails}>
            <Text style={styles.detailTitle}>Syarat & Ketentuan:</Text>
            <Text style={styles.detailText}>{item.terms}</Text>
            <TouchableOpacity style={styles.useButton}>
              <Text style={styles.useButtonText}>Gunakan Sekarang</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const getCurrentVouchers = () => {
    switch (activeTab) {
      case 'aktif': return activeVouchers;
      case 'akanDatang': return upcomingVouchers;
      case 'kedaluwarsa': return expiredVouchers;
      default: return activeVouchers;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Voucher Saya</Text>
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
        {getCurrentVouchers().length > 0 ? (
          <FlatList
            data={getCurrentVouchers()}
            renderItem={renderVoucher}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="confirmation-number" size={60} color="#B1944D" />
            <Text style={styles.emptyText}>Tidak ada voucher {activeTab === 'aktif' ? 'aktif' : activeTab === 'akanDatang' ? 'yang akan datang' : 'kedaluwarsa'}</Text>
            {activeTab === 'aktif' && (
              <TouchableOpacity style={styles.findVoucherButton}>
                <Text style={styles.findVoucherText}>Temukan Voucher</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <View style={styles.promoSection}>
          <Text style={styles.sectionTitle}>Dapatkan Voucher Lainnya</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.promoCard}>
              <LinearGradient
                colors={['#B1944D', '#D4BF83']}
                style={styles.promoGradient}
              >
                <Text style={styles.promoText}>Becak Royal</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.promoCard}>
              <LinearGradient
                colors={['#4D8EB1', '#83BED4']}
                style={styles.promoGradient}
              >
                <Text style={styles.promoText}>Royal Food</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.promoCard}>
              <LinearGradient
                colors={['#B14D4D', '#D48383']}
                style={styles.promoGradient}
              >
                <Text style={styles.promoText}>Royal Mart</Text>
              </LinearGradient>
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
  voucherCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  voucherImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  voucherContent: {
    padding: 15,
  },
  voucherTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
    marginBottom: 5,
  },
  voucherCode: {
    fontSize: 14,
    color: '#B1944D',
    marginBottom: 5,
  },
  voucherDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  voucherExpiry: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  voucherDetails: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 15,
  },
  useButton: {
    backgroundColor: '#B1944D',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  useButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 15,
    textAlign: 'center',
  },
  findVoucherButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#B1944D',
    borderRadius: 25,
  },
  findVoucherText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  promoSection: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
    marginBottom: 15,
  },
  promoCard: {
    width: 150,
    height: 80,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  promoGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default VouchersScreen;