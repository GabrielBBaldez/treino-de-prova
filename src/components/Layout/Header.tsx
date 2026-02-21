import { NavLink } from 'react-router';
import { BookOpen, Home, PlusCircle, BarChart3, HelpCircle } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

export function Header() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`;

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        <BookOpen size={24} className={styles.logoIcon} />
        <span>Treino de Prova</span>
      </NavLink>

      <nav className={styles.nav}>
        <NavLink to="/" className={linkClass} end>
          <Home size={18} />
          <span>Inicio</span>
        </NavLink>
        <NavLink to="/create" className={linkClass}>
          <PlusCircle size={18} />
          <span>Criar</span>
        </NavLink>
        <NavLink to="/history" className={linkClass}>
          <BarChart3 size={18} />
          <span>Historico</span>
        </NavLink>
        <NavLink to="/help" className={linkClass}>
          <HelpCircle size={18} />
          <span>Ajuda</span>
        </NavLink>
      </nav>

      <div className={styles.actions}>
        <ThemeToggle />
      </div>
    </header>
  );
}
