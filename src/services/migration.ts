import { STORAGE_KEYS } from '../constants/storageKeys';
import { quizApi, resultApi } from './api';
import type { Quiz, QuizResult } from '../types/quiz';

export async function migrateLocalData(): Promise<number> {
  const rawQuizzes = localStorage.getItem(STORAGE_KEYS.QUIZZES);
  const rawResults = localStorage.getItem(STORAGE_KEYS.RESULTS);

  const localQuizzes: Quiz[] = rawQuizzes ? JSON.parse(rawQuizzes) : [];
  const localResults: QuizResult[] = rawResults ? JSON.parse(rawResults) : [];

  if (localQuizzes.length === 0 && localResults.length === 0) {
    return 0;
  }

  let migrated = 0;
  const idMap = new Map<string, string>();

  // Migrate quizzes
  for (const quiz of localQuizzes) {
    try {
      const created = await quizApi.create({
        title: quiz.title,
        description: quiz.description,
        subject: quiz.subject,
        questions: quiz.questions,
      });
      idMap.set(quiz.id, created.id);
      migrated++;
    } catch (err) {
      console.warn('Erro ao migrar quiz:', quiz.title, err);
    }
  }

  // Migrate results with remapped quizIds
  for (const result of localResults) {
    try {
      const remappedQuizId = idMap.get(result.quizId) || result.quizId;
      await resultApi.submit({
        quizId: remappedQuizId,
        quizTitle: result.quizTitle,
        mode: result.mode,
        answers: result.answers,
        correctCount: result.correctCount,
        totalQuestions: result.totalQuestions,
        percentage: result.percentage,
        timeTakenSeconds: result.timeTakenSeconds,
        completedAt: result.completedAt,
      });
      migrated++;
    } catch (err) {
      console.warn('Erro ao migrar resultado:', result.quizTitle, err);
    }
  }

  // Clear local data after successful migration
  localStorage.removeItem(STORAGE_KEYS.QUIZZES);
  localStorage.removeItem(STORAGE_KEYS.RESULTS);

  return migrated;
}
