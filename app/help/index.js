// app/help/index.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Linking,
  Platform,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';

const HelpScreen = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [activeTopic, setActiveTopic] = useState(null);

  const helpTopics = [
    {
      id: 1,
      title: 'Masalah Pesanan',
      icon: <MaterialIcons name="assignment" size={24} color="#0F3222" />,
      subtopics: [
        'Pesanan saya tidak muncul',
        'Driver tidak datang',
        'Masalah pembayaran',
        'Ingin membatalkan pesanan'
      ]
    },
    {
      id: 2,
      title: 'Pembayaran',
      icon: <FontAwesome name="credit-card" size={24} color="#0F3222" />,
      subtopics: [
        'Pembayaran ditolak',
        'Double charge',
        'Refund tidak masuk',
        'Promo tidak berlaku'
      ]
    },
    {
      id: 3,
      title: 'Akun & Keamanan',
      icon: <MaterialIcons name="security" size={24} color="#0F3222" />,
      subtopics: [
        'Tidak bisa login',
        'Akun terkunci',
        'Ganti nomor HP',
        'Verifikasi akun'
      ]
    }
  ];

  const contactMethods = [
    {
      id: 1,
      title: 'Telepon',
      icon: <Feather name="phone" size={24} color="#0F3222" />,
      action: () => Linking.openURL('tel:+6281234567890')
    },
    {
      id: 2,
      title: 'Email',
      icon: <MaterialIcons name="email" size={24} color="#0F3222" />,
      action: () => Linking.openURL('mailto:cs@becakroyal.com')
    },
    {
      id: 3,
      title: 'Live Chat',
      icon: <Ionicons name="chatbubbles" size={24} color="#0F3222" />,
      action: () => router.push('/help/live-chat')
    },
    {
      id: 4,
      title: 'FAQ',
      icon: <Ionicons name="help-circle" size={24} color="#0F3222" />,
      action: () => router.push('/help/faq')
    }
  ];

  const handleCallCS = () => {
    Linking.openURL('tel:+6281234567890');
  };

  const handleSubmitMessage = () => {
    if (message.trim() === '') {
      Alert.alert('Peringatan', 'Silakan tulis pesan Anda');
      return;
    }
    Alert.alert('Terima Kasih', 'Pesan Anda telah terkirim ke CS kami');
    setMessage('');
  };

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
        <Text style={styles.headerTitle}>Bantuan & CS</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* Topik Bantuan */}
        <Text style={styles.sectionTitle}>Topik Bantuan</Text>
        <View style={styles.helpTopics}>
          {helpTopics.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              style={[
                styles.topicCard,
                activeTopic === topic.id && styles.activeTopicCard
              ]}
              onPress={() => setActiveTopic(activeTopic === topic.id ? null : topic.id)}
            >
              <View style={styles.topicHeader}>
                <View style={styles.topicIcon}>
                  {topic.icon}
                </View>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Ionicons
                  name={activeTopic === topic.id ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#0F3222"
                />
              </View>
              
              {activeTopic === topic.id && (
                <View style={styles.subtopics}>
                  {topic.subtopics.map((subtopic, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.subtopicItem}
                      onPress={() => router.push(`/help/article/${topic.id}-${index}`)}
                    >
                      <Text style={styles.subtopicText}>{subtopic}</Text>
                      <Ionicons name="chevron-forward" size={16} color="#999" />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Hubungi Kami */}
        <Text style={styles.sectionTitle}>Hubungi Kami</Text>
        <View style={styles.contactMethods}>
          {contactMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={styles.contactCard}
              onPress={method.action}
            >
              <View style={styles.contactIcon}>
                {method.icon}
              </View>
              <Text style={styles.contactTitle}>{method.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Call Center */}
        <View style={styles.callCenter}>
          <Text style={styles.callTitle}>Call Center 24 Jam</Text>
          <Text style={styles.callNumber}>0804-123-4567</Text>
          <TouchableOpacity
            style={styles.callButton}
            onPress={handleCallCS}
          >
            <LinearGradient
              colors={['#0F3222', '#1A4D2E']}
              style={styles.callButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="call" size={20} color="#FFF" />
              <Text style={styles.callButtonText}>Hubungi Sekarang</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Form Pesan */}
        <Text style={styles.sectionTitle}>Kirim Pesan ke CS</Text>
        <View style={styles.messageForm}>
          <TextInput
            style={styles.messageInput}
            placeholder="Tulis pesan Anda..."
            multiline
            numberOfLines={4}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitMessage}
          >
            <LinearGradient
              colors={['#B1944D', '#D4BF83']}
              style={styles.submitButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.submitButtonText}>Kirim Pesan</Text>
              <Ionicons name="send" size={18} color="#0F3222" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Lokasi Kantor */}
        <Text style={styles.sectionTitle}>Lokasi Kantor</Text>
        <View style={styles.officeLocation}>
          <View style={styles.locationCard}>
            <Ionicons name="location" size={24} color="#B1944D" />
            <View style={styles.locationText}>
              <Text style={styles.locationTitle}>Kantor Pusat Becak Royal</Text>
              <Text style={styles.locationAddress}>
                Jl. Malioboro No. 123, Yogyakarta 55271, Indonesia
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.directionButton}
            onPress={() => Linking.openURL('https://maps.app.goo.gl/...')}
          >
            <Text style={styles.directionText}>Dapatkan Petunjuk Arah</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
    padding: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#0F3222',
    marginBottom: 15,
    marginTop: 20
  },
  helpTopics: {
    marginBottom: 10
  },
  topicCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  activeTopicCard: {
    borderWidth: 1,
    borderColor: '#B1944D'
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  topicIcon: {
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  topicTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#0F3222'
  },
  subtopics: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 10
  },
  subtopicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5'
  },
  subtopicText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#333'
  },
  contactMethods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  contactCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  contactIcon: {
    backgroundColor: 'rgba(177, 148, 77, 0.1)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  contactTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#0F3222',
    textAlign: 'center'
  },
  callCenter: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  callTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#666',
    marginBottom: 5
  },
  callNumber: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#0F3222',
    marginBottom: 15
  },
  callButton: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden'
  },
  callButtonGradient: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  callButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 10
  },
  messageForm: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 15,
    minHeight: 120,
    textAlignVertical: 'top',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginBottom: 15
  },
  submitButton: {
    borderRadius: 25,
    overflow: 'hidden'
  },
  submitButtonGradient: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  submitButtonText: {
    color: '#0F3222',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginRight: 10
  },
  officeLocation: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  locationText: {
    flex: 1,
    marginLeft: 15
  },
  locationTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#0F3222',
    marginBottom: 5
  },
  locationAddress: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666'
  },
  directionButton: {
    borderWidth: 1,
    borderColor: '#B1944D',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center'
  },
  directionText: {
    color: '#B1944D',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14
  }
});

export default HelpScreen;