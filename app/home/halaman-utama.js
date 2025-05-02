// app/home/index.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  StatusBar,
  Platform,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState('ride');
  const [notifications, setNotifications] = useState(3);
  const [userName, setUserName] = useState('Bambang');
  const [balance, setBalance] = useState(250000);
  const [currentLocation, setCurrentLocation] = useState('Malioboro, Yogyakarta');
  const [recentDestinations, setRecentDestinations] = useState([
    { id: 1, name: 'Keraton Yogyakarta', distance: '2.3' },
    { id: 2, name: 'Taman Sari', distance: '3.1' },
    { id: 3, name: 'Alun-Alun Kidul', distance: '1.8' },
  ]);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(50)).current;
  const servicesAnim = useRef(new Animated.Value(0)).current;
  const mapFadeAnim = useRef(new Animated.Value(0)).current;
  
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Start main screen animations
    Animated.stagger(150, [
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideUpAnim, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.back(1.7)),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(servicesAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(mapFadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const formatCurrency = (value) => {
    return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const navigateToBooking = () => {
    router.push('/booking');
  };

  const navigateToProfile = () => {
    router.push('/profile');
  };

  const navigateToNotifications = () => {
    router.push('/notifications');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        
        {/* Compact Header */}
        <Animated.View style={[
          styles.header, 
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }
        ]}>
          <LinearGradient
            colors={['#0F3222', '#1A4D2E']}
            style={styles.headerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.headerContent}>
              <TouchableOpacity onPress={navigateToProfile} style={styles.userInfo}>
                <Image 
                  source={require('../../assets/images/becak.png')} 
                  style={styles.userAvatar}
                />
                <View>
                  <Text style={styles.welcomeText}>Halo,</Text>
                  <Text style={styles.userName}>{userName}</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={navigateToNotifications} style={styles.notificationButton}>
                <MaterialIcons name="notifications" size={24} color="#FFF" />
                {notifications > 0 && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationCount}>{notifications}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            
            <View style={styles.balanceContainer}>
              <LinearGradient
                colors={['#B1944D', '#D4BF83']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.balanceGradient}
              >
                <View style={styles.balanceTextContainer}>
                  <Text style={styles.balanceLabel}>BecakPay</Text>
                  <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
                </View>
                <TouchableOpacity style={styles.topUpButton}>
                  <Text style={styles.topUpText}>Top Up</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </LinearGradient>
        </Animated.View>
        
        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Map View */}
          <Animated.View style={[
            styles.mapContainer, 
            { 
              opacity: mapFadeAnim,
              transform: [{ translateY: slideUpAnim }]
            }
          ]}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: -7.803164,
                longitude: 110.364917,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              customMapStyle={customMapStyle}
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
            </MapView>
            
            <View style={styles.locationBar}>
              <MaterialIcons name="location-on" size={18} color="#0F3222" />
              <Text style={styles.locationText}>{currentLocation}</Text>
            </View>
          </Animated.View>
          
          {/* Services */}
          <Animated.View style={[
            styles.servicesContainer,
            {
              opacity: servicesAnim,
              transform: [{ translateY: slideUpAnim }],
            }
          ]}>
            <Text style={styles.sectionTitle}>Layanan Becak Royal</Text>
            
            <View style={styles.serviceOptions}>
              <TouchableOpacity 
                style={[
                  styles.serviceOption, 
                  selectedService === 'ride' && styles.selectedService
                ]}
                onPress={() => handleServiceSelect('ride')}
              >
                <View style={[
                  styles.serviceIconContainer,
                  selectedService === 'ride' && styles.selectedServiceIcon
                ]}>
                  <FontAwesome5 name="car-side" size={18} color={selectedService === 'ride' ? '#FFF' : '#0F3222'} />
                </View>
                <Text style={[
                  styles.serviceText,
                  selectedService === 'ride' && styles.selectedServiceText
                ]}>BecakRide</Text>
              </TouchableOpacity>
        
            <TouchableOpacity 
            style={[
                styles.serviceOption, 
                selectedService === 'andong' && styles.selectedService
            ]}
            onPress={() => handleServiceSelect('andong')}
            >
            <View style={[
                styles.serviceIconContainer,
                selectedService === 'andong' && styles.selectedServiceIcon
            ]}>
                <FontAwesome5 name="horse" size={20} color={selectedService === 'andong' ? '#FFF' : '#0F3222'} />
            </View>
            <Text style={[
                styles.serviceText,
                selectedService === 'andong' && styles.selectedServiceText
            ]}>Andong</Text>
            </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.serviceOption, 
                  selectedService === 'tour' && styles.selectedService
                ]}
                onPress={() => handleServiceSelect('tour')}
              >
                <View style={[
                  styles.serviceIconContainer,
                  selectedService === 'tour' && styles.selectedServiceIcon
                ]}>
                  <MaterialIcons name="tour" size={20} color={selectedService === 'tour' ? '#FFF' : '#0F3222'} />
                </View>
                <Text style={[
                  styles.serviceText,
                  selectedService === 'tour' && styles.selectedServiceText
                ]}>BecakTour</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={navigateToBooking}
            >
              <LinearGradient
                colors={['#0F3222', '#1A4D2E']}
                style={styles.bookButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.bookButtonText}>
                  {selectedService === 'ride' ? 'PESAN BECAK SEKARANG' : 
                   selectedService === 'horse' ? 'PESAN ' : 'JADWALKAN WISATA'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
          
          {/* Recent Destinations */}
          <Animated.View style={[
            styles.recentDestinations,
            {
              opacity: servicesAnim,
              transform: [{ translateY: slideUpAnim }],
            }
          ]}>
            <Text style={styles.sectionTitle}>Destinasi Terakhir</Text>
            
            {recentDestinations.map((destination) => (
              <TouchableOpacity 
                key={destination.id}
                style={styles.destinationItem}
                onPress={() => {
                  setCurrentLocation(destination.name);
                  setTimeout(() => navigateToBooking(), 500);
                }}
              >
                <View style={styles.destinationIconContainer}>
                  <MaterialIcons name="place" size={22} color="#0F3222" />
                </View>
                <View style={styles.destinationInfo}>
                  <Text style={styles.destinationName}>{destination.name}</Text>
                  <Text style={styles.destinationDistance}>{destination.distance} km dari lokasi anda</Text>
                </View>
                <MaterialIcons name="chevron-right" size={22} color="#0F3222" />
              </TouchableOpacity>
            ))}
          </Animated.View>
          
          {/* Promo Banner */}
          <Animated.View style={[
            styles.promoBanner,
            {
              opacity: servicesAnim,
              transform: [{ translateY: slideUpAnim }],
            }
          ]}>
            <LinearGradient
              colors={['#B1944D', '#D4BF83']}
              style={styles.promoGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.promoContent}>
                <View>
                  <Text style={styles.promoTitle}>Promo Royal!</Text>
                  <Text style={styles.promoDescription}>Diskon 20% untuk perjalanan pertama anda dengan Becak Royal</Text>
                  <TouchableOpacity style={styles.promoButton}>
                    <Text style={styles.promoButtonText}>Klaim Sekarang</Text>
                  </TouchableOpacity>
                </View>
                <Image 
                  source={require('../../assets/images/becak.png')} 
                  style={styles.promoBecakImage}
                  resizeMode="contain"
                />
              </View>
            </LinearGradient>
          </Animated.View>
        </ScrollView>
        
        {/* Bottom Navigation - Integrated with phone bottom */}
        <Animated.View style={[
          styles.bottomNav,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }],
          }
        ]}>
          <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => console.log('Home')}
          >
            <MaterialIcons 
              name="home" 
              size={24} 
              color="#0F3222" 
              style={styles.navIcon}
            />
            <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => router.push('/history')}
          >
            <MaterialIcons 
              name="history" 
              size={22} 
              color="#999" 
              style={styles.navIcon}
            />
            <Text style={styles.navText}>History</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => router.push('/riwayat-pesan')}
          >
            <MaterialIcons 
              name="chat" 
              size={22} 
              color="#999" 
              style={styles.navIcon}
            />
            <Text style={styles.navText}>Pesan</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => router.push('/account')}
          >
            <MaterialIcons 
              name="person" 
              size={22} 
              color="#999" 
              style={styles.navIcon}
            />
            <Text style={styles.navText}>Akun</Text>
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
  scrollContent: {
    paddingBottom: 80, // Space for bottom navigation
  },
  header: {
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    zIndex: 10,
  },
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight + 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
    tintColor: '#B1944D',
  },
  welcomeText: {
    color: '#B1944D',
    fontSize: 11,
    fontFamily: 'serif',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  notificationButton: {
    position: 'relative',
    padding: 5,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#B1944D',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  balanceContainer: {
    marginTop: 5,
  },
  balanceGradient: {
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceTextContainer: {
    flex: 1,
  },
  balanceLabel: {
    color: '#0F3222',
    fontSize: 13,
    fontFamily: 'serif',
    marginBottom: 3,
  },
  balanceAmount: {
    color: '#0F3222',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  topUpButton: {
    backgroundColor: '#0F3222',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  topUpText: {
    color: '#B1944D',
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mapContainer: {
    height: 180,
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
  locationBar: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationText: {
    marginLeft: 5,
    fontSize: 13,
    color: '#333',
    fontFamily: 'serif',
  },
  servicesContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F3222',
    marginBottom: 12,
    fontFamily: 'serif',
  },
  serviceOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  serviceOption: {
    backgroundColor: '#FFF',
    width: width / 3.5,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedService: {
    backgroundColor: '#0F3222',
  },
  serviceIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  selectedServiceIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  serviceText: {
    fontSize: 13,
    color: '#333',
    fontFamily: 'serif',
    marginTop: 3,
  },
  selectedServiceText: {
    color: '#FFF',
  },
  bookButton: {
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 5,
  },
  bookButtonGradient: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFF',
    fontFamily: 'serif',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  recentDestinations: {
    marginTop: 20,
  },
  destinationItem: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  destinationIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(177, 148, 77, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  destinationInfo: {
    flex: 1,
  },
  destinationName: {
    fontSize: 15,
    color: '#333',
    fontFamily: 'serif',
  },
  destinationDistance: {
    fontSize: 11,
    color: '#999',
    fontFamily: 'serif',
    marginTop: 3,
  },
  promoBanner: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  promoGradient: {
    padding: 15,
  },
  promoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F3222',
    fontFamily: 'serif',
  },
  promoDescription: {
    fontSize: 13,
    color: '#0F3222',
    fontFamily: 'serif',
    marginTop: 3,
    width: '70%',
  },
  promoButton: {
    backgroundColor: '#0F3222',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: '#B1944D',
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  promoBecakImage: {
    width: 70,
    height: 70,
    tintColor: '#0F3222',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  navIcon: {
    marginBottom: 3,
  },
  navText: {
    fontSize: 11,
    color: '#999',
    fontFamily: 'serif',
  },
  activeNavText: {
    color: '#0F3222',
    fontWeight: 'bold',
  },
});
const customMapStyle = [
];

export default HomeScreen;