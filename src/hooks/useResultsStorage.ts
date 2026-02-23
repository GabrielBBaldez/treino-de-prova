import { useCallback, useEffect, useState } from 'react';
import type { QuizResult } from '../types/quiz';
import { useLocalStorage } from './useLocalStorage';
import { useAuth } from './useAuth';
import { resultApi } from '../services/api';
import { STORAGE_KEYS } from '../constants/storageKeys';

export function useResultsStorage() {
  const { isAuthenticated } = useAuth();
  const [localResults, setLocalResults] = useLocalStorage<QuizResult[]>(STORAGE_KEYS.RESULTS, []);
  const [remoteResults, setRemoteResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setRemoteResults([]);
      return;
    }

    setLoading(true);
    resultApi.list()
      .then((data) => setRemoteResults(data))
      .catch((err) => console.warn('Erro ao carregar resultados do servidor:', err))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const results = isAuthenticated ? remoteResults : localResults;

  const addResult = useCallback(async (result: QuizResult) => {
    if (isAuthenticated) {
      try {
        const saved = await resultApi.submit({
          quizId: result.quizId,
          quizTitle: result.quizTitle,
          mode: result.mode,
          answers: result.answers,
          correctCount: result.correctCount,
          totalQuestions: result.totalQuestions,
          percentage: result.percentage,
          timeTakenSeconds: result.timeTakenSeconds,
          completedAt: result.completedAt,
        });
        setRemoteResults((prev) => [...prev, saved]);
      } catch (err) {
        console.warn('Erro ao salvar resultado no servidor:', err);
      }
    } else {
      setLocalResults((prev) => [...prev, result]);
    }
  }, [isAuthenticated, setLocalResults]);

  const getResultsForQuiz = useCallback((quizId: string): QuizResult[] => {
    return results.filter((r) => r.quizId === quizId);
  }, [results]);

  const clearResults = useCallback(async () => {
    if (isAuthenticated) {
      try {
        await resultApi.clearAll();
        setRemoteResults([]);
      } catch (err) {
        console.warn('Erro ao limpar resultados no servidor:', err);
      }
    } else {
      setLocalResults([]);
    }
  }, [isAuthenticated, setLocalResults]);

  return { results, addResult, getResultsForQuiz, clearResults, loading };
}
