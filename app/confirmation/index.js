// app/confirmation/index.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
  Platform,
  SafeAreaView,
  Share
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const ConfirmationScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Get booking parameters from route
  const serviceType = params.serviceType || 'ride';
  const pickupLocation = params.pickupLocation || 'Malioboro, Yogyakarta';
  const dropoffLocation = params.dropoffLocation || 'Keraton Yogyakarta';
  const price = parseInt(params.price) || 25000;
  
  // Generated booking details
  const [bookingId, setBookingId] = useState('BGR' + Math.floor(100000 + Math.random() * 900000));
  const [driverName, setDriverName] = useState('Pak Santoso');
  const [driverRating, setDriverRating] = useState(4.9);
  const [estimatedArrival, setEstimatedArrival] = useState('5');
  const [vehicleType, setVehicleType] = useState(serviceType === 'andong' ? 'Andong' : 'Becak Royal');
  const [vehicleId, setVehicleId] = useState('BR' + Math.floor(1000 + Math.random() * 9000));
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;
  
  useEffect(() => {
    // Start animations
    Animated.stagger(300, [
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.back(1.7)),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const formatCurrency = (value) => {
    return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getServiceTitle = () => {
    switch(serviceType) {
      case 'ride': return 'Becak Royal';
      case 'andong': return 'Andong Royal';
      case 'tour': return 'Becak Tour';
      default: return 'Becak Royal';
    }
  };

  const getServiceIcon = () => {
    switch(serviceType) {
      case 'ride': return <FontAwesome5 name="car-side" size={18} color="#FFF" />;
      case 'andong': return <FontAwesome5 name="horse" size={18} color="#FFF" />;
      case 'tour': return <MaterialIcons name="tour" size={18} color="#FFF" />;
      default: return <FontAwesome5 name="car-side" size={18} color="#FFF" />;
    }
  };

  const navigateToHome = () => {
    router.replace('/home');
  };

  const navigateToTrack = () => {
    router.push('/tracking');
  };

  const shareBooking = async () => {
    try {
      await Share.share({
        message: `Saya memesan ${getServiceTitle()} dengan ID: ${bookingId}. Penjemputan di ${pickupLocation} menuju ${dropoffLocation}. Driver: ${driverName} dengan ${vehicleType} nomor ${vehicleId}. - via Becak Royal App`,
      });
    } catch (error) {
      console.log('Error sharing:', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#0F3222', '#1A4D2E']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.6 }}
      >
        {/* Confetti Animation */}
        <View style={styles.confettiContainer}>
          {/* If you have a Lottie animation file for confetti */}
          {/* <LottieView
            source={require('../../assets/animations/confetti.json')}
            autoPlay
            loop={false}
            style={styles.confetti}
          /> */}
        </View>
        
        {/* Success Icon */}
        <Animated.View style={[
          styles.successIconContainer,
          { 
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim }
            ] 
          }
        ]}>
          <View style={styles.successIcon}>
            <MaterialIcons name="check" size={40} color="#0F3222" />
          </View>
        </Animated.View>
        
        {/* Confirmation Text */}
        <Animated.View style={[
          styles.confirmationTextContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }]
          }
        ]}>
          <Text style={styles.confirmationTitle}>Booking Berhasil!</Text>
          <Text style={styles.confirmationSubtitle}>
            {serviceType === 'tour' ? 'Wisata Anda berhasil dijadwalkan' : 'Pesanan Anda sedang diproses'}
          </Text>
        </Animated.View>
        
        {/* Booking Card */}
        <Animated.View style={[
          styles.bookingCard,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }]
          }
        ]}>
          {/* Booking Header */}
          <View style={styles.bookingHeader}>
            <View style={styles.serviceIconContainer}>
              {getServiceIcon()}
            </View>
            <View style={styles.serviceTextContainer}>
              <Text style={styles.serviceTitle}>{getServiceTitle()}</Text>
              <Text style={styles.bookingId}>ID: {bookingId}</Text>
            </View>
            <TouchableOpacity style={styles.shareButton} onPress={shareBooking}>
              <MaterialIcons name="share" size={20} color="#B1944D" />
            </TouchableOpacity>
          </View>
          
          {/* Booking Details */}
          <View style={styles.bookingDetails}>
            {/* Route */}
            <View style={styles.routeContainer}>
              <View style={styles.routeIcons}>
                <View style={styles.pickupDot} />
                <View style={styles.routeLine} />
                <MaterialIcons name="place" size={20} color="#B1944D" />
              </View>
              
              <View style={styles.routeTexts}>
                <View style={styles.locationItem}>
                  <Text style={styles.locationLabel}>Penjemputan</Text>
                  <Text style={styles.locationText}>{pickupLocation}</Text>
                </View>
                
                <View style={styles.locationItem}>
                  <Text style={styles.locationLabel}>Tujuan</Text>
                  <Text style={styles.locationText}>{dropoffLocation}</Text>
                </View>
              </View>
            </View>
            
            {/* Driver Details */}
            <View style={styles.driverContainer}>
              <View style={styles.driverHeader}>
                <Text style={styles.driverLabel}>Driver</Text>
                <View style={styles.driverRating}>
                  <MaterialIcons name="star" size={14} color="#B1944D" />
                  <Text style={styles.driverRatingText}>{driverRating}</Text>
                </View>
              </View>
              
              <View style={styles.driverInfo}>
                <View style={styles.driverAvatarContainer}>
                  <MaterialIcons name="person" size={30} color="#0F3222" />
                </View>
                
                <View style={styles.driverTextContainer}>
                  <Text style={styles.driverName}>{driverName}</Text>
                  <Text style={styles.vehicleInfo}>{vehicleType} • {vehicleId}</Text>
                </View>
                
                <TouchableOpacity style={styles.callButton}>
                  <MaterialIcons name="phone" size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Arrival Time */}
            <View style={styles.arrivalContainer}>
              <Text style={styles.arrivalLabel}>Estimasi kedatangan driver</Text>
              <Text style={styles.arrivalTime}>{estimatedArrival} menit</Text>
            </View>
            
            {/* Price */}
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Total Pembayaran</Text>
              <Text style={styles.priceValue}>{formatCurrency(price)}</Text>
            </View>
          </View>
        </Animated.View>
        
        {/* Action Buttons */}
        <Animated.View style={[
          styles.actionButtons,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }]
          }
        ]}>
          <TouchableOpacity 
            style={styles.trackButton}
            onPress={navigateToTrack}
          >
            <LinearGradient
              colors={['#B1944D', '#D4BF83']}
              style={styles.trackButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.trackButtonText}>LACAK DRIVER</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.homeButton}
            onPress={navigateToHome}
          >
            <Text style={styles.homeButtonText}>Kembali ke Beranda</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
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
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight + 20,
    paddingHorizontal: 20,
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  confetti: {
    width: width,
    height: height,
  },
  successIconContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#B1944D',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  confirmationTextContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'serif',
  },
  confirmationSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontFamily: 'serif',
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  serviceIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0F3222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
    fontFamily: 'serif',
  },
  bookingId: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
    fontFamily: 'serif',
  },
  shareButton: {
    padding: 5,
  },
  bookingDetails: {
    padding: 15,
  },
  routeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  routeIcons: {
    width: 24,
    alignItems: 'center',
  },
  pickupDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0F3222',
    marginTop: 3,
  },
  routeLine: {
    width: 2,
    height: 30,
    backgroundColor: '#E0E0E0',
    marginVertical: 5,
    marginLeft: 5,
  },
  routeTexts: {
    flex: 1,
    marginLeft: 10,
  },
  locationItem: {
    marginBottom: 15,
  },
  locationLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 3,
    fontFamily: 'serif',
  },
  locationText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'serif',
  },
  driverContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  driverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  driverLabel: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'serif',
  },
  driverRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverRatingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 3,
    fontFamily: 'serif',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  driverName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'serif',
  },
  vehicleInfo: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    fontFamily: 'serif',
  },
  callButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0F3222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrivalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  arrivalLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'serif',
  },
  arrivalTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F3222',
    fontFamily: 'serif',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  priceLabel: {
    fontSize: 15,
    color: '#666',
    fontFamily: 'serif',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F3222',
    fontFamily: 'serif',
  },
  actionButtons: {
    width: '100%',
    alignItems: 'center',
  },
  trackButton: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  trackButtonGradient: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#0F3222',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  homeButton: {
    padding: 10,
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'serif',
  },
});

export default ConfirmationScreen;