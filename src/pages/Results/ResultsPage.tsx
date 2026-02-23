import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { RotateCcw, Home } from 'lucide-react';
import { useResultsStorage } from '../../hooks/useResultsStorage';
import { ResultsSummary } from '../../components/ResultsSummary/ResultsSummary';
import { QuestionReview } from '../../components/QuestionReview/QuestionReview';
import type { QuizResult, Question } from '../../types/quiz';
import styles from './ResultsPage.module.css';

interface ResultsState {
  result: QuizResult;
  questions: Question[];
}

export function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, addResult } = useResultsStorage();

  const state = location.state as ResultsState | null;

  useEffect(() => {
    if (state?.result) {
      addResult(state.result);
    }
  }, []);

  const isPerfect = state?.result?.percentage === 100;

  const timeRecord = useMemo(() => {
    if (!state?.result) return null;
    const previous = results.filter(
      (r) => r.quizId === state.result.quizId && r.id !== state.result.id
    );
    if (previous.length === 0) return null;
    const previousBest = Math.min(...previous.map((r) => r.timeTakenSeconds));
    if (state.result.timeTakenSeconds < previousBest) {
      return { isNew: true, previousBest };
    }
    return null;
  }, [state, results]);

  if (!state?.result || !state?.questions) {
    return (
      <div className={styles.empty}>
        <p>Nenhum resultado disponível.</p>
        <button className={`${styles.actionBtn} ${styles.homeBtn}`} onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>
          <Home size={18} />
          Voltar ao início
        </button>
      </div>
    );
  }

  const { result, questions } = state;

  return (
    <div>
      <ResultsSummary result={result} isPerfect={isPerfect} timeRecord={timeRecord} />

      <div className={styles.actions}>
        <button className={`${styles.actionBtn} ${styles.retakeBtn}`} onClick={() => navigate(`/play/${result.quizId}`)}>
          <RotateCcw size={18} />
          Refazer
        </button>
        <button className={`${styles.actionBtn} ${styles.homeBtn}`} onClick={() => navigate('/')}>
          <Home size={18} />
          Início
        </button>
      </div>

      <h2 className={styles.reviewTitle}>Revisão das Questões</h2>
      {questions.map((q, i) => (
        <QuestionReview
          key={q.id}
          question={q}
          questionNumber={i + 1}
          userAnswer={result.answers[q.id]}
        />
      ))}
    </div>
  );
}
