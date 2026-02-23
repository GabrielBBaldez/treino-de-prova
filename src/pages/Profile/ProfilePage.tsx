import { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Mail, LogOut, Shield, Crown, Save } from 'lucide-react';
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

  const initials = user.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>
          <span>{initials}</span>
        </div>
        <h1 className={styles.userName}>{user.name}</h1>
        <p className={styles.userEmail}>{user.email}</p>
        <div className={styles.planBadge}>
          <Crown size={14} />
          <span>Questify Pro</span>
        </div>
      </div>

      <div className={styles.sections}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Shield size={18} />
            <h2>Informacoes pessoais</h2>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="profileName" className={styles.label}>
                <User size={14} />
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
                <Mail size={14} />
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
              className={styles.saveButton}
            >
              <Save size={16} />
              {loading ? 'Salvando...' : 'Salvar alteracoes'}
            </button>
          </form>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <LogOut size={18} />
            <h2>Sessao</h2>
          </div>
          <p className={styles.sectionDesc}>
            Ao sair, seus dados continuam salvos no servidor. Voce pode acessar de qualquer dispositivo fazendo login novamente.
          </p>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <LogOut size={16} />
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
}
