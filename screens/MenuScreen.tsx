import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { User, Receipt, ShoppingCart } from 'lucide-react-native';

interface MenuItem {
  id: string;
  label: string;
  description: string;
  price: number;
  image: any;
  category: string;
  course: 'starter' | 'main' | 'dessert';
  dietary?: string[];
  allergens?: string[];
}

const MenuScreen: React.FC = () => {
  const navigation = useNavigation();
  const { getTotalItems } = useCart();
  const [selectedCourse, setSelectedCourse] = useState<'all' | 'starter' | 'main' | 'dessert'>('all');
  
  const menuItems: MenuItem[] = [
    // STARTERS
    { 
      id: 's1', 
      label: 'Crispy Calamari with Aioli', 
      description: 'Tender calamari rings, lightly breaded and fried to perfection',
      price: 145.00,
      image: require('../assets/dish1.png'),
      category: 'À la carte',
      course: 'starter',
      dietary: ['Dairy-free'],
      allergens: ['Shellfish', 'Gluten']
    },
    { 
      id: 's2', 
      label: 'Caprese Salad', 
      description: 'Fresh mozzarella, ripe tomatoes, and basil with balsamic glaze',
      price: 125.00,
      image: require('../assets/dish1.png'),
      category: 'À la carte',
      course: 'starter',
      dietary: ['Vegetarian', 'Gluten-free'],
      allergens: ['Dairy']
    },
    { 
      id: 's3', 
      label: 'Soup of the Day', 
      description: 'Chef\'s specially prepared seasonal soup',
      price: 95.00,
      image: require('../assets/dish1.png'),
      category: 'À la carte',
      course: 'starter',
      dietary: ['Vegetarian'],
      allergens: ['Dairy']
    },
    { 
      id: 's4', 
      label: 'Prawn Cocktail', 
      description: 'Succulent prawns served with cocktail sauce and lemon',
      price: 165.00,
      image: require('../assets/dish1.png'),
      category: 'À la carte',
      course: 'starter',
      dietary: ['Gluten-free', 'Dairy-free'],
      allergens: ['Shellfish']
    },
    
    // MAINS
    { 
      id: 'm1', 
      label: 'Seared Scallops with Citrus-Shallot Salad', 
      description: 'Fresh sea scallops with vibrant citrus and shallots',
      price: 485.00,
      image: require('../assets/dish1.png'),
      category: 'À la carte',
      course: 'main',
      dietary: ['Gluten-free', 'Dairy-free'],
      allergens: ['Shellfish']
    },
    { 
      id: 'm2', 
      label: 'Grilled Ribeye Steak', 
      description: 'Prime ribeye with herb butter and seasonal vegetables',
      price: 725.00,
      image: require('../assets/dish1.png'),
      category: 'À la carte',
      course: 'main',
      dietary: ['Gluten-free'],
      allergens: ['Dairy']
    },
    { 
      id: 'm3', 
      label: 'Wild Mushroom Risotto', 
      description: 'Creamy arborio rice with truffle oil and parmesan',
      price: 395.00,
      image: require('../assets/dish1.png'),
      category: 'À la carte',
      course: 'main',
      dietary: ['Vegetarian'],
      allergens: ['Dairy', 'Gluten']
    },
    { 
      id: 'm4', 
      label: 'Pan-Seared Salmon', 
      description: 'Atlantic salmon with lemon beurre blanc',
      price: 545.00,
      image: require('../assets/dish1.png'),
      category: 'À la carte',
      course: 'main',
      dietary: ['Gluten-free'],
      allergens: ['Fish', 'Dairy']
    },
    
    // DESSERTS
    { 
      id: 'd1', 
      label: 'Chocolate Lava Cake', 
      description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
      price: 145.00,
      image: require('../assets/dish1.png'),
      category: 'À la carte',
      course: 'dessert',
      dietary: ['Vegetarian'],
      allergens: ['Dairy', 'Gluten', 'Eggs']
    },
    { 
      id: 'd2', 
      label: 'Crème Brûlée', 
      description: 'Classic French vanilla custard with caramelized sugar topping',
      price: 125.00,
      image: require('../assets/dish1.png'),
      category: 'À la carte',
      course: 'dessert',
      dietary: ['Vegetarian', 'Gluten-free'],
      allergens: ['Dairy', 'Eggs']
    },
    { 
      id: 'd3', 
      label: 'Tiramisu', 
      description: 'Traditional Italian dessert with espresso-soaked ladyfingers',
      price: 135.00,
      image: require('../assets/dish1.png'),
      category: 'À la carte',
      course: 'dessert',
      dietary: ['Vegetarian'],
      allergens: ['Dairy', 'Gluten', 'Eggs']
    },
    { 
      id: 'd4', 
      label: 'Fresh Berry Sorbet', 
      description: 'Light and refreshing mixed berry sorbet',
      price: 95.00,
      image: require('../assets/dish1.png'),
      category: 'À la carte',
      course: 'dessert',
      dietary: ['Vegan', 'Gluten-free', 'Dairy-free'],
      allergens: []
    },
  ];

  // Filter menu items based on selected course
  const filteredMenuItems = selectedCourse === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.course === selectedCourse);

  const renderItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('Dishes', { dish: item })}
      activeOpacity={0.8}
    >
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle} numberOfLines={2}>{item.label}</Text>
          <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
        </View>
        <Text style={styles.cardDescription} numberOfLines={2}>{item.description}</Text>
        <View style={styles.cardFooter}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.course.toUpperCase()}</Text>
          </View>
          {item.dietary && item.dietary.length > 0 && (
            <View style={styles.dietaryTags}>
              {item.dietary.slice(0, 2).map((tag, index) => (
                <Text key={index} style={styles.dietaryTag}>🌿 {tag}</Text>
              ))}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <User color="#FFF" size={28} strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.title}>Christoffel</Text>
            <Text style={styles.subtitle}>Fine Dining Experience</Text>
          </View>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('OrderHistory')}
          >
            <Receipt color="#FFF" size={28} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Course Filter Buttons */}
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, selectedCourse === 'all' && styles.filterButtonActive]}
            onPress={() => setSelectedCourse('all')}
          >
            <Text style={[styles.filterButtonText, selectedCourse === 'all' && styles.filterButtonTextActive]}>
              All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, selectedCourse === 'starter' && styles.filterButtonActive]}
            onPress={() => setSelectedCourse('starter')}
          >
            <Text style={[styles.filterButtonText, selectedCourse === 'starter' && styles.filterButtonTextActive]}>
              Starters
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, selectedCourse === 'main' && styles.filterButtonActive]}
            onPress={() => setSelectedCourse('main')}
          >
            <Text style={[styles.filterButtonText, selectedCourse === 'main' && styles.filterButtonTextActive]}>
              Mains
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, selectedCourse === 'dessert' && styles.filterButtonActive]}
            onPress={() => setSelectedCourse('dessert')}
          >
            <Text style={[styles.filterButtonText, selectedCourse === 'dessert' && styles.filterButtonTextActive]}>
              Desserts
            </Text>
          </TouchableOpacity>
        </View>

        {/* Menu List */}
        <FlatList
          data={filteredMenuItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />

        {/* Cart Button */}
        {getTotalItems() > 0 && (
          <TouchableOpacity 
            style={styles.cartButton}
            onPress={() => navigation.navigate('Cart')}
          >
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{getTotalItems()}</Text>
            </View>
            <ShoppingCart color="#000" size={20} strokeWidth={2} style={styles.cartIcon} />
            <Text style={styles.cartButtonText}>View Cart</Text>
          </TouchableOpacity>
        )}
      </View>
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
    backgroundColor: '#000' 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { 
    color: '#FFF', 
    fontSize: 32, 
    fontWeight: 'bold', 
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 10,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#FFF',
    borderColor: '#FFF',
  },
  filterButtonText: {
    color: '#AAA',
    fontSize: 14,
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#000',
  },
  list: { 
    padding: 15,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#222',
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    flex: 1,
    marginRight: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cardDescription: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 12,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  categoryBadge: {
    backgroundColor: '#222',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  categoryText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dietaryTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  dietaryTag: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '600',
  },
  cartButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cartBadge: {
    backgroundColor: '#000',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cartIcon: {
    marginRight: 5,
  },
  cartButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MenuScreen;