<div align="center">

# :book: Questify

**Plataforma de estudo e treinamento com bancos de questões para preparação de entrevistas técnicas e concursos.**

[:arrow_right: **Acessar o Questify**](https://gabrielbbaldez.github.io/questify/)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-FFCA28?logo=firebase&logoColor=black)

</div>

---

## Funcionalidades

- **Bancos de questões** — Crie, importe e gerencie seus próprios bancos de questões
- **Modos de treino** — Simulado (navegação livre) e Estudo (feedback imediato)
- **Revisão de erros** — Retransforme suas questões erradas em acertos treinando apenas o que errou
- **Geração com IA** — Gere questões automaticamente com inteligência artificial
- **Histórico completo** — Acompanhe seus resultados, percentual de acerto e tempo por prova
- **Favoritos** — Marque questões importantes para revisar depois
- **Sync na nuvem** — Login com Google e sincronização automática via Firebase
- **Tema escuro/claro** — Interface adaptável com troca de tema
- **Responsivo** — Funciona em desktop, tablet e celular

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Estilização:** CSS Modules com design system (variáveis CSS)
- **Backend:** Firebase (Authentication + Firestore)
- **Deploy:** GitHub Pages com GitHub Actions
- **Ícones:** Lucide React

## Rodando localmente

```bash
# Clone o repositório
git clone https://github.com/GabrielBBaldez/questify.git
cd questify

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Preencha com suas credenciais do Firebase

# Inicie o servidor de desenvolvimento
npm run dev
```

## Estrutura do projeto

```
src/
├── components/     # Componentes reutilizáveis (QuizCard, ProgressBar, etc.)
├── contexts/       # Context API (Auth, Theme)
├── hooks/          # Custom hooks (useQuizStorage, useTimer, etc.)
├── pages/          # Páginas da aplicação
├── services/       # Integração com Firebase/Firestore
├── types/          # Tipos TypeScript
├── utils/          # Funções utilitárias
└── constants/      # Constantes da aplicação
```

## Importar bancos de questões

O Questify aceita arquivos JSON no formato padrão. Para importar, clique no botão **Importar** na página inicial e selecione seu arquivo `.json`.

## Licença

MIT
