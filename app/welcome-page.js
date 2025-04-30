// LoadingPage.js
import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Dimensions,
  Animated,
  ImageBackground
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

import { useRouter } from 'expo-router';

const WelcomePage = () => {
  const router = useRouter();

  // Animation values
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const loadingProgress = useRef(new Animated.Value(0)).current;
  const loadingWidth = loadingProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });
  
  useEffect(() => {
    // Initial animations
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        })
      ]),
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      })
    ]).start();
    
    // Loading bar animation
    Animated.timing(loadingProgress, {
      toValue: 100,
      duration: 3000, // 3 seconds to complete loading
      useNativeDriver: false
    }).start();
    
    // Navigate to next screen after loading completes
    const timer = setTimeout(() => {
      // Replace 'login' with the name of your login screen in expo-router
      router.replace('auth/login');
    }, 4000); // Time before navigating (a bit longer than loading animation)
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      {/* Background with batik pattern */}
      <ImageBackground 
        source={require('../assets/images/batik-pattern.png')}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.05 }}
      >
        {/* Header with Keraton-style */}
        {/* <View style={styles.header}>
          <LinearGradient
            colors={['#0F3222', '#0a2518']}
            style={styles.headerGradient}
          >
            <Text style={styles.headerText}>RodaTelu YOGYAKARTA</Text>
          </LinearGradient>
        </View> */}
      
        {/* Decorative elements */}
        <View style={styles.cornerOrnament1} />
        <View style={styles.cornerOrnament2} />
        <View style={styles.cornerOrnament3} />
        <View style={styles.cornerOrnament4} />
        
        {/* Main content */}
        <View style={styles.contentContainer}>
          <Animated.View 
            style={[
              styles.logoContainer, 
              { 
                opacity: logoOpacity,
                transform: [{ scale: logoScale }]
              }
            ]}
          >
            <Image 
              source={require('../assets/images/logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>
{/*           
          <Animated.View style={{ opacity: titleOpacity, alignItems: 'center' }}>
            <Text style={styles.title}>RodaTelu</Text>
            <Text style={styles.subtitle}>Bentor Premium Yogyakarta</Text>
            <Text style={styles.tagline}>Angkutan Tradisional, Sentuhan Kerajaan</Text>
          </Animated.View> */}
          
          {/* Loading Bar */}
          <View style={styles.loadingBarContainer}>
            <Animated.View 
              style={[
                styles.loadingBar,
                { width: loadingWidth }
              ]}
            />
          </View>
          <Text style={styles.loadingText}>Memuat...</Text>
        </View>
        
        {/* Footer with accent bar */}
        <View style={styles.footerContainer}>
          <View style={styles.footerAccent} />
          <Text style={styles.footer}>Sugeng Rawuh ing Yogyakarta</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 60,
    width: '100%',
    overflow: 'hidden',
  },
  headerGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  headerText: {
    color: '#B1944D',
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cornerOrnament1: {
    position: 'absolute',
    top: 70,
    left: 20,
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#B1944D',
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  cornerOrnament2: {
    position: 'absolute',
    top: 70,
    right: 20,
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#B1944D',
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  cornerOrnament3: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#B1944D',
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  cornerOrnament4: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#B1944D',
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  contentContainer: {
    flex: 1,
    width: width * 0.85,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontFamily: 'serif',
    fontSize: 42,
    fontWeight: 'bold',
    color: '#0F3222',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'serif',
    fontSize: 18,
    color: '#0F3222',
    textAlign: 'center',
    marginBottom: 10,
  },
  tagline: {
    fontFamily: 'serif',
    fontSize: 14,
    color: '#0F3222',
    textAlign: 'center',
    marginBottom: 40,
    fontStyle: 'italic',
  },
  loadingBarContainer: {
    width: '80%',
    height: 10,
    backgroundColor: 'rgba(177, 148, 77, 0.3)',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  loadingBar: {
    height: '100%',
    backgroundColor: '#B1944D',
  },
  loadingText: {
    fontFamily: 'serif',
    fontSize: 14,
    color: '#0F3222',
    fontStyle: 'italic',
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerAccent: {
    height: 3,
    width: '40%',
    backgroundColor: '#B1944D',
    marginBottom: 15,
  },
  footer: {
    color: '#0F3222',
    fontSize: 12,
    fontFamily: 'serif',
    fontStyle: 'italic',
  }
});

export default WelcomePage;