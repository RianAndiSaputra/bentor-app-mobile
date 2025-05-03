// app/account/terms-privacy.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const TermsPrivacyScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('terms'); // 'terms' or 'privacy'

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#0F3222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ketentuan & Privasi</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'terms' && styles.activeTab]}
          onPress={() => setActiveTab('terms')}
        >
          <Text style={[styles.tabText, activeTab === 'terms' && styles.activeTabText]}>Ketentuan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'privacy' && styles.activeTab]}
          onPress={() => setActiveTab('privacy')}
        >
          <Text style={[styles.tabText, activeTab === 'privacy' && styles.activeTabText]}>Privasi</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.card}>
          {activeTab === 'terms' ? (
            <>
              <Text style={styles.sectionTitle}>1. Penggunaan Layanan</Text>
              <Text style={styles.sectionContent}>
                Dengan menggunakan aplikasi BecakJogja, Anda setuju untuk mematuhi semua ketentuan yang berlaku. Layanan ini hanya untuk memesan transportasi becak di wilayah Yogyakarta dan sekitarnya.
              </Text>

              <Text style={styles.sectionTitle}>2. Pendaftaran Akun</Text>
              <Text style={styles.sectionContent}>
                Untuk menggunakan layanan secara penuh, Anda harus mendaftar dengan informasi yang valid. Anda bertanggung jawab penuh atas kerahasiaan akun Anda.
              </Text>

              <Text style={styles.sectionTitle}>3. Pembayaran</Text>
              <Text style={styles.sectionContent}>
                Pembayaran dapat dilakukan secara tunai langsung ke pengemudi atau melalui metode digital yang tersedia. Tarif didasarkan pada kesepakatan atau menggunakan tarif meter jika tersedia.
              </Text>

              <Text style={styles.sectionTitle}>4. Pembatalan Pesanan</Text>
              <Text style={styles.sectionContent}>
                Pembatalan pesanan dapat dilakukan sebelum becak menjemput. Pembatalan berulang mungkin akan membatasi akses Anda ke layanan.
              </Text>

              <Text style={styles.sectionTitle}>5. Perilaku Pengguna</Text>
              <Text style={styles.sectionContent}>
                Anda dilarang menggunakan layanan untuk tujuan ilegal atau merugikan pihak lain. Kami berhak menghentikan layanan bagi pengguna yang melanggar.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.introText}>
                Aplikasi BecakJogja menghargai dan melindungi privasi pengguna. Dokumen ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.
              </Text>

              <Text style={styles.sectionTitle}>1. Informasi yang Kami Kumpulkan</Text>
              <Text style={styles.sectionContent}>
                - Data pribadi (nama, email, nomor telepon) saat registrasi{'\n'}
                - Lokasi untuk menemukan becak terdekat{'\n'}
                - Riwayat transaksi dan perjalanan{'\n'}
                - Data teknis (perangkat, IP address, versi aplikasi)
              </Text>

              <Text style={styles.sectionTitle}>2. Penggunaan Informasi</Text>
              <Text style={styles.sectionContent}>
                Informasi digunakan untuk:{'\n'}
                - Menyediakan dan meningkatkan layanan{'\n'}
                - Memproses transaksi{'\n'}
                - Komunikasi dengan pengguna{'\n'}
                - Keamanan dan pencegahan penipuan
              </Text>

              <Text style={styles.sectionTitle}>3. Berbagi Informasi</Text>
              <Text style={styles.sectionContent}>
                Kami tidak menjual data pribadi. Informasi mungkin dibagikan dengan:{'\n'}
                - Pengemudi becak untuk memenuhi pesanan{'\n'}
                - Penyedia pembayaran untuk transaksi{'\n'}
                - Pihak berwenang jika diwajibkan oleh hukum
              </Text>
            </>
          )}

          <View style={styles.note}>
            <MaterialIcons name="info" size={20} color="#B1944D" />
            <Text style={styles.noteText}>
              {activeTab === 'terms' 
                ? 'Terakhir diperbarui: 1 Juni 2024' 
                : 'Hubungi kami di privacy@becakjogja.id untuk pertanyaan privasi'}
            </Text>
          </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFF',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    padding: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F3222',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tabButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#B1944D',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#0F3222',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  introText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3222',
    marginTop: 15,
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
});

export default TermsPrivacyScreen;