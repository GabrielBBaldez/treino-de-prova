import { useCallback } from 'react';
import type { Quiz } from '../types/quiz';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../constants/storageKeys';

export function useQuizStorage() {
  const [quizzes, setQuizzes] = useLocalStorage<Quiz[]>(STORAGE_KEYS.QUIZZES, []);

  const addQuiz = useCallback((quiz: Quiz) => {
    setQuizzes((prev) => [...prev, quiz]);
  }, [setQuizzes]);

  const updateQuiz = useCallback((quiz: Quiz) => {
    setQuizzes((prev) => prev.map((q) => (q.id === quiz.id ? quiz : q)));
  }, [setQuizzes]);

  const deleteQuiz = useCallback((id: string) => {
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
  }, [setQuizzes]);

  const getQuiz = useCallback((id: string): Quiz | undefined => {
    return quizzes.find((q) => q.id === id);
  }, [quizzes]);

  return { quizzes, addQuiz, updateQuiz, deleteQuiz, getQuiz };
}
