import { useNavigate } from 'react-router';
import { Play, Pencil, Download, Trash2, FileText, Calendar, BookOpen } from 'lucide-react';
import type { Quiz } from '../../types/quiz';
import { exportQuizAsJson } from '../../utils/jsonExport';
import styles from './QuizCard.module.css';

interface QuizCardProps {
  quiz: Quiz;
  onDelete: (id: string) => void;
}

export function QuizCard({ quiz, onDelete }: QuizCardProps) {
  const navigate = useNavigate();

  const questionCount = quiz.questions.length;
  const date = new Date(quiz.createdAt).toLocaleDateString('pt-BR');

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{quiz.title}</h3>
        <span className={styles.subject}>{quiz.subject}</span>
      </div>

      {quiz.description && (
        <p className={styles.description}>{quiz.description}</p>
      )}

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <FileText size={14} />
          {questionCount} {questionCount === 1 ? 'questão' : 'questões'}
        </span>
        <span className={styles.metaItem}>
          <Calendar size={14} />
          {date}
        </span>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.actionBtn} ${styles.playBtn}`}
          onClick={() => navigate(`/play/${quiz.id}`)}
        >
          <Play size={16} />
          Treinar
        </button>
        <button
          className={`${styles.actionBtn} ${styles.editBtn}`}
          onClick={() => navigate(`/consult/${quiz.id}`)}
        >
          <BookOpen size={16} />
          Consultar
        </button>
        <button
          className={`${styles.actionBtn} ${styles.editBtn}`}
          onClick={() => navigate(`/edit/${quiz.id}`)}
        >
          <Pencil size={16} />
          Editar
        </button>
        <button
          className={`${styles.actionBtn} ${styles.exportBtn}`}
          onClick={() => exportQuizAsJson(quiz)}
        >
          <Download size={16} />
          Exportar
        </button>
        <button
          className={`${styles.actionBtn} ${styles.deleteBtn}`}
          onClick={() => onDelete(quiz.id)}
        >
          <Trash2 size={16} />
          Excluir
        </button>
      </div>
    </div>
  );
}
