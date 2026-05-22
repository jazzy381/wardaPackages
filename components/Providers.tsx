'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

type CartItem = {
  id: string | number;
  title: string;
  image: string;
  subtitle?: string;
  price?: number;
  quantity: number;
};

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: any) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchValue: string;
  setSearchValue: (val: string) => void;
  currency: string;
  paymentMethods: string[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [currency, setCurrency] = useState('Rs');
  const [paymentMethods, setPaymentMethods] = useState(['Cash on Delivery', 'Bank Transfer']);

  // Load from local storage and firestore
  useEffect(() => {
    const saved = localStorage.getItem('warda_cart');
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCart(JSON.parse(saved));
      } catch (e) {}
    }

    const unsubCurrency = onSnapshot(doc(db, 'settings', 'currency'), (docSnap) => {
      if (docSnap.exists()) {
         setCurrency(docSnap.data().value);
      }
    });

    const unsubPayments = onSnapshot(doc(db, 'settings', 'paymentMethods'), (docSnap) => {
      if (docSnap.exists()) {
         const val = docSnap.data().value;
         if (val) {
           setPaymentMethods(val.split(',').map((s: string) => s.trim()));
         }
      }
    });

    return () => {
      unsubCurrency();
      unsubPayments();
    };
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('warda_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, price: product.price || 0 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => 
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const removeFromCart = (id: string | number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
  
  const clearCart = () => {
    setCart([]);
  }

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchValue,
        setSearchValue,
        currency,
        paymentMethods
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
