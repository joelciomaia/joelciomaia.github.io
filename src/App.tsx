import { type CSSProperties, useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import TechMarquee from './components/TechMarquee';

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Perfil', href: '#perfil' },
  { label: 'Trilhas', href: '#trilhas' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Contato', href: '#contato' },
];

const focusAreas = [
  {
    icon: 'fa-solid fa-headset',
    eyebrow: 'Suporte',
    title: 'Suporte técnico e sistemas em produção',
    description: 'Atendimento a usuários, análise de incidentes, configuração de ambientes, acompanhamento de sistemas e apoio à continuidade das operações.',
    tags: ['Help Desk', 'Sistemas', 'Ambientes', 'Cloud'],
    detailTitle: 'Diagnóstico e configuração de ambientes',
    detailDescription: 'Experiência em suporte a usuários, resolução de problemas, preparação de ambientes de uso, orientação técnica e contato com recursos em nuvem, incluindo Oracle Cloud.',
  },
  {
    icon: 'fa-solid fa-network-wired',
    eyebrow: 'Infraestrutura',
    title: 'Redes, segurança e infraestrutura corporativa',
    description: 'Administração de redes, gerenciamento de acessos, configuração de firewall, rotinas de backup e suporte à estabilidade de ambientes corporativos.',
    tags: ['Redes', 'Firewall', 'Backup', 'Acessos'],
    detailTitle: 'Controle, segurança e continuidade',
    detailDescription: 'Atuação voltada à organização da infraestrutura, proteção dos acessos, manutenção da conectividade e preservação da disponibilidade dos serviços.',
  },
  {
    icon: 'fa-solid fa-building',
    eyebrow: 'Ambientes físicos',
    title: 'Implantação de ambientes técnicos corporativos',
    description: 'Instalação e preparação de novos ambientes físicos, organização de equipamentos, pontos de rede, conectividade e estrutura necessária para operação.',
    tags: ['Ambientes', 'Equipamentos', 'Rede', 'Operação'],
    detailTitle: 'Estrutura pronta para funcionar',
    detailDescription: 'Preparação de espaços corporativos com foco em uso real: equipamentos organizados, rede disponível, acessos configurados e ambiente funcional.',
  },
  {
    icon: 'fa-solid fa-chalkboard-user',
    eyebrow: 'Educação',
    title: 'Docência em tecnologia da informação',
    description: 'Atuação em cursos técnicos, práticas de laboratório, orientação de projetos e construção de pontes entre teoria, ferramenta e mercado.',
    tags: ['Docência', 'Ensino Técnico', 'Laboratório', 'Projetos'],
    detailTitle: 'Conhecimento técnico aplicado',
    detailDescription: 'Organização de conteúdos, práticas e atividades que aproximam os estudantes de situações reais da área de tecnologia.',
  },
  {
    icon: 'fa-solid fa-code',
    eyebrow: 'Sistemas',
    title: 'Desenvolvimento como ferramenta de solução',
    description: 'Criação de interfaces, protótipos e soluções web/mobile para organizar informações, apoiar processos e transformar necessidades reais em sistemas.',
    tags: ['React', 'Angular', 'Ionic', 'MySQL'],
    detailTitle: 'Soluções para demandas reais',
    detailDescription: 'Desenvolvimento utilizado como apoio prático para estruturar ideias, automatizar processos, organizar dados e materializar soluções funcionais.',
  },
];

const focusIntro = {
  icon: 'fa-solid fa-compass',
  eyebrow: 'Visão geral',
  title: 'Base técnica para ambientes reais.',
  description: 'Atuação conectando suporte, infraestrutura, redes, segurança, ensino técnico e desenvolvimento aplicado em contextos que exigem organização, estabilidade e resolução de problemas.',
  tags: ['Suporte', 'Infraestrutura', 'Redes', 'Sistemas'],
  detailTitle: 'Perfil técnico multidisciplinar',
  detailDescription: 'Capacidade de compreender ambientes tecnológicos por diferentes ângulos: usuário, sistema, rede, infraestrutura, processo e aplicação prática.',
};

const focusDetailItems = [focusIntro, ...focusAreas];

const timeline = [
  {
    period: 'Graduação',
    title: 'Sistemas de Informação',
    description: 'Formação acadêmica voltada à compreensão de sistemas, programação, banco de dados, redes, engenharia de software e solução de problemas por meio da tecnologia.',
  },
  {
    period: 'Desenvolvimento',
    title: 'Desenvolvimento Full Stack',
    description: 'Área de interesse voltada à construção de aplicações completas, envolvendo interfaces, regras de negócio, APIs, banco de dados e integração entre front-end e back-end.',
  },
  {
    period: 'Tecnologias aplicadas',
    title: 'Automação e IA aplicada',
    description: 'Interesse em soluções que utilizem automação, inteligência artificial e integração de sistemas para otimizar rotinas, organizar informações e apoiar decisões práticas.',
  },
];

const profileNarratives = [
  {
    title: 'Uma trajetória entre infraestrutura, suporte e ensino.',
    lead: 'Tecnologia aplicada a ambientes reais, pessoas e processos.',
    body: [
      'Trajetória construída na área de tecnologia, conectando administração de redes, suporte técnico, infraestrutura corporativa, docência técnica e desenvolvimento de soluções aplicadas.',
      'Essa combinação fortalece uma visão prática da tecnologia, com foco em organização, estabilidade, segurança e resolução de problemas reais.',
    ],
  },
  {
    title: 'Infraestrutura como base da operação.',
    lead: 'Redes, acessos, segurança, firewall e continuidade.',
    body: [
      'Experiência voltada à administração de redes e ambientes corporativos, com atuação em controle de acessos, segurança, rotinas de backup, configuração de firewall e apoio à estabilidade dos serviços.',
      'Também envolve a implantação de novos ambientes físicos, organização de equipamentos, conectividade e preparação da estrutura necessária para o funcionamento das operações.',
    ],
  },
  {
    title: 'Suporte técnico com visão de ambiente.',
    lead: 'Atendimento, diagnóstico, configuração e acompanhamento.',
    body: [
      'Vivência em suporte a usuários, análise de incidentes, configuração de ambientes, acompanhamento de sistemas e orientação técnica para resolução de problemas.',
      'Essa experiência inclui contato com ambientes locais e recursos em nuvem, ampliando a compreensão sobre acesso, disponibilidade, configuração e funcionamento dos sistemas utilizados pelos usuários.',
    ],
  },
  {
    title: 'Ensinar também é organizar tecnologia.',
    lead: 'Laboratório, prática e desenvolvimento aplicado.',
    body: [
      'A docência técnica conecta conhecimento, prática de laboratório e orientação de projetos, aproximando conceitos de situações reais de uso.',
      'O desenvolvimento aparece como extensão dessa base, permitindo estruturar protótipos, interfaces e sistemas voltados à organização de informações e solução de demandas práticas.',
    ],
  },
];

const projects = [
  {
    visible: true,
    title: 'OvinoSync',
    type: 'Sistema aplicado',
    status: 'Protótipo em evolução',
    visual: 'mobile',
    image: '/ovinosync.png',
    icon: 'fa-solid fa-mobile-screen-button',
    tagline: 'Organização de dados de manejo em uma solução mobile.',
    description: 'Sistema desenvolvido para apoiar o cadastro de animais, o registro de manejos e a consulta de informações relacionadas à gestão de rebanhos ovinos.',
    problem: 'Informações de manejo e histórico dos animais costumam ficar espalhadas, dificultando consulta, acompanhamento e organização.',
    action: 'Desenvolvimento de uma aplicação mobile com cadastro de animais, registros de manejo, histórico individual e estrutura de banco de dados relacional.',
    result: 'O projeto demonstra capacidade de transformar uma necessidade real em sistema funcional, conectando interface, regras de negócio, banco de dados e aplicação prática.',
    tags: ['Ionic', 'Angular', 'MySQL'],
    tools: ['Ionic', 'Angular', 'MySQL', 'Banco relacional'],
  },
  {
    visible: true,
    title: 'Portfólio Profissional',
    type: 'Identidade digital',
    status: 'Em construção',
    visual: 'website',
    image: '/portifolio.png',
    icon: 'fa-solid fa-window-maximize',
    tagline: 'Organização visual de trajetória, áreas técnicas e projetos.',
    description: 'Página desenvolvida para apresentar formação, áreas de atuação, interesses profissionais e projetos de forma visual, responsiva e organizada.',
    problem: 'Experiências em suporte, infraestrutura, docência e desenvolvimento precisavam ser organizadas em uma apresentação profissional clara.',
    action: 'Criação de um portfólio com navegação por seções, animações, cards de conteúdo, identidade visual própria e estrutura responsiva.',
    result: 'O projeto funciona como vitrine técnica e também como demonstração prática de desenvolvimento front-end, organização de conteúdo e construção de interface.',
    tags: ['React', 'Vite', 'UI'],
    tools: ['React', 'Vite', 'UI', 'Responsividade'],
  },
  // Projetos futuros mantidos no código, mas ocultos temporariamente da vitrine.
  {
    visible: false,
    title: 'Materiais e laboratório',
    type: 'Educação técnica',
    status: 'Caso prático',
    visual: 'lab',
    image: '',
    icon: 'fa-solid fa-chalkboard-user',
    tagline: 'Roteiros, práticas e apoio técnico para transformar conteúdo em experiência.',
    description: 'Espaço para apresentar aulas, atividades práticas, organização de laboratório e projetos orientados.',
    problem: 'Conteúdos técnicos precisam sair da teoria e encontrar um ambiente preparado para prática.',
    action: 'Apoio o uso do laboratório, preparo atividades, acompanho alunos e conecto conceitos com situações reais.',
    result: 'A atuação evidencia comunicação técnica, didática, suporte e organização de ambiente.',
    tags: ['Ensino', 'Laboratório', 'Redes', 'Prática'],
    tools: ['Redes', 'Hardware', 'Sistemas', 'Documentação'],
  },
  {
    visible: false,
    title: 'Base de suporte e redes',
    type: 'Operação técnica',
    status: 'Em organização',
    visual: 'support',
    image: '',
    icon: 'fa-solid fa-headset',
    tagline: 'Incidentes, documentação e infraestrutura tratados como processo, não improviso.',
    description: 'Área para reunir experiências de suporte básico, suporte especialista, redes e administração de ambientes.',
    problem: 'Atendimentos técnicos perdem valor quando diagnóstico, documentação e histórico não ficam claros.',
    action: 'Organizei resolução de problemas, comunicação com usuários, registros técnicos e visão de ambiente.',
    result: 'O caso mostra maturidade operacional: entender impacto, priorizar, resolver e deixar rastro útil.',
    tags: ['Suporte', 'Redes', 'Documentação', 'Incidentes'],
    tools: ['TCP/IP', 'DNS', 'DHCP', 'Monitoramento'],
  },
];

const fontScaleOptions = [0.94, 1, 1.08, 1.16];

type ThemeMode = 'dark' | 'light';
type Project = (typeof projects)[number];
type ContactStatus = {
  type: 'success' | 'error';
  message: string;
} | null;
type ProfileNarrativePhase = 'typing' | 'reading' | 'deleting';
type ProfileNarrativeState = {
  storyIndex: number;
  fieldIndex: number;
  phase: ProfileNarrativePhase;
  texts: [string, string, string];
};

function getProfileNarrativeFields(story: (typeof profileNarratives)[number]) {
  return [story.title, story.lead, story.body.join('\n\n')];
}

function createProfileNarrativeState(storyIndex: number, complete = false): ProfileNarrativeState {
  const fields = getProfileNarrativeFields(profileNarratives[storyIndex]);
  const texts = fields.map((field) => (complete ? field : '')) as [string, string, string];

  return {
    storyIndex,
    fieldIndex: complete ? fields.length : 0,
    phase: complete ? 'reading' : 'typing',
    texts,
  };
}

function ProfileTypedText({ text, showCursor }: { text: string; showCursor: boolean }) {
  return (
    <>
      <span>{text}</span>
      {showCursor && <span className="profile-typing-cursor" aria-hidden="true"></span>}
    </>
  );
}

function ProfileNarrative() {
  const reduceMotion = typeof window !== 'undefined'
    && (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(max-width: 767px)').matches);
  const [narrativeState, setNarrativeState] = useState(() => createProfileNarrativeState(0, reduceMotion));

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const fields = getProfileNarrativeFields(profileNarratives[narrativeState.storyIndex]);

    if (narrativeState.phase === 'reading') {
      const timeout = window.setTimeout(() => {
        setNarrativeState((current) => ({
          ...current,
          storyIndex: (current.storyIndex + 1) % profileNarratives.length,
          fieldIndex: 0,
          phase: 'deleting',
        }));
      }, 3600);

      return () => window.clearTimeout(timeout);
    }

    const currentText = narrativeState.texts[narrativeState.fieldIndex] ?? '';
    const targetText = fields[narrativeState.fieldIndex] ?? '';
    const fieldComplete = narrativeState.phase === 'typing' && currentText.length >= targetText.length;
    const fieldEmpty = narrativeState.phase === 'deleting' && currentText.length === 0;
    const delay = fieldComplete || fieldEmpty
      ? 260
      : narrativeState.phase === 'deleting'
        ? narrativeState.fieldIndex === 2 ? 8 : 18
        : narrativeState.fieldIndex === 0 ? 36 : narrativeState.fieldIndex === 1 ? 24 : 13;

    const timeout = window.setTimeout(() => {
      setNarrativeState((current) => {
        const currentFields = getProfileNarrativeFields(profileNarratives[current.storyIndex]);

        if (current.phase === 'reading' || current.fieldIndex >= currentFields.length) {
          return current;
        }

        const activeText = current.texts[current.fieldIndex] ?? '';
        const targetField = currentFields[current.fieldIndex] ?? '';

        if (current.phase === 'deleting') {
          if (activeText.length === 0) {
            return {
              ...current,
              phase: 'typing',
            };
          }

          const nextTexts = [...current.texts] as [string, string, string];
          const step = current.fieldIndex === 2 ? 3 : 1;
          nextTexts[current.fieldIndex] = activeText.slice(0, Math.max(0, activeText.length - step));

          return {
            ...current,
            texts: nextTexts,
          };
        }

        if (activeText.length >= targetField.length) {
          const nextFieldIndex = current.fieldIndex + 1;

          if (nextFieldIndex >= currentFields.length) {
            return {
              ...current,
              fieldIndex: nextFieldIndex,
              phase: 'reading',
            };
          }

          return {
            ...current,
            fieldIndex: nextFieldIndex,
            phase: current.texts[nextFieldIndex].length > 0 ? 'deleting' : 'typing',
          };
        }

        const nextTexts = [...current.texts] as [string, string, string];
        const step = current.fieldIndex === 2 ? 2 : 1;
        nextTexts[current.fieldIndex] = targetField.slice(0, Math.min(targetField.length, activeText.length + step));

        return {
          ...current,
          texts: nextTexts,
        };
      });
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [narrativeState, reduceMotion]);

  const titleText = narrativeState.texts[0];
  const leadText = narrativeState.texts[1];
  const bodyText = narrativeState.texts[2];
  const bodyParagraphs = bodyText.length > 0 ? bodyText.split('\n\n') : [''];
  const isTitleTyping = !reduceMotion && narrativeState.phase !== 'reading' && narrativeState.fieldIndex === 0;
  const isLeadTyping = !reduceMotion && narrativeState.phase !== 'reading' && narrativeState.fieldIndex === 1;
  const isBodyTyping = !reduceMotion && narrativeState.phase !== 'reading' && narrativeState.fieldIndex === 2;

  return (
    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">Perfil</p>
        <h2 className="profile-narrative-title mt-4 text-4xl font-black tracking-tight sm:text-6xl">
          <ProfileTypedText text={titleText} showCursor={isTitleTyping} />
        </h2>
        <div className="profile-typing-card mt-7">
          <span className="profile-typing-line">
            <ProfileTypedText text={leadText} showCursor={isLeadTyping} />
          </span>
        </div>
      </div>

      <div className="profile-narrative-body grid gap-5 text-lg leading-8 text-zinc-300">
        {bodyParagraphs.map((paragraph, index) => (
          <p key={`${narrativeState.storyIndex}-${index}`}>
            <ProfileTypedText
              text={paragraph}
              showCursor={isBodyTyping && index === bodyParagraphs.length - 1}
            />
          </p>
        ))}
      </div>
    </div>
  );
}

function HeroIdentityPanel() {
  return (
    <div className="hero-atmosphere relative mx-auto hidden h-[31rem] w-full max-w-lg lg:block" aria-hidden="true">
      <div className="hero-atmosphere-haze"></div>
      <div className="hero-atmosphere-code">
        <span>function resolver(contexto)</span>
        <span>infra.status = estavel</span>
        <span>ensino.conectar(pratica)</span>
        <span>deploy.aplicado()</span>
      </div>

      <span className="hero-atmosphere-icon hero-atmosphere-icon-1">
        <i className="fa-solid fa-code"></i>
      </span>
      <span className="hero-atmosphere-icon hero-atmosphere-icon-2">
        <i className="fa-solid fa-network-wired"></i>
      </span>
      <span className="hero-atmosphere-icon hero-atmosphere-icon-3">
        <i className="fa-solid fa-chalkboard-user"></i>
      </span>

      <div className="hero-atmosphere-mark">JM</div>
    </div>
  );
}

function ProjectPreview({ project, mode = 'card' }: { project: Project; mode?: 'card' | 'modal' }) {
  if (project.image) {
    if (mode === 'modal') {
      return (
        <div className="project-preview-visual flex h-full min-h-[22rem] items-center justify-center bg-slate-100 p-4 sm:p-6 lg:p-8">
          <img
            src={project.image}
            alt={`Prévia visual do projeto ${project.title}`}
            className="max-h-full max-w-full rounded-[1.25rem] object-contain"
          />
        </div>
      );
    }

    return (
      <div className="project-preview-visual relative h-full overflow-hidden bg-slate-100">
        <img
          src={project.image}
          alt={`Prévia visual do projeto ${project.title}`}
          className="h-full w-full object-cover object-top"
        />
      </div>
    );
  }

  if (project.visual === 'mobile') {
    return (
      <div className="project-preview-visual relative h-full overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(52,211,153,0.28),transparent_16rem),linear-gradient(135deg,#071014,#0a1f1a)]">
        <div className="absolute left-8 top-8 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-emerald-200">
          OvinoSync
        </div>
        <div className="project-float absolute bottom-7 right-8 h-52 w-28 rounded-[2rem] border border-white/15 bg-zinc-950/80 p-2 shadow-2xl shadow-black/40">
          <div className="h-full rounded-[1.5rem] border border-emerald-300/15 bg-gradient-to-b from-emerald-300/15 to-cyan-300/5 p-3">
            <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-white/25"></div>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-300 text-xl text-zinc-950">
              <i className="fa-solid fa-leaf"></i>
            </div>
            <div className="mt-5 space-y-2">
              <span className="block h-2 rounded-full bg-white/70"></span>
              <span className="block h-2 w-4/5 rounded-full bg-white/25"></span>
              <span className="block h-2 w-3/5 rounded-full bg-white/20"></span>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-2">
              <span className="h-10 rounded-xl bg-emerald-300/20"></span>
              <span className="h-10 rounded-xl bg-cyan-300/20"></span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-8 max-w-56">
          <p className="text-4xl font-black tracking-tight text-white">Dados no campo.</p>
          <p className="mt-3 text-sm leading-6 text-emerald-100/70">Protótipo mobile com foco em organização e consulta.</p>
        </div>
      </div>
    );
  }

  if (project.visual === 'website') {
    return (
      <div className="project-preview-visual relative h-full overflow-hidden bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.22),transparent_15rem),linear-gradient(135deg,#050712,#111827)]">
        <div className="absolute inset-x-7 top-7 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-red-400"></span>
            <span className="h-2 w-2 rounded-full bg-yellow-300"></span>
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
          </div>
          <div className="p-5">
            <span className="block h-3 w-28 rounded-full bg-cyan-300"></span>
            <span className="mt-5 block h-8 w-4/5 rounded-lg bg-white/80"></span>
            <span className="mt-3 block h-8 w-2/3 rounded-lg bg-white/60"></span>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <span className="h-16 rounded-xl bg-cyan-300/15"></span>
              <span className="h-16 rounded-xl bg-emerald-300/15"></span>
              <span className="h-16 rounded-xl bg-white/10"></span>
            </div>
          </div>
        </div>
        <div className="project-preview-scan absolute inset-y-0 w-24 rotate-12 bg-cyan-200/10 blur-xl"></div>
        <div className="absolute bottom-8 left-8">
          <p className="text-4xl font-black text-white">JM</p>
          <p className="mt-2 text-sm text-cyan-100/70">Identidade, narrativa e interface.</p>
        </div>
      </div>
    );
  }

  if (project.visual === 'lab') {
    return (
      <div className="project-preview-visual relative h-full overflow-hidden bg-[radial-gradient(circle_at_45%_35%,rgba(34,211,238,0.18),transparent_15rem),linear-gradient(135deg,#070a12,#101010)]">
        <div className="absolute left-8 top-8 grid h-16 w-16 place-items-center rounded-2xl bg-cyan-300/10 text-3xl text-cyan-300 ring-1 ring-cyan-300/20">
          <i className="fa-solid fa-chalkboard-user"></i>
        </div>
        <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur">
          <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-cyan-300"></span>
            roteiro prático
          </div>
          <div className="space-y-3">
            <span className="block h-3 w-4/5 rounded-full bg-white/65"></span>
            <span className="block h-3 w-3/5 rounded-full bg-white/35"></span>
            <span className="block h-3 w-2/3 rounded-full bg-white/20"></span>
          </div>
        </div>
        <div className="absolute right-8 top-9 grid grid-cols-2 gap-3">
          <span className="h-14 w-14 rounded-xl border border-cyan-300/20 bg-cyan-300/10"></span>
          <span className="h-14 w-14 rounded-xl border border-emerald-300/20 bg-emerald-300/10"></span>
          <span className="h-14 w-14 rounded-xl border border-white/10 bg-white/5"></span>
          <span className="h-14 w-14 rounded-xl border border-cyan-300/20 bg-cyan-300/10"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="project-preview-visual relative h-full overflow-hidden bg-[radial-gradient(circle_at_70%_30%,rgba(52,211,153,0.2),transparent_15rem),linear-gradient(135deg,#060914,#071312)]">
      <div className="absolute inset-x-8 top-8 rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-emerald-200">fila de suporte</span>
          <i className="fa-solid fa-headset text-2xl text-emerald-300"></i>
        </div>
        <div className="mt-5 space-y-3">
          <span className="block h-3 rounded-full bg-white/60"></span>
          <span className="block h-3 w-4/5 rounded-full bg-white/25"></span>
          <span className="block h-3 w-2/3 rounded-full bg-white/20"></span>
        </div>
      </div>
      <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-3">
        {['DNS', 'DHCP', 'TCP/IP'].map((item) => (
          <span key={item} className="rounded-2xl border border-emerald-300/15 bg-emerald-300/10 px-3 py-4 text-center text-xs font-black text-emerald-100">
            {item}
          </span>
        ))}
      </div>
      <div className="absolute bottom-28 left-12 h-px w-2/3 bg-gradient-to-r from-emerald-300/60 to-transparent"></div>
      <div className="absolute bottom-28 left-12 h-3 w-3 -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_22px_rgba(52,211,153,0.8)]"></div>
      <div className="absolute bottom-28 left-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(34,211,238,0.8)]"></div>
    </div>
  );
}

function App() {
  const [activeFocusIndex, setActiveFocusIndex] = useState(-1);
  const [focusCardStyles, setFocusCardStyles] = useState(() =>
    focusAreas.map(() => ({ opacity: 0, scale: 0.94, y: 24, x: 0 })),
  );
  const [focusDetailCardStyles, setFocusDetailCardStyles] = useState(() =>
    focusDetailItems.map((_, index) => ({
      opacity: index === 0 ? 1 : 0,
      scale: index === 0 ? 1 : 0.94,
      y: 0,
      x: index * 106,
    })),
  );
  const [focusDetailProgress, setFocusDetailProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState<number | null>(null);
  const [isVisualPanelFocused, setIsVisualPanelFocused] = useState(false);
  const [hoveredTimelineIndex, setHoveredTimelineIndex] = useState<number | null>(null);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);
  const [contactStatus, setContactStatus] = useState<ContactStatus>(null);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [isHeroCoverLifted, setIsHeroCoverLifted] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const storedTheme = window.localStorage.getItem('portfolio-theme');

    return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark';
  });
  const [fontScaleIndex, setFontScaleIndex] = useState(() => {
    const storedScale = Number(window.localStorage.getItem('portfolio-font-scale-index'));

    return Number.isInteger(storedScale)
      ? Math.min(Math.max(storedScale, 0), fontScaleOptions.length - 1)
      : 1;
  });
  const focusStepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const focusStageRef = useRef<HTMLDivElement>(null);
  const mobileFocusSectionRef = useRef<HTMLDivElement>(null);
  const heroCoverTrackRef = useRef<HTMLDivElement>(null);
  const heroCoverPanelRef = useRef<HTMLElement>(null);
  const heroCoverLiftedRef = useRef(false);
  const visualPanelRef = useRef<HTMLDivElement>(null);
  const timelineSectionRef = useRef<HTMLElement>(null);
  const visualPanelActiveRef = useRef(false);
  const visualPanelDelayRef = useRef<number | null>(null);
  const projectCardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeFocusIndexRef = useRef(activeFocusIndex);
  const focusDetailProgressRef = useRef(focusDetailProgress);
  const activeTimelineIndexRef = useRef(activeTimelineIndex);
  const activeFocus = activeFocusIndex >= 0 ? focusAreas[activeFocusIndex] : focusIntro;
  const activeFocusNumber = activeFocusIndex >= 0 ? `0${activeFocusIndex + 1}` : '00';
  const isLightTheme = themeMode === 'light';
  const canDecreaseFont = fontScaleIndex > 0;
  const canIncreaseFont = fontScaleIndex < fontScaleOptions.length - 1;
  const currentYear = new Date().getFullYear();
  const visibleProjects = projects.filter((project) => project.visible);

  useEffect(() => {
    activeFocusIndexRef.current = activeFocusIndex;
  }, [activeFocusIndex]);

  useEffect(() => {
    focusDetailProgressRef.current = focusDetailProgress;
  }, [focusDetailProgress]);

  useEffect(() => {
    activeTimelineIndexRef.current = activeTimelineIndex;
  }, [activeTimelineIndex]);

  useEffect(() => {
    emailjs.init('WNWYjZIAts5Z6rjBo');
  }, []);

  useEffect(() => {
    if (!contactStatus) return;

    const timeout = window.setTimeout(() => setContactStatus(null), 5200);

    return () => window.clearTimeout(timeout);
  }, [contactStatus]);

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    window.localStorage.setItem('portfolio-theme', themeMode);
  }, [themeMode]);

  useEffect(() => {
    document.documentElement.style.setProperty('--portfolio-font-scale', String(fontScaleOptions[fontScaleIndex]));
    window.localStorage.setItem('portfolio-font-scale-index', String(fontScaleIndex));
  }, [fontScaleIndex]);

  useEffect(() => {
    let animationFrame = 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateHeroCover = () => {
      const track = heroCoverTrackRef.current;
      const panel = heroCoverPanelRef.current;

      if (!track || !panel) return;

      const rect = track.getBoundingClientRect();
      const progressDistance = window.innerWidth < 1024
        ? Math.max(rect.height - window.innerHeight, 1)
        : Math.max(window.innerHeight, 1);
      const rawProgress = Math.min(Math.max(-rect.top / progressDistance, 0), 1);
      const progress = Math.min(Math.max((rawProgress - 0.08) / 0.92, 0), 1);
      const isLifted = progress > 0.015;

      if (heroCoverLiftedRef.current !== isLifted) {
        heroCoverLiftedRef.current = isLifted;
        setIsHeroCoverLifted(isLifted);
      }

      if (reduceMotion) {
        panel.style.transform = '';
        panel.style.opacity = '1';
        return;
      }

      panel.style.transform = `translate3d(0, ${progress * -105}%, 0)`;
      panel.style.opacity = '1';
    };

    const requestUpdate = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateHeroCover);
    };

    updateHeroCover();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

    const updateFocusCards = () => {
      if (window.innerWidth < 1024) {
        const section = mobileFocusSectionRef.current;

        if (!section) return;

        const rect = section.getBoundingClientRect();
        const scrollableDistance = Math.max(rect.height - window.innerHeight, 1);
        const rawProgress = clamp((window.innerHeight * 0.58 - rect.top) / scrollableDistance, 0, 1);
        const railEntry = clamp((rawProgress - 0.24) / 0.16, 0, 1);
        const horizontalProgress = clamp((rawProgress - 0.34) / 0.62, 0, 1);
        const targetDetailIndex = horizontalProgress * (focusDetailItems.length - 1);
        const nextDetailIndex = railEntry > 0.18 ? Math.round(targetDetailIndex) : 0;
        const nextActiveIndex = nextDetailIndex - 1;

        if (focusDetailProgressRef.current !== nextDetailIndex) {
          focusDetailProgressRef.current = nextDetailIndex;
          setFocusDetailProgress(nextDetailIndex);

          setFocusCardStyles(
            focusAreas.map((_, index) => {
              const distance = index + 1 - nextDetailIndex;
              const opacity = clamp(1 - Math.abs(distance) * 0.9, 0, 1) * railEntry;

              return {
                opacity,
                scale: 0.94 + opacity * 0.06,
                y: 0,
                x: distance * 106,
              };
            }),
          );
          setFocusDetailCardStyles(
            focusDetailItems.map((_, index) => {
              const distance = index - nextDetailIndex;
              const opacity = clamp(1 - Math.abs(distance) * 0.9, 0, 1);

              return {
                opacity,
                scale: 0.94 + opacity * 0.06,
                y: 0,
                x: distance * 106,
              };
            }),
          );
        }

        if (activeFocusIndexRef.current !== nextActiveIndex) {
          activeFocusIndexRef.current = nextActiveIndex;
          setActiveFocusIndex(nextActiveIndex);
        }
        return;
      }

      const focusLine = window.innerHeight * 0.52;
      const focusRange = window.innerHeight * 0.34;

      let strongestIndex = -1;
      let strongestOpacity = 0;

      const nextStyles = focusAreas.map((_, index) => {
        const element = focusStepRefs.current[index];

        if (!element) return { opacity: 0, scale: 0.94, y: 24, x: 0 };

        const rect = element.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distanceFromFocus = cardCenter - focusLine;
        const opacity = clamp(1 - Math.abs(distanceFromFocus) / focusRange, 0, 1);
        const scale = 0.94 + opacity * 0.06;
        const y = clamp(distanceFromFocus / 12, -28, 28);

        if (opacity > strongestOpacity) {
          strongestOpacity = opacity;
          strongestIndex = index;
        }

        return { opacity, scale, y, x: 0 };
      });

      setFocusCardStyles(nextStyles);

      const firstStep = focusStepRefs.current[0];
      const lastStep = focusStepRefs.current[focusAreas.length - 1];
      const firstStepTop = firstStep?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const lastStepBottom = lastStep?.getBoundingClientRect().bottom ?? Number.NEGATIVE_INFINITY;
      const fallbackFocusIndex = firstStepTop > focusLine
        ? -1
        : lastStepBottom < focusLine
          ? focusAreas.length - 1
          : strongestIndex;

      setActiveFocusIndex(strongestOpacity > 0.18 ? strongestIndex : fallbackFocusIndex);
    };

    const requestUpdate = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateFocusCards);
    };

    updateFocusCards();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    const updateTimelineFocus = () => {
      if (window.innerWidth >= 1024) {
        if (activeTimelineIndexRef.current !== 0) {
          activeTimelineIndexRef.current = 0;
          setActiveTimelineIndex(0);
        }
        return;
      }

      const section = timelineSectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isVisible = rect.bottom > window.innerHeight * 0.15 && rect.top < window.innerHeight * 0.9;

      if (!isVisible) return;

      const scrollableDistance = Math.max(rect.height - window.innerHeight, 1);
      const progress = Math.min(Math.max((window.innerHeight * 0.08 - rect.top) / scrollableDistance, 0), 1);
      const nextIndex = Math.min(Math.floor(progress * timeline.length), timeline.length - 1);

      if (activeTimelineIndexRef.current !== nextIndex) {
        activeTimelineIndexRef.current = nextIndex;
        setActiveTimelineIndex(nextIndex);
      }
    };

    const requestUpdate = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateTimelineFocus);
    };

    updateTimelineFocus();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const originalOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('from_name') || 'Joelcio');

    setIsSendingMessage(true);
    setContactStatus(null);

    try {
      await emailjs.sendForm('service_ra40jsa', 'template_7ae59gy', form);
      setContactStatus({
        type: 'success',
        message: `Obrigado, ${name}! Retornarei assim que possível.`,
      });
      form.reset();
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setContactStatus({
        type: 'error',
        message: 'Não consegui enviar agora. Tente novamente ou envie e-mail diretamente.',
      });
    } finally {
      setIsSendingMessage(false);
    }
  };

  useEffect(() => {
    let animationFrame = 0;

    const updateVisualPanelFocus = () => {
      const isDesktop = window.innerWidth >= 1024;
      const element = isDesktop ? timelineSectionRef.current : visualPanelRef.current;

      if (!element) return;

      const rect = element.getBoundingClientRect();
      const isInFocus = isDesktop
        ? rect.top < window.innerHeight * 0.68
          && rect.bottom > window.innerHeight * 0.52
        : rect.bottom > window.innerHeight * 0.24
        && rect.top < window.innerHeight * 0.76;

      if (isDesktop) {
        if (isInFocus) {
          if (!visualPanelActiveRef.current) {
            visualPanelActiveRef.current = true;
            setActiveTimelineIndex(0);
            setIsVisualPanelFocused(true);
          }
        } else {
          if (visualPanelDelayRef.current !== null) {
            window.clearTimeout(visualPanelDelayRef.current);
            visualPanelDelayRef.current = null;
          }

          visualPanelActiveRef.current = false;
          setIsVisualPanelFocused(false);
        }
        return;
      }

      if (visualPanelActiveRef.current !== isInFocus) {
        visualPanelActiveRef.current = isInFocus;
        setIsVisualPanelFocused(isInFocus);
      }
    };

    const requestUpdate = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateVisualPanelFocus);
    };

    updateVisualPanelFocus();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      cancelAnimationFrame(animationFrame);
      if (visualPanelDelayRef.current !== null) {
        window.clearTimeout(visualPanelDelayRef.current);
      }
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setHoveredProjectIndex(null);
    }
  }, [selectedProject]);

  return (
      <div className="portfolio-shell relative isolate min-h-screen bg-[#070a12] text-white selection:bg-cyan-400 selection:text-zinc-950">
      <div className="portfolio-bg-gradient fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_32rem),radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_34rem),linear-gradient(180deg,#070a12_0%,#09090b_55%,#050507_100%)]"></div>
      <div className="portfolio-bg-illumination fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="portfolio-bg-lines fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <header className={`portfolio-header sticky top-0 z-40 bg-[#070a12]/80 backdrop-blur-xl ${isHeroCoverLifted ? 'is-hero-lifted border-b border-white/10' : 'is-hero-resting border-b border-transparent'}`}>
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_auto] items-center gap-4 px-6 py-5 md:grid-cols-[auto_1fr_auto]">
          <a href="#inicio" className="portfolio-brand flex items-center gap-3" aria-label="Início - Joelcio Maia">
            <span className="portfolio-logo" aria-hidden="true">
              <svg className="portfolio-logo-art" viewBox="0 0 84 84" role="img">
                <g className="portfolio-logo-circuits">
                  <path d="M16 20v30" />
                  <path d="M24 13v49" />
                  <path d="M32 8v68" />
                  <path d="M42 16v52" />
                  <path d="M52 9v68" />
                  <path d="M62 21v41" />
                  <path d="M70 15v54" />
                  <circle cx="16" cy="34" r="1.8" />
                  <circle cx="42" cy="28" r="1.8" />
                  <circle cx="62" cy="42" r="1.8" />
                  <path d="M70 15l-2.6 3.2" />
                  <path d="M70 15l2.6 3.2" />
                </g>
                <path className="portfolio-logo-letter" d="M29 17v31c0 11-6.5 17-17 18" />
                <path className="portfolio-logo-letter" d="M40 65V21l17 31 17-31v44" />
                <g className="portfolio-logo-dashes">
                  <path d="M37 50v16" />
                  <path d="M77 50v16" />
                </g>
              </svg>
            </span>
            <span className="hidden text-sm font-medium text-zinc-300 sm:block">Joelcio Maia</span>
          </a>

          <nav className="hidden items-center justify-center gap-2 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="happy-button header-nav-link rounded-full px-4 py-2 text-sm font-bold text-zinc-300">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="portfolio-accessibility header-accessibility ml-auto flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/70 p-2 shadow-xl shadow-black/20 backdrop-blur-xl">
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full text-cyan-200 transition hover:bg-cyan-300 hover:text-zinc-950"
              aria-label={isLightTheme ? 'Ativar modo escuro' : 'Ativar modo claro'}
              title={isLightTheme ? 'Ativar modo escuro' : 'Ativar modo claro'}
              onClick={() => setThemeMode((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
            >
              <i className={`fa-solid ${isLightTheme ? 'fa-moon' : 'fa-sun'}`}></i>
            </button>

            <span className="h-6 w-px bg-white/10"></span>

            <button
              type="button"
              className="h-10 rounded-full px-3 text-sm font-black text-zinc-300 transition enabled:hover:bg-white/10 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Diminuir tamanho da fonte"
              title="Diminuir fonte"
              disabled={!canDecreaseFont}
              onClick={() => setFontScaleIndex((currentIndex) => Math.max(currentIndex - 1, 0))}
            >
              A-
            </button>

            <button
              type="button"
              className="h-10 rounded-full px-3 text-sm font-black text-zinc-300 transition enabled:hover:bg-white/10 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Aumentar tamanho da fonte"
              title="Aumentar fonte"
              disabled={!canIncreaseFont}
              onClick={() => setFontScaleIndex((currentIndex) => Math.min(currentIndex + 1, fontScaleOptions.length - 1))}
            >
              A+
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <div ref={heroCoverTrackRef} className="hero-cover-track relative min-h-[180svh] lg:min-h-[220vh]">
          <div className="hero-cover-viewport sticky top-0 min-h-screen overflow-hidden">
            <div className="hero-cover-reveal absolute inset-0 z-10 flex min-h-screen items-center">
              <section id="perfil" className="w-full px-6 pb-4 pt-24 sm:pb-8 sm:pt-20 lg:py-24">
                <ProfileNarrative />
              </section>
            </div>

            <section
              id="inicio"
              ref={heroCoverPanelRef}
              className="hero-cover-panel absolute inset-0 z-20 flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-12 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20 xl:pt-24"
            >
              <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.9)]"></span>
                    Suporte • Infraestrutura • Desenvolvimento • Docência
                  </div>

                  <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tighter sm:text-6xl lg:text-8xl">
                    Tecnologia aplicada para organizar, ensinar e resolver.
                  </h1>

                  <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
                    Portfólio profissional voltado à apresentação de experiências em suporte técnico, redes, infraestrutura, ensino técnico e desenvolvimento de soluções aplicadas.
                  </p>

                  <div className="mt-7 flex gap-3 sm:mt-10 sm:gap-4">
                    <a href="#trilhas" className="happy-button min-w-0 flex-1 rounded-full bg-cyan-400 px-4 py-3 text-center text-sm font-bold text-zinc-950 shadow-xl shadow-cyan-400/20 sm:flex-none sm:px-7 sm:py-4 sm:text-base">
                      Ver estrutura
                    </a>
                    <a href="#projetos" className="happy-button min-w-0 flex-1 rounded-full border border-white/15 px-4 py-3 text-center text-sm font-bold text-white sm:flex-none sm:px-7 sm:py-4 sm:text-base">
                      Explorar projetos
                    </a>
                  </div>
                </div>

                <HeroIdentityPanel />
              </div>
            </section>
          </div>
        </div>

        <TechMarquee variant="infrastructure" reverse />

        <section id="trilhas" className="px-6 py-24">
          <style>
            {`
              @keyframes focusStageReveal {
                from {
                  opacity: 0;
                  transform: translateY(14px) scale(0.985);
                }
                to {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }

              .focus-stage-reveal {
                animation: focusStageReveal 420ms ease-out both;
              }
            `}
          </style>

          <div className="mx-auto max-w-7xl lg:hidden">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">Áreas de atuação</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-tight">
              Uma base técnica aplicada a diferentes contextos.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
              Experiência profissional construída entre suporte técnico, infraestrutura corporativa, redes, segurança, configuração de ambientes, docência técnica e desenvolvimento de soluções aplicadas.
            </p>

            <div ref={mobileFocusSectionRef} className="relative mt-10 h-[380vh]">
              <div className="sticky top-24">
                <div className="overflow-hidden rounded-[1.75rem] border border-cyan-400/20 bg-zinc-950/75 shadow-2xl shadow-cyan-950/20">
                  <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-5 py-3">
                    <span className="h-3 w-3 rounded-full bg-red-400/80"></span>
                    <span className="h-3 w-3 rounded-full bg-yellow-300/80"></span>
                    <span className="h-3 w-3 rounded-full bg-emerald-400/80"></span>
                    <span className="ml-3 text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">painel técnico</span>
                  </div>

                  <div className="relative min-h-[20rem] p-5">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.16),transparent_14rem)]"></div>

                    <div key={activeFocus.title} className="focus-stage-reveal relative">
                      <div className="mb-7 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-black text-cyan-300">{activeFocusNumber}</span>
                          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-400/10 text-2xl text-cyan-300 ring-1 ring-cyan-400/20">
                            <i className={activeFocus.icon}></i>
                          </div>
                        </div>
                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                          {activeFocus.eyebrow}
                        </span>
                      </div>

                      <h3 className="text-3xl font-black tracking-tight text-white">{activeFocus.title}</h3>
                      <p className="mt-5 text-base leading-7 text-zinc-400">{activeFocus.description}</p>

                      <div className="mt-7 flex flex-wrap gap-2">
                        {activeFocus.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-400/15">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div
                      className="relative mt-8 grid gap-2"
                      style={{ gridTemplateColumns: `repeat(${focusDetailItems.length}, minmax(0, 1fr))` }}
                    >
                      {focusDetailItems.map((area, index) => (
                        <div key={area.eyebrow} className={`h-1 rounded-full transition ${index <= activeFocusIndex + 1 ? 'bg-cyan-300' : 'bg-white/10'}`}></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative mt-6 h-60 overflow-hidden">
                  <div
                    className="flex h-full transition-transform duration-500 ease-out will-change-transform"
                    style={{
                      transform: `translate3d(${-focusDetailProgress * 100}%, 0, 0)`,
                    }}
                  >
                    {focusDetailItems.map((area, index) => {
                      const cardStyle = focusDetailCardStyles[index];
                      const isActive = index === activeFocusIndex + 1;

                      return (
                        <article
                          key={area.detailTitle}
                          className={`h-full min-w-full rounded-[1.5rem] border p-5 transition duration-150 ${
                            isActive
                              ? 'border-cyan-300/30 bg-cyan-400/[0.055] text-white shadow-2xl shadow-cyan-950/15'
                              : 'border-white/10 bg-white/[0.025] text-zinc-400'
                          }`}
                          style={{
                            opacity: Math.max(cardStyle.opacity, isActive ? 1 : 0.35),
                            transform: `scale(${cardStyle.scale})`,
                          }}
                        >
                          <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300">{index === 0 ? '00' : `0${index}`} / {area.eyebrow}</p>
                          <h3 className="mt-4 text-2xl font-black tracking-tight">{area.detailTitle}</h3>
                          <p className="mt-3 text-sm leading-6">{area.detailDescription}</p>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto hidden max-w-7xl lg:block">
            <div className="mb-8 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">Áreas de atuação</p>
                <h2 className="mt-4 max-w-6xl text-4xl font-black tracking-tight sm:text-7xl">
                  Uma base técnica aplicada a diferentes contextos.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-zinc-400 lg:justify-self-end">
                Experiência profissional construída entre suporte técnico, infraestrutura corporativa, redes, segurança, configuração de ambientes, docência técnica e desenvolvimento de soluções aplicadas.
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr]">
              <div className="lg:sticky lg:top-40 lg:self-start">
                <div ref={focusStageRef} className="overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-zinc-950/75 shadow-2xl shadow-cyan-950/20">
                <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-5 py-4">
                  <span className="h-3 w-3 rounded-full bg-red-400/80"></span>
                  <span className="h-3 w-3 rounded-full bg-yellow-300/80"></span>
                  <span className="h-3 w-3 rounded-full bg-emerald-400/80"></span>
                  <span className="ml-3 text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">painel técnico</span>
                </div>

                <div className="relative min-h-[25rem] p-7">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.16),transparent_14rem)]"></div>

                  <div key={activeFocus.title} className="focus-stage-reveal relative">
                    <div className="mb-8 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-black text-cyan-300">{activeFocusNumber}</span>
                        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-cyan-400/10 text-3xl text-cyan-300 ring-1 ring-cyan-400/20">
                          <i className={activeFocus.icon}></i>
                        </div>
                      </div>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                        {activeFocus.eyebrow}
                      </span>
                    </div>

                    <h3 className="max-w-xl text-3xl font-black tracking-tight text-white sm:text-4xl">{activeFocus.title}</h3>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">{activeFocus.description}</p>

                    <div className="mt-8 flex flex-wrap gap-2">
                      {activeFocus.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-400/15">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    className="relative mt-10 grid gap-2"
                    style={{ gridTemplateColumns: `repeat(${focusDetailItems.length}, minmax(0, 1fr))` }}
                  >
                    {focusDetailItems.map((area, index) => (
                      <div key={area.eyebrow} className={`h-1 rounded-full transition ${index <= activeFocusIndex + 1 ? 'bg-cyan-300' : 'bg-white/10'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative lg:pb-[22vh] lg:pt-[8vh]">
              {focusDetailItems.map((area, index) => {
                const areaIndex = index - 1;
                const isIntro = index === 0;
                const isActive = isIntro ? activeFocusIndex === -1 : areaIndex === activeFocusIndex;
                const cardStyle = isIntro
                  ? {
                    opacity: activeFocusIndex === -1 ? 1 : 0,
                    scale: activeFocusIndex === -1 ? 1 : 0.96,
                    y: activeFocusIndex === -1 ? 0 : -18,
                    x: 0,
                  }
                  : focusCardStyles[areaIndex];
                const nextCardStyle = isIntro ? focusCardStyles[0] : focusCardStyles[areaIndex + 1];
                const lineOpacity = isIntro
                  ? (activeFocusIndex === -1 ? 0.55 : 0)
                  : Math.min(cardStyle.opacity, nextCardStyle?.opacity ?? cardStyle.opacity) * 0.9;

                return (
                  <div
                    key={area.title}
                    ref={(element) => {
                      if (!isIntro) {
                        focusStepRefs.current[areaIndex] = element;
                      }
                    }}
                    data-focus-index={isIntro ? 'overview' : areaIndex}
                    className="relative flex min-h-[34vh] items-center pl-0 lg:pl-12"
                  >
                    {index < focusDetailItems.length - 1 && (
                      <span
                        className="absolute left-4 top-1/2 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/45 via-cyan-300/25 to-transparent transition-opacity duration-150 lg:block"
                        style={{ opacity: lineOpacity }}
                      ></span>
                    )}

                    <div
                      className={`absolute left-0 hidden h-8 w-8 rounded-full border bg-[#070a12] transition duration-150 lg:grid lg:place-items-center ${
                        isActive ? 'border-cyan-300 text-cyan-200 shadow-[0_0_26px_rgba(34,211,238,0.25)]' : 'border-white/15 text-zinc-500'
                      }`}
                      style={{
                        opacity: cardStyle.opacity,
                        transform: `scale(${0.72 + cardStyle.opacity * 0.28})`,
                      }}
                    >
                      <span className="h-2 w-2 rounded-full bg-current"></span>
                    </div>

                    <article
                      className={`w-full rounded-[1.5rem] border p-6 transition duration-150 ${
                        isActive
                          ? 'border-cyan-300/30 bg-cyan-400/[0.055] text-white'
                          : 'border-white/10 bg-white/[0.025] text-zinc-400'
                      }`}
                      style={{
                        opacity: cardStyle.opacity,
                        pointerEvents: cardStyle.opacity > 0.08 ? 'auto' : 'none',
                        transform: `translate3d(0, ${cardStyle.y}px, 0) scale(${cardStyle.scale})`,
                      }}
                    >
                      <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300">{isIntro ? '00' : `0${areaIndex + 1}`} / {area.eyebrow}</p>
                      <h3 className="mt-4 text-2xl font-black tracking-tight">{area.detailTitle}</h3>
                      <p className="mt-3 max-w-xl text-sm leading-6">{area.detailDescription}</p>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
          </div>
        </section>

        <TechMarquee variant="development" />

        <section
          ref={timelineSectionRef}
          className={`formation-section timeline-scroll-section px-6 py-20 sm:py-24 ${isVisualPanelFocused ? 'is-formation-visible' : ''}`}
        >
          <div className="timeline-scroll-sticky mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div
              ref={visualPanelRef}
              tabIndex={0}
              className="portfolio-solid-panel formation-panel rounded-[2rem] border border-white/10 bg-[#101821] p-6 sm:p-8"
            >
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-200">Formação e interesses</p>
              <h2 className="mt-5 text-4xl font-black tracking-tight">Base acadêmica e técnica voltada à criação de soluções.</h2>
              <p className="mt-6 leading-7 text-zinc-300">
                A formação em Sistemas de Informação sustenta uma visão ampla sobre tecnologia, conectando lógica, desenvolvimento, banco de dados, redes,
                sistemas e análise de problemas.
              </p>
              <p className="mt-5 leading-7 text-zinc-300">
                Os interesses profissionais seguem áreas ligadas à construção de soluções digitais, automação de processos, inteligência artificial aplicada
                e desenvolvimento de sistemas completos.
              </p>
            </div>

            <div
              className="timeline-card-viewport overflow-hidden lg:overflow-visible"
              onMouseLeave={() => setHoveredTimelineIndex(null)}
            >
              <div
                className="timeline-card-track formation-card-track flex gap-4 transition-transform duration-500 ease-out lg:grid lg:translate-x-0 lg:grid-cols-1"
                style={{ '--timeline-index': activeTimelineIndex } as CSSProperties}
              >
                {timeline.map((item, index) => {
                  const isHovered = hoveredTimelineIndex === index;
                  const isMobileActive = window.innerWidth < 1024 && activeTimelineIndex === index;

                  return (
                    <article
                      key={item.title}
                      className={`portfolio-solid-panel formation-card timeline-card shrink-0 basis-full rounded-[1.5rem] border border-white/10 bg-[#080b12] p-6 lg:basis-auto ${
                        isHovered ? 'lg:border-cyan-300/35 lg:shadow-2xl lg:shadow-cyan-950/20' : ''
                      } ${
                        isMobileActive ? 'border-cyan-300/25 shadow-2xl shadow-cyan-950/25' : ''
                      }`}
                      style={{ '--formation-delay': `${140 + index * 120}ms` } as CSSProperties}
                      onMouseEnter={() => setHoveredTimelineIndex(index)}
                      onFocus={() => setHoveredTimelineIndex(index)}
                      tabIndex={0}
                    >
                      <p className="text-sm font-bold text-cyan-300">{item.period}</p>
                      <h3 className="mt-2 text-2xl font-bold">{item.title}</h3>
                      <p className="mt-3 text-zinc-400">{item.description}</p>
                    </article>
                  );
                })}
              </div>

              <div className="mt-4 flex justify-center gap-2 lg:hidden" aria-hidden="true">
                {timeline.map((item, index) => (
                  <span
                    key={item.period}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      activeTimelineIndex === index ? 'w-8 bg-cyan-300' : 'w-2 bg-white/20'
                    }`}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projetos" className="px-6 py-24">
          <style>
            {`
              @keyframes projectFloat {
                0%, 100% {
                  transform: translateY(0);
                }
                50% {
                  transform: translateY(-10px);
                }
              }

              @keyframes projectPreviewScan {
                0% {
                  transform: translateX(-8rem) rotate(12deg);
                }
                100% {
                  transform: translateX(34rem) rotate(12deg);
                }
              }

              .project-float {
                animation: projectFloat 5.2s ease-in-out infinite;
              }

              .project-preview-scan {
                animation: projectPreviewScan 5.8s ease-in-out infinite;
              }
            `}
          </style>

          <div className="mx-auto max-w-7xl">
            <div className="mb-12 grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">Projetos</p>
                <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Soluções práticas com contexto real.</h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-zinc-400 lg:justify-self-end">
                Projetos desenvolvidos ou estruturados para demonstrar aplicação técnica em sistemas, interfaces, organização de informações, suporte,
                infraestrutura e educação tecnológica.
              </p>
            </div>

            <div
              className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-2 lg:gap-8"
              onMouseLeave={() => {
                if (window.innerWidth >= 1024) {
                  setHoveredProjectIndex(null);
                }
              }}
            >
              {visibleProjects.map((project, index) => {
                const isHovered = hoveredProjectIndex === index;
                const isDimmed = hoveredProjectIndex !== null && !isHovered;

                return (
                  <button
                    key={project.title}
                    ref={(element) => {
                      projectCardRefs.current[index] = element;
                    }}
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    onFocus={() => {
                      if (window.innerWidth >= 1024) {
                        setHoveredProjectIndex(index);
                      }
                    }}
                    onMouseEnter={() => {
                      if (window.innerWidth >= 1024) {
                        setHoveredProjectIndex(index);
                      }
                    }}
                    className={`project-card-surface group relative overflow-hidden rounded-[1.1rem] border text-left shadow-xl shadow-black/15 transition duration-500 sm:rounded-[1.35rem] lg:rounded-[1.5rem] lg:shadow-2xl lg:shadow-black/20 ${
                      isHovered
                        ? 'z-10 -translate-y-2 shadow-cyan-950/40 lg:scale-[1.015]'
                        : 'lg:hover:-translate-y-1'
                    } ${
                      isDimmed ? 'scale-[0.985] lg:scale-[0.955]' : ''
                    }`}
                  >
                    <div className="project-case-visual relative aspect-[1.08/1] overflow-hidden sm:aspect-[1.35/1] lg:aspect-[1.52/1]">
                      <div className="project-preview-inner absolute inset-0 transition duration-700 lg:group-hover:scale-105">
                        <ProjectPreview project={project} />
                      </div>
                      <div className="project-case-shade absolute inset-0"></div>
                      <div className="project-status-pill absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate rounded-full px-2 py-1 text-[0.52rem] font-black uppercase tracking-[0.12em] sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[0.68rem] sm:tracking-[0.18em] lg:left-5 lg:top-5 lg:px-4 lg:py-2 lg:text-xs lg:tracking-[0.2em]">
                        {project.status}
                      </div>
                    </div>

                    <div className="project-case-strip">
                      <div className="min-w-0">
                        <p className="project-case-kicker">{project.type}</p>
                        <h3 className="project-card-title">{project.title}</h3>
                        <p className="project-card-tagline">{project.tagline}</p>

                        <div className="project-case-tags">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tag} className={tagIndex === 2 ? 'hidden sm:inline-flex' : ''}>
                            {tag}
                          </span>
                        ))}
                        </div>
                      </div>

                      <span className="project-case-arrow" aria-hidden="true">
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contato" className="px-6 py-24">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-cyan-300/25 bg-cyan-400 text-zinc-950 shadow-2xl shadow-cyan-400/10">
            <div className="grid gap-8 p-7 md:grid-cols-[0.9fr_1.1fr] md:p-10 lg:p-12">
              <div className="flex flex-col justify-between gap-8">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.3em] text-zinc-700">Contato</p>
                  <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Vamos conversar!</h2>
                  <p className="mt-5 max-w-xl text-base font-medium leading-7 text-zinc-800">
                    Será um grande prazer discutir ideias, projetos ou oportunidades em tecnologia, docência técnica,
                    suporte, infraestrutura e desenvolvimento aplicado.
                  </p>
                </div>

                <div className="grid gap-4">
                  <a href="mailto:joelcio.maia@sed.sc.gov.br" className="flex items-center gap-3 font-black text-zinc-950 transition hover:translate-x-1">
                    <i className="fa-solid fa-envelope text-xl text-zinc-800"></i>
                    joelcio.maia@sed.sc.gov.br
                  </a>
                  <p className="flex items-center gap-3 font-black text-zinc-950">
                    <i className="fa-solid fa-location-dot text-xl text-zinc-800"></i>
                    Abelardo Luz, Brasil
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <a href="https://www.linkedin.com/in/joelcio-maia-ba7501136/" target="_blank" rel="noopener noreferrer" className="happy-button rounded-full bg-zinc-950 px-4 py-2 text-sm font-bold text-white">
                      LinkedIn
                    </a>
                    <a href="https://github.com/joelciomaia" target="_blank" rel="noopener noreferrer" className="happy-button rounded-full bg-zinc-950 px-4 py-2 text-sm font-bold text-white">
                      GitHub
                    </a>
                    <a href="https://drive.google.com/file/d/1PfNld1-61sEBuGpLJSHRlQlTyh99jHBg/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="happy-button rounded-full bg-zinc-950 px-4 py-2 text-sm font-bold text-white">
                      Currículo PDF
                    </a>
                  </div>
                </div>
              </div>

              <form onSubmit={handleContactSubmit} className="grid gap-4">
                <input
                  type="text"
                  name="from_name"
                  placeholder="Seu nome"
                  required
                  className="h-14 rounded-2xl border border-zinc-950/10 bg-white/55 px-5 text-base font-bold text-zinc-950 outline-none transition placeholder:text-zinc-700/55 focus:border-zinc-950/35 focus:bg-white/80"
                />
                <input
                  type="email"
                  name="from_email"
                  placeholder="Seu e-mail"
                  required
                  className="h-14 rounded-2xl border border-zinc-950/10 bg-white/55 px-5 text-base font-bold text-zinc-950 outline-none transition placeholder:text-zinc-700/55 focus:border-zinc-950/35 focus:bg-white/80"
                />
                <textarea
                  name="message"
                  placeholder="Sua mensagem..."
                  rows={6}
                  required
                  className="min-h-40 resize-y rounded-2xl border border-zinc-950/10 bg-white/55 px-5 py-5 text-base font-bold text-zinc-950 outline-none transition placeholder:text-zinc-700/55 focus:border-zinc-950/35 focus:bg-white/80"
                ></textarea>

                {contactStatus && (
                  <div className={`rounded-2xl border px-5 py-4 text-sm font-bold ${
                    contactStatus.type === 'success'
                      ? 'border-emerald-950/20 bg-emerald-950/15 text-zinc-950'
                      : 'border-red-950/20 bg-red-950/15 text-zinc-950'
                  }`}>
                    {contactStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSendingMessage}
                  className="happy-button h-14 rounded-full bg-zinc-950/85 px-8 text-base font-black text-white shadow-2xl shadow-zinc-950/15 disabled:cursor-wait disabled:opacity-70"
                >
                  {isSendingMessage ? 'Enviando...' : 'Enviar mensagem'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
          <button
            type="button"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            aria-label="Fechar estudo de caso"
            onClick={() => setSelectedProject(null)}
          ></button>

          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-case-title"
            className="relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#080b13] shadow-2xl shadow-cyan-950/30"
          >
            <div className="grid max-h-[90vh] overflow-y-auto lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative min-h-[22rem] overflow-hidden border-b border-white/10 lg:sticky lg:top-0 lg:h-[90vh] lg:border-b-0 lg:border-r">
                <ProjectPreview project={selectedProject} mode="modal" />
              </div>

              <div className="relative p-6 sm:p-8 lg:p-10">
                <button
                  type="button"
                  className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition hover:border-cyan-300/40 hover:bg-cyan-300 hover:text-zinc-950"
                  aria-label="Fechar"
                  onClick={() => setSelectedProject(null)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>

                <div className="pr-12">
                  <div className="flex flex-wrap gap-3">
                    <span className="rounded-full bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-200 ring-1 ring-cyan-400/20">
                      {selectedProject.type}
                    </span>
                    <span className="rounded-full bg-emerald-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-200 ring-1 ring-emerald-400/20">
                      {selectedProject.status}
                    </span>
                  </div>

                  <h2 id="project-case-title" className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
                    {selectedProject.title}
                  </h2>
                  <p className="mt-5 text-lg leading-8 text-zinc-300">{selectedProject.description}</p>
                </div>

                <div className="mt-8 grid gap-4">
                  {[
                    { label: 'Problema', text: selectedProject.problem },
                    { label: 'Minha atuação', text: selectedProject.action },
                    { label: 'Resultado', text: selectedProject.result },
                  ].map((item) => (
                    <section key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                      <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">{item.label}</p>
                      <p className="mt-3 leading-7 text-zinc-300">{item.text}</p>
                    </section>
                  ))}
                </div>

                <div className="mt-8">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">Ferramentas e temas</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedProject.tools.map((tool) => (
                      <span key={tool} className="rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200 ring-1 ring-white/10">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      )}

      <footer className="relative z-10 space-y-2 border-t border-white/10 px-6 py-8 text-center text-sm text-zinc-500">
        <p>&copy; {currentYear} Joelcio J. Maia. - Todos os direitos reservados.</p>
        <p>Infraestrutura e Redes &bull; Tecnologia da Informação &bull; Análise e Desenvolvimento de Sistemas</p>
      </footer>
    </div>
  );
}

export default App;
