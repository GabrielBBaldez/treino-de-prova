import { Outlet } from 'react-router';
import { Header } from './Header';
import { useAuth } from '../../hooks/useAuth';
import styles from './Layout.module.css';

export function Layout() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
