import { useCallback } from 'react';
import type { Quiz } from '../types/quiz';
import { useLocalStorage } from './useLocalStorage';
import { useAuth } from './useAuth';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { pushQuiz, removeQuiz } from '../services/firestoreSync';

export function useQuizStorage() {
  const [quizzes, setQuizzes] = useLocalStorage<Quiz[]>(STORAGE_KEYS.QUIZZES, []);
  const { user } = useAuth();

  const addQuiz = useCallback((quiz: Quiz) => {
    setQuizzes((prev) => [...prev, quiz]);
    if (user) {
      pushQuiz(user.uid, quiz).catch((err) => {
        console.warn('[Questify] Falha ao salvar quiz na nuvem:', err);
      });
    }
  }, [setQuizzes, user]);

  const updateQuiz = useCallback((quiz: Quiz) => {
    setQuizzes((prev) => prev.map((q) => (q.id === quiz.id ? quiz : q)));
    if (user) {
      pushQuiz(user.uid, quiz).catch((err) => {
        console.warn('[Questify] Falha ao atualizar quiz na nuvem:', err);
      });
    }
  }, [setQuizzes, user]);

  const deleteQuiz = useCallback((id: string) => {
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
    if (user) {
      removeQuiz(user.uid, id).catch((err) => {
        console.warn('[Questify] Falha ao excluir quiz na nuvem:', err);
      });
    }
  }, [setQuizzes, user]);

  const getQuiz = useCallback((id: string): Quiz | undefined => {
    return quizzes.find((q) => q.id === id);
  }, [quizzes]);

  return { quizzes, setQuizzes, addQuiz, updateQuiz, deleteQuiz, getQuiz };
}
