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
  SafeAreaView,
  I18nManager
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 160;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 80 : 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const HomeScreen = () => {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState('ride');
  const [notifications, setNotifications] = useState(3);
  const [userName, setUserName] = useState('Bambang');
  const [balance, setBalance] = useState(250000);
  const [currentLocation, setCurrentLocation] = useState('Malioboro, Yogyakarta');
  const [recentDestinations, setRecentDestinations] = useState([
    { id: 1, name: 'Keraton Yogyakarta', distance: '2.3', icon: 'palace' },
    { id: 2, name: 'Taman Sari', distance: '3.1', icon: 'water' },
    { id: 3, name: 'Alun-Alun Kidul', distance: '1.8', icon: 'star' },
  ]);
  
  // Animation values
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  
  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });
  
  const headerTitleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });
  
  const heroContentOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

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

  const renderServiceIcon = (service) => {
    switch(service) {
      case 'ride':
        return <FontAwesome5 name="car-side" size={20} color={selectedService === 'ride' ? '#FFF' : '#0F3222'} />;
      case 'andong':
        return <FontAwesome5 name="horse" size={20} color={selectedService === 'andong' ? '#FFF' : '#0F3222'} />;
      case 'tour':
        return <MaterialIcons name="tour" size={20} color={selectedService === 'tour' ? '#FFF' : '#0F3222'} />;
      default:
        return <FontAwesome5 name="car-side" size={20} color="#0F3222" />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F3222" />
      
      {/* Fixed Header Background */}
      <Animated.View style={[styles.headerBackground, { height: headerHeight }]} />
      
      {/* Main Scroll Content */}
          <Animated.ScrollView
      contentContainerStyle={[styles.scrollContent, { paddingTop: HEADER_MAX_HEIGHT }]}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      showsVerticalScrollIndicator={false}
    >

        {/* Map View */}
        <View style={styles.mapContainer}>
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
                <View style={styles.markerPulse} />
                <View style={styles.markerDot}>
                  <Ionicons name="location" size={12} color="#FFF" />
                </View>
              </View>
            </Marker>
          </MapView>
          
          <View style={styles.locationBar}>
            <Ionicons name="location-sharp" size={16} color="#0F3222" />
            <Text style={styles.locationText} numberOfLines={1}>{currentLocation}</Text>
            <TouchableOpacity style={styles.locationRefresh}>
              <Ionicons name="refresh" size={16} color="#0F3222" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Services Section */}
        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>Layanan Becak Royal</Text>
          
          <View style={styles.serviceOptions}>
            {['ride', 'andong', 'tour'].map((service) => (
              <TouchableOpacity 
                key={service}
                style={[
                  styles.serviceOption, 
                  selectedService === service && styles.selectedService
                ]}
                onPress={() => handleServiceSelect(service)}
              >
                <View style={[
                  styles.serviceIconContainer,
                  selectedService === service && styles.selectedServiceIcon
                ]}>
                  {renderServiceIcon(service)}
                </View>
                <Text style={[
                  styles.serviceText,
                  selectedService === service && styles.selectedServiceText
                ]}>
                  {service === 'ride' ? 'BecakRide' : 
                   service === 'andong' ? 'Andong' : 'BecakTour'}
                </Text>
              </TouchableOpacity>
            ))}
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
                 selectedService === 'andong' ? 'PESAN ANDONG' : 'JADWALKAN WISATA'}
              </Text>
              <Ionicons name="arrow-forward" size={18} color="#FFF" style={styles.bookButtonIcon} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        
        {/* Recent Destinations */}
        <View style={styles.recentDestinations}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Destinasi Terakhir</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          
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
                <Ionicons name={destination.icon} size={18} color="#0F3222" />
              </View>
              <View style={styles.destinationInfo}>
                <Text style={styles.destinationName}>{destination.name}</Text>
                <Text style={styles.destinationDistance}>{destination.distance} km dari lokasi anda</Text>
              </View>
              <Ionicons 
                name={I18nManager.isRTL ? 'chevron-back' : 'chevron-forward'} 
                size={20} 
                color="#999" 
              />
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <LinearGradient
            colors={['#B1944D', '#D4BF83']}
            style={styles.promoGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.promoContent}>
              <View style={styles.promoTextContainer}>
                <View style={styles.promoTag}>
                  <Text style={styles.promoTagText}>PROMO</Text>
                </View>
                <Text style={styles.promoTitle}>Royal Discount!</Text>
                <Text style={styles.promoDescription}>Diskon 20% untuk perjalanan pertama anda dengan Becak Royal</Text>
                <TouchableOpacity style={styles.promoButton}>
                  <Text style={styles.promoButtonText}>Klaim Sekarang</Text>
                  <Ionicons name="arrow-forward" size={14} color="#0F3222" />
                </TouchableOpacity>
              </View>
                <Image 
                  source={require('../../../assets/images/becak.png')} 
                  style={styles.promoBecakImage}
                  resizeMode="contain"
                />
            </View>
          </LinearGradient>
        </View>
      </Animated.ScrollView>
      
      {/* Animated Header Content */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <LinearGradient
          colors={['#0F3222', '#1A4D2E']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {/* Hero Content (disappears when scrolling) */}
          <Animated.View style={[
            styles.heroContent,
            { 
              opacity: heroContentOpacity,
              transform: [{ translateY: headerTitleTranslateY }]
            }
          ]}>
            <View style={styles.headerContent}>
              <TouchableOpacity onPress={navigateToProfile} style={styles.userInfo}>
                <Image 
                  source={require('../../../assets/images/becak.png')} 
                  style={styles.userAvatar}
                />
                <View style={styles.userTextContainer}>
                  <Text style={styles.welcomeText}>Halo,</Text>
                  <Text style={styles.userName}>{userName}</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={navigateToNotifications} style={styles.notificationButton}>
                <Ionicons name="notifications-outline" size={24} color="#FFF" />
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
                  <Ionicons name="chevron-forward" size={16} color="#B1944D" />
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </Animated.View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0F3222',
    overflow: 'hidden',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex: 100,
    elevation: 10,
  },
  headerGradient: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
    paddingHorizontal: 10,
    
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    justifyContent: 'flex-start', // Diubah dari 'center' menjadi 'flex-start'
    paddingTop: 0, 
  },
  collapsedHeader: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 10,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  collapsedHeaderTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 0,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -30,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    tintColor: '#B1944D',
  },
  userTextContainer: {
    justifyContent: 'center',
  },
  welcomeText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  notificationButton: {
    position: 'relative',
    padding: 5,
    marginTop: -35,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#B1944D',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  balanceContainer: {
    marginTop: 5,
  },
  balanceGradient: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceTextContainer: {
    flex: 1,
  },
  balanceLabel: {
    color: '#0F3222',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginBottom: 4,
  },
  balanceAmount: {
    color: '#0F3222',
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  topUpButton: {
    backgroundColor: '#0F3222',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topUpText: {
    color: '#B1944D',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    marginRight: 5,
  },
  scrollContent: {
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  mapContainer: {
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerPulse: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(177, 148, 77, 0.3)',
  },
  markerDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0F3222',
    borderWidth: 3,
    borderColor: '#B1944D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationBar: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
  locationRefresh: {
    marginLeft: 10,
    padding: 5,
  },
  servicesContainer: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F3222',
    fontFamily: 'Poppins-SemiBold',
  },
  seeAllText: {
    fontSize: 13,
    color: '#B1944D',
    fontFamily: 'Poppins-Medium',
  },
  serviceOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  serviceOption: {
    backgroundColor: '#FFF',
    width: width / 3.5,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  selectedService: {
    backgroundColor: '#0F3222',
    shadowColor: '#B1944D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedServiceIcon: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  serviceText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Medium',
  },
  selectedServiceText: {
    color: '#FFF',
  },
  bookButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
    shadowColor: '#0F3222',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  bookButtonGradient: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bookButtonText: {
    color: '#FFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  bookButtonIcon: {
    marginLeft: 8,
  },
  recentDestinations: {
    marginBottom: 25,
  },
  destinationItem: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  destinationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  destinationInfo: {
    flex: 1,
  },
  destinationName: {
    fontSize: 15,
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
  destinationDistance: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Poppins-Regular',
    marginTop: 3,
  },
  promoBanner: {
    marginBottom: 30,
  },
  promoGradient: {
    padding: 20,
  },
  promoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promoTextContainer: {
    flex: 1,
  },
  promoTag: {
    backgroundColor: '#0F3222',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 8,
  },
  promoTagText: {
    color: '#B1944D',
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F3222',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 5,
  },
  promoDescription: {
    fontSize: 13,
    color: '#0F3222',
    fontFamily: 'Poppins-Regular',
    marginBottom: 12,
    opacity: 0.9,
  },
  promoButton: {
    backgroundColor: '#0F3222',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: '#B1944D',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    marginRight: 5,
  },
  promoBecakImage: {
    width: 100,
    height: 80,
    marginLeft: 15,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Poppins-Medium',
  },
  activeNavText: {
    color: '#0F3222',
    fontWeight: '600',
  },
});

const customMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
];

export default HomeScreen;