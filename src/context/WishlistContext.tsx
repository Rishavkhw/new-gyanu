import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { useToast } from './ToastContext';

const WISHLIST_STORAGE_KEY = 'gyanu_photo_studio_wishlist_v1';

interface WishlistContextValue {
  wishlistIds: string[];
  wishlistProducts: Product[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

function readStoredWishlist(): string[] {
  try {
    const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === 'string');
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => readStoredWishlist());
  const { showToast } = useToast();

  useEffect(() => {
    try {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // Ignore storage errors gracefully
    }
  }, [wishlistIds]);

  const isInWishlist = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds],
  );

  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlistIds((prev) => {
        const exists = prev.includes(product.id);
        if (exists) {
          showToast(`Removed "${product.name}" from wishlist`, 'info');
          return prev.filter((id) => id !== product.id);
        }
        showToast(`Saved "${product.name}" to wishlist`, 'success');
        return [...prev, product.id];
      });
    },
    [showToast],
  );

  const removeFromWishlist = useCallback(
    (productId: string) => {
      const target = PRODUCTS.find((p) => p.id === productId);
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      if (target) {
        showToast(`Removed "${target.name}" from wishlist`, 'info');
      }
    },
    [showToast],
  );

  const wishlistProducts = useMemo(
    () => PRODUCTS.filter((product) => wishlistIds.includes(product.id)),
    [wishlistIds],
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return ctx;
}
