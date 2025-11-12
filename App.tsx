import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';

const App: React.FC = () => {
  return (
    <UserProvider>
      <CartProvider>
        <AppNavigator />
      </CartProvider>
    </UserProvider>
  );
};

export default App;