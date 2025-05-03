// app/settings/index.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  StatusBar,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const userData = {
    name: 'Bambang Surya',
    phone: '+62 812-3456-7890',
    email: 'bambang@becakroyal.com',
    memberSince: 'Januari 2023',
    avatar: require('../../assets/images/becak.png'),
  };

  const handleLogout = async () => {
    Alert.alert(
      'Konfirmasi Logout',
      'Apakah Anda yakin ingin keluar dari akun?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Keluar',
          style: 'destructive',
          onPress: async () => {
            try {
              // Hapus token/auth state dari AsyncStorage
              await AsyncStorage.removeItem('userToken');
              
              // Redirect ke halaman login
              router.replace('/login');
              
              // Tampilkan notifikasi
              Alert.alert('Berhasil', 'Anda telah keluar dari akun');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Gagal melakukan logout');
            }
          },
        },
      ]
    );
  };

  const settingsSections = [
    {
      title: 'Akun Saya',
      icon: <Ionicons name="person" size={22} color="#B1944D" />,
      items: [
        {
          title: 'Profil Saya',
          icon: <Feather name="user" size={20} color="#0F3222" />,
          action: () => router.push('/settings/profile')
        },
        {
          title: 'Ubah Password',
          icon: <MaterialIcons name="lock" size={20} color="#0F3222" />,
          action: () => router.push('/settings/change-password')
        },
        {
          title: 'Alamat Saya',
          icon: <MaterialIcons name="location-on" size={20} color="#0F3222" />,
          action: () => router.push('/settings/address')
        }
      ]
    },
    {
      title: 'Keamanan',
      icon: <Ionicons name="shield" size={22} color="#B1944D" />,
      items: [
        {
          title: 'Login Biometrik',
          icon: <MaterialIcons name="fingerprint" size={20} color="#0F3222" />,
          rightComponent: (
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              thumbColor={biometricEnabled ? "#B1944D" : "#f4f3f4"}
              trackColor={{ false: "#E0E0E0", true: "#0F3222" }}
            />
          )
        },
        {
          title: 'Notifikasi',
          icon: <Ionicons name="notifications" size={20} color="#0F3222" />,
          rightComponent: (
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              thumbColor={notificationsEnabled ? "#B1944D" : "#f4f3f4"}
              trackColor={{ false: "#E0E0E0", true: "#0F3222" }}
            />
          )
        }
      ]
    },
    {
      title: 'Lainnya',
      icon: <Ionicons name="ellipsis-horizontal" size={22} color="#B1944D" />,
      items: [
        {
          title: 'Bantuan',
          icon: <Ionicons name="help-circle" size={20} color="#0F3222" />,
          action: () => router.push('/settings/help')
        },
        {
          title: 'Ketentuan Layanan',
          icon: <MaterialIcons name="description" size={20} color="#0F3222" />,
          action: () => router.push('/settings/terms')
        }
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F3222" />
      
      {/* Header */}
      <LinearGradient
        colors={['#0F3222', '#1A4D2E']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pengaturan</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={userData.avatar} style={styles.avatar} />
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.userEmail}>{userData.email}</Text>
      </View>

      {/* Settings List */}
      <ScrollView style={styles.settingsContainer}>
        {settingsSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                {section.icon}
              </View>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            
            <View style={styles.sectionItems}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.settingItem,
                    itemIndex === 0 && styles.firstItem,
                    itemIndex === section.items.length - 1 && styles.lastItem
                  ]}
                  onPress={item.action}
                  activeOpacity={0.7}
                >
                  <View style={styles.itemIcon}>
                    {item.icon}
                  </View>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  {item.rightComponent || (
                    <Ionicons name="chevron-forward" size={18} color="#999" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Keluar dari Akun</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },
  header: {
    paddingTop: StatusBar.currentHeight + 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10
  },
  backButton: {
    padding: 5
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600'
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 25,
    backgroundColor: '#FFF',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#B1944D',
    marginBottom: 10
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#0F3222',
    marginBottom: 5
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666'
  },
  settingsContainer: {
    flex: 1,
    paddingHorizontal: 15
  },
  section: {
    marginBottom: 20
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 5
  },
  sectionIcon: {
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#0F3222'
  },
  sectionItems: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5'
  },
  firstItem: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  lastItem: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12
  },
  itemIcon: {
    marginRight: 15,
    width: 24,
    alignItems: 'center'
  },
  itemTitle: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#333'
  },
  logoutButton: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FF3B30'
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FF3B30'
  }
});

export default SettingsScreen;