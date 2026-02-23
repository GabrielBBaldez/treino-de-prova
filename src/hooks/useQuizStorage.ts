import { useCallback, useEffect, useState } from 'react';
import type { Quiz } from '../types/quiz';
import { useLocalStorage } from './useLocalStorage';
import { useAuth } from './useAuth';
import { quizApi } from '../services/api';
import { STORAGE_KEYS } from '../constants/storageKeys';

export function useQuizStorage() {
  const { isAuthenticated } = useAuth();
  const [localQuizzes, setLocalQuizzes] = useLocalStorage<Quiz[]>(STORAGE_KEYS.QUIZZES, []);
  const [remoteQuizzes, setRemoteQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setRemoteQuizzes([]);
      return;
    }

    setLoading(true);
    quizApi.list()
      .then(async (summaries) => {
        const full = await Promise.all(
          summaries.map((s) => quizApi.get(s.id))
        );
        setRemoteQuizzes(full);
      })
      .catch((err) => {
        console.warn('Erro ao carregar quizzes do servidor:', err);
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const quizzes = isAuthenticated ? remoteQuizzes : localQuizzes;

  const addQuiz = useCallback(async (quiz: Quiz) => {
    if (isAuthenticated) {
      try {
        const created = await quizApi.create({
          title: quiz.title,
          description: quiz.description,
          subject: quiz.subject,
          questions: quiz.questions,
        });
        setRemoteQuizzes((prev) => [...prev, created]);
      } catch (err) {
        console.warn('Erro ao criar quiz no servidor:', err);
      }
    } else {
      setLocalQuizzes((prev) => [...prev, quiz]);
    }
  }, [isAuthenticated, setLocalQuizzes]);

  const updateQuiz = useCallback(async (quiz: Quiz) => {
    if (isAuthenticated) {
      try {
        const updated = await quizApi.update(quiz.id, {
          title: quiz.title,
          description: quiz.description,
          subject: quiz.subject,
          questions: quiz.questions,
        });
        setRemoteQuizzes((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
      } catch (err) {
        console.warn('Erro ao atualizar quiz no servidor:', err);
      }
    } else {
      setLocalQuizzes((prev) => prev.map((q) => (q.id === quiz.id ? quiz : q)));
    }
  }, [isAuthenticated, setLocalQuizzes]);

  const deleteQuiz = useCallback(async (id: string) => {
    if (isAuthenticated) {
      try {
        await quizApi.delete(id);
        setRemoteQuizzes((prev) => prev.filter((q) => q.id !== id));
      } catch (err) {
        console.warn('Erro ao deletar quiz no servidor:', err);
      }
    } else {
      setLocalQuizzes((prev) => prev.filter((q) => q.id !== id));
    }
  }, [isAuthenticated, setLocalQuizzes]);

  const getQuiz = useCallback((id: string): Quiz | undefined => {
    return quizzes.find((q) => q.id === id);
  }, [quizzes]);

  return { quizzes, addQuiz, updateQuiz, deleteQuiz, getQuiz, loading };
}
