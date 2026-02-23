import { Link } from 'react-router';
import { Home } from 'lucide-react';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.code}>404</div>
      <p className={styles.message}>Página não encontrada</p>
      <Link to="/" className={styles.link}>
        <Home size={18} />
        Voltar ao início
      </Link>
    </div>
  );
}
