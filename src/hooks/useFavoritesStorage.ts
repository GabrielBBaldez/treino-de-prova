import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../constants/storageKeys';

type FavoritesMap = Record<string, string[]>;

export function useFavoritesStorage() {
  const [favorites, setFavorites] = useLocalStorage<FavoritesMap>(STORAGE_KEYS.FAVORITES, {});

  const toggleFavorite = useCallback((quizId: string, questionId: string) => {
    setFavorites((prev) => {
      const list = prev[quizId] || [];
      const exists = list.includes(questionId);
      return {
        ...prev,
        [quizId]: exists ? list.filter((id) => id !== questionId) : [...list, questionId],
      };
    });
  }, [setFavorites]);

  const isFavorite = useCallback((quizId: string, questionId: string): boolean => {
    return (favorites[quizId] || []).includes(questionId);
  }, [favorites]);

  const getFavorites = useCallback((quizId: string): string[] => {
    return favorites[quizId] || [];
  }, [favorites]);

  const getFavoriteCount = useCallback((quizId: string): number => {
    return (favorites[quizId] || []).length;
  }, [favorites]);

  const clearFavoritesForQuiz = useCallback((quizId: string) => {
    setFavorites((prev) => {
      const next = { ...prev };
      delete next[quizId];
      return next;
    });
  }, [setFavorites]);

  return { toggleFavorite, isFavorite, getFavorites, getFavoriteCount, clearFavoritesForQuiz };
}
