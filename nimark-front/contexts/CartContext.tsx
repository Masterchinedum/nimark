"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cart, CartItem } from '@/types/cart';

interface CartContextType {
  cart: Cart;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((i) => i.product.id === item.product.id);
      if (existingItem) {
        return {
          ...prevCart,
          items: prevCart.items.map((i) =>
            i.product.id === item.product.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
          total: prevCart.total + item.product.price * item.quantity,
        };
      }
      return {
        ...prevCart,
        items: [...prevCart.items, item],
        total: prevCart.total + item.product.price * item.quantity,
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const item = prevCart.items.find((i) => i.product.id === productId);
      if (!item) return prevCart;
      return {
        ...prevCart,
        items: prevCart.items.filter((i) => i.product.id !== productId),
        total: prevCart.total - item.product.price * item.quantity,
      };
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) => {
      const item = prevCart.items.find((i) => i.product.id === productId);
      if (!item) return prevCart;
      const quantityDiff = quantity - item.quantity;
      return {
        ...prevCart,
        items: prevCart.items.map((i) =>
          i.product.id === productId ? { ...i, quantity } : i
        ),
        total: prevCart.total + item.product.price * quantityDiff,
      };
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
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