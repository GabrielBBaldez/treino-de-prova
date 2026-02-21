import { useState } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';
import type { Question } from '../../types/quiz';
import styles from './QuestionReview.module.css';

interface QuestionReviewProps {
  question: Question;
  questionNumber: number;
  userAnswer: string | undefined;
}

export function QuestionReview({ question, questionNumber, userAnswer }: QuestionReviewProps) {
  const [open, setOpen] = useState(false);
  const isCorrect = userAnswer === question.correctAnswer;

  return (
    <div className={styles.card}>
      <div className={styles.header} onClick={() => setOpen(!open)}>
        <div className={styles.headerLeft}>
          <span className={styles.questionNum}>Questao {questionNumber}</span>
          <span className={`${styles.badge} ${isCorrect ? styles.badgeCorrect : styles.badgeWrong}`}>
            {isCorrect ? <><Check size={12} /> Correta</> : <><X size={12} /> Errada</>}
          </span>
        </div>
        <ChevronDown size={18} className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} />
      </div>

      {open && (
        <div className={styles.body}>
          <p className={styles.questionText}>{question.text}</p>

          {question.image && (
            <img src={question.image} alt="Imagem da questao" className={styles.questionImage} />
          )}

          <div className={styles.altList}>
            {question.alternatives.map((alt) => {
              let altClass = styles.altNeutral;
              if (alt.id === question.correctAnswer) {
                altClass = styles.altCorrect;
              } else if (alt.id === userAnswer && !isCorrect) {
                altClass = styles.altWrong;
              }

              return (
                <div key={alt.id}>
                  <div className={`${styles.altItem} ${altClass}`}>
                    <span className={styles.altLetter}>{alt.id})</span>
                    <span>{alt.text}</span>
                    {alt.id === question.correctAnswer && <Check size={14} />}
                    {alt.id === userAnswer && !isCorrect && <X size={14} />}
                  </div>
                  {alt.explanation && (
                    <div className={styles.altExplanation}>{alt.explanation}</div>
                  )}
                </div>
              );
            })}
          </div>

          {question.explanation && (
            <div className={styles.explanation}>
              <div className={styles.explanationLabel}>Explicacao:</div>
              {question.explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
