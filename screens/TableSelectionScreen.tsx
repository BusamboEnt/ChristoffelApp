import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import CustomAlert from '../components/CustomAlert';
import { useCustomAlert } from '../hooks/useCustomAlert';

interface Table {
  number: number;
  capacity: number;
  location: string;
  isAvailable: boolean;
}

const TableSelectionScreen: React.FC = () => {
  const navigation = useNavigation();
  const { placeOrder, getTotalPrice } = useCart();
  const { user } = useUser();
  const { alertConfig, visible, showAlert, hideAlert } = useCustomAlert();
  const [selectedTable, setSelectedTable] = useState<number | null>(user.favoriteTable || null);

  const tables: Table[] = [
    { number: 1, capacity: 2, location: 'Window Side', isAvailable: true },
    { number: 2, capacity: 4, location: 'Center', isAvailable: true },
    { number: 3, capacity: 2, location: 'Corner', isAvailable: false },
    { number: 4, capacity: 6, location: 'Private Room', isAvailable: true },
    { number: 5, capacity: 4, location: 'Garden View', isAvailable: true },
    { number: 6, capacity: 2, location: 'Bar Side', isAvailable: true },
    { number: 7, capacity: 8, location: 'Private Dining', isAvailable: true },
    { number: 8, capacity: 4, location: 'Window Side', isAvailable: false },
    { number: 9, capacity: 2, location: 'Terrace', isAvailable: true },
    { number: 10, capacity: 4, location: 'Center', isAvailable: true },
  ];

  const handleConfirmTable = () => {
    if (selectedTable === null) {
      showAlert({
        title: 'No Table Selected',
        message: 'Please select a table to continue',
        type: 'warning',
        buttons: [{ text: 'OK', style: 'default' }]
      });
      return;
    }

    showAlert({
      title: 'Confirm Order',
      message: `Place order for Table ${selectedTable}?\n\nTotal: R${(getTotalPrice() * 1.15).toFixed(2)}`,
      type: 'info',
      buttons: [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          style: 'default',
          onPress: () => {
            placeOrder(selectedTable);
            showAlert({
              title: 'Order Placed! 🎉',
              message: `Your order has been sent to the kitchen.\nTable: ${selectedTable}`,
              type: 'success',
              buttons: [
                {
                  text: 'View Orders',
                  style: 'default',
                  onPress: () => navigation.navigate('OrderHistory'),
                },
                {
                  text: 'Back to Menu',
                  style: 'cancel',
                  onPress: () => navigation.navigate('Menu'),
                },
              ]
            });
          },
        },
      ]
    });
  };

  const renderTable = ({ item }: { item: Table }) => {
    const isSelected = selectedTable === item.number;
    const isDisabled = !item.isAvailable;

    return (
      <TouchableOpacity
        style={[
          styles.tableCard,
          isSelected && styles.selectedTable,
          isDisabled && styles.disabledTable,
        ]}
        onPress={() => !isDisabled && setSelectedTable(item.number)}
        disabled={isDisabled}
        activeOpacity={0.7}
      >
        <View style={styles.tableHeader}>
          <Text style={[styles.tableNumber, isDisabled && styles.disabledText]}>
            Table {item.number}
          </Text>
          {!isDisabled && isSelected && <Text style={styles.checkmark}>✓</Text>}
          {isDisabled && <Text style={styles.unavailableText}>Occupied</Text>}
        </View>
        <View style={styles.tableDetails}>
          <Text style={[styles.tableInfo, isDisabled && styles.disabledText]}>
            👥 {item.capacity} seats
          </Text>
          <Text style={[styles.tableInfo, isDisabled && styles.disabledText]}>
            📍 {item.location}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Your Table</Text>
          <View style={{ width: 50 }} />
        </View>

        {/* Instructions */}
        <View style={styles.instructions}>
          <Text style={styles.instructionsText}>
            Choose an available table for your dining experience
          </Text>
        </View>

        {/* Table Grid */}
        <FlatList
          data={tables}
          renderItem={renderTable}
          keyExtractor={(item) => item.number.toString()}
          numColumns={2}
          contentContainerStyle={styles.tableGrid}
          showsVerticalScrollIndicator={false}
        />

        {/* Confirm Button */}
        {selectedTable !== null && (
          <View style={styles.footer}>
            <View style={styles.selectedInfo}>
              <Text style={styles.selectedLabel}>Selected:</Text>
              <Text style={styles.selectedValue}>Table {selectedTable}</Text>
            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmTable}>
              <Text style={styles.confirmButtonText}>Confirm & Place Order</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {alertConfig && (
        <CustomAlert
          visible={visible}
          title={alertConfig.title}
          message={alertConfig.message}
          buttons={alertConfig.buttons}
          type={alertConfig.type}
          onClose={hideAlert}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  backText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  instructions: {
    padding: 20,
    paddingBottom: 10,
  },
  instructionsText: {
    color: '#AAA',
    fontSize: 14,
    textAlign: 'center',
  },
  tableGrid: {
    padding: 10,
    paddingBottom: 150,
  },
  tableCard: {
    flex: 1,
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 15,
    margin: 5,
    borderWidth: 2,
    borderColor: '#222',
    minHeight: 120,
  },
  selectedTable: {
    borderColor: '#FFF',
    backgroundColor: '#1a1a1a',
  },
  disabledTable: {
    opacity: 0.5,
    backgroundColor: '#0a0a0a',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tableNumber: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkmark: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  unavailableText: {
    color: '#FF4444',
    fontSize: 11,
    fontWeight: '600',
  },
  tableDetails: {
    marginTop: 5,
  },
  tableInfo: {
    color: '#AAA',
    fontSize: 13,
    marginVertical: 3,
  },
  disabledText: {
    color: '#555',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#111',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  selectedInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedLabel: {
    color: '#AAA',
    fontSize: 16,
    marginRight: 10,
  },
  selectedValue: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TableSelectionScreen;