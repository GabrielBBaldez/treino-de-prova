import type { Quiz, QuizResult } from '../types/quiz';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

interface AuthResponse {
  token: string;
  userId: string;
  name: string;
  email: string;
}

interface QuizSummary {
  id: string;
  title: string;
  description: string;
  subject: string;
  questionCount: number;
  createdAt: string;
}

interface ResultStats {
  totalAttempts: number;
  averagePercentage: number;
  bestPercentage: number;
  averageTimeTakenSeconds: number;
}

class ApiError extends Error {
  status: number;
  fieldErrors?: Record<string, string>;

  constructor(status: number, message: string, fieldErrors?: Record<string, string>) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

function getToken(): string | null {
  return localStorage.getItem('questify-token');
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = 'Erro desconhecido';
    let fieldErrors: Record<string, string> | undefined;
    try {
      const body = await response.json();
      message = body.message || message;
      fieldErrors = body.fieldErrors;
    } catch {
      // ignore parse error
    }
    throw new ApiError(response.status, message, fieldErrors);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

// Auth
export const authApi = {
  register(name: string, email: string, password: string): Promise<AuthResponse> {
    return request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  login(email: string, password: string): Promise<AuthResponse> {
    return request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  me(): Promise<AuthResponse> {
    return request('/api/auth/me');
  },
};

// Quizzes
export const quizApi = {
  list(): Promise<QuizSummary[]> {
    return request('/api/quizzes');
  },

  get(id: string): Promise<Quiz> {
    return request<Quiz>(`/api/quizzes/${id}`).then(q => ({
      ...q,
      createdAt: q.createdAt || new Date().toISOString(),
    }));
  },

  create(quiz: Omit<Quiz, 'id' | 'createdAt'>): Promise<Quiz> {
    return request('/api/quizzes', {
      method: 'POST',
      body: JSON.stringify(quiz),
    });
  },

  update(id: string, quiz: Omit<Quiz, 'id' | 'createdAt'>): Promise<Quiz> {
    return request(`/api/quizzes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(quiz),
    });
  },

  delete(id: string): Promise<void> {
    return request(`/api/quizzes/${id}`, { method: 'DELETE' });
  },
};

// Results
export const resultApi = {
  list(quizId?: string, mode?: string): Promise<QuizResult[]> {
    const params = new URLSearchParams();
    if (quizId) params.set('quizId', quizId);
    if (mode) params.set('mode', mode);
    const qs = params.toString();
    return request(`/api/results${qs ? `?${qs}` : ''}`);
  },

  submit(result: Omit<QuizResult, 'id'>): Promise<QuizResult> {
    return request('/api/results', {
      method: 'POST',
      body: JSON.stringify(result),
    });
  },

  stats(quizId?: string): Promise<ResultStats> {
    const qs = quizId ? `?quizId=${quizId}` : '';
    return request(`/api/results/stats${qs}`);
  },

  clearAll(): Promise<void> {
    return request('/api/results', { method: 'DELETE' });
  },
};

export { ApiError };
export type { AuthResponse, QuizSummary, ResultStats };
