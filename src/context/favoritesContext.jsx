// src/context/favoritesContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Load from localStorage on mount
    useEffect(() => {
        const storedFavorites = localStorage.getItem("github-users-favorites");
        if (storedFavorites) {
            try {
                setFavorites(JSON.parse(storedFavorites));
            } catch (error) {
                console.error("Failed to parse favorites", error);
            }
        }
    }, []);

    // Save to localStorage when favorites change
    useEffect(() => {
        localStorage.setItem("github-users-favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (user) => {
        setFavorites((prev) =>
            prev.some((fav) => fav.id === user.id) ? prev : [...prev, user]
        );
    };

    const removeFavorite = (userId) => {
        setFavorites((prev) => prev.filter((fav) => fav.id !== userId));
    };

    const isFavorite = (userId) => {
        return favorites.some((fav) => fav.id === userId);
    };

    const value = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};

// Create and export the custom hook
export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};