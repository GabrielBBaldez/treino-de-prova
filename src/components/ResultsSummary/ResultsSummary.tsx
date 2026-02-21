import type { QuizResult } from '../../types/quiz';
import { formatTime } from '../../utils/formatTime';
import styles from './ResultsSummary.module.css';

interface ResultsSummaryProps {
  result: QuizResult;
}

const MODE_NAMES: Record<string, string> = {
  simulado: 'Simulado',
  estudo: 'Estudo',
  revisao: 'Revisao',
};

export function ResultsSummary({ result }: ResultsSummaryProps) {
  const scoreClass =
    result.percentage >= 70
      ? styles.scoreGood
      : result.percentage >= 40
        ? styles.scoreMedium
        : styles.scoreBad;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Resultado</h2>
      <span className={styles.modeBadge}>{MODE_NAMES[result.mode] || result.mode}</span>
      <div className={`${styles.score} ${scoreClass}`}>
        {result.correctCount} / {result.totalQuestions}
      </div>
      <div className={`${styles.percentage} ${scoreClass}`}>
        {result.percentage}%
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{formatTime(result.timeTakenSeconds)}</span>
          <span className={styles.statLabel}>Tempo</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{result.correctCount}</span>
          <span className={styles.statLabel}>Acertos</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{result.totalQuestions - result.correctCount}</span>
          <span className={styles.statLabel}>Erros</span>
        </div>
      </div>
    </div>
  );
}
