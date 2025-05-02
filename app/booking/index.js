// app/booking/index.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  Easing,
  StatusBar,
  Platform,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather, MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width, height } = Dimensions.get('window');

const BookingScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [serviceType, setServiceType] = useState(params.service || 'ride');
  
  // Form states
  const [pickupLocation, setPickupLocation] = useState('Malioboro, Yogyakarta');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('becakpay');
  const [notes, setNotes] = useState('');
  const [driverPreference, setDriverPreference] = useState('any');
  
  // Loading and animation states
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(30)).current;
  
  // Popular destinations
  const [popularDestinations, setPopularDestinations] = useState([
    { id: 1, name: 'Keraton Yogyakarta', address: 'Jl. Rotowijayan Blok No. 1' },
    { id: 2, name: 'Taman Sari', address: 'Jl. Tamansari, Patehan' },
    { id: 3, name: 'Alun-Alun Kidul', address: 'Jl. Alun-Alun' },
    { id: 4, name: 'Malioboro Mall', address: 'Jl. Malioboro No. 52-58' },
  ]);
  
  // Driver options for tours
  const [driverOptions, setDriverOptions] = useState([
    { id: 1, name: 'Pak Santoso', rating: 4.9, experience: '5 tahun', photo: null, available: true },
    { id: 2, name: 'Pak Widodo', rating: 4.8, experience: '7 tahun', photo: null, available: true },
    { id: 3, name: 'Pak Bambang', rating: 4.7, experience: '3 tahun', photo: null, available: false },
  ]);
  
  // Selected driver for tour
  const [selectedDriver, setSelectedDriver] = useState(null);
  
  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.back(1.7)),
        useNativeDriver: true,
      }),
    ]).start();
    
    // Calculate estimated trip details based on service type
    calculateEstimates();
  }, [dropoffLocation, serviceType]);

  // Calculate estimates based on service type and locations
  const calculateEstimates = () => {
    if (dropoffLocation) {
      // In a real app, this would call a distance matrix API
      // For demo purposes, we'll use mock data
      if (serviceType === 'ride') {
        // Simple becak ride
        setDistance(2.5); // km
        setDuration(15); // minutes
        setPrice(25000); // IDR
      } else if (serviceType === 'andong') {
        // Andong ride
        setDistance(2.5);
        setDuration(20);
        setPrice(40000);
      } else if (serviceType === 'tour') {
        // Tour package
        setDistance(5.0);
        setDuration(120); // 2 hours tour
        setPrice(150000);
      }
    }
  };

  const formatCurrency = (value) => {
    return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} menit`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 
        ? `${hours} jam ${remainingMinutes} menit` 
        : `${hours} jam`;
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const selectDestination = (destination) => {
    setDropoffLocation(destination.name);
  };

  const selectDriver = (driver) => {
    if (driver.available) {
      setSelectedDriver(driver);
    }
  };

  const navigateBack = () => {
    router.back();
  };

  const handleBookNow = () => {
    // Show loading indicator
    setIsLoading(true);
    
    // In a real app, this would send the booking to an API
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to confirmation screen
      router.push({
        pathname: '/confirmation',
        params: {
          serviceType,
          pickupLocation,
          dropoffLocation,
          price
        }
      });
    }, 1500);
  };

  const getServiceTypeTitle = () => {
    switch(serviceType) {
      case 'ride': return 'Pesan Becak';
      case 'andong': return 'Pesan Andong';
      case 'tour': return 'Becak Tour';
      default: return 'Pesan';
    }
  };

  const getServiceTypeIcon = () => {
    switch(serviceType) {
      case 'ride': return <FontAwesome5 name="car-side" size={18} color="#FFF" />;
      case 'andong': return <FontAwesome5 name="horse" size={18} color="#FFF" />;
      case 'tour': return <MaterialIcons name="tour" size={18} color="#FFF" />;
      default: return <FontAwesome5 name="car-side" size={18} color="#FFF" />;
    }
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
            <View style={styles.titleContainer}>
              <View style={styles.serviceTypeIconContainer}>
                {getServiceTypeIcon()}
              </View>
              <Text style={styles.headerTitle}>{getServiceTypeTitle()}</Text>
            </View>
            <View style={{width: 24}} />
          </View>
        </LinearGradient>
        
        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Map Preview */}
          <Animated.View style={[
            styles.mapContainer, 
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }]
            }
          ]}>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: -7.803164,
                longitude: 110.364917,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{ latitude: -7.803164, longitude: 110.364917 }}
                title="Lokasi Anda"
                description="Malioboro, Yogyakarta"
              >
                <View style={styles.markerContainer}>
                  <View style={styles.markerDot} />
                </View>
              </Marker>
              
              {dropoffLocation && (
                <Marker
                  coordinate={{ latitude: -7.800000, longitude: 110.360000 }}
                  title={dropoffLocation}
                  pinColor="#B1944D"
                >
                  <View style={styles.destinationMarkerContainer}>
                    <MaterialIcons name="place" size={22} color="#B1944D" />
                  </View>
                </Marker>
              )}
            </MapView>
          </Animated.View>
          
          {/* Location Inputs */}
          <Animated.View style={[
            styles.locationInputsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }]
            }
          ]}>
            <View style={styles.locationInputWrapper}>
              <View style={styles.locationIconContainer}>
                <View style={[styles.locationDot, styles.pickupDot]} />
              </View>
              <TextInput
                style={styles.locationInput}
                value={pickupLocation}
                onChangeText={setPickupLocation}
                placeholder="Lokasi penjemputan"
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.locationDivider} />
            
            <View style={styles.locationInputWrapper}>
              <View style={styles.locationIconContainer}>
                <MaterialIcons name="place" size={20} color="#B1944D" />
              </View>
              <TextInput
                style={styles.locationInput}
                value={dropoffLocation}
                onChangeText={setDropoffLocation}
                placeholder="Lokasi tujuan"
                placeholderTextColor="#999"
              />
            </View>
          </Animated.View>
          
          {/* Popular Destinations */}
          <Animated.View style={[
            styles.popularDestinations,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }]
            }
          ]}>
            <Text style={styles.sectionTitle}>Destinasi Populer</Text>
            <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.popularDestinationsContent}
            >
              {popularDestinations.map((destination) => (
                <TouchableOpacity 
                  key={destination.id}
                  style={[
                    styles.popularDestinationItem,
                    dropoffLocation === destination.name && styles.selectedDestination
                  ]}
                  onPress={() => selectDestination(destination)}
                >
                  <MaterialIcons 
                    name="place" 
                    size={18} 
                    color={dropoffLocation === destination.name ? "#FFF" : "#0F3222"} 
                  />
                  <Text style={[
                    styles.popularDestinationName,
                    dropoffLocation === destination.name && styles.selectedDestinationText
                  ]}>
                    {destination.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
          
          {/* Date and Time Selection (for tours and scheduled rides) */}
          {(serviceType === 'tour' || serviceType === 'andong') && (
            <Animated.View style={[
              styles.dateTimeContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideUpAnim }]
              }
            ]}>
              <Text style={styles.sectionTitle}>Jadwal</Text>
              <View style={styles.dateTimeSelectors}>
                <TouchableOpacity 
                  style={styles.dateSelector}
                  onPress={() => setShowDatePicker(true)}
                >
                  <MaterialIcons name="calendar-today" size={18} color="#0F3222" />
                  <Text style={styles.dateTimeText}>
                    {date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.timeSelector}
                  onPress={() => setShowTimePicker(true)}
                >
                  <MaterialIcons name="access-time" size={18} color="#0F3222" />
                  <Text style={styles.dateTimeText}>
                    {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </TouchableOpacity>
              </View>
              
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              )}
              
              {showTimePicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  display="default"
                  onChange={handleTimeChange}
                />
              )}
            </Animated.View>
          )}
          
          {/* Driver Selection (for tours) */}
          {serviceType === 'tour' && (
            <Animated.View style={[
              styles.driversContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideUpAnim }]
              }
            ]}>
              <Text style={styles.sectionTitle}>Pilih Pemandu Wisata</Text>
              <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.driversContent}
              >
                {driverOptions.map((driver) => (
                  <TouchableOpacity 
                    key={driver.id}
                    style={[
                      styles.driverItem,
                      selectedDriver?.id === driver.id && styles.selectedDriver,
                      !driver.available && styles.unavailableDriver
                    ]}
                    onPress={() => selectDriver(driver)}
                    disabled={!driver.available}
                  >
                    <View style={styles.driverAvatarContainer}>
                      {driver.photo ? (
                        <Image source={driver.photo} style={styles.driverAvatar} />
                      ) : (
                        <MaterialIcons name="person" size={32} color={driver.available ? "#0F3222" : "#999"} />
                      )}
                    </View>
                    <Text style={[
                      styles.driverName,
                      selectedDriver?.id === driver.id && styles.selectedDriverText,
                      !driver.available && styles.unavailableDriverText
                    ]}>
                      {driver.name}
                    </Text>
                    <View style={styles.driverRating}>
                      <MaterialIcons 
                        name="star" 
                        size={14} 
                        color={driver.available ? 
                          (selectedDriver?.id === driver.id ? "#FFF" : "#B1944D") 
                          : "#999"
                        } 
                      />
                      <Text style={[
                        styles.driverRatingText,
                        selectedDriver?.id === driver.id && styles.selectedDriverText,
                        !driver.available && styles.unavailableDriverText
                      ]}>
                        {driver.rating}
                      </Text>
                    </View>
                    <Text style={[
                      styles.driverExperience,
                      selectedDriver?.id === driver.id && styles.selectedDriverText,
                      !driver.available && styles.unavailableDriverText
                    ]}>
                      {driver.experience}
                    </Text>
                    {!driver.available && (
                      <Text style={styles.unavailableText}>Tidak Tersedia</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Animated.View>
          )}
          
          {/* Additional Notes */}
          <Animated.View style={[
            styles.notesContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }]
            }
          ]}>
            <Text style={styles.sectionTitle}>Catatan Tambahan</Text>
            <TextInput
              style={styles.notesInput}
              value={notes}
              onChangeText={setNotes}
              placeholder="Tambahkan catatan untuk driver (opsional)"
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
            />
          </Animated.View>
          
          {/* Payment Method Selection */}
          <Animated.View style={[
            styles.paymentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }]
            }
          ]}>
            <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
            <View style={styles.paymentOptions}>
              <TouchableOpacity 
                style={[
                  styles.paymentOption,
                  paymentMethod === 'becakpay' && styles.selectedPayment
                ]}
                onPress={() => setPaymentMethod('becakpay')}
              >
                <LinearGradient
                  colors={paymentMethod === 'becakpay' ? ['#B1944D', '#D4BF83'] : ['#F8F8F8', '#F8F8F8']}
                  style={styles.paymentGradient}
                >
                  <Text style={[
                    styles.paymentText,
                    paymentMethod === 'becakpay' && styles.selectedPaymentText
                  ]}>
                    BecakPay
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.paymentOption,
                  paymentMethod === 'cash' && styles.selectedPayment
                ]}
                onPress={() => setPaymentMethod('cash')}
              >
                <LinearGradient
                  colors={paymentMethod === 'cash' ? ['#B1944D', '#D4BF83'] : ['#F8F8F8', '#F8F8F8']}
                  style={styles.paymentGradient}
                >
                  <Text style={[
                    styles.paymentText,
                    paymentMethod === 'cash' && styles.selectedPaymentText
                  ]}>
                    Tunai
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>
          
          {/* Order Summary */}
          {dropoffLocation && (
            <Animated.View style={[
              styles.summaryContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideUpAnim }]
              }
            ]}>
              <LinearGradient
                colors={['#F0F0F0', '#F8F8F8']}
                style={styles.summaryGradient}
              >
                <Text style={styles.summaryTitle}>Ringkasan Pesanan</Text>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Jarak</Text>
                  <Text style={styles.summaryValue}>{distance} km</Text>
                </View>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Durasi Perjalanan</Text>
                  <Text style={styles.summaryValue}>{formatDuration(duration)}</Text>
                </View>
                
                <View style={styles.summaryDivider} />
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Harga</Text>
                  <Text style={styles.summaryPrice}>{formatCurrency(price)}</Text>
                </View>
              </LinearGradient>
            </Animated.View>
          )}
        </ScrollView>
        
        {/* Bottom Booking Button */}
        <Animated.View style={[
          styles.bottomButtonContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }
        ]}>
          <TouchableOpacity
            style={[
              styles.bookButton,
              (!dropoffLocation || isLoading) && styles.disabledButton
            ]}
            onPress={handleBookNow}
            disabled={!dropoffLocation || isLoading}
          >
            <LinearGradient
              colors={['#0F3222', '#1A4D2E']}
              style={styles.bookButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {isLoading ? (
                <Text style={styles.bookButtonText}>MEMPROSES...</Text>
              ) : (
                <>
                  <Text style={styles.bookButtonText}>
                    {serviceType === 'tour' ? 'JADWALKAN WISATA' : 'PESAN SEKARANG'}
                  </Text>
                  {dropoffLocation && (
                    <Text style={styles.bookButtonPrice}>{formatCurrency(price)}</Text>
                  )}
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceTypeIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
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
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom button
  },
  mapContainer: {
    height: 160,
    marginTop: 15,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
  },
  markerDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#0F3222',
    borderWidth: 2,
    borderColor: '#B1944D',
  },
  destinationMarkerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationInputsContainer: {
    marginTop: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  locationInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  locationIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  pickupDot: {
    backgroundColor: '#0F3222',
  },
  locationInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    fontFamily: 'serif',
  },
  locationDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 5,
    marginLeft: 40,
  },
  popularDestinations: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
    marginBottom: 10,
    fontFamily: 'serif',
  },
  popularDestinationsContent: {
    paddingRight: 20,
  },
  popularDestinationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedDestination: {
    backgroundColor: '#0F3222',
  },
  popularDestinationName: {
    fontSize: 13,
    color: '#333',
    marginLeft: 5,
    fontFamily: 'serif',
  },
  selectedDestinationText: {
    color: '#FFFFFF',
  },
  dateTimeContainer: {
    marginTop: 20,
  },
  dateTimeSelectors: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  timeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dateTimeText: {
    fontSize: 13,
    color: '#333',
    marginLeft: 8,
    fontFamily: 'serif',
  },
  driversContainer: {
    marginTop: 20,
  },
  driversContent: {
    paddingRight: 20,
  },
  driverItem: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedDriver: {
    backgroundColor: '#0F3222',
  },
  unavailableDriver: {
    backgroundColor: '#F0F0F0',
    opacity: 0.7,
  },
  driverAvatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  driverName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
    fontFamily: 'serif',
    textAlign: 'center',
  },
  driverRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  driverRatingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 2,
    fontFamily: 'serif',
  },
  driverExperience: {
    fontSize: 11,
    color: '#666',
    fontFamily: 'serif',
  },
  selectedDriverText: {
    color: '#FFFFFF',
  },
  unavailableDriverText: {
    color: '#999',
  },
  unavailableText: {
    fontSize: 10,
    color: '#FF6B6B',
    marginTop: 5,
    fontFamily: 'serif',
  },
  notesContainer: {
    marginTop: 20,
  },
  notesInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'top',
    fontFamily: 'serif',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    height: 80,
  },
  paymentContainer: {
    marginTop: 20,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentOption: {
    width: '48%',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  paymentGradient: {
    padding: 12,
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'serif',
  },
  selectedPaymentText: {
    color: '#0F3222',
  },
  summaryContainer: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryGradient: {
    padding: 15,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
    marginBottom: 10,
    fontFamily: 'serif',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'serif',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    fontFamily: 'serif',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  summaryPrice: {
    fontSize: 16,
    color: '#0F3222',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#F8F8F8',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  bookButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.6,
  },
  bookButtonGradient: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFF',
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  bookButtonPrice: {
    color: '#B1944D',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: 'serif',
  },
  // Add any additional styles if needed
});

export default BookingScreen;