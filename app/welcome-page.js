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

const { width, height } = Dimensions.get('window');
import { useRouter } from 'expo-router';

const WelcomePage = () => {
  const router = useRouter();

  // Animation values
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  
  useEffect(() => {
    // Initial animations
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
    ]).start();
    
    // Navigate to next screen after delay
    const timer = setTimeout(() => {
      router.replace('auth/login');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../assets/images/batik-pattern.png')}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.05 }}
      >
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
              source={require('../assets/images/logobecak.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.javaneseText}>ꦫꦺꦴꦢꦠꦺꦭꦸ</Text>
          </Animated.View>
        </View>
        
        <View style={styles.footerContainer}>
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
  },
  javaneseText: {
    fontFamily: 'Noto Sans Javanese', // Ensure this font is loaded
    fontSize: 24,
    color: '#0F3222', // Green color as requested
    marginTop: 10,
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  footer: {
    color: '#0F3222',
    fontSize: 14,
    fontFamily: 'serif',
    fontStyle: 'italic',
  }
});

export default WelcomePage;