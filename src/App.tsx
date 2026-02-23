import { Routes, Route } from 'react-router';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/Home/HomePage';
import { CreateQuizPage } from './pages/CreateQuiz/CreateQuizPage';
import { QuizPlayerPage } from './pages/QuizPlayer/QuizPlayerPage';
import { ResultsPage } from './pages/Results/ResultsPage';
import { ConsultPage } from './pages/Consult/ConsultPage';
import { HistoryPage } from './pages/History/HistoryPage';
import HelpPage from './pages/Help/HelpPage';
import GeneratePage from './pages/Generate/GeneratePage';
import { AuthPage } from './pages/Auth/AuthPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="create" element={<CreateQuizPage />} />
        <Route path="edit/:quizId" element={<CreateQuizPage />} />
        <Route path="play/:quizId" element={<QuizPlayerPage />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="consult/:quizId" element={<ConsultPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="generate" element={<GeneratePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
