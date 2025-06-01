"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

const FavoritesContext = createContext(undefined)

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([])

    // Load favorites from localStorage on initial render
    useEffect(() => {
        try {
            const storedFavorites = localStorage.getItem("github-users-favorites")
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites))
            }
        } catch (error) {
            console.error("Failed to load favorites from localStorage:", error)
        }
    }, [])

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("github-users-favorites", JSON.stringify(favorites))
    }, [favorites])

    const addFavorite = (user) => {
        setFavorites((prev) => {
            // Don't add if already in favorites
            if (prev.some((fav) => fav.id === user.id)) {
                return prev
            }
            return [...prev, user]
        })
    }

    const removeFavorite = (userId) => {
        setFavorites((prev) => prev.filter((fav) => fav.id !== userId))
    }

    const isFavorite = (userId) => {
        return favorites.some((fav) => fav.id === userId)
    }

    const value = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
    }

    return (
        <FavoritesContext.Provider value= { value } >
        { children }
        </FavoritesContext.Provider>
    )
}

export function useFavorites() {
    const context = useContext(FavoritesContext)
    if (context === undefined) {
        throw new Error("useFavorites must be used within a FavoritesProvider")
    }
    return context
}