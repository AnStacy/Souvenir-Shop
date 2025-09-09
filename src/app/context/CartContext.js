"use client";

import { createContext, useEffect, useState, useMemo, useContext } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart_v1");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart_v1", JSON.stringify(items));
    } catch {}
  }, [items]);

  //   Add product to cart
  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === product.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
        return copy;
      }
      const { id, name, price, image } = product;
      return [...prev, { id, name, price, image, qty }];
    });
  };

  //   Remove product from cart
  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  //   Update product quantity in the cart
  const updateQty = (id, qty) => {
    setItems((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, qty } : x))
        .filter((x) => x.qty > 0)
    );
  };

  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((s, x) => s + x.price * x.qty, 0);
    return { subtotal };
  }, [items]);

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    totals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
