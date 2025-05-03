// app/account/rating.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const RatingScreen = () => {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  const submitRating = () => {
    // Logic untuk mengirim rating ke server
    alert('Terima kasih atas penilaian Anda!');
    router.back(); // Navigate back after submission
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
        <Text style={styles.headerTitle}>Beri Nilai</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Bagaimana pengalaman Anda menggunakan BecakJogja?</Text>
          
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                <AntDesign 
                  name={star <= rating ? 'star' : 'staro'} 
                  size={40} 
                  color={star <= rating ? '#FFD700' : '#CCC'} 
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.subtitle}>Tambahkan ulasan (opsional)</Text>
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={4}
            placeholder="Tulis pengalaman Anda..."
            value={comment}
            onChangeText={setComment}
          />

          <TouchableOpacity 
            style={[styles.button, rating === 0 && styles.buttonDisabled]} 
            onPress={submitRating}
            disabled={rating === 0}
          >
            <Text style={styles.buttonText}>Kirim Penilaian</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.note}>
          <MaterialIcons name="info" size={20} color="#B1944D" />
          <Text style={styles.noteText}>
            Penilaian Anda membantu kami meningkatkan layanan
          </Text>
        </View>
      </View>
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
  container: {
    flex: 1,
    padding: 15,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    textAlignVertical: 'top',
    backgroundColor: '#FAFAFA',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#B1944D',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#CCC',
  },
  buttonText: {
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

export default RatingScreen;