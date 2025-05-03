// app/account/index.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Platform,
  SafeAreaView,
  Switch,
  Modal,
  TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MaterialIcons, FontAwesome5, Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

const AccountScreen = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [premiumMember, setPremiumMember] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState('Raja Alif');
  const [editPhone, setEditPhone] = useState('+62 812-3456-7890');
  const [editEmail, setEditEmail] = useState('raja.alif@royal.com');

  // Mock user data
  const userData = {
    name: 'Raja Alif',
    phone: '+62 812-3456-7890',
    email: 'raja.alif@royal.com',
    memberSince: '15 Januari 2023',
    tripsCompleted: 42,
    favoriteDriver: 'Pak Santoso',
    favoriteVehicle: 'Becak Royal Gold',
    membershipLevel: premiumMember ? 'Royal Member' : 'Regular',
    membershipBadge: premiumMember ? '👑' : '⭐',
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const accountMenuItems = [
    {
      icon: <MaterialIcons name="history" size={24} color="#B1944D" />,
      title: "Aktifikas",
      subtitle: "Perjalanan mewah Anda",
      action: () => router.push('/history')
    },
    {
      icon: <Ionicons name="settings" size={24} color="#B1944D" />,
      title: "Pengaturan",
      subtitle: "Personalisasi pengalaman",
      action: () => router.push('/settings')
    },
    {
      icon: <MaterialIcons name="help" size={24} color="#B1944D" />,
      title: "Pusat Bantuan",
      subtitle: "Layanan pelanggan premium",
      action: () => router.push('/help')
    },
  ];

  const statsData = [
    { value: userData.tripsCompleted, label: 'Perjalanan' },
    { value: '4.9', label: 'Rating' },
    { value: 'Gold', label: 'Tier' },
  ];

  const handleUpgrade = () => {
    setPremiumMember(true);
    setShowUpgradeModal(false);
  };

  const handleSaveProfile = () => {
    userData.name = editName;
    userData.phone = editPhone;
    userData.email = editEmail;
    setShowEditModal(false);
  };

  return (
    <SafeAreaView style={[styles.safeArea, darkMode && styles.darkSafeArea]}>
      <ScrollView 
        style={[styles.container, darkMode && styles.darkContainer]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={darkMode ? ['#1A1A1A', '#2D2D2D'] : ['#0F3222', '#1A4D2E']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.darkModeToggle}
              onPress={() => setDarkMode(!darkMode)}
            >
              <MaterialIcons 
                name={darkMode ? "light-mode" : "dark-mode"} 
                size={24} 
                color="#FFF" 
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Profile Section */}
        <View style={[styles.profileSection, darkMode && styles.darkProfileSection]}>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.avatarContainer}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatar} />
              ) : (
                <View style={styles.avatar}>
                  <MaterialIcons name="person" size={40} color="#0F3222" />
                </View>
              )}
              <View style={styles.editIcon}>
                <Feather name="edit-2" size={16} color="#FFF" />
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.profileInfo}>
            <View style={styles.nameContainer}>
              <Text style={[styles.name, darkMode && styles.darkText]}>{userData.name}</Text>
              <Text style={styles.membershipBadge}>{userData.membershipBadge}</Text>
            </View>
            <Text style={[styles.membership, darkMode && styles.darkSubtext]}>
              {userData.membershipLevel}
            </Text>
            <Text style={[styles.phone, darkMode && styles.darkSubtext]}>{userData.phone}</Text>
          </View>

          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setShowEditModal(true)}
          >
            <Feather name="edit-2" size={18} color="#B1944D" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={[styles.statsContainer, darkMode && styles.darkCard]}>
          {statsData.map((stat, index) => (
            <View key={stat.label} style={styles.statItem}>
              <Text style={[styles.statValue, darkMode && styles.darkText]}>{stat.value}</Text>
              <Text style={[styles.statLabel, darkMode && styles.darkSubtext]}>{stat.label}</Text>
              {index < statsData.length - 1 && <View style={styles.statDivider} />}
            </View>
          ))}
        </View>
        {/* Account Menu */}
        <View style={styles.menuContainer}>
          {accountMenuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.menuItem, darkMode && styles.darkCard]}
              onPress={item.action}
            >
              <View style={styles.menuIcon}>{item.icon}</View>
              <View style={styles.menuText}>
                <Text style={[styles.menuTitle, darkMode && styles.darkText]}>{item.title}</Text>
                <Text style={[styles.menuSubtitle, darkMode && styles.darkSubtext]}>{item.subtitle}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#B1944D" />
            </TouchableOpacity>
          ))}
        </View>
        {/* Dark Mode Switch */}
        <View style={[styles.settingItem, darkMode && styles.darkCard]}>
          <View style={styles.settingLeft}>
            <MaterialIcons 
              name={darkMode ? "dark-mode" : "light-mode"} 
              size={24} 
              color="#B1944D" 
            />
            <Text style={[styles.settingText, darkMode && styles.darkText]}>Mode {darkMode ? 'Gelap' : 'Terang'}</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            thumbColor="#FFF"
            trackColor={{ false: '#E0E0E0', true: '#B1944D' }}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
        </TouchableOpacity>
      </ScrollView>

      {/* Upgrade Modal */}
      <Modal
        visible={showUpgradeModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowUpgradeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, darkMode && styles.darkModalContainer]}>
            <View style={styles.modalHeader}>
              <FontAwesome5 name="crown" size={30} color="#B1944D" />
              <Text style={[styles.modalTitle, darkMode && styles.darkText]}>Royal Membership</Text>
            </View>
            
            <Text style={[styles.modalText, darkMode && styles.darkSubtext]}>
              Tingkatkan ke Royal Membership dan nikmati berbagai keuntungan eksklusif:
            </Text>
            
            <View style={styles.benefitItem}>
              <MaterialIcons name="check-circle" size={20} color="#B1944D" />
              <Text style={[styles.benefitText, darkMode && styles.darkText]}>Prioritas pemesanan Becak Royal</Text>
            </View>
            
            <View style={styles.benefitItem}>
              <MaterialIcons name="check-circle" size={20} color="#B1944D" />
              <Text style={[styles.benefitText, darkMode && styles.darkText]}>Driver berpengalaman khusus</Text>
            </View>
            
            <View style={styles.benefitItem}>
              <MaterialIcons name="check-circle" size={20} color="#B1944D" />
              <Text style={[styles.benefitText, darkMode && styles.darkText]}>Harga spesial untuk member</Text>
            </View>
            
            <View style={styles.benefitItem}>
              <MaterialIcons name="check-circle" size={20} color="#B1944D" />
              <Text style={[styles.benefitText, darkMode && styles.darkText]}>Layanan pelanggan premium</Text>
            </View>
            
            <View style={styles.priceContainer}>
              <Text style={[styles.priceText, darkMode && styles.darkText]}>Rp 149.000</Text>
              <Text style={styles.perMonth}>/bulan</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={handleUpgrade}
            >
              <LinearGradient
                colors={['#B1944D', '#D4BF83']}
                style={styles.modalButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.modalButtonText}>UPGRADE SEKARANG</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowUpgradeModal(false)}
            >
              <Text style={[styles.modalCloseText, darkMode && styles.darkText]}>Nanti Saja</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.editModalContainer, darkMode && styles.darkModalContainer]}>
            <View style={styles.editModalHeader}>
              <Text style={[styles.editModalTitle, darkMode && styles.darkText]}>Edit Profil Royal</Text>
              <TouchableOpacity onPress={() => setShowEditModal(false)}>
                <AntDesign name="close" size={24} color="#B1944D" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, darkMode && styles.darkText]}>Nama Lengkap</Text>
              <View style={[styles.inputWrapper, darkMode && styles.darkInput]}>
                <TextInput
                  style={[styles.textInput, darkMode && styles.darkTextInput]}
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="Nama lengkap"
                  placeholderTextColor={darkMode ? "#888" : "#999"}
                />
              </View>
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, darkMode && styles.darkText]}>Nomor Telepon</Text>
              <View style={[styles.inputWrapper, darkMode && styles.darkInput]}>
                <TextInput
                  style={[styles.textInput, darkMode && styles.darkTextInput]}
                  value={editPhone}
                  onChangeText={setEditPhone}
                  placeholder="Nomor telepon"
                  placeholderTextColor={darkMode ? "#888" : "#999"}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, darkMode && styles.darkText]}>Alamat Email</Text>
              <View style={[styles.inputWrapper, darkMode && styles.darkInput]}>
                <TextInput
                  style={[styles.textInput, darkMode && styles.darkTextInput]}
                  value={editEmail}
                  onChangeText={setEditEmail}
                  placeholder="Alamat email"
                  placeholderTextColor={darkMode ? "#888" : "#999"}
                  keyboardType="email-address"
                />
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSaveProfile}
            >
              <LinearGradient
                colors={['#B1944D', '#D4BF83']}
                style={styles.saveButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.saveButtonText}>SIMPAN PERUBAHAN</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  darkSafeArea: {
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 20,
    paddingBottom: 30,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'serif',
    letterSpacing: 0.5,
  },
  darkModeToggle: {
    padding: 8,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    marginTop: -40,
    marginHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 1,
  },
  darkProfileSection: {
    backgroundColor: '#1E1E1E',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#B1944D',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#B1944D',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  profileInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F3222',
    marginRight: 8,
    fontFamily: 'serif',
  },
  darkText: {
    color: '#FFF',
  },
  membershipBadge: {
    fontSize: 18,
  },
  membership: {
    fontSize: 14,
    color: '#B1944D',
    fontWeight: '600',
    marginTop: 2,
    fontFamily: 'serif',
  },
  darkSubtext: {
    color: '#AAA',
  },
  phone: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    fontFamily: 'serif',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: '#1E1E1E',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F3222',
    fontFamily: 'serif',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    fontFamily: 'serif',
  },
  statDivider: {
    width: 1,
    height: '70%',
    backgroundColor: '#F0F0F0',
    position: 'absolute',
    right: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: 'serif',
    letterSpacing: 0.5,
  },
  crownIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 25,
    fontFamily: 'serif',
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'serif',
  },
  cardValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
    marginTop: 5,
    fontFamily: 'serif',
  },
  upgradeButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  upgradeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B1944D',
    fontFamily: 'serif',
  },
  menuContainer: {
    marginTop: 25,
    marginHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    color: '#0F3222',
    fontFamily: 'serif',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
    fontFamily: 'serif',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#FFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#0F3222',
    marginLeft: 15,
    fontFamily: 'serif',
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 40,
    padding: 15,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
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
    borderRadius: 20,
    padding: 25,
  },
  darkModalContainer: {
    backgroundColor: '#1E1E1E',
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F3222',
    marginTop: 10,
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
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    fontFamily: 'serif',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginVertical: 20,
  },
  priceText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F3222',
    fontFamily: 'serif',
  },
  perMonth: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
    fontFamily: 'serif',
  },
  modalButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  modalButtonGradient: {
    padding: 15,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F3222',
    fontFamily: 'serif',
  },
  modalCloseButton: {
    padding: 15,
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'serif',
  },
  editModalContainer: {
    width: width * 0.9,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 25,
  },
  editModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  editModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F3222',
    fontFamily: 'serif',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontFamily: 'serif',
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#F8F8F8',
  },
  darkInput: {
    backgroundColor: '#2D2D2D',
    borderColor: '#444',
  },
  textInput: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'serif',
  },
  darkTextInput: {
    color: '#FFF',
  },
  saveButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
  },
  saveButtonGradient: {
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F3222',
    fontFamily: 'serif',
  },
});

export default AccountScreen;