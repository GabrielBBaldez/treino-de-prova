import type { Alternative } from '../../types/quiz';
import styles from './AlternativeButton.module.css';

interface AlternativeButtonProps {
  alternative: Alternative;
  isSelected: boolean;
  isCorrect: boolean;
  showFeedback: boolean;
  showExplanation: boolean;
  disabled: boolean;
  onClick: () => void;
}

export function AlternativeButton({
  alternative,
  isSelected,
  isCorrect,
  showFeedback,
  showExplanation,
  disabled,
  onClick,
}: AlternativeButtonProps) {
  let className = styles.button;

  if (showFeedback) {
    if (isCorrect) {
      className += ` ${styles.correct}`;
    } else if (isSelected) {
      className += ` ${styles.incorrect}`;
    }
  } else if (isSelected) {
    className += ` ${styles.selected}`;
  }

  if (disabled) {
    className += ` ${styles.disabled}`;
  }

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      <span className={styles.letter}>{alternative.id}</span>
      <div className={styles.content}>
        <span className={styles.text}>{alternative.text}</span>
        {showExplanation && alternative.explanation && (
          <div className={styles.explanation}>{alternative.explanation}</div>
        )}
      </div>
    </button>
  );
}
