import type { Project, SkillGroup } from './types'

/** ── Customize these with your real information ── */

export const OWNER = {
  name: 'augusto-developer',
  title: 'Desenvolvedor de Software | Fullstack',
  tagline:
    'Desenvolvimento de software, automações resilientes e extração de dados estruturados com IA.',
  bio: `Focado em resolver problemas reais: crio automações web, fluxos de extração, tratamento de dados e soluções integradas com LLMs. Experiência prática em automação de sistemas e engenharia de software, unindo Python, JavaScript e inteligência artificial para entregar não só eficiência nos bastidores, mas uma experiência fluida e sólida para o usuário.`,
  github: 'https://github.com/augusto-developer',
  linkedin: 'https://www.linkedin.com/in/augusto-developer/',
  email: 'augustolopez2897@outlook.com',
  location: 'Vila Velha / ES, Brasil',
  avatarPlaceholder: '🧙‍♂️',
  avatarUrl: './avatar.png',
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
    id: 'bot-ofertas',
    title: 'Bot de Ofertas & Inteligência de Afiliados',
    description:
      'Agregador autônomo multithreading construído sob Arquitetura Hexagonal (Ports & Adapters). Minera promoções em grandes marketplaces com TLS Fingerprinting anti-bot, audita quedas de preço em tempo real e dispara mensagens com imagens e links de afiliados via WhatsApp Web com proteção anti-spam e ciclo noturno.',
    tags: [
      'Python',
      'Arquitetura Hexagonal',
      'PostgreSQL',
      'TLS Fingerprinting',
      'Patchright',
      'WhatsApp Automation',
      'Docker',
    ],
    featured: true,
    isPrivate: true,
    metrics: 'Mineração Multiloja & Disparo Anti-Spam',
    confidentialityNotice:
      'Arquitetura autoral privada com regras de proteção de cookies, mitigação anti-ban e conversão automatizada de links monetizados.',
    demoType: 'interactive-flow',
  },
]

