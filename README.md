# Questify

Plataforma de estudo e treinamento com bancos de questões para preparação de entrevistas técnicas e concursos.

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
