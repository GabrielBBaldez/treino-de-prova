import { ChevronLeft, ChevronRight, CheckCircle, SkipForward, Star } from 'lucide-react';
import type { Question, QuizMode, AssertionQuestion } from '../../types/quiz';
import { SKIPPED_ANSWER } from '../../constants/quiz';
import { AlternativeButton } from '../AlternativeButton/AlternativeButton';
import styles from './QuestionDisplay.module.css';

interface QuestionDisplayProps {
  question: Question;
  questionNumber: number;
  selectedAnswer: string | null;
  mode: QuizMode;
  onSelectAnswer: (altId: string) => void;
  onSkip: () => void;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
  canGoPrev: boolean;
  isLast: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function QuestionDisplay({
  question,
  questionNumber,
  selectedAnswer,
  mode,
  onSelectAnswer,
  onSkip,
  onPrev,
  onNext,
  onFinish,
  canGoPrev,
  isLast,
  isFavorite,
  onToggleFavorite,
}: QuestionDisplayProps) {
  const isSkipped = selectedAnswer === SKIPPED_ANSWER;
  const hasAnswered = selectedAnswer !== null && !isSkipped;
  const showFeedback = mode !== 'simulado' && hasAnswered;
  const showExplanation = mode === 'revisao' && hasAnswered;
  const isDisabled = mode !== 'simulado' && (hasAnswered || isSkipped);
  const isCorrect = hasAnswered && selectedAnswer === question.correctAnswer;
  const canSkip = !hasAnswered;

  return (
    <div className={styles.container}>
      <div className={styles.questionHeader}>
        <p className={styles.questionText}>
          <strong>Questão {questionNumber}.</strong> {question.text}
        </p>
        {onToggleFavorite && (
          <button
            className={`${styles.favoriteBtn} ${isFavorite ? styles.favoriteBtnActive : ''}`}
            onClick={onToggleFavorite}
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Star size={20} fill={isFavorite ? '#f5b942' : 'none'} />
          </button>
        )}
      </div>

      {question.image && (
        <img src={question.image} alt="Imagem da questão" className={styles.questionImage} />
      )}

      {question.type === 'assertion' && (
        <div className={styles.assertionsList}>
          {(question as AssertionQuestion).assertions.map((a) => (
            <div className={styles.assertionItem} key={a.id}>
              <span className={styles.assertionId}>{a.id}.</span>
              <span>{a.text}</span>
            </div>
          ))}
        </div>
      )}

      <div className={styles.alternatives}>
        {question.alternatives.map((alt) => (
          <AlternativeButton
            key={alt.id}
            alternative={alt}
            isSelected={!isSkipped && selectedAnswer === alt.id}
            isCorrect={alt.id === question.correctAnswer}
            showFeedback={showFeedback}
            showExplanation={showExplanation}
            disabled={isDisabled}
            onClick={() => onSelectAnswer(alt.id)}
          />
        ))}
      </div>

      {showFeedback && (
        <div className={isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}>
          {isCorrect ? 'Resposta correta!' : `Resposta errada. A correta era: ${question.correctAnswer}`}
        </div>
      )}

      {showExplanation && question.explanation && (
        <div className={styles.explanationBox}>
          {question.explanation}
        </div>
      )}

      <div className={styles.navigation}>
        <button
          className={`${styles.navBtn} ${styles.prevBtn}`}
          onClick={onPrev}
          disabled={!canGoPrev}
        >
          <ChevronLeft size={18} />
          Anterior
        </button>

        <button
          className={`${styles.navBtn} ${isSkipped ? styles.skipBtnActive : styles.skipBtn}`}
          onClick={onSkip}
          disabled={!canSkip}
          aria-label="Pular questão"
        >
          <SkipForward size={18} />
          {isSkipped ? 'Pulada' : 'Pular'}
        </button>

        {isLast ? (
          <button className={`${styles.navBtn} ${styles.finishBtn}`} onClick={onFinish}>
            <CheckCircle size={18} />
            Finalizar
          </button>
        ) : (
          <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={onNext}>
            Próxima
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
