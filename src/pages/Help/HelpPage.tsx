import {
  BookOpen,
  CheckCircle2,
  Shuffle,
  Tags,
  BarChart3,
  Download,
  Upload,
  Image,
  HelpCircle,
  Smartphone,
  Monitor,
  Tablet,
  MessageCircle,
  ListChecks,
  ClipboardCheck,
  FileText,
  Settings,
  Search,
} from 'lucide-react';
import styles from './HelpPage.module.css';

interface HelpSection {
  icon: React.ReactNode;
  title: string;
  content: string;
  tips?: string[];
}

const sections: HelpSection[] = [
  {
    icon: <BookOpen size={24} />,
    title: 'O que e o Treino de Prova?',
    content:
      'O Treino de Prova e um aplicativo gratuito para estudar para concursos, residencia medica, ENEM, certificacoes e qualquer tipo de prova. Voce cria bancos de questoes, treina nos diferentes modos e acompanha sua evolucao ao longo do tempo.',
    tips: [
      'Funciona 100% offline apos o primeiro acesso',
      'Seus dados ficam salvos no seu dispositivo',
      'Nao precisa de login ou cadastro',
    ],
  },
  {
    icon: <FileText size={24} />,
    title: 'Tipos de Questao',
    content:
      'O app suporta 3 tipos de questao que cobrem os formatos mais usados em concursos e provas:',
    tips: [
      'Multipla Escolha — A, B, C, D ou E. O formato classico de concurso',
      'Verdadeiro ou Falso — Uma afirmativa que deve ser julgada como verdadeira ou falsa',
      'Assertivas — Afirmativas I, II, III com alternativas combinando quais sao corretas (ex: "Apenas I e III")',
    ],
  },
  {
    icon: <ClipboardCheck size={24} />,
    title: 'Modos de Treino',
    content:
      'Ao iniciar um treino, voce escolhe um dos 3 modos:',
    tips: [
      'Simulado — Responde todas as questoes e ve o resultado so no final. Pode voltar e alterar respostas. Ideal para simular a prova real',
      'Estudo — Recebe feedback imediato apos cada questao (certo ou errado). Bom para o dia a dia de estudo',
      'Revisao — Alem do feedback, mostra a explicacao de cada alternativa. Perfeito para entender seus erros',
    ],
  },
  {
    icon: <Settings size={24} />,
    title: 'Configuracoes de Treino',
    content:
      'Antes de comecar, voce pode personalizar o treino:',
    tips: [
      'Embaralhar questoes — Muda a ordem das questoes aleatoriamente a cada treino',
      'Embaralhar alternativas — Muda a posicao das alternativas para nao decorar a letra',
      'Limitar questoes — Escolha quantas questoes quer fazer (ex: 30 de um banco de 200)',
    ],
  },
  {
    icon: <ListChecks size={24} />,
    title: 'Criando um Banco de Questoes',
    content:
      'Na pagina "Criar", voce monta seu banco de questoes do zero:',
    tips: [
      'De um titulo e descricao para o banco',
      'Adicione questoes uma a uma, escolhendo o tipo de cada uma',
      'Marque a alternativa correta',
      'Opcionalmente: adicione explicacao por alternativa, tags e imagem',
    ],
  },
  {
    icon: <CheckCircle2 size={24} />,
    title: 'Explicacao por Alternativa',
    content:
      'Cada alternativa pode ter sua propria explicacao — nao so a questao como um todo. No modo Revisao, voce ve por que cada alternativa esta certa ou errada, o que ajuda muito na aprendizagem.',
  },
  {
    icon: <Tags size={24} />,
    title: 'Tags (Topicos)',
    content:
      'Voce pode adicionar tags (topicos) em cada questao para organizar por assunto. Na pagina de consulta, pode buscar e filtrar por tags especificas.',
    tips: [
      'Digite a tag e pressione Enter ou virgula para adicionar',
      'Exemplos: "Cardiologia", "Direito Constitucional", "Java Collections"',
    ],
  },
  {
    icon: <Image size={24} />,
    title: 'Imagens nas Questoes',
    content:
      'Cada questao pode ter uma imagem anexada — util para graficos, tabelas, exames de imagem ou enunciados escaneados. A imagem e salva dentro do JSON, entao funciona offline.',
  },
  {
    icon: <Search size={24} />,
    title: 'Consulta de Questoes',
    content:
      'Na pagina inicial, clique no icone de lupa em qualquer banco para abrir o modo de consulta. Voce pode buscar por palavra-chave no enunciado, alternativas, tags ou explicacoes. Ideal para revisar questoes especificas.',
  },
  {
    icon: <Shuffle size={24} />,
    title: 'Embaralhamento',
    content:
      'O embaralhamento usa o algoritmo Fisher-Yates para garantir aleatoriedade real. Cada vez que voce inicia um treino com embaralhamento ativado, a ordem das questoes e alternativas sera completamente diferente.',
  },
  {
    icon: <BarChart3 size={24} />,
    title: 'Historico e Evolucao',
    content:
      'A pagina de Historico mostra todos os seus resultados anteriores. Voce pode:',
    tips: [
      'Ver estatisticas gerais: total de tentativas, media, melhor resultado, tempo medio',
      'Filtrar por banco de questoes e por modo de treino',
      'Visualizar um grafico de evolucao mostrando se voce esta melhorando',
    ],
  },
  {
    icon: <Download size={24} />,
    title: 'Exportar Banco de Questoes',
    content:
      'Na pagina inicial, clique no botao de download em qualquer banco para exportar como arquivo JSON. Voce pode salvar como backup ou compartilhar com colegas de estudo.',
  },
  {
    icon: <Upload size={24} />,
    title: 'Importar Banco de Questoes',
    content:
      'Na pagina inicial, clique em "Importar JSON" para carregar um banco de questoes. O app valida o arquivo automaticamente e avisa se houver algum problema no formato.',
  },
  {
    icon: <Smartphone size={24} />,
    title: 'Instalar no Celular',
    content:
      'O Treino de Prova e um PWA (Progressive Web App) — funciona como app nativo no seu celular:',
    tips: [
      'Android: Abra no Chrome, toque nos 3 pontinhos e depois em "Instalar aplicativo"',
      'iPhone: Abra no Safari, toque em Compartilhar e depois em "Adicionar a Tela de Inicio"',
    ],
  },
  {
    icon: <Tablet size={24} />,
    title: 'Instalar no Tablet',
    content:
      'O mesmo processo do celular funciona no tablet. Apos instalar, o app abre em tela cheia como um aplicativo nativo, sem barra do navegador.',
  },
  {
    icon: <Monitor size={24} />,
    title: 'Usar no Computador',
    content:
      'No computador, acesse pelo navegador normalmente. No Chrome, voce pode clicar no icone de instalacao na barra de endereco para instalar como app no desktop.',
  },
  {
    icon: <MessageCircle size={24} />,
    title: 'Dicas para Estudar Melhor',
    content:
      'Algumas sugestoes para aproveitar ao maximo o app:',
    tips: [
      'Comece no modo Revisao para aprender o conteudo e entender seus erros',
      'Depois passe para o modo Estudo no dia a dia para fixar',
      'Use o modo Simulado periodicamente para testar seu nivel real',
      'Sempre ative o embaralhamento para nao decorar a ordem',
      'Acompanhe o grafico de evolucao para ver seu progresso',
      'Exporte seus bancos para ter backup!',
    ],
  },
];

export default function HelpPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HelpCircle size={36} />
        <div>
          <h1>Como usar o Treino de Prova</h1>
          <p>Tudo que voce precisa saber para aproveitar o app ao maximo</p>
        </div>
      </div>

      <nav className={styles.toc}>
        <h2>Indice</h2>
        <ul>
          {sections.map((section, i) => (
            <li key={i}>
              <a href={`#section-${i}`}>{section.title}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.sections}>
        {sections.map((section, i) => (
          <section key={i} id={`section-${i}`} className={styles.section}>
            <div className={styles.sectionIcon}>{section.icon}</div>
            <div className={styles.sectionContent}>
              <h2>{section.title}</h2>
              <p>{section.content}</p>
              {section.tips && (
                <ul className={styles.tips}>
                  {section.tips.map((tip, j) => (
                    <li key={j}>{tip}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
