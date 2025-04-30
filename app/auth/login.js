// app/auth/login.js
import React, { useState } from 'react';
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
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login attempted with:', email, password);
    // For now, just navigate to home/dashboard
    router.replace('/home');
  };

  const handleSignUp = () => {
    router.push('/auth/registrasi');
  };

  return (
    <View style={styles.container}>
      {/* Becak Image in top right corner */}
      <Image 
        source={require('../../assets/images/becak.png')} 
        style={styles.becakImage}
        resizeMode="contain"
      />
      
      {/* Green circle background */}
      <View style={styles.greenCircle} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          {/* Hero Widget - Login Form */}
          <View style={styles.heroContainer}>
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
          </View>
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