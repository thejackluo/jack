export interface Project {
  id: string
  title: string
  description: string
  image: string
  gif?: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  category: 'web' | 'mobile' | 'ai' | 'game' | 'tool' | 'other'
  createdAt: Date
  updatedAt: Date
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: Date
  updatedAt: Date
  tags: string[]
  readingTime: number
  featured: boolean
  author: {
    name: string
    image: string
    bio: string
  }
}

export interface ToyProject {
  id: string
  title: string
  description: string
  image: string
  week: number
  category: string
  createdAt: Date
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface NavigationItem {
  title: string
  href: string
  external?: boolean
}

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  image?: string
  url?: string
}

export interface AnimationConfig {
  duration: number
  delay?: number
  ease?: string
}

export interface PageProps {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export interface ContactForm {
  name: string
  email: string
  message: string
  subject?: string
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: Date
  endDate?: Date
  description: string
  technologies: string[]
  current?: boolean
}

export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  startDate: Date
  endDate?: Date
  gpa?: string
  relevant_courses?: string[]
  current?: boolean
}

export interface Skill {
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  category: 'frontend' | 'backend' | 'mobile' | 'ai' | 'tools' | 'other'
}

export interface ThemeConfig {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  backgroundColor: string
  textColor: string
  darkMode: boolean
} 