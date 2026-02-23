import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import type { Question, QuizMode } from '../../types/quiz';
import { AlternativeButton } from '../AlternativeButton/AlternativeButton';
import styles from './QuestionDisplay.module.css';

interface QuestionDisplayProps {
  question: Question;
  questionNumber: number;
  selectedAnswer: string | null;
  mode: QuizMode;
  onSelectAnswer: (altId: string) => void;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
  canGoPrev: boolean;
  isLast: boolean;
}

export function QuestionDisplay({
  question,
  questionNumber,
  selectedAnswer,
  mode,
  onSelectAnswer,
  onPrev,
  onNext,
  onFinish,
  canGoPrev,
  isLast,
}: QuestionDisplayProps) {
  const hasAnswered = selectedAnswer !== null;
  const showFeedback = mode !== 'simulado' && hasAnswered;
  const showExplanation = mode === 'revisao' && hasAnswered;
  const isDisabled = mode !== 'simulado' && hasAnswered;
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className={styles.container}>
      <p className={styles.questionText}>
        <strong>Questão {questionNumber}.</strong> {question.text}
      </p>

      {question.image && (
        <img src={question.image} alt="Imagem da questão" className={styles.questionImage} />
      )}

      {question.type === 'assertion' && 'assertions' in question && (
        <div className={styles.assertionsList}>
          {(question as any).assertions.map((a: any) => (
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
            isSelected={selectedAnswer === alt.id}
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
