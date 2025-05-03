// app/account/notifications.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

const NotificationsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [promoNotifications, setPromoNotifications] = useState(true);
  const [rideUpdates, setRideUpdates] = useState(true);
  const [foodOrderUpdates, setFoodOrderUpdates] = useState(true);
  const [paymentUpdates, setPaymentUpdates] = useState(true);
  const [chatNotifications, setChatNotifications] = useState(true);

  const notificationGroups = [
    {
      title: "Jenis Notifikasi",
      items: [
        {
          icon: <Ionicons name="notifications" size={24} color="#B1944D" />,
          label: "Notifikasi Aplikasi",
          value: notificationsEnabled,
          onValueChange: setNotificationsEnabled,
          description: "Aktifkan untuk menerima notifikasi dari aplikasi"
        },
        {
          icon: <MaterialIcons name="email" size={24} color="#B1944D" />,
          label: "Email Notifikasi",
          value: emailNotifications,
          onValueChange: setEmailNotifications,
          description: "Kirim notifikasi ke email Anda"
        },
        {
          icon: <MaterialIcons name="sms" size={24} color="#B1944D" />,
          label: "SMS Notifikasi",
          value: smsNotifications,
          onValueChange: setSmsNotifications,
          description: "Kirim notifikasi via SMS"
        },
        {
          icon: <FontAwesome5 name="gift" size={24} color="#B1944D" />,
          label: "Promo & Penawaran",
          value: promoNotifications,
          onValueChange: setPromoNotifications,
          description: "Dapatkan info promo dan penawaran khusus"
        }
      ]
    },
    {
      title: "Update Layanan",
      items: [
        {
          icon: <FontAwesome5 name="car" size={24} color="#B1944D" />,
          label: "Update Perjalanan",
          value: rideUpdates,
          onValueChange: setRideUpdates,
          description: "Notifikasi status perjalanan Becak Royal"
        },
        {
          icon: <MaterialIcons name="delivery-dining" size={24} color="#B1944D" />,
          label: "Update Pesanan Makanan",
          value: foodOrderUpdates,
          onValueChange: setFoodOrderUpdates,
          description: "Notifikasi status pesanan Royal Food"
        },
        {
          icon: <MaterialIcons name="payment" size={24} color="#B1944D" />,
          label: "Update Pembayaran",
          value: paymentUpdates,
          onValueChange: setPaymentUpdates,
          description: "Notifikasi transaksi pembayaran"
        },
        {
          icon: <MaterialIcons name="chat" size={24} color="#B1944D" />,
          label: "Pesan & Chat",
          value: chatNotifications,
          onValueChange: setChatNotifications,
          description: "Notifikasi pesan dari driver atau merchant"
        }
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pengaturan Notifikasi</Text>
      </View>

      <ScrollView style={styles.container}>
        {notificationGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.notificationGroup}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            
            {group.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.notificationItem}>
                <View style={styles.itemLeft}>
                  <View style={styles.itemIcon}>
                    {item.icon}
                  </View>
                  <View style={styles.itemText}>
                    <Text style={styles.itemLabel}>{item.label}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                  </View>
                </View>
                <Switch
                  value={item.value}
                  onValueChange={item.onValueChange}
                  thumbColor="#FFF"
                  trackColor={{ false: '#E0E0E0', true: '#B1944D' }}
                />
              </View>
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.soundSettings}>
          <View style={styles.itemLeft}>
            <View style={styles.itemIcon}>
              <Ionicons name="volume-high" size={24} color="#B1944D" />
            </View>
            <View style={styles.itemText}>
              <Text style={styles.itemLabel}>Suara & Getar Notifikasi</Text>
              <Text style={styles.itemDescription}>Atur nada dering dan getar</Text>
            </View>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#B1944D" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.advancedSettings}>
          <Text style={styles.advancedText}>Pengaturan Lanjutan</Text>
          <MaterialIcons name="chevron-right" size={24} color="#B1944D" />
        </TouchableOpacity>
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
  notificationGroup: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    padding: 15,
    paddingBottom: 5,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
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
  soundSettings: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  advancedSettings: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  advancedText: {
    fontSize: 16,
    color: '#333',
  },
});

export default NotificationsScreen;