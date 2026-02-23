import { useState } from 'react';
import { useNavigate } from 'react-router';
import { LogIn, UserPlus, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ApiError } from '../../services/api';
import styles from './AuthPage.module.css';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      navigate('/');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Erro de conexao com o servidor');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          {isLogin ? <LogIn size={32} /> : <UserPlus size={32} />}
          <h1>{isLogin ? 'Entrar' : 'Criar Conta'}</h1>
          <p className={styles.subtitle}>
            {isLogin
              ? 'Acesse sua conta para sincronizar seus dados'
              : 'Crie uma conta para salvar seus quizzes no servidor'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin && (
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                <User size={16} />
                Nome
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                required={!isLogin}
                className={styles.input}
              />
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              <Mail size={16} />
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              <Lock size={16} />
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimo 6 caracteres"
              required
              minLength={6}
              className={styles.input}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Aguarde...' : isLogin ? 'Entrar' : 'Criar Conta'}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            {isLogin ? 'Nao tem conta?' : 'Ja tem conta?'}{' '}
            <button type="button" onClick={toggleMode} className={styles.toggleButton}>
              {isLogin ? 'Criar conta' : 'Fazer login'}
            </button>
          </p>
        </div>

        <div className={styles.divider}>
          <span>ou</span>
        </div>

        <button
          type="button"
          onClick={() => navigate('/')}
          className={styles.skipButton}
        >
          Continuar sem conta (dados locais)
        </button>
      </div>
    </div>
  );
}
