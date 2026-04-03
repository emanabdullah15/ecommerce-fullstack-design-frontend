import { createContext, useState, useEffect } from "react";
// import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const API_BASE = process.env.REACT_APP_API_URL;

  const fetchCart = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/cart`);
      setCartItems(data);
      setCartCount(data.reduce((acc, item) => acc + item.qty, 0));
    } catch (err) {
      console.error("Fetch cart error:", err);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/cart/${id}`);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeAll = async () => {
    try {
      await axios.delete(`${API_BASE}/api/cart`);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const updateQty = async (id, qty) => {
    try {
      await axios.put(`${API_BASE}/api/cart/${id}`, { qty });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = async (customerData) => {
    try {
      if (cartItems.length === 0) { alert("Cart is empty"); return; }
      const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
      const discount = subtotal > 500 ? 60 : 0;
      const tax = subtotal * 0.01;
      const total = subtotal - discount + tax;

      const orderData = { customer: customerData, items: cartItems, subtotal, discount, tax, total, status: "pending" };
      const res = await axios.post(`${API_BASE}/api/orders`, orderData);
      alert(res.data.message || "Order placed successfully!");
      await removeAll();
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Check server connection.");
    }
  };

  useEffect(() => { fetchCart(); }, []);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, fetchCart, removeItem, removeAll, updateQty, handleCheckout }}>
      {children}
    </CartContext.Provider>
  );
};