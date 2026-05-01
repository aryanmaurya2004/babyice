import React, { createContext, useContext, useState } from 'react';
import { Flavor } from '../data/flavors';

export interface CartItem {
  flavor: Flavor;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (flavor: Flavor, quantity: number) => void;
  removeFromCart: (flavorId: string) => void;
  updateQuantity: (flavorId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (flavor: Flavor, quantity: number) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.flavor.id === flavor.id);
      if (existingItem) {
        return prev.map((item) =>
          item.flavor.id === flavor.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { flavor, quantity }];
    });
    setIsCartOpen(true); // Open sidebar automatically on add
  };

  const removeFromCart = (flavorId: string) => {
    setItems((prev) => prev.filter((item) => item.flavor.id !== flavorId));
  };

  const updateQuantity = (flavorId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(flavorId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.flavor.id === flavorId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartTotal = items.reduce((total, item) => {
    const price = parseFloat(item.flavor.price.replace('$', ''));
    return total + price * item.quantity;
  }, 0);

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
