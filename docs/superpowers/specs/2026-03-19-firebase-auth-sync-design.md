# Firebase Auth + Sync — Questify

**Date:** 2026-03-19
**Status:** Approved

## Overview

Add optional Google authentication and Firestore sync to Questify. The app remains fully functional offline (localStorage), and users who log in get cloud sync across devices.

## Architecture

### Dual Mode: Offline-First with Optional Sync

- **Without login:** 100% localStorage (current behavior, unchanged)
- **With login:** localStorage as cache + Firestore as primary source
- Data syncs automatically when logged in

### Auth Flow

1. **Header button:** User icon (logged out) or Google avatar (logged in), next to theme toggle
2. **Login page** (`/login`): Styled page with Questify logo + "Entrar com Google" button
3. **First login with local data:** Modal asking "Você tem X quizzes e Y resultados neste dispositivo. Deseja enviar para sua conta?" with Yes/No
4. **Logout:** Clears auth state, local data remains on device

### Profile Page (`/profile`)

- Google avatar + name + email
- Stats: total quizzes completed, overall average score, total study time
- Logout button
- Consistent with existing dark/light theme design

## Firestore Structure

```
users/{userId}/
  ├── profile: { displayName, email, photoURL, createdAt }
  ├── quizzes/{quizId}: { title, description, subject, questions[], createdAt }
  ├── results/{resultId}: { quizId, quizTitle, mode, answers, correctCount, skippedCount, totalQuestions, percentage, timeTakenSeconds, completedAt }
  └── favorites/{quizId}: { questionIds[] }
```

## Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Each user can only read/write their own data.

## New Files

| File | Purpose |
|------|---------|
| `src/contexts/AuthContext.tsx` | Auth provider (user state, login, logout, onAuthStateChanged listener) |
| `src/hooks/useAuth.ts` | Consumer hook for AuthContext |
| `src/hooks/useFirestoreSync.ts` | Bidirectional sync: localStorage ↔ Firestore |
| `src/pages/Login/LoginPage.tsx` | Styled login page with Google button |
| `src/pages/Login/LoginPage.module.css` | Login page styles |
| `src/pages/Profile/ProfilePage.tsx` | User profile with stats |
| `src/pages/Profile/ProfilePage.module.css` | Profile page styles |
| `src/components/UserAvatar/UserAvatar.tsx` | Header avatar/login button |
| `src/components/UserAvatar/UserAvatar.module.css` | Avatar styles |
| `src/components/MergeDialog/MergeDialog.tsx` | First-login data merge modal |
| `src/components/MergeDialog/MergeDialog.module.css` | Merge dialog styles |

## Modified Files

| File | Changes |
|------|---------|
| `src/main.tsx` | Wrap app in AuthProvider |
| `src/App.tsx` | Add /login and /profile routes |
| `src/components/Layout/Header.tsx` | Add UserAvatar component |
| `src/hooks/useQuizStorage.ts` | Add Firestore write/read when logged in |
| `src/hooks/useResultsStorage.ts` | Add Firestore write/read when logged in |
| `src/hooks/useFavoritesStorage.ts` | Add Firestore write/read when logged in |
| `src/firebase.ts` | Already configured, no changes needed |

## Sync Strategy

### Write Path (when logged in)
1. Write to localStorage (immediate, for UI responsiveness)
2. Write to Firestore (async, in background)

### Read Path (when logged in)
1. On login: fetch all data from Firestore → update localStorage
2. After initial fetch: read from localStorage (cached)
3. Firestore writes happen on every mutation

### First Login Merge
- Detect if localStorage has existing quizzes/results
- Show MergeDialog asking user if they want to upload local data
- If yes: push local data to Firestore (skip duplicates by title)
- If no: replace localStorage with Firestore data (or keep empty)

### Conflict Resolution
- Last-write-wins strategy (simple, sufficient for single-user app)
- No real-time listeners needed (user is always one person)

## UI/UX Details

### UserAvatar (Header)
- Logged out: `User` icon from lucide-react, same style as ThemeToggle
- Logged in: circular Google profile photo (32px), click navigates to /profile

### Login Page
- Centered card with Questify logo
- "Entrar com Google" button with Google icon
- Subtitle: "Sincronize seus dados entre dispositivos"
- Link "Continuar sem conta" back to home

### Profile Page
- Card with avatar (large), name, email
- Stats grid: "Provas realizadas", "Media geral", "Tempo total"
- Stats calculated from results data
- "Sair da conta" button (danger style)

### MergeDialog
- Modal overlay (same style as ConfirmDialog)
- Shows count of local quizzes and results
- Two buttons: "Enviar para a nuvem" (primary) / "Começar do zero" (secondary)
