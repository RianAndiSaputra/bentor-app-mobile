// app/history/[id].js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
  Platform,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HistoryDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  // Mock data - in a real app this would come from an API
  const tripDetails = {
    id: id,
    date: '15 Mei 2023',
    time: '14:30',
    type: 'Becak Royal',
    driver: 'Pak Budi',
    driverRating: 4.9,
    vehicleId: 'BR1234',
    pickup: 'Malioboro, Yogyakarta',
    dropoff: 'Keraton Yogyakarta',
    distance: '2.5 km',
    duration: '15 menit',
    price: 25000,
    paymentMethod: 'BecakPay',
    status: 'completed',
    rating: 5,
    notes: 'Tolong berhenti di depan gerbang utama'
  };

  const navigateBack = () => {
    router.back();
  };

  const formatCurrency = (value) => {
    return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <MaterialIcons 
          key={i}
          name={i <= rating ? "star" : "star-border"}
          size={20} 
          color="#B1944D" 
        />
      );
    }
    return stars;
  };

  const getVehicleIcon = (type) => {
    if (type.includes('Becak')) {
      return <FontAwesome5 name="car-side" size={20} color="#B1944D" />;
    } else if (type.includes('Andong')) {
      return <FontAwesome5 name="horse" size={20} color="#B1944D" />;
    }
    return <FontAwesome5 name="car-side" size={20} color="#B1944D" />;
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
            <Text style={styles.headerTitle}>Detail Pesanan</Text>
            <View style={{width: 24}} />
          </View>
        </LinearGradient>
        
        <ScrollView style={styles.content}>
          {/* Trip Info */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Informasi Pesanan</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>ID Pesanan</Text>
              <Text style={styles.infoValue}>{tripDetails.id}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tanggal</Text>
              <Text style={styles.infoValue}>{tripDetails.date} • {tripDetails.time}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <View style={[styles.statusBadge, { backgroundColor: '#1A4D2E' }]}>
                <Text style={styles.statusText}>Selesai</Text>
              </View>
            </View>
          </View>
          
          {/* Driver Info */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Driver</Text>
            
            <View style={styles.driverContainer}>
              <View style={styles.driverAvatar}>
                <MaterialIcons name="person" size={32} color="#0F3222" />
              </View>
              
              <View style={styles.driverInfo}>
                <Text style={styles.driverName}>{tripDetails.driver}</Text>
                <View style={styles.driverRating}>
                  <MaterialIcons name="star" size={16} color="#B1944D" />
                  <Text style={styles.driverRatingText}>{tripDetails.driverRating}</Text>
                </View>
              </View>
              
              <View style={styles.vehicleContainer}>
                {getVehicleIcon(tripDetails.type)}
                <Text style={styles.vehicleText}>{tripDetails.type} • {tripDetails.vehicleId}</Text>
              </View>
            </View>
          </View>
          
          {/* Trip Details */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Detail Perjalanan</Text>
            
            <View style={styles.locationContainer}>
              <View style={styles.locationDot} />
              <Text style={styles.locationText}>{tripDetails.pickup}</Text>
            </View>
            
            <View style={styles.locationDivider} />
            
            <View style={styles.locationContainer}>
              <MaterialIcons name="place" size={18} color="#B1944D" />
              <Text style={styles.locationText}>{tripDetails.dropoff}</Text>
            </View>
            
            <View style={styles.tripDetailsRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Jarak</Text>
                <Text style={styles.detailValue}>{tripDetails.distance}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Durasi</Text>
                <Text style={styles.detailValue}>{tripDetails.duration}</Text>
              </View>
            </View>
          </View>
          
          {/* Payment Info */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Pembayaran</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Metode Pembayaran</Text>
              <Text style={styles.infoValue}>{tripDetails.paymentMethod}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Total Pembayaran</Text>
              <Text style={styles.totalPrice}>{formatCurrency(tripDetails.price)}</Text>
            </View>
          </View>
          
          {/* Notes */}
          {tripDetails.notes && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Catatan</Text>
              <Text style={styles.notesText}>{tripDetails.notes}</Text>
            </View>
          )}
          
          {/* Rating */}
          {tripDetails.rating && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Rating Anda</Text>
              <View style={styles.ratingContainer}>
                {renderStars(tripDetails.rating)}
              </View>
            </View>
          )}
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
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
    marginBottom: 15,
    fontFamily: 'serif',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'serif',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    fontFamily: 'serif',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  driverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
    marginBottom: 5,
    fontFamily: 'serif',
  },
  driverRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverRatingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
    fontFamily: 'serif',
  },
  vehicleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 8,
    borderRadius: 8,
  },
  vehicleText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
    fontFamily: 'serif',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  locationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0F3222',
    marginRight: 10,
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontFamily: 'serif',
  },
  locationDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
    marginLeft: 20,
  },
  tripDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  detailItem: {
    width: '48%',
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    fontFamily: 'serif',
  },
  detailValue: {
    fontSize: 14,
    color: '#0F3222',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  totalPrice: {
    fontSize: 16,
    color: '#0F3222',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  notesText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    fontFamily: 'serif',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
});

export default HistoryDetailScreen;