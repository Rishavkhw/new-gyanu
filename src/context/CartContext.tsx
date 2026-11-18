import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CartItem, Product } from '../types';
import { useToast } from './ToastContext';

const CART_STORAGE_KEY = 'gyanu_photo_studio_cart_v1';

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (product: Product, quantity?: number, openOnAdd?: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function readStoredCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry): entry is CartItem =>
        entry &&
        typeof entry === 'object' &&
        entry.product &&
        typeof entry.product.id === 'string' &&
        typeof entry.quantity === 'number' &&
        entry.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStoredCart());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota or privacy mode errors gracefully
    }
  }, [items]);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const addToCart = useCallback(
    (product: Product, quantity = 1, openOnAdd = false) => {
      const safeQty = Math.max(1, Math.floor(quantity));
      setItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.product.id === product.id);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + safeQty,
          };
          return updated;
        }
        return [...prev, { product, quantity: safeQty }];
      });
      showToast(`Added "${product.name}" to cart`, 'success');
      if (openOnAdd) {
        setIsDrawerOpen(true);
      }
    },
    [showToast],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setItems((prev) => {
        const target = prev.find((item) => item.product.id === productId);
        if (target) {
          showToast(`Removed "${target.product.name}" from cart`, 'info');
        }
        return prev.filter((item) => item.product.id !== productId);
      });
    },
    [showToast],
  );

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.floor(quantity) } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalAmount,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
