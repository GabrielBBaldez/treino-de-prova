import { useCallback } from 'react';
import type { QuizResult } from '../types/quiz';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../constants/storageKeys';

export function useResultsStorage() {
  const [results, setResults] = useLocalStorage<QuizResult[]>(STORAGE_KEYS.RESULTS, []);

  const addResult = useCallback((result: QuizResult) => {
    setResults((prev) => [...prev, result]);
  }, [setResults]);

  const getResultsForQuiz = useCallback((quizId: string): QuizResult[] => {
    return results.filter((r) => r.quizId === quizId);
  }, [results]);

  const clearResults = useCallback(() => {
    setResults([]);
  }, [setResults]);

  return { results, addResult, getResultsForQuiz, clearResults };
}
