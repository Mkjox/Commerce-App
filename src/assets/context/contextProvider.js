import React, { useState } from "react";
const StoreContext = React.createContext();

const contextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [favorites, setFavorites] = useState([]);

    const addToCart = (item) => {
        setCart([...cart, item])
    }

    const removeFromCart = (item) => {
        const newCart = cart.filter((cartItem) => cartItem.id !== item.id)
        setCart(newCart)
    }

    const removeAllFromCart = () => {
        setCart([])
    }

    const addFavorite = (item) => {
        setFavorites([...favorites, item])
    }

    const removeFavorite = (item) => {
        const newFav = favorites.filter((favoritedItem) => favoritedItem.id !== item.id)
        setFavorites(newFav)
    }

    return (
        <StoreContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            addFavorite,
            favorites,
            removeFavorite,
            setIsLogged,
            isLogged,
            removeAllFromCart
        }}>
            {children}
        </StoreContext.Provider>
    )
}




export default contextProvider;
