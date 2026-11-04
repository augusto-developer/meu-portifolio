import type { Project, SkillGroup } from './types'

/** ── Customize these with your real information ── */

export const OWNER = {
  name: 'Seu Nome',
  title: 'Engenheiro de Software & Artesão Digital',
  tagline:
    'Conjuro interfaces responsivas, APIs robustas e experiências que fazem os utilizadores sorrirem.',
  bio: `Acredito que o bom software é como uma carta bem escrita —
  claro, cuidadoso e construído para durar. Trabalho com tecnologias
  modernas da web para transformar ideias complexas em produtos elegantes
  e acessíveis. Cada projeto é uma nova aventura.`,
  github: 'https://github.com/seu-usuario',
  linkedin: 'https://linkedin.com/in/seu-usuario',
  email: 'seuemail@example.com',
  location: 'Brasil 🇧🇷',
  avatarPlaceholder: '🧙‍♂️',
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Frontend',
    icon: '🪄',
    skills: [
      { name: 'React / Next.js', level: 'Arcano' },
      { name: 'TypeScript', level: 'Arcano' },
      { name: 'Tailwind CSS', level: 'Arcano' },
      { name: 'Framer Motion', level: 'Proficiente' },
      { name: 'HTML & CSS', level: 'Arcano' },
    ],
  },
  {
    category: 'Backend',
    icon: '⚗️',
    skills: [
      { name: 'Node.js', level: 'Arcano' },
      { name: 'Python / FastAPI', level: 'Proficiente' },
      { name: 'REST APIs', level: 'Arcano' },
      { name: 'PostgreSQL', level: 'Proficiente' },
      { name: 'Prisma ORM', level: 'Proficiente' },
    ],
  },
  {
    category: 'Ferramentas & DevOps',
    icon: '🔭',
    skills: [
      { name: 'Git & GitHub', level: 'Arcano' },
      { name: 'Docker', level: 'Proficiente' },
      { name: 'CI / CD', level: 'Proficiente' },
      { name: 'Linux', level: 'Proficiente' },
      { name: 'Vercel / Netlify', level: 'Arcano' },
    ],
  },
  {
    category: 'Arquitetura & Craft',
    icon: '📜',
    skills: [
      { name: 'DDD / Clean Arch.', level: 'Proficiente' },
      { name: 'TDD', level: 'Proficiente' },
      { name: 'Design Systems', level: 'Proficiente' },
      { name: 'UX / Acessibilidade', level: 'Proficiente' },
      { name: 'AI-Assisted Dev', level: 'Arcano' },
    ],
  },
]

export const PROJECTS: Project[] = [
  {
    id: 'automacao-dp',
    title: 'Automação de Documentos do DP',
    description:
      'Sistema de automação em Python e Patchright para orquestração e homologação de documentos da empresa e colaboradores terceirizados. Gerencia tráfego de pendências urgentes e realiza uploads autônomos em plataformas externas com regras customizadas.',
    tags: ['Python', 'Patchright', 'Automação RPA', 'Asyncio', 'Playwright', 'Web Scraping'],
    featured: true,
    isPrivate: true,
    metrics: 'Redução de 80% nos atrasos e reprovações',
    confidentialityNotice:
      'Desenvolvido para ambiente corporativo sob termo de confidencialidade (NDA). O repositório e infraestrutura são proprietários da empresa.',
    demoType: 'interactive-flow',
  },
  {
    id: '2',
    title: 'Projeto Alpha',
    description:
      'Descreva aqui seu projeto mais impressionante. Use verbos de ação e destaque o impacto real gerado.',
    tags: ['Node.js', 'PostgreSQL', 'REST API'],
    liveUrl: '#',
    repoUrl: '#',
    featured: true,
  },
  {
    id: '3',
    title: 'Projeto Beta',
    description:
      'Mais um projeto relevante. Mencione problema resolvido, tecnologias usadas e resultado mensurável.',
    tags: ['React', 'Next.js', 'Prisma'],
    repoUrl: '#',
  },
  {
    id: '4',
    title: 'Projeto Gamma',
    description:
      'Ferramenta open-source, biblioteca, CLI ou qualquer contribuição técnica de destaque.',
    tags: ['Python', 'FastAPI', 'Docker'],
    repoUrl: '#',
  },
]

