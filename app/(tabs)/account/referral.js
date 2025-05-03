// app/account/referral.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Share, ScrollView } from 'react-native';
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';

const ReferralScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const referralCode = 'BECAKJOGJA123';

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Ayo naik becak di Jogja dengan aplikasi RodaTelu! Gunakan kode referral saya ${referralCode} untuk dapatkan diskon 10% pada perjalanan pertama Anda. Download di: [link aplikasi]`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type
        } else {
          // Shared
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const sendInvitation = () => {
    // Logic untuk mengirim undangan ke nomor telepon
    alert(`Undangan telah dikirim ke ${phoneNumber}`);
    setPhoneNumber('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Undang Teman</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.rewardBadge}>
            <AntDesign name="gift" size={24} color="#B1944D" />
            <Text style={styles.rewardText}>Dapatkan Rp10.000 untuk setiap teman yang bergabung</Text>
          </View>

          <View style={styles.referralCodeContainer}>
            <Text style={styles.referralTitle}>Kode Referral Anda</Text>
            <Text style={styles.referralCode}>{referralCode}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={() => {
              // Logic untuk copy ke clipboard
              alert('Kode referral disalin!');
            }}>
              <Text style={styles.copyButtonText}>Salin Kode</Text>
              <Feather name="copy" size={16} color="#B1944D" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <MaterialIcons name="share" size={24} color="#FFF" />
            <Text style={styles.shareButtonText}>Bagikan Lewat...</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ATAU</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.card}>
          <Text style={styles.inviteTitle}>Undang Lewat Nomor Telepon</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan nomor telepon"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TouchableOpacity 
            style={[styles.inviteButton, !phoneNumber && styles.buttonDisabled]} 
            onPress={sendInvitation}
            disabled={!phoneNumber}
          >
            <Text style={styles.inviteButtonText}>Kirim Undangan</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.note}>
          <MaterialIcons name="info" size={20} color="#B1944D" />
          <Text style={styles.noteText}>
            Teman harus menggunakan kode referral Anda saat mendaftar untuk mendapatkan bonus
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFF',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F3222',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  rewardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  rewardText: {
    fontSize: 14,
    color: '#B1944D',
    marginLeft: 10,
    flex: 1,
  },
  referralCodeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  referralTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  referralCode: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F3222',
    marginBottom: 10,
    letterSpacing: 2,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#B1944D',
    marginRight: 5,
    fontSize: 14,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B1944D',
    padding: 15,
    borderRadius: 8,
  },
  shareButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EEE',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#999',
    fontSize: 12,
  },
  inviteTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#FAFAFA',
    fontSize: 14,
  },
  inviteButton: {
    backgroundColor: '#0F3222',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#CCC',
  },
  inviteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
});

export default ReferralScreen;