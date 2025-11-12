import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
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
  ChevronRight
} from 'lucide-react-native';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user, updateProfile } = useUser();
  const { orders } = useCart();
  const { alertConfig, visible, showAlert, hideAlert } = useCustomAlert();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [favoriteTable, setFavoriteTable] = useState(user.favoriteTable?.toString() || '');

  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Halal', 'Kosher'];
  const allergyOptions = ['Nuts', 'Shellfish', 'Dairy', 'Gluten', 'Eggs', 'Soy', 'Fish'];

  const [selectedDietary, setSelectedDietary] = useState<string[]>(user.dietaryPreferences);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(user.allergyInfo);

  const toggleSelection = (item: string, list: string[], setList: (list: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
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
      favoriteTable: favoriteTable ? parseInt(favoriteTable) : undefined,
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

            <View style={styles.inputContainer}>
              <MapPin color="#AAA" size={20} strokeWidth={2} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={favoriteTable}
                onChangeText={setFavoriteTable}
                placeholder="Favorite table number"
                placeholderTextColor="#555"
                keyboardType="numeric"
              />
            </View>
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
});

export default ProfileScreen;