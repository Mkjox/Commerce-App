import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const storedCart = await AsyncStorage.getItem('cart');
                if (storedCart) {
                    setCart(JSON.parse(storedCart));
                }
            }
            catch (error) {
                console.error('Failed to load cart:', error);
            }
        };
        loadCart();
    }, []);

    useEffect(() => {
        const addCart = async () => {
            try {
                await AsyncStorage.setItem('cart', JSON.stringify(cart));
            }
            catch (error) {
                console.error('Failed to add to cart', error);
            }
        };
        addCart();
    }, [cart]);

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const removeFromCart = (itemId) => {
        const updatedCart = cart.filter(item => item.id !== itemId);
        setCart(updatedCart);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;