import type { Project, SkillGroup } from './types'

/** ── Customize these with your real information ── */

export const OWNER = {
  name: 'Caio Augusto',
  title: 'Desenvolvedor de Software | Python, React e IA',
  tagline:
    'Desenvolvimento de software, automações resilientes e extração de dados estruturados com IA.',
  bio: `Estudante de Ciência da Computação e formado em Gestão da TI. Experiência técnica em desenvolvimento de software, automação web e integração de sistemas, com foco em ingestão e indexação de documentos, tratamento de dados estruturados e aplicações com APIs de LLMs (OpenAI, Anthropic e Gemini).`,
  github: 'https://github.com/augusto-developer',
  linkedin: 'https://www.linkedin.com/in/augusto-developer/',
  email: 'caiohg_94@hotmail.com',
  location: 'Vila Velha / ES, Brasil',
  avatarPlaceholder: '🧙‍♂️',
  avatarUrl: '/avatar.png',
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Desenvolvimento Web',
    icon: '🪄',
    skills: [
      { name: 'Python' },
      { name: 'JavaScript / TypeScript' },
      { name: 'React & Angular' },
      { name: 'FastAPI & Spring Boot' },
      { name: 'HTML5 & CSS3' },
    ],
  },
  {
    category: 'Documentos & Dados',
    icon: '📜',
    skills: [
      { name: 'Ingestão & Extração de PDFs' },
      { name: 'PostgreSQL & MySQL' },
      { name: 'Oracle DB & SQL' },
      { name: 'Pandas & Dados Não Estruturados' },
      { name: 'APIs REST (JSON / XML)' },
    ],
  },
  {
    category: 'IA & Automação',
    icon: '⚡',
    skills: [
      { name: 'APIs LLM (OpenAI, Gemini, Claude)' },
      { name: 'Prompts & Dados Estruturados' },
      { name: 'Patchright & Selenium (RPA)' },
      { name: 'Playwright & Web Scraping' },
      { name: 'Orquestração de Fluxos no n8n' },
    ],
  },
  {
    category: 'Qualidade & DevOps',
    icon: '🔭',
    skills: [
      { name: 'Git & GitHub' },
      { name: 'Docker & CI/CD' },
      { name: 'Testes Funcionais & Cenários' },
      { name: 'Cypress & Playwright' },
      { name: 'Linux' },
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

