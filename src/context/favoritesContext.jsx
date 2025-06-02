// src/context/favoritesContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const loadFavorites = () => {
            try {
                const storedFavorites = localStorage.getItem("github-users-favorites");
                if (storedFavorites) {
                    const parsedFavorites = JSON.parse(storedFavorites);
                    if (Array.isArray(parsedFavorites)) {
                        setFavorites(parsedFavorites);
                    }
                }
            } catch (error) {
                console.error("Failed to load favorites from localStorage", error);
                // Clear corrupted data
                localStorage.removeItem("github-users-favorites");
            } finally {
                setIsLoaded(true);
            }
        };

        loadFavorites();
    }, []);

    // Save to localStorage when favorites change
    useEffect(() => {
        if (!isLoaded) return; // Don't save during initial load

        try {
            localStorage.setItem("github-users-favorites", JSON.stringify(favorites));
        } catch (error) {
            console.error("Failed to save favorites to localStorage", error);
            if (error.name === 'QuotaExceededError') {
                alert("Storage is full! Couldn't save your favorites.");
            }
        }
    }, [favorites, isLoaded]);

    const addFavorite = (user) => {
        if (!user?.id) return;
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
        isLoaded // Optional: if you want components to know when data is ready
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};