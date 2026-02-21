export type QuestionType = 'multiple_choice' | 'true_false' | 'assertion';
export type QuizMode = 'simulado' | 'estudo' | 'revisao';

export interface Alternative {
  id: string;
  text: string;
  explanation?: string;
}

export interface Assertion {
  id: string;
  text: string;
  correct: boolean;
}

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  text: string;
  image?: string | null;
  alternatives: Alternative[];
  correctAnswer: string;
  explanation?: string;
  tags?: string[];
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple_choice';
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true_false';
}

export interface AssertionQuestion extends BaseQuestion {
  type: 'assertion';
  assertions: Assertion[];
}

export type Question = MultipleChoiceQuestion | TrueFalseQuestion | AssertionQuestion;

export interface Quiz {
  id: string;
  title: string;
  description: string;
  subject: string;
  questions: Question[];
  createdAt: string;
}

export interface TrainSettings {
  mode: QuizMode;
  shuffleQuestions: boolean;
  shuffleAlternatives: boolean;
  questionLimit: number | null;
}

export interface QuizResult {
  id: string;
  quizId: string;
  quizTitle: string;
  mode: QuizMode;
  answers: Record<string, string>;
  correctCount: number;
  totalQuestions: number;
  percentage: number;
  timeTakenSeconds: number;
  completedAt: string;
}
