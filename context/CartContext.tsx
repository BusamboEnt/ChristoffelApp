import React, { createContext, useContext, useState, ReactNode } from 'react';

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

interface CartItem extends Dish {
  quantity: number;
}

interface Order {
  id: string;
  items: CartItem[];
  tableNumber: number;
  totalPrice: number;
  date: string;
  status: 'pending' | 'preparing' | 'served' | 'completed';
}

interface CartContextType {
  cart: CartItem[];
  orders: Order[];
  addToCart: (dish: Dish, quantity: number) => void;
  removeFromCart: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  placeOrder: (tableNumber: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (dish: Dish, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === dish.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...dish, quantity }];
    });
  };

  const removeFromCart = (dishId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== dishId));
  };

  const updateQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === dishId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const placeOrder = (tableNumber: number) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      items: [...cart],
      tableNumber,
      totalPrice: getTotalPrice() * 1.1, // Including tax
      date: new Date().toISOString(),
      status: 'pending',
    };
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};