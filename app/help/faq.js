import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const FAQScreen = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(0);
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const faqCategories = [
    {
      id: 0,
      title: 'Semua',
      icon: <Ionicons name="grid" size={20} color="#0F3222" />
    },
    {
      id: 1,
      title: 'Pesanan',
      icon: <MaterialIcons name="assignment" size={20} color="#0F3222" />
    },
    {
      id: 2,
      title: 'Pembayaran',
      icon: <MaterialIcons name="payment" size={20} color="#0F3222" />
    },
    {
      id: 3,
      title: 'Akun',
      icon: <MaterialIcons name="account-circle" size={20} color="#0F3222" />
    }
  ];

  const faqQuestions = [
    {
      id: 1,
      category: 1,
      question: 'Bagaimana cara memesan becak?',
      answer: 'Anda bisa memesan becak melalui aplikasi dengan menekan tombol "Pesan Sekarang", pilih lokasi penjemputan dan tujuan, lalu konfirmasi pesanan.'
    },
    {
      id: 2,
      category: 1,
      question: 'Berapa lama waktu tunggu becak datang?',
      answer: 'Waktu tunggu biasanya 5-15 menit tergantung lokasi dan ketersediaan driver di sekitar Anda.'
    },
    {
      id: 3,
      category: 2,
      question: 'Metode pembayaran apa saja yang tersedia?',
      answer: 'Kami menerima pembayaran via BecakPay, transfer bank, kartu kredit/debit, dan pembayaran tunai.'
    },
    {
      id: 4,
      category: 2,
      question: 'Bagaimana jika pembayaran saya gagal?',
      answer: 'Pastikan saldo/kartu Anda mencukupi. Jika masih gagal, coba metode pembayaran lain atau hubungi CS kami.'
    },
    {
      id: 5,
      category: 3,
      question: 'Bagaimana cara mengganti nomor HP?',
      answer: 'Buka menu Profil > Pengaturan Akun > Nomor Telepon. Anda akan menerima OTP untuk verifikasi.'
    },
    {
      id: 6,
      category: 3,
      question: 'Apa yang harus dilakukan jika lupa password?',
      answer: 'Di halaman login, pilih "Lupa Password" dan ikuti instruksi untuk reset password via email/SMS.'
    }
  ];

  const filteredQuestions = activeCategory === 0 
    ? faqQuestions 
    : faqQuestions.filter(q => q.category === activeCategory);

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
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
        <Text style={styles.headerTitle}>FAQ & Bantuan</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      {/* Category Tabs */}
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        {faqCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              activeCategory === category.id && styles.activeCategoryButton
            ]}
            onPress={() => setActiveCategory(category.id)}
          >
            <View style={styles.categoryIcon}>
              {category.icon}
            </View>
            <Text style={[
              styles.categoryText,
              activeCategory === category.id && styles.activeCategoryText
            ]}>
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* FAQ Content */}
      <ScrollView style={styles.content}>
        {filteredQuestions.map((item) => (
          <View key={item.id} style={styles.faqItem}>
            <TouchableOpacity
              style={styles.questionContainer}
              onPress={() => toggleQuestion(item.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.questionText}>{item.question}</Text>
              <Ionicons
                name={expandedQuestion === item.id ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#0F3222"
              />
            </TouchableOpacity>
            
            {expandedQuestion === item.id && (
              <View style={styles.answerContainer}>
                <Text style={styles.answerText}>{item.answer}</Text>
                <TouchableOpacity 
                  style={styles.helpfulButton}
                  onPress={() => Alert.alert('Terima kasih atas feedback Anda!')}
                >
                  <Text style={styles.helpfulText}>Apakah ini membantu?</Text>
                  <View style={styles.helpfulIcons}>
                    <Ionicons name="thumbs-up" size={16} color="#0F3222" style={styles.helpfulIcon} />
                    <Ionicons name="thumbs-down" size={16} color="#0F3222" style={styles.helpfulIcon} />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Still Need Help */}
      <View style={styles.helpFooter}>
        <Text style={styles.helpTitle}>Masih butuh bantuan?</Text>
        <Text style={styles.helpSubtitle}>Tim support kami siap membantu 24/7</Text>
        <TouchableOpacity 
          style={styles.contactButton}
          onPress={() => router.push('/help')}
        >
          <LinearGradient
            colors={['#0F3222', '#1A4D2E']}
            style={styles.contactButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="chatbubbles" size={18} color="#FFF" />
            <Text style={styles.contactButtonText}>Hubungi Customer Service</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  categoryContainer: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  categoryContent: {
    paddingHorizontal: 15
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#F5F5F5'
  },
  activeCategoryButton: {
    backgroundColor: 'rgba(177, 148, 77, 0.2)',
    borderWidth: 1,
    borderColor: '#B1944D'
  },
  categoryIcon: {
    marginRight: 5
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#666'
  },
  activeCategoryText: {
    color: '#0F3222'
  },
  content: {
    flex: 1,
    padding: 20
  },
  faqItem: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden'
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15
  },
  questionText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#0F3222'
  },
  answerContainer: {
    padding: 15,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#EEE'
  },
  answerText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    lineHeight: 20,
    marginBottom: 15
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  helpfulText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#666'
  },
  helpfulIcons: {
    flexDirection: 'row'
  },
  helpfulIcon: {
    marginLeft: 15
  },
  helpFooter: {
    backgroundColor: '#FFF',
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE'
  },
  helpTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#0F3222',
    marginBottom: 5
  },
  helpSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginBottom: 15
  },
  contactButton: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden'
  },
  contactButtonGradient: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  contactButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 10
  }
});

export default FAQScreen;