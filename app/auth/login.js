// app/auth/login.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Easing
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  
  // Enhanced animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  
  // Background animations
  const circleScaleAnim = useRef(new Animated.Value(0.8)).current;
  const circlePositionAnim = useRef(new Animated.Value(-150)).current;
  const becakAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    // Start animations for all elements when component mounts
    Animated.parallel([
      // Hero widget animations
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      
      // Background animations
      Animated.timing(circleScaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(circlePositionAnim, {
        toValue: -100,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(becakAnim, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = () => {
    // Animate out before navigation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 300,
        useNativeDriver: true,
      }),
      // Animate circle and becak for seamless transition
      Animated.timing(circleScaleAnim, {
        toValue: 1.3,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(becakAnim, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.replace('/home');
    });
  };

  const handleSignUp = () => {
    // Animate out before navigation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 400,
        useNativeDriver: true,
      }),
      // Create an expanding circle effect
      Animated.timing(circleScaleAnim, {
        toValue: 1.2,
        duration: 400,
        useNativeDriver: true,
      }),
      // Move becak out of the way
      Animated.timing(becakAnim, {
        toValue: -30,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push('/auth/registrasi');
    });
  };

  return (
    <View style={styles.container}>
      {/* Becak Image with animation */}
      <Animated.Image 
        source={require('../../assets/images/becak.png')} 
        style={[
          styles.becakImage,
          {
            transform: [
              { translateX: becakAnim },
              { scale: Animated.add(0.9, Animated.multiply(fadeAnim, 0.1)) }
            ]
          }
        ]}
        resizeMode="contain"
      />
      
      {/* Green circle background with animation */}
      <Animated.View style={[
        styles.greenCircle,
        {
          transform: [
            { scale: circleScaleAnim },
            { translateX: circlePositionAnim }
          ]
        }
      ]} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          {/* Hero Widget - Login Form with Animations */}
          <Animated.View style={[
            styles.heroContainer,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: slideAnim }
              ]
            }
          ]}>
            <Text style={styles.heroTitle}>Welcome Back</Text>
            <Text style={styles.heroSubtitle}>Sign in to continue your journey</Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                style={styles.showPasswordButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.showPasswordText}>
                  {showPassword ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <LinearGradient
                colors={['#0F3222', '#1A4D2E']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.loginButtonText}>SIGN IN</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Sign Up Option */}
            <TouchableOpacity 
              style={styles.signUpContainer}
              onPress={handleSignUp}
            >
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <Text style={[styles.signUpText, styles.signUpLink]}>Sign Up</Text>
            </TouchableOpacity>
          </Animated.View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
  },
  becakImage: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 120,
    height: 120,
    zIndex: 2,
  },
  greenCircle: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(15, 50, 34, 0.1)',
    zIndex: 1,
  },
  heroContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 3,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F3222',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 20,
    fontFamily: 'serif',
    color: '#333',
    backgroundColor: '#FFF',
  },
  showPasswordButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  showPasswordText: {
    color: '#B1944D',
    fontFamily: 'serif',
    fontSize: 14,
  },
  loginButton: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonGradient: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: '#666',
    fontFamily: 'serif',
    fontSize: 14,
  },
  signUpLink: {
    color: '#0F3222',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;