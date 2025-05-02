// app/tracking/index.js
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
  Modal
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const TrackingScreen = () => {
  const router = useRouter();
  
  // Mock data
  const [bookingId, setBookingId] = useState('BGR123456');
  const [driverName, setDriverName] = useState('Pak Santoso');
  const [driverRating, setDriverRating] = useState(4.9);
  const [vehicleType, setVehicleType] = useState('Becak Royal');
  const [vehicleId, setVehicleId] = useState('BR1234');
  const [pickupLocation, setPickupLocation] = useState({
    name: 'Malioboro, Yogyakarta',
    coords: { latitude: -7.803164, longitude: 110.364917 }
  });
  const [dropoffLocation, setDropoffLocation] = useState({
    name: 'Keraton Yogyakarta',
    coords: { latitude: -7.805130, longitude: 110.363636 }
  });
  const [driverLocation, setDriverLocation] = useState({
    latitude: -7.800664, 
    longitude: 110.368417
  });
  const [estimatedArrival, setEstimatedArrival] = useState(5);
  const [tripStatus, setTripStatus] = useState('onTheWay'); // onTheWay, arrived, inProgress, completed
  const [showCancelModal, setShowCancelModal] = useState(false);
  
  // Animation values
  const bottomSheetAnim = useRef(new Animated.Value(0)).current;
  const mapFadeAnim = useRef(new Animated.Value(0)).current;
  const markerAnim = useRef(new Animated.Value(0)).current;
  
  // Map reference
  const mapRef = useRef(null);
  
  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(bottomSheetAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.back(1.7)),
        useNativeDriver: true,
      }),
      Animated.timing(mapFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Animate driver location marker
    Animated.loop(
      Animated.sequence([
        Animated.timing(markerAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(markerAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Simulate driver movement
    const driverInterval = setInterval(() => {
      simulateDriverMovement();
    }, 3000);
    
    // Fit map to show all markers
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.fitToSuppliedMarkers(
          ['driver', 'pickup', 'dropoff'],
          { edgePadding: { top: 100, right: 50, bottom: 300, left: 50 }, animated: true }
        );
      }
    }, 500);
    
    return () => clearInterval(driverInterval);
  }, []);
  
  // Simulate driver moving towards pickup location
  const simulateDriverMovement = () => {
    const targetLocation = tripStatus === 'onTheWay' ? pickupLocation.coords : 
                          tripStatus === 'inProgress' ? dropoffLocation.coords : null;
    
    if (targetLocation && tripStatus !== 'arrived' && tripStatus !== 'completed') {
      const latDiff = targetLocation.latitude - driverLocation.latitude;
      const lngDiff = targetLocation.longitude - driverLocation.longitude;
      
      setDriverLocation({
        latitude: driverLocation.latitude + (latDiff * 0.2),
        longitude: driverLocation.longitude + (lngDiff * 0.2)
      });
      
      // Update estimated arrival time
      if (tripStatus === 'onTheWay') {
        setEstimatedArrival(prev => Math.max(0, prev - 1));
        
        // Check if driver has arrived at pickup
        if (estimatedArrival <= 1) {
          setTripStatus('arrived');
          
          // After 5 seconds, start the trip
          setTimeout(() => {
            setTripStatus('inProgress');
            setEstimatedArrival(10); // Reset for trip duration
          }, 5000);
        }
      } else if (tripStatus === 'inProgress') {
        setEstimatedArrival(prev => Math.max(0, prev - 1));
        
        // Check if driver has arrived at destination
        if (estimatedArrival <= 1) {
          setTripStatus('completed');
          
          // After 3 seconds, navigate to rating screen
          setTimeout(() => {
            router.push('/rating');
          }, 3000);
        }
      }
    }
  };
  
  const getStatusText = () => {
    switch(tripStatus) {
      case 'onTheWay': return 'Driver sedang menuju lokasi Anda';
      case 'arrived': return 'Driver telah tiba di lokasi penjemputan';
      case 'inProgress': return 'Sedang dalam perjalanan ke tujuan';
      case 'completed': return 'Telah tiba di lokasi tujuan';
      default: return '';
    }
  };
  const getStatusColor = () => {
    switch(tripStatus) {
      case 'onTheWay': return '#B1944D';
      case 'arrived': return '#1A4D2E';
      case 'inProgress': return '#1A4D2E';
      case 'completed': return '#1A4D2E';
      default: return '#B1944D';
    }
  };

  const getActionButtonText = () => {
    switch(tripStatus) {
      case 'onTheWay': return 'Hubungi Driver';
      case 'arrived': return 'Mulai Perjalanan';
      case 'inProgress': return 'Hubungi Driver';
      case 'completed': return 'Beri Rating';
      default: return '';
    }
  };

  const handleActionButtonPress = () => {
    if (tripStatus === 'completed') {
      router.push('/rating');
    } else if (tripStatus === 'arrived') {
      setTripStatus('inProgress');
      setEstimatedArrival(10);
    } else {
      // Implement call driver functionality
      console.log('Calling driver...');
    }
  };

  const navigateBack = () => {
    router.back();
  };

  const handleCancelTrip = () => {
    setShowCancelModal(true);
  };

  const confirmCancelTrip = () => {
    setShowCancelModal(false);
    // In a real app, this would call an API to cancel the trip
    router.push('/cancelled');
  };

  const handleCallDriver = () => {
    router.push('/chat');
  };

  const getVehicleIcon = () => {
    if (vehicleType.includes('Becak')) {
      return <FontAwesome5 name="car-side" size={20} color="#FFF" />;
    } else if (vehicleType.includes('Andong')) {
      return <FontAwesome5 name="horse" size={20} color="#FFF" />;
    }
    return <FontAwesome5 name="car-side" size={20} color="#FFF" />;
  };

  const markerScale = markerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2]
  });

  const bottomSheetTranslateY = bottomSheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0]
  });

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
            <Text style={styles.headerTitle}>Lacak Perjalanan</Text>
            <View style={{width: 24}} />
          </View>
        </LinearGradient>
        
        {/* Map View */}
        <Animated.View style={[styles.mapContainer, { opacity: mapFadeAnim }]}>
          <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: -7.803164,
              longitude: 110.364917,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            {/* Pickup Marker */}
            <Marker
              identifier="pickup"
              coordinate={pickupLocation.coords}
              title="Lokasi Penjemputan"
              description={pickupLocation.name}
            >
              <View style={styles.markerContainer}>
                <View style={[styles.markerDot, styles.pickupMarker]} />
              </View>
            </Marker>
            
            {/* Dropoff Marker */}
            <Marker
              identifier="dropoff"
              coordinate={dropoffLocation.coords}
              title="Lokasi Tujuan"
              description={dropoffLocation.name}
            >
              <View style={styles.markerContainer}>
                <MaterialIcons name="place" size={24} color="#B1944D" />
              </View>
            </Marker>
            
            {/* Driver Marker */}
            <Marker
              identifier="driver"
              coordinate={driverLocation}
              title={driverName}
              description={`${vehicleType} - ${vehicleId}`}
            >
              <Animated.View style={[styles.driverMarkerContainer, { transform: [{ scale: markerScale }] }]}>
                <View style={styles.driverMarker}>
                  <MaterialIcons name="person" size={16} color="#FFF" />
                </View>
                <View style={styles.driverMarkerArrow} />
              </Animated.View>
            </Marker>
            
            {/* Route Polyline */}
            <Polyline
              coordinates={[pickupLocation.coords, dropoffLocation.coords]}
              strokeColor="#B1944D"
              strokeWidth={4}
              lineDashPattern={[10, 10]}
            />
          </MapView>
        </Animated.View>
        
        {/* Bottom Sheet */}
        <Animated.View style={[
          styles.bottomSheet, 
          { transform: [{ translateY: bottomSheetTranslateY }] }
        ]}>
          <LinearGradient
            colors={['#FFFFFF', '#F8F8F8']}
            style={styles.bottomSheetGradient}
          >
            {/* Drag handle */}
            <View style={styles.dragHandle} />
            
            {/* Booking ID */}
            <Text style={styles.bookingId}>ID Pesanan: {bookingId}</Text>
            
            {/* Status Indicator */}
            <View style={styles.statusContainer}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
              <Text style={styles.statusText}>{getStatusText()}</Text>
            </View>
            
            {/* Driver Info */}
            <View style={styles.driverInfoContainer}>
              <View style={styles.driverAvatarContainer}>
                <MaterialIcons name="person" size={36} color="#0F3222" />
                <View style={styles.driverRatingContainer}>
                  <MaterialIcons name="star" size={14} color="#FFF" />
                  <Text style={styles.driverRatingText}>{driverRating}</Text>
                </View>
              </View>
              
              <View style={styles.driverDetails}>
                <Text style={styles.driverName}>{driverName}</Text>
                <View style={styles.vehicleInfo}>
                  <View style={styles.vehicleIcon}>
                    {getVehicleIcon()}
                  </View>
                  <Text style={styles.vehicleText}>{vehicleType} - {vehicleId}</Text>
                </View>
              </View>
            </View>
            
            {/* Estimated Arrival */}
            <View style={styles.arrivalContainer}>
              <Text style={styles.arrivalText}>
                {tripStatus === 'onTheWay' ? 'Estimasi tiba:' : 
                 tripStatus === 'inProgress' ? 'Estimasi sampai tujuan:' : 
                 tripStatus === 'arrived' ? 'Driver telah tiba' : 'Perjalanan selesai'}
              </Text>
              {(tripStatus === 'onTheWay' || tripStatus === 'inProgress') && (
                <Text style={styles.arrivalTime}>{estimatedArrival} menit</Text>
              )}
            </View>
            
            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={handleCancelTrip}
              disabled={tripStatus === 'completed'}
            >
              <Text style={styles.secondaryButtonText}>Batalkan</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.primaryButton, { backgroundColor: getStatusColor() }]}
              onPress={tripStatus === 'onTheWay' || tripStatus === 'inProgress' ? handleCallDriver : handleActionButtonPress}
            >
              <Text style={styles.primaryButtonText}>{getActionButtonText()}</Text>
            </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>
        
        {/* Cancel Trip Modal */}
        <Modal
          visible={showCancelModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowCancelModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Batalkan Perjalanan?</Text>
              <Text style={styles.modalText}>
                Apakah Anda yakin ingin membatalkan perjalanan ini? 
                Pembatalan yang terlalu sering dapat mempengaruhi akun Anda.
              </Text>
              
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity 
                  style={styles.modalCancelButton}
                  onPress={() => setShowCancelModal(false)}
                >
                  <Text style={styles.modalCancelButtonText}>Kembali</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.modalConfirmButton}
                  onPress={confirmCancelTrip}
                >
                  <Text style={styles.modalConfirmButtonText}>Ya, Batalkan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  pickupMarker: {
    backgroundColor: '#0F3222',
    borderWidth: 2,
    borderColor: '#B1944D',
  },
  driverMarkerContainer: {
    alignItems: 'center',
  },
  driverMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0F3222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverMarkerArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#0F3222',
    transform: [{ rotate: '180deg' }],
    marginTop: -4,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
  },
  bottomSheetGradient: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 15,
  },
  bookingId: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'serif',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    fontFamily: 'serif',
  },
  driverInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  driverAvatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    position: 'relative',
  },
  driverRatingContainer: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#B1944D',
    width: 24,
    height: 24,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverRatingText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
    marginBottom: 5,
    fontFamily: 'serif',
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0F3222',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  vehicleText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'serif',
  },
  arrivalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  arrivalText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'serif',
  },
  arrivalTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
    fontFamily: 'serif',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
  primaryButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'serif',
  },
  secondaryButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    marginRight: 10,
  },
  secondaryButtonText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'serif',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F3222',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  modalText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
    fontFamily: 'serif',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    marginRight: 10,
    alignItems: 'center',
  },
  modalCancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'serif',
  },
  modalConfirmButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#B1944D',
    marginLeft: 10,
    alignItems: 'center',
  },
  modalConfirmButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'serif',
  },
});

export default TrackingScreen;