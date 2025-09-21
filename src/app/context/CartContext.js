"use client";

import { createContext, useEffect, useMemo, useState, useContext } from "react";

const CartContext = createContext(null);

const KEY = "cart_v1";
const ALT_KEYS = ["cart.v1"];

function loadCart() {
  if (typeof window === "undefined") return [];
  try {
    let raw = localStorage.getItem(KEY);
    if (!raw) {
      for (const k of ALT_KEYS) {
        raw = localStorage.getItem(k);
        if (raw) break;
      }
    }
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
    ALT_KEYS.forEach((k) => localStorage.removeItem(k));
  } catch {}
}

const clamp = (n, min, max) => Math.max(min, Math.min(n, max));

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveCart(items);
  }, [items, hydrated]);

  // Add product to cart
  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id);
      const max = Number.isFinite(product?.stock) ? product.stock : 999;

      if (idx === -1) {
        const nextQty = clamp(qty || 1, 1, max);
        const { id, name, price, image, stock } = product;
        return [...prev, { id, name, price, image, stock, qty: nextQty }];
      }

      const next = [...prev];
      const current = next[idx];
      const newQty = clamp((current.qty || 0) + (qty || 1), 1, max);
      next[idx] = { ...current, qty: newQty };
      return next;
    });
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Update product quantity in the cart
  const updateQty = (id, qty) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id !== id) return i;
          const max = Number.isFinite(i?.stock) ? i.stock : 999;
          const newQty = clamp(Number(qty) || 0, 0, max);
          return { ...i, qty: newQty };
        })
        .filter((i) => i.qty > 0)
    );
  };

  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
    const itemCount = items.reduce((s, it) => s + it.qty, 0);
    return { subtotal, itemCount };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      totals,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      setItems,
    }),
    [items, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
