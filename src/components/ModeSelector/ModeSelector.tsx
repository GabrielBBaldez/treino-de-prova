import { ClipboardCheck, BookOpen, MessageCircle } from 'lucide-react';
import type { QuizMode } from '../../types/quiz';
import styles from './ModeSelector.module.css';

interface ModeSelectorProps {
  selected: QuizMode | null;
  onSelect: (mode: QuizMode) => void;
}

const MODES: { id: QuizMode; name: string; desc: string; icon: typeof ClipboardCheck }[] = [
  {
    id: 'simulado',
    name: 'Simulado',
    desc: 'Responda tudo e veja o resultado no final. Pode voltar e mudar respostas.',
    icon: ClipboardCheck,
  },
  {
    id: 'estudo',
    name: 'Estudo',
    desc: 'Feedback instantaneo apos cada questao. Saiba na hora se acertou ou errou.',
    icon: BookOpen,
  },
  {
    id: 'revisao',
    name: 'Revisao',
    desc: 'Feedback instantaneo + explicacao do erro quando disponivel.',
    icon: MessageCircle,
  },
];

export function ModeSelector({ selected, onSelect }: ModeSelectorProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Escolha o modo</h2>
      <p className={styles.subtitle}>Como voce quer treinar?</p>
      <div className={styles.modes}>
        {MODES.map((mode) => (
          <button
            key={mode.id}
            className={`${styles.modeCard} ${selected === mode.id ? styles.modeCardActive : ''}`}
            onClick={() => onSelect(mode.id)}
          >
            <mode.icon size={32} className={styles.modeIcon} />
            <span className={styles.modeName}>{mode.name}</span>
            <span className={styles.modeDesc}>{mode.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
