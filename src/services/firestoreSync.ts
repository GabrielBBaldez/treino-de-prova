import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Quiz, QuizResult } from '../types/quiz';

// Quizzes

export async function fetchQuizzes(userId: string): Promise<Quiz[]> {
  const snap = await getDocs(collection(db, 'users', userId, 'quizzes'));
  return snap.docs.map((d) => d.data() as Quiz);
}

export async function pushQuiz(userId: string, quiz: Quiz): Promise<void> {
  await setDoc(doc(db, 'users', userId, 'quizzes', quiz.id), quiz);
}

export async function removeQuiz(userId: string, quizId: string): Promise<void> {
  await deleteDoc(doc(db, 'users', userId, 'quizzes', quizId));
}

// Results

export async function fetchResults(userId: string): Promise<QuizResult[]> {
  const snap = await getDocs(collection(db, 'users', userId, 'results'));
  return snap.docs.map((d) => d.data() as QuizResult);
}

export async function pushResult(userId: string, result: QuizResult): Promise<void> {
  await setDoc(doc(db, 'users', userId, 'results', result.id), result);
}

export async function clearAllResults(userId: string): Promise<void> {
  const snap = await getDocs(collection(db, 'users', userId, 'results'));
  const batch = writeBatch(db);
  snap.docs.forEach((d) => batch.delete(d.ref));
  await batch.commit();
}

// Favorites

export async function fetchFavorites(
  userId: string,
): Promise<Record<string, string[]>> {
  const snap = await getDocs(collection(db, 'users', userId, 'favorites'));
  const result: Record<string, string[]> = {};
  snap.docs.forEach((d) => {
    result[d.id] = (d.data().questionIds as string[]) || [];
  });
  return result;
}

export async function pushFavorites(
  userId: string,
  quizId: string,
  questionIds: string[],
): Promise<void> {
  const ref = doc(db, 'users', userId, 'favorites', quizId);
  if (questionIds.length === 0) {
    await deleteDoc(ref);
  } else {
    await setDoc(ref, { questionIds });
  }
}

// Bulk merge

export async function mergeLocalToCloud(
  userId: string,
  quizzes: Quiz[],
  results: QuizResult[],
  favorites: Record<string, string[]>,
): Promise<void> {
  const batch = writeBatch(db);

  quizzes.forEach((quiz) => {
    batch.set(doc(db, 'users', userId, 'quizzes', quiz.id), quiz);
  });

  results.forEach((result) => {
    batch.set(doc(db, 'users', userId, 'results', result.id), result);
  });

  Object.entries(favorites).forEach(([quizId, questionIds]) => {
    if (questionIds.length > 0) {
      batch.set(doc(db, 'users', userId, 'favorites', quizId), { questionIds });
    }
  });

  await batch.commit();
}

// Profile

export async function saveProfile(
  userId: string,
  profile: { displayName: string; email: string; photoURL: string; createdAt: string },
): Promise<void> {
  await setDoc(doc(db, 'users', userId, 'profile'), profile, { merge: true });
}
