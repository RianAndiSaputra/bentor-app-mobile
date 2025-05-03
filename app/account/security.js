// app/account/security.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, SafeAreaView, Modal, TextInput } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SecurityScreen = () => {
  const router = useRouter();
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [pinEnabled, setPinEnabled] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState(1); // 1: enter pin, 2: confirm pin
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const securityFeatures = [
    {
      icon: <FontAwesome5 name="fingerprint" size={24} color="#B1944D" />,
      label: "Sidik Jari / Face ID",
      description: "Gunakan sidik jari atau pengenalan wajah untuk masuk",
      action: () => setBiometricEnabled(!biometricEnabled),
      value: biometricEnabled,
      type: "switch"
    },
    {
      icon: <MaterialIcons name="pin" size={24} color="#B1944D" />,
      label: "PIN Keamanan",
      description: pinEnabled ? "PIN aktif" : "Aktifkan PIN untuk transaksi",
      action: () => pinEnabled ? setPinEnabled(false) : setShowPinModal(true),
      value: pinEnabled,
      type: "switch"
    },
    {
      icon: <MaterialIcons name="lock" size={24} color="#B1944D" />,
      label: "Ubah Kata Sandi",
      description: "Terakhir diubah 3 bulan lalu",
      action: () => setShowChangePassword(true),
      type: "navigate"
    },
    {
      icon: <MaterialIcons name="devices" size={24} color="#B1944D" />,
      label: "Perangkat Terhubung",
      description: "2 perangkat aktif",
      action: () => router.push('/account/connected-devices'),
      type: "navigate"
    },
    {
      icon: <MaterialIcons name="security" size={24} color="#B1944D" />,
      label: "Verifikasi 2 Langkah",
      description: "Aktifkan untuk keamanan ekstra",
      action: () => router.push('/account/two-factor-auth'),
      type: "navigate"
    }
  ];

  const handleSetPin = () => {
    if (step === 1) {
      if (pin.length === 6) {
        setStep(2);
      }
    } else {
      if (pin === confirmPin) {
        setPinEnabled(true);
        setShowPinModal(false);
        setStep(1);
        setPin('');
        setConfirmPin('');
      }
    }
  };

  const handleChangePassword = () => {
    // Implement password change logic
    setShowChangePassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#0F3222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Keamanan Akun</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.securityGroup}>
          {securityFeatures.map((feature, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.securityItem}
              onPress={feature.action}
            >
              <View style={styles.itemLeft}>
                <View style={styles.itemIcon}>
                  {feature.icon}
                </View>
                <View style={styles.itemText}>
                  <Text style={styles.itemLabel}>{feature.label}</Text>
                  <Text style={styles.itemDescription}>{feature.description}</Text>
                </View>
              </View>
              {feature.type === "switch" ? (
                <Switch
                  value={feature.value}
                  onValueChange={feature.action}
                  thumbColor="#FFF"
                  trackColor={{ false: '#E0E0E0', true: '#B1944D' }}
                />
              ) : (
                <MaterialIcons name="chevron-right" size={24} color="#B1944D" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.securityTips}>
          <MaterialIcons name="info" size={24} color="#B1944D" />
          <View style={styles.tipsText}>
            <Text style={styles.tipsTitle}>Tips Keamanan</Text>
            <Text style={styles.tipsContent}>
              • Jangan berikan PIN atau kata sandi Anda kepada siapapun
              {'\n'}• Gunakan kata sandi yang unik dan sulit ditebak
              {'\n'}• Selalu logout setelah menggunakan perangkat bersama
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* PIN Setup Modal */}
      <Modal
        visible={showPinModal}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setShowPinModal(false);
          setStep(1);
          setPin('');
          setConfirmPin('');
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Atur PIN Keamanan</Text>
              <TouchableOpacity onPress={() => {
                setShowPinModal(false);
                setStep(1);
                setPin('');
                setConfirmPin('');
              }}>
                <Feather name="x" size={24} color="#B1944D" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalText}>
              {step === 1 
                ? "Buat PIN 6 digit untuk keamanan transaksi" 
                : "Konfirmasi PIN Anda"}
            </Text>

            <View style={styles.pinInputContainer}>
              {[...Array(6)].map((_, i) => (
                <View key={i} style={styles.pinInput}>
                  <Text style={styles.pinText}>
                    {(step === 1 ? pin : confirmPin).length > i ? '•' : ''}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.numpad}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'].map((num, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.numButton}
                  onPress={() => {
                    if (num === 'del') {
                      if (step === 1) {
                        setPin(pin.slice(0, -1));
                      } else {
                        setConfirmPin(confirmPin.slice(0, -1));
                      }
                    } else if (typeof num === 'number') {
                      if (step === 1 && pin.length < 6) {
                        setPin(pin + num.toString());
                      } else if (step === 2 && confirmPin.length < 6) {
                        setConfirmPin(confirmPin + num.toString());
                      }
                    }
                  }}
                  disabled={num === ''}
                >
                  {num === 'del' ? (
                    <Feather name="delete" size={24} color="#B1944D" />
                  ) : (
                    <Text style={styles.numText}>{num}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={[
                styles.confirmButton,
                ((step === 1 && pin.length !== 6) || (step === 2 && confirmPin.length !== 6)) && 
                styles.disabledButton
              ]}
              onPress={handleSetPin}
              disabled={(step === 1 && pin.length !== 6) || (step === 2 && confirmPin.length !== 6)}
            >
              <Text style={styles.confirmButtonText}>
                {step === 1 ? 'Lanjutkan' : 'Konfirmasi'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        visible={showChangePassword}
        transparent
        animationType="slide"
        onRequestClose={() => setShowChangePassword(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ubah Kata Sandi</Text>
              <TouchableOpacity onPress={() => setShowChangePassword(false)}>
                <Feather name="x" size={24} color="#B1944D" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Kata Sandi Saat Ini</Text>
              <TextInput
                style={styles.textInput}
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Masukkan kata sandi saat ini"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Kata Sandi Baru</Text>
              <TextInput
                style={styles.textInput}
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Masukkan kata sandi baru"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Konfirmasi Kata Sandi Baru</Text>
              <TextInput
                style={styles.textInput}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Konfirmasi kata sandi baru"
              />
            </View>

            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={handleChangePassword}
            >
              <Text style={styles.confirmButtonText}>Simpan Perubahan</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFF',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F3222',
    textAlign: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  securityGroup: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemText: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 3,
  },
  itemDescription: {
    fontSize: 12,
    color: '#999',
  },
  securityTips: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tipsText: {
    flex: 1,
    marginLeft: 15,
  },
  tipsTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 5,
  },
  tipsContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F3222',
  },
  modalText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  pinInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  pinInput: {
    width: 40,
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#B1944D',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinText: {
    fontSize: 24,
    color: '#0F3222',
  },
  numpad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  numButton: {
    width: '30%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numText: {
    fontSize: 24,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#F8F8F8',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#B1944D',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  confirmButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SecurityScreen;