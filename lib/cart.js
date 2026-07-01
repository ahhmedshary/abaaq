"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{id, name, price, image, quantity}]
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("oud_cart") || "[]");
      setItems(saved);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem("oud_cart", JSON.stringify(items));
  }, [items, ready]);

  function add(product, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, quantity }];
    });
  }

  function update(productId, quantity) {
    if (quantity <= 0) return remove(productId);
    setItems((prev) => prev.map((i) => (i.id === productId ? { ...i, quantity } : i)));
  }

  function remove(productId) {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  }

  function clear() {
    setItems([]);
  }

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, count, subtotal, add, update, remove, clear, ready }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
