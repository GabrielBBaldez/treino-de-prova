import { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Mail, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ApiError } from '../../services/api';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const hasChanges = name !== user?.name || email !== user?.email;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const data: { name?: string; email?: string } = {};
      if (name !== user?.name) data.name = name;
      if (email !== user?.email) data.email = email;
      await updateUser(data);
      setSuccess('Perfil atualizado com sucesso!');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Erro ao atualizar perfil');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Settings size={32} />
          <h1>Meu Perfil</h1>
          <p className={styles.subtitle}>Gerencie suas informacoes de conta</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="profileName" className={styles.label}>
              <User size={16} />
              Nome
            </label>
            <input
              id="profileName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="profileEmail" className={styles.label}>
              <Mail size={16} />
              Email
            </label>
            <input
              id="profileEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          <button
            type="submit"
            disabled={loading || !hasChanges}
            className={styles.button}
          >
            {loading ? 'Salvando...' : 'Salvar alteracoes'}
          </button>
        </form>

        <div className={styles.divider}>
          <span>conta</span>
        </div>

        <button onClick={handleLogout} className={styles.logoutButton}>
          <LogOut size={16} />
          Sair da conta
        </button>
      </div>
    </div>
  );
}
