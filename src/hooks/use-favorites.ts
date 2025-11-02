
'use client';

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'bangla_font_cdn_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Failed to parse favorites from localStorage', error);
      setFavorites([]);
    }
  }, []);

  const toggleFavorite = useCallback((fontId: string) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.includes(fontId)
        ? prevFavorites.filter(id => id !== fontId)
        : [...prevFavorites, fontId];
      
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      } catch (error) {
        console.error('Failed to save favorites to localStorage', error);
      }

      return newFavorites;
    });
  }, []);

  return { favorites, toggleFavorite };
};
