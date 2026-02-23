import { createContext, useState, useEffect, useCallback, type PropsWithChildren } from 'react';
import { authApi, type AuthResponse } from '../services/api';
import { migrateLocalData } from '../services/migration';

interface User {
  userId: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: { name?: string; email?: string }) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_KEY = 'questify-token';
const USER_KEY = 'questify-user';

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(() => !!localStorage.getItem(TOKEN_KEY));

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setIsLoading(false);
      return;
    }

    authApi.me()
      .then((res) => {
        const u = { userId: res.userId, name: res.name, email: res.email };
        setUser(u);
        localStorage.setItem(USER_KEY, JSON.stringify(u));
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleAuthResponse = useCallback((res: AuthResponse) => {
    if (res.token) {
      localStorage.setItem(TOKEN_KEY, res.token);
    }
    const u = { userId: res.userId, name: res.name, email: res.email };
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    setUser(u);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    handleAuthResponse(res);
    migrateLocalData().catch((err) =>
      console.warn('Erro na migracao de dados locais:', err)
    );
  }, [handleAuthResponse]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const res = await authApi.register(name, email, password);
    handleAuthResponse(res);
    migrateLocalData().catch((err) =>
      console.warn('Erro na migracao de dados locais:', err)
    );
  }, [handleAuthResponse]);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  const updateUser = useCallback(async (data: { name?: string; email?: string }) => {
    const res = await authApi.updateProfile(data);
    const u = { userId: res.userId, name: res.name, email: res.email };
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    setUser(u);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
