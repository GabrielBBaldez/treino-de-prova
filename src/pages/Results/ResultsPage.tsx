import { useEffect } from 'react';
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
  const { addResult } = useResultsStorage();

  const state = location.state as ResultsState | null;

  useEffect(() => {
    if (state?.result) {
      addResult(state.result);
    }
  }, []);

  if (!state?.result || !state?.questions) {
    return (
      <div className={styles.empty}>
        <p>Nenhum resultado disponivel.</p>
        <button className={`${styles.actionBtn} ${styles.homeBtn}`} onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>
          <Home size={18} />
          Voltar ao inicio
        </button>
      </div>
    );
  }

  const { result, questions } = state;

  return (
    <div>
      <ResultsSummary result={result} />

      <div className={styles.actions}>
        <button className={`${styles.actionBtn} ${styles.retakeBtn}`} onClick={() => navigate(`/play/${result.quizId}`)}>
          <RotateCcw size={18} />
          Refazer
        </button>
        <button className={`${styles.actionBtn} ${styles.homeBtn}`} onClick={() => navigate('/')}>
          <Home size={18} />
          Inicio
        </button>
      </div>

      <h2 className={styles.reviewTitle}>Revisao das Questoes</h2>
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
