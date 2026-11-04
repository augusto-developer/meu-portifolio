import type { Project, SkillGroup } from './types'

/** ── Customize these with your real information ── */

export const OWNER = {
  name: 'augusto-developer',
  title: 'Engenheiro de Software & Artesão Digital',
  tagline:
    'Conjuro interfaces responsivas, APIs robustas e experiências que fazem os utilizadores sorrirem.',
  bio: `Acredito que o bom software é como uma carta bem escrita —
  claro, cuidadoso e construído para durar. Trabalho com automações para transformar ideias complexas em produtos elegantes
  e acessíveis. Cada projeto é uma nova aventura.`,
  github: 'https://github.com/augusto-developer',
  linkedin: 'https://www.linkedin.com/in/augusto-developer/',
  email: 'augustolopez2897@outlook.com',
  location: 'Vitória / ES, Brasil',
  avatarPlaceholder: '🧙‍♂️',
  avatarUrl: '/avatar.png',
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Frontend',
    icon: '🪄',
    skills: [
      { name: 'React / Next.js', level: 'Junior' },
      { name: 'TypeScript', level: 'Junior' },
      { name: 'Tailwind CSS', level: 'Junior' },
      { name: 'Framer Motion', level: 'Junior' },
      { name: 'HTML & CSS', level: 'Junior' },
    ],
  },
  {
    category: 'Backend',
    icon: '⚗️',
    skills: [
      { name: 'Node.js', level: 'Junior' },
      { name: 'Python / FastAPI', level: 'Junior' },
      { name: 'REST APIs', level: 'Junior' },
      { name: 'PostgreSQL', level: 'Junior' },
      { name: 'Prisma ORM', level: 'Junior' },
    ],
  },
  {
    category: 'Ferramentas & DevOps',
    icon: '🔭',
    skills: [
      { name: 'Git & GitHub', level: 'Junior' },
      { name: 'Docker', level: 'Junior' },
      { name: 'CI / CD', level: 'Junior' },
      { name: 'Linux', level: 'Junior' },
      { name: 'Vercel / Netlify', level: 'Junior' },
    ],
  },
  {
    category: 'Arquitetura & Craft',
    icon: '📜',
    skills: [
      { name: 'DDD / Clean Arch.', level: 'Junior' },
      { name: 'TDD', level: 'Junior' },
      { name: 'Design Systems', level: 'Junior' },
      { name: 'UX / Acessibilidade', level: 'Junior' },
      { name: 'AI-Assisted Dev', level: 'Junior' },
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

