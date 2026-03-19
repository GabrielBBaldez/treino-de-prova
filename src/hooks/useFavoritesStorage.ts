import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useAuth } from './useAuth';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { pushFavorites } from '../services/firestoreSync';

type FavoritesMap = Record<string, string[]>;

export function useFavoritesStorage() {
  const [favorites, setFavorites] = useLocalStorage<FavoritesMap>(STORAGE_KEYS.FAVORITES, {});
  const { user } = useAuth();

  const syncFavorites = useCallback((quizId: string, questionIds: string[]) => {
    if (user) {
      pushFavorites(user.uid, quizId, questionIds).catch((err) => {
        console.warn('[Questify] Falha ao sincronizar favoritos na nuvem:', err);
      });
    }
  }, [user]);

  const toggleFavorite = useCallback((quizId: string, questionId: string) => {
    setFavorites((prev) => {
      const list = prev[quizId] || [];
      const exists = list.includes(questionId);
      const updated = exists
        ? list.filter((id) => id !== questionId)
        : [...list, questionId];
      syncFavorites(quizId, updated);
      return {
        ...prev,
        [quizId]: updated,
      };
    });
  }, [setFavorites, syncFavorites]);

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
    syncFavorites(quizId, []);
  }, [setFavorites, syncFavorites]);

  return { favorites, setFavorites, toggleFavorite, isFavorite, getFavorites, getFavoriteCount, clearFavoritesForQuiz };
}
