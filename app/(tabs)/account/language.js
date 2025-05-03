// app/account/language.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const languages = [
  { code: 'id', name: 'Bahasa Indonesia', native: 'Indonesia', selected: true },
  { code: 'en', name: 'English', native: 'English', selected: false },
  { code: 'ja', name: 'Japanese', native: '日本語', selected: false },
  { code: 'zh', name: 'Chinese', native: '中文', selected: false },
  { code: 'ko', name: 'Korean', native: '한국어', selected: false },
  { code: 'ar', name: 'Arabic', native: 'العربية', selected: false },
];

const LanguageScreen = () => {
  const [selectedLang, setSelectedLang] = useState('id');
  const [showOtherLanguages, setShowOtherLanguages] = useState(false);

  const handleSelectLanguage = (code) => {
    setSelectedLang(code);
  };

  const visibleLanguages = showOtherLanguages ? languages : languages.slice(0, 3);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pengaturan Bahasa</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.languageGroup}>
          {visibleLanguages.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={styles.languageItem}
              onPress={() => handleSelectLanguage(language.code)}
            >
              <View style={styles.languageInfo}>
                <Text style={styles.languageName}>{language.name}</Text>
                <Text style={styles.languageNative}>{language.native}</Text>
              </View>
              {selectedLang === language.code && (
                <MaterialIcons name="check" size={24} color="#B1944D" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.showMoreButton}
          onPress={() => setShowOtherLanguages(!showOtherLanguages)}
        >
          <Text style={styles.showMoreText}>
            {showOtherLanguages ? 'Lihat lebih sedikit' : 'Lihat lebih banyak bahasa'}
          </Text>
          <MaterialIcons 
            name={showOtherLanguages ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
            size={24} 
            color="#B1944D" 
          />
        </TouchableOpacity>

        <View style={styles.note}>
          <MaterialIcons name="info" size={20} color="#B1944D" />
          <Text style={styles.noteText}>
            Beberapa fitur mungkin belum tersedia dalam semua bahasa
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
  languageGroup: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 3,
  },
  languageNative: {
    fontSize: 14,
    color: '#999',
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  showMoreText: {
    fontSize: 14,
    color: '#B1944D',
    marginRight: 5,
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
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

export default LanguageScreen;