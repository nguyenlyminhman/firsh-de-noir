"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import type { Perfume } from "@/lib/products";
import { perfumes } from "@/lib/products";

export interface CartItem {
  perfume: Perfume;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (perfume: Perfume, quantity?: number) => void;
  removeFromCart: (perfumeId: number) => void;
  increaseQuantity: (perfumeId: number) => void;
  decreaseQuantity: (perfumeId: number) => void;
  clearCart: () => void;
  totalQuantity: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "firsh-de-noir-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { id: number; quantity: number }[];
      if (!Array.isArray(parsed)) return;

      const hydrated: CartItem[] = parsed
        .map((entry) => {
          const perfume = perfumes.find((p) => p.id === entry.id);
          if (!perfume || !entry.quantity || entry.quantity <= 0) return null;
          return { perfume, quantity: entry.quantity };
        })
        .filter((item): item is CartItem => item !== null);

      if (hydrated.length) {
        setItems(hydrated);
      }
    } catch {
      // ignore corrupted data
    }
  }, []);

  const addToCart = (perfume: Perfume, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.perfume.id === perfume.id);
      if (existing) {
        return prev.map((item) =>
          item.perfume.id === perfume.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { perfume, quantity }];
    });
  };

  const removeFromCart = (perfumeId: number) => {
    setItems((prev) => prev.filter((item) => item.perfume.id !== perfumeId));
  };

  const increaseQuantity = (perfumeId: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.perfume.id === perfumeId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (perfumeId: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.perfume.id === perfumeId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => setItems([]);

  // Persist to localStorage whenever items change
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const toStore = items.map((item) => ({
        id: item.perfume.id,
        quantity: item.quantity,
      }));
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    } catch {
      // ignore write errors
    }
  }, [items]);

  const { totalQuantity, totalPrice } = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc.totalQuantity += item.quantity;
        acc.totalPrice += item.perfume.price * item.quantity;
        return acc;
      },
      { totalQuantity: 0, totalPrice: 0 },
    );
  }, [items]);

  const value: CartContextValue = {
    items,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalQuantity,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

