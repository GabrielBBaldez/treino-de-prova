import type { TrainSettings as TrainSettingsType } from '../../types/quiz';
import styles from './TrainSettings.module.css';

interface TrainSettingsProps {
  settings: TrainSettingsType;
  totalQuestions: number;
  onChange: (settings: TrainSettingsType) => void;
  onStart: () => void;
}

export function TrainSettings({ settings, totalQuestions, onChange, onStart }: TrainSettingsProps) {
  const update = (partial: Partial<TrainSettingsType>) => {
    onChange({ ...settings, ...partial });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Configuracoes do treino</h3>

      <div className={styles.option}>
        <div className={styles.optionLabel}>
          <span className={styles.optionName}>Embaralhar questoes</span>
          <span className={styles.optionDesc}>Muda a ordem das questoes aleatoriamente</span>
        </div>
        <button
          className={`${styles.toggle} ${settings.shuffleQuestions ? styles.toggleActive : ''}`}
          onClick={() => update({ shuffleQuestions: !settings.shuffleQuestions })}
          aria-label="Embaralhar questoes"
        >
          <div className={styles.toggleKnob} />
        </button>
      </div>

      <div className={styles.option}>
        <div className={styles.optionLabel}>
          <span className={styles.optionName}>Embaralhar alternativas</span>
          <span className={styles.optionDesc}>Muda a ordem do gabarito para nao viciar</span>
        </div>
        <button
          className={`${styles.toggle} ${settings.shuffleAlternatives ? styles.toggleActive : ''}`}
          onClick={() => update({ shuffleAlternatives: !settings.shuffleAlternatives })}
          aria-label="Embaralhar alternativas"
        >
          <div className={styles.toggleKnob} />
        </button>
      </div>

      <div className={styles.option}>
        <div className={styles.optionLabel}>
          <span className={styles.optionName}>Limitar questoes</span>
          <span className={styles.optionDesc}>Treinar apenas uma parte do banco ({totalQuestions} total)</span>
        </div>
        <div className={styles.limitField}>
          <input
            type="number"
            className={styles.limitInput}
            value={settings.questionLimit ?? totalQuestions}
            min={1}
            max={totalQuestions}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              update({ questionLimit: val > 0 && val < totalQuestions ? val : null });
            }}
          />
          <span className={styles.limitLabel}>de {totalQuestions}</span>
        </div>
      </div>

      <button className={styles.startBtn} onClick={onStart}>
        Comecar Treino
      </button>
    </div>
  );
}
