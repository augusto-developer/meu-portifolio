/** Shared data types for the portfolio content */

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  liveUrl?: string
  repoUrl?: string
  featured?: boolean
}

export interface Skill {
  name: string
  level: 'Arcano' | 'Proficiente' | 'Aprendiz'
}

export interface SkillGroup {
  category: string
  icon: string
  skills: Skill[]
}

