import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { BookOpen, Target, Clock, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useResultsStorage } from '../../hooks/useResultsStorage';
import { useQuizStorage } from '../../hooks/useQuizStorage';
import { formatTime } from '../../utils/formatTime';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const { results } = useResultsStorage();
  const { quizzes } = useQuizStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading || !user) return null;

  const totalQuizzesTaken = results.length;
  const averageScore =
    totalQuizzesTaken > 0
      ? Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / totalQuizzesTaken)
      : 0;
  const totalTimeSeconds = results.reduce((sum, r) => sum + r.timeTakenSeconds, 0);

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        {user.photoURL && (
          <img
            className={styles.avatar}
            src={user.photoURL}
            alt={user.displayName || 'Avatar'}
            referrerPolicy="no-referrer"
          />
        )}
        <span className={styles.name}>{user.displayName}</span>
        <span className={styles.email}>{user.email}</span>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <BookOpen size={24} className={styles.statIcon} />
          <span className={styles.statValue}>{totalQuizzesTaken}</span>
          <span className={styles.statLabel}>Provas realizadas</span>
        </div>
        <div className={styles.statCard}>
          <Target size={24} className={styles.statIcon} />
          <span className={styles.statValue}>{averageScore}%</span>
          <span className={styles.statLabel}>Media geral</span>
        </div>
        <div className={styles.statCard}>
          <Clock size={24} className={styles.statIcon} />
          <span className={styles.statValue}>{formatTime(totalTimeSeconds)}</span>
          <span className={styles.statLabel}>Tempo total</span>
        </div>
      </div>

      <div className={styles.infoCard}>
        <p className={styles.infoText}>
          Voce possui {quizzes.length} {quizzes.length === 1 ? 'quiz salvo' : 'quizzes salvos'} neste dispositivo.
        </p>
      </div>

      <button className={styles.logoutButton} onClick={handleLogout}>
        <LogOut size={18} />
        Sair da conta
      </button>
    </div>
  );
}
