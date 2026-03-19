# Design: Feature "Pular Questao"

## Resumo

Permitir que o usuario pule uma questao durante o quiz sem comprometer sua pontuacao. Questoes puladas nao contam como certa nem errada — apenas como "pulada".

## Abordagem

Usar valor especial `"__SKIPPED__"` no `answers` record. Quando o usuario pula, `answers[questionId] = "__SKIPPED__"`.

## Mudancas por Arquivo

### 1. Constante — `src/constants/quiz.ts`

- Adicionar: `export const SKIPPED_ANSWER = "__SKIPPED__";`

### 2. Tipos — `src/types/quiz.ts`

- Adicionar campo `skippedCount: number` a `QuizResult`

### 3. QuizPlayerPage — `src/pages/QuizPlayer/QuizPlayerPage.tsx`

- Adicionar `handleSkip()`:
  - Grava `answers[qId] = SKIPPED_ANSWER`
  - Avanca para proxima questao (ou finaliza se for a ultima)
- Alterar `handleFinish()`:
  - Contar questoes com `SKIPPED_ANSWER` como `skippedCount`
  - `answeredCount = total - skippedCount`
  - `percentage = answeredCount > 0 ? Math.round(correctCount / answeredCount * 100) : 0`
  - Incluir `skippedCount` no `QuizResult`
- Passar `onSkip` para `QuestionDisplay`

### 4. QuestionDisplay — `src/components/QuestionDisplay/QuestionDisplay.tsx`

- Adicionar prop `onSkip: () => void`
- Adicionar botao "Pular" com icone `SkipForward` do lucide-react
- Posicao: entre "Anterior" e "Proxima/Finalizar"
- Desabilitado se `selectedAnswer !== null && selectedAnswer !== SKIPPED_ANSWER` (ja respondeu)
- Se questao ja pulada (`selectedAnswer === SKIPPED_ANSWER`), estilo visual diferente (cinza)
- Disponivel em todos os modos (simulado, estudo, revisao)

### 5. QuestionDisplay.module.css

- Adicionar estilos para `.skipBtn` (cor neutra/cinza)
- Adicionar estado `.skipBtnActive` para questao ja pulada

### 6. ResultsSummary — `src/components/ResultsSummary/ResultsSummary.tsx`

- Score: mostrar `acertos / respondidas` (nao total geral)
- Adicionar terceira stat "Puladas" com `skippedCount`
- Erros = `answeredCount - correctCount` (nao conta puladas)

### 7. QuestionReview — `src/components/QuestionReview/QuestionReview.tsx`

- Se `userAnswer === SKIPPED_ANSWER`:
  - Badge "Pulada" com cor cinza/amarela (novo estilo `.badgeSkipped`)
  - Nenhuma alternativa marcada como selecionada
  - Alternativa correta ainda destacada em verde

### 8. QuestionReview.module.css

- Adicionar estilo `.badgeSkipped` (cor cinza/amarela)

## Comportamento por Modo

| Modo      | Pular disponivel | Pode voltar e responder |
|-----------|-------------------|-------------------------|
| Simulado  | Sim               | Sim (ja pode voltar)    |
| Estudo    | Sim               | Nao (questao trava)     |
| Revisao   | Sim               | Nao (questao trava)     |

## Pontuacao

- Total de questoes no quiz: `N`
- Puladas: `S` (questoes com `SKIPPED_ANSWER`)
- Respondidas: `N - S`
- Acertos: `C`
- Porcentagem: `C / (N - S) * 100`
- Se todas puladas: `0%`

## Fluxo do Usuario

1. Usuario ve a questao
2. Clica "Pular" → questao marcada como `__SKIPPED__`, avanca
3. No modo simulado, pode voltar e responder (substitui o skip)
4. Ao finalizar, questoes puladas aparecem separadas na pontuacao
5. Na revisao, questoes puladas mostram badge "Pulada" e a resposta correta
