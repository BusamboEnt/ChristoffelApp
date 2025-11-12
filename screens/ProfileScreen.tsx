import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';
import CustomAlert from '../components/CustomAlert';
import { useCustomAlert } from '../hooks/useCustomAlert';
import { 
  ArrowLeft, 
  Check, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  UtensilsCrossed,
  DollarSign,
  Heart,
  Leaf,
  AlertTriangle,
  Receipt,
  ChevronRight,
  ChevronDown
} from 'lucide-react-native';

interface Table {
  number: number;
  isAvailable: boolean;
}

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user, updateProfile } = useUser();
  const { orders } = useCart();
  const { alertConfig, visible, showAlert, hideAlert } = useCustomAlert();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [favoriteTable, setFavoriteTable] = useState<number | undefined>(user.favoriteTable);
  const [showTableDropdown, setShowTableDropdown] = useState(false);

  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Halal', 'Kosher'];
  const allergyOptions = ['Nuts', 'Shellfish', 'Dairy', 'Gluten', 'Eggs', 'Soy', 'Fish'];

  const [selectedDietary, setSelectedDietary] = useState<string[]>(user.dietaryPreferences);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(user.allergyInfo);

  // Simple table availability data
  const tables: Table[] = [
    { number: 1, isAvailable: true },
    { number: 2, isAvailable: true },
    { number: 3, isAvailable: false },
    { number: 4, isAvailable: true },
    { number: 5, isAvailable: true },
    { number: 6, isAvailable: true },
    { number: 7, isAvailable: true },
    { number: 8, isAvailable: false },
    { number: 9, isAvailable: true },
    { number: 10, isAvailable: true },
  ];

  const toggleSelection = (item: string, list: string[], setList: (list: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleTableSelect = (table: Table) => {
    if (table.isAvailable) {
      setFavoriteTable(table.number);
      setShowTableDropdown(false);
    }
  };

  const handleSave = () => {
    if (!name || !email || !phone) {
      showAlert({
        title: 'Incomplete Profile',
        message: 'Please fill in all required fields',
        type: 'warning',
        buttons: [{ text: 'OK', style: 'default' }]
      });
      return;
    }

    updateProfile({
      name,
      email,
      phone,
      favoriteTable: favoriteTable,
      dietaryPreferences: selectedDietary,
      allergyInfo: selectedAllergies,
    });

    showAlert({
      title: 'Success',
      message: 'Profile updated successfully!',
      type: 'success',
      buttons: [{ text: 'OK', style: 'default' }]
    });
  };

  const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft color="#FFF" size={24} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={handleSave}>
            <Check color="#4CAF50" size={28} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Profile Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User color="#FFF" size={50} strokeWidth={2} />
            </View>
            <Text style={styles.avatarName}>{name || 'Guest User'}</Text>
          </View>

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <UtensilsCrossed color="#FFF" size={24} strokeWidth={2} style={styles.statIcon} />
              <Text style={styles.statNumber}>{orders.length}</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statCard}>
              <DollarSign color="#FFF" size={24} strokeWidth={2} style={styles.statIcon} />
              <Text style={styles.statNumber}>R{totalSpent.toFixed(0)}</Text>
              <Text style={styles.statLabel}>Total Spent</Text>
            </View>
            <View style={styles.statCard}>
              <Heart color="#FFF" size={24} strokeWidth={2} style={styles.statIcon} />
              <Text style={styles.statNumber}>{user.favoriteTable || '-'}</Text>
              <Text style={styles.statLabel}>Fav Table</Text>
            </View>
          </View>

          {/* Personal Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <View style={styles.inputContainer}>
              <User color="#AAA" size={20} strokeWidth={2} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor="#555"
              />
            </View>

            <View style={styles.inputContainer}>
              <Mail color="#AAA" size={20} strokeWidth={2} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="your.email@example.com"
                placeholderTextColor="#555"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Phone color="#AAA" size={20} strokeWidth={2} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="+27 (XX) XXX-XXXX"
                placeholderTextColor="#555"
                keyboardType="phone-pad"
              />
            </View>

            {/* Favorite Table Dropdown */}
            <TouchableOpacity 
              style={styles.inputContainer}
              onPress={() => setShowTableDropdown(true)}
              activeOpacity={0.7}
            >
              <MapPin color="#AAA" size={20} strokeWidth={2} style={styles.inputIcon} />
              <Text style={[styles.dropdownText, !favoriteTable && styles.placeholderText]}>
                {favoriteTable ? `Table ${favoriteTable}` : 'Select favorite table number'}
              </Text>
              <ChevronDown color="#AAA" size={20} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Dietary Preferences */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Leaf color="#4CAF50" size={20} strokeWidth={2} />
              <Text style={styles.sectionTitle}>Dietary Preferences</Text>
            </View>
            <View style={styles.tagsContainer}>
              {dietaryOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.tag,
                    selectedDietary.includes(option) && styles.tagSelected,
                  ]}
                  onPress={() => toggleSelection(option, selectedDietary, setSelectedDietary)}
                >
                  <Text
                    style={[
                      styles.tagText,
                      selectedDietary.includes(option) && styles.tagTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Allergy Information */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <AlertTriangle color="#FF4444" size={20} strokeWidth={2} />
              <Text style={styles.sectionTitle}>Allergy Information</Text>
            </View>
            <Text style={styles.sectionSubtitle}>
              Help us keep you safe by marking your allergies
            </Text>
            <View style={styles.tagsContainer}>
              {allergyOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.tag,
                    styles.allergyTag,
                    selectedAllergies.includes(option) && styles.allergyTagSelected,
                  ]}
                  onPress={() => toggleSelection(option, selectedAllergies, setSelectedAllergies)}
                >
                  <Text
                    style={[
                      styles.tagText,
                      selectedAllergies.includes(option) && styles.allergyTagTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('OrderHistory')}
            >
              <View style={styles.actionButtonLeft}>
                <Receipt color="#FFF" size={24} strokeWidth={2} />
                <Text style={styles.actionButtonText}>View Order History</Text>
              </View>
              <ChevronRight color="#AAA" size={24} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>

      {/* Table Selection Modal */}
      <Modal
        visible={showTableDropdown}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTableDropdown(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Favorite Table Number</Text>
              <TouchableOpacity onPress={() => setShowTableDropdown(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.tableList} showsVerticalScrollIndicator={false}>
              {/* Clear Selection Option */}
              <TouchableOpacity
                style={[styles.tableOption, !favoriteTable && styles.tableOptionSelected]}
                onPress={() => {
                  setFavoriteTable(undefined);
                  setShowTableDropdown(false);
                }}
              >
                <Text style={styles.tableNumber}>None</Text>
                {!favoriteTable && (
                  <Check color="#4CAF50" size={24} strokeWidth={2.5} />
                )}
              </TouchableOpacity>

              {tables.map((table) => (
                <TouchableOpacity
                  key={table.number}
                  style={[
                    styles.tableOption,
                    !table.isAvailable && styles.tableOptionDisabled,
                    favoriteTable === table.number && styles.tableOptionSelected,
                  ]}
                  onPress={() => handleTableSelect(table)}
                  disabled={!table.isAvailable}
                  activeOpacity={0.7}
                >
                  <View style={styles.tableNumberContainer}>
                    <Text style={[
                      styles.tableNumber,
                      !table.isAvailable && styles.tableNumberDisabled
                    ]}>
                      Table {table.number}
                    </Text>
                    {!table.isAvailable && (
                      <Text style={styles.unavailableLabel}>(Not Available)</Text>
                    )}
                  </View>
                  {favoriteTable === table.number && table.isAvailable && (
                    <Check color="#4CAF50" size={24} strokeWidth={2.5} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

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
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#333',
  },
  avatarName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222',
  },
  statIcon: {
    marginBottom: 8,
  },
  statNumber: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    color: '#AAA',
    fontSize: 12,
  },
  section: {
    padding: 20,
    paddingTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 5,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionSubtitle: {
    color: '#AAA',
    fontSize: 13,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    marginTop: 15,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 12,
    color: '#FFF',
    fontSize: 16,
  },
  dropdownText: {
    flex: 1,
    padding: 12,
    color: '#FFF',
    fontSize: 16,
  },
  placeholderText: {
    color: '#555',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#111',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  tagSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  tagText: {
    color: '#AAA',
    fontSize: 14,
    fontWeight: '600',
  },
  tagTextSelected: {
    color: '#FFF',
  },
  allergyTag: {
    borderColor: '#B71C1C',
  },
  allergyTagSelected: {
    backgroundColor: '#B71C1C',
    borderColor: '#B71C1C',
  },
  allergyTagTextSelected: {
    color: '#FFF',
  },
  actionButton: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222',
    marginTop: 10,
  },
  actionButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#111',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    borderWidth: 1,
    borderColor: '#333',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalClose: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tableList: {
    padding: 15,
  },
  tableOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#222',
  },
  tableOptionSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#1a3a1a',
  },
  tableOptionDisabled: {
    opacity: 0.4,
  },
  tableNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tableNumber: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tableNumberDisabled: {
    color: '#666',
  },
  unavailableLabel: {
    color: '#FF4444',
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default ProfileScreen;