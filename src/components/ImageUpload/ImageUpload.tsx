import { useRef } from 'react';
import { ImagePlus, X } from 'lucide-react';
import { fileToBase64 } from '../../utils/imageUtils';
import styles from './ImageUpload.module.css';

interface ImageUploadProps {
  image: string | null | undefined;
  onChange: (image: string | null) => void;
}

export function ImageUpload({ image, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    onChange(base64);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles.hidden}
        onChange={handleChange}
      />

      {image ? (
        <div className={styles.preview}>
          <img src={image} alt="Imagem da questao" className={styles.previewImg} />
          <button className={styles.removeBtn} onClick={() => onChange(null)} aria-label="Remover imagem">
            <X size={14} />
          </button>
        </div>
      ) : (
        <button className={styles.uploadArea} onClick={() => inputRef.current?.click()} type="button">
          <ImagePlus size={18} />
          Adicionar imagem
        </button>
      )}
    </div>
  );
}
