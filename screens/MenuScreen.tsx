import React from 'react';
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

interface MenuItem {
  id: string;
  label: string;
  description: string;
  price: number;
  image: any;
  category: string;
  dietary?: string[];
  allergens?: string[];
}

const MenuScreen: React.FC = () => {
  const navigation = useNavigation();
  const { getTotalItems } = useCart();
  
  const menuItems: MenuItem[] = [
    { 
      id: '1', 
      label: 'Seared Scallops with Citrus-Shallot Salad', 
      description: 'Fresh sea scallops with vibrant citrus and shallots',
      price: 28.50,
      image: require('../assets/dish1.png'),
      category: 'À la carte',
      dietary: ['Gluten-free', 'Dairy-free'],
      allergens: ['Shellfish']
    },
    { 
      id: '2', 
      label: 'Grilled Ribeye Steak', 
      description: 'Prime ribeye with herb butter and seasonal vegetables',
      price: 42.00,
      image: require('../assets/dish1.png'),
      category: 'À la carte',
      dietary: ['Gluten-free'],
      allergens: ['Dairy']
    },
    { 
      id: '3', 
      label: 'Wild Mushroom Risotto', 
      description: 'Creamy arborio rice with truffle oil and parmesan',
      price: 24.00,
      image: require('../assets/dish1.png'),
      category: 'À la carte',
      dietary: ['Vegetarian'],
      allergens: ['Dairy', 'Gluten']
    },
    { 
      id: '4', 
      label: 'Pan-Seared Salmon', 
      description: 'Atlantic salmon with lemon beurre blanc',
      price: 32.00,
      image: require('../assets/dish1.png'),
      category: 'À la carte',
      dietary: ['Gluten-free'],
      allergens: ['Fish', 'Dairy']
    },
  ];

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
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
        <Text style={styles.cardDescription} numberOfLines={2}>{item.description}</Text>
        <View style={styles.cardFooter}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          {item.dietary && item.dietary.length > 0 && (
            <View style={styles.dietaryTags}>
              {item.dietary.map((tag, index) => (
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
          <Text style={styles.title}>Christoffel</Text>
          <Text style={styles.subtitle}>Fine Dining Experience</Text>
        </View>

        {/* Menu List */}
        <FlatList
          data={menuItems}
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
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
  cartButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MenuScreen;