import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setcartCount] = useState('');

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    console.log('storedCart',storedCart.length)
    setcartCount(storedCart?.length);
  }, []);

  return (
    <CartContext.Provider
      value={{ cartCount, setcartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
