import { useCallback } from 'react';
import type { QuizResult } from '../types/quiz';
import { useLocalStorage } from './useLocalStorage';
import { useAuth } from './useAuth';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { pushResult, clearAllResults } from '../services/firestoreSync';

export function useResultsStorage() {
  const [results, setResults] = useLocalStorage<QuizResult[]>(STORAGE_KEYS.RESULTS, []);
  const { user } = useAuth();

  const addResult = useCallback((result: QuizResult) => {
    setResults((prev) => [...prev, result]);
    if (user) {
      pushResult(user.uid, result).catch(console.error);
    }
  }, [setResults, user]);

  const getResultsForQuiz = useCallback((quizId: string): QuizResult[] => {
    return results.filter((r) => r.quizId === quizId);
  }, [results]);

  const clearResults = useCallback(() => {
    setResults([]);
    if (user) {
      clearAllResults(user.uid).catch(console.error);
    }
  }, [setResults, user]);

  return { results, setResults, addResult, getResultsForQuiz, clearResults };
}
