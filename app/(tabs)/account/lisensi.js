// app/account/licenses.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  Linking,
  TouchableOpacity // Ditambahkan untuk memperbaiki error
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const licenses = [
  {
    name: 'React Native',
    license: 'MIT License',
    link: 'https://github.com/facebook/react-native/blob/master/LICENSE',
  },
  {
    name: 'Expo',
    license: 'MIT License',
    link: 'https://github.com/expo/expo/blob/main/LICENSE',
  },
  {
    name: 'React Navigation',
    license: 'MIT License',
    link: 'https://github.com/react-navigation/react-navigation/blob/main/packages/core/LICENSE',
  },
  {
    name: 'Vector Icons',
    license: 'MIT License',
    link: 'https://github.com/oblador/react-native-vector-icons/blob/master/LICENSE',
  },
  {
    name: 'Google Maps API',
    license: 'Terms of Service',
    link: 'https://cloud.google.com/maps-platform/terms/',
  },
];

const LicensesScreen = () => {
  const handlePressLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lisensi</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.introText}>
            Aplikasi BecakJogja menggunakan beberapa library dan layanan pihak ketiga berikut:
          </Text>

          {licenses.map((item, index) => (
            <View key={index} style={styles.licenseItem}>
              <View style={styles.licenseInfo}>
                <Text style={styles.licenseName}>{item.name}</Text>
                <Text style={styles.licenseType}>{item.license}</Text>
              </View>
              <TouchableOpacity onPress={() => handlePressLink(item.link)}>
                <MaterialIcons name="open-in-new" size={20} color="#B1944D" />
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.note}>
            <MaterialIcons name="info" size={20} color="#B1944D" />
            <Text style={styles.noteText}>
              Lisensi lengkap dapat dilihat dengan menekan ikon di samping
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
  licenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  licenseInfo: {
    flex: 1,
  },
  licenseName: {
    fontSize: 15,
    color: '#333',
    marginBottom: 3,
  },
  licenseType: {
    fontSize: 13,
    color: '#999',
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

export default LicensesScreen;