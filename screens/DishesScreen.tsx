import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import CustomAlert from '../components/CustomAlert';
import { useCustomAlert } from '../hooks/useCustomAlert';

interface Dish {
  id: string;
  label: string;
  description: string;
  price: number;
  image: any;
  category: string;
  dietary?: string[];
  allergens?: string[];
}

const { width, height } = Dimensions.get('window');

const DishesScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const { alertConfig, visible, showAlert, hideAlert } = useCustomAlert();
  const [quantity, setQuantity] = useState(1);
  
  const { dish } = (route.params as { dish?: Dish }) || { 
    dish: { 
      id: '1',
      label: 'Seared Scallops with Citrus-Shallot Salad', 
      description: 'The most important thing you need to know about searing scallops is that they should be as dry as possible before they go in the pan. Fresh sea scallops paired with a vibrant citrus-shallot salad create an elegant and refreshing dish.',
      price: 485.00,
      image: require('../assets/dish1.png'),
      category: 'À la carte',
      dietary: ['Gluten-free', 'Dairy-free'],
      allergens: ['Shellfish']
    } 
  };

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity(quantity + 1);
    } else if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(dish, quantity);
    showAlert({
      title: 'Added to Cart',
      message: `${quantity} x ${dish.label} added to your order`,
      type: 'success',
      buttons: [
        { text: 'Continue Shopping', style: 'cancel' },
        { 
          text: 'View Cart', 
          onPress: () => navigation.navigate('Cart'),
          style: 'default'
        }
      ]
    });
  };

  const getTotalPrice = () => {
    return (dish.price * quantity).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Image with Back Button Overlay */}
        <View style={styles.heroContainer}>
          <Image source={dish.image} style={styles.heroImage} />
          
          {/* Back Button - Original Style */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>

        {/* Content Card */}
        <View style={styles.contentCard}>
          {/* Title and Price */}
          <View style={styles.titleRow}>
            <Text style={styles.title}>{dish.label}</Text>
            <Text style={styles.priceTag}>R{dish.price.toFixed(2)}</Text>
          </View>
          
          {/* Category Badge */}
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{dish.category}</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{dish.description}</Text>

          {/* Dietary Information */}
          {dish.dietary && dish.dietary.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Dietary Information</Text>
              <View style={styles.tagsContainer}>
                {dish.dietary.map((tag, index) => (
                  <View key={index} style={styles.dietaryTag}>
                    <Text style={styles.dietaryTagText}>🌿 {tag}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Allergens */}
          {dish.allergens && dish.allergens.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Allergens</Text>
              <View style={styles.tagsContainer}>
                {dish.allergens.map((allergen, index) => (
                  <View key={index} style={styles.allergenTag}>
                    <Text style={styles.allergenTagText}>⚠️ {allergen}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Divider */}
          <View style={styles.divider} />

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity 
                style={[styles.quantityButton, quantity === 1 && styles.disabledButton]} 
                onPress={() => handleQuantityChange(false)}
                disabled={quantity === 1}
              >
                <Text style={[styles.quantityButtonText, quantity === 1 && styles.disabledText]}>−</Text>
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{quantity}</Text>
              
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={() => handleQuantityChange(true)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Total Price Display */}
          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>R{getTotalPrice()}</Text>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity style={styles.orderButton} onPress={handleAddToCart}>
            <Text style={styles.orderButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Custom Alert */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroContainer: {
    width: width,
    height: height * 0.5,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 50,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  contentCard: {
    backgroundColor: '#000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 24,
    paddingTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 15,
    letterSpacing: 0.5,
  },
  priceTag: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  badge: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    color: '#CCC',
    fontSize: 16,
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dietaryTag: {
    backgroundColor: '#1B5E20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  dietaryTagText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  allergenTag: {
    backgroundColor: '#B71C1C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  allergenTagText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 25,
  },
  quantitySection: {
    marginBottom: 20,
  },
  quantityLabel: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    width: 50,
    height: 50,
    backgroundColor: '#222',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
  },
  disabledButton: {
    backgroundColor: '#111',
    borderColor: '#222',
  },
  quantityButtonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  disabledText: {
    color: '#555',
  },
  quantityText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 30,
    minWidth: 40,
    textAlign: 'center',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  totalLabel: {
    color: '#AAA',
    fontSize: 18,
    fontWeight: '600',
  },
  totalPrice: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  orderButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default DishesScreen;