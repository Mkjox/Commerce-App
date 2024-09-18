import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem('favorites');
                if (storedFavorites) {
                    setFavorites(JSON.parse(storedFavorites));
                }
            }
            catch (error) {
                console.error('Failed to load favorites:', error);
            }
        };
        loadFavorites();
    }, []);

    useEffect(() => {
        const saveFavorites = async () => {
            try {
                await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
            }
            catch (error) {
                console.error('Failed to save favorites:', error);
            }
        };
        saveFavorites();
    }, [favorites]);

    const addFavorite = (item) => {
        setFavorites([...favorites, item]);
    };

    const removeFavorite = (itemId) => {
        const updatedFavorites = favorites.filter(item => item.id !== itemId);
        setFavorites(updatedFavorites);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export default FavoritesContext;