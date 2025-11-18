'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { CommandPalette, type Command } from './CommandPalette'
import { ProjectModal } from './ProjectModal'
import type { SanitySiteSettings } from '@/lib/sanity'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  description: string
  longDescription?: any[]
  image: any
  technologies: string[]
  category: string
  status: string
  featured: boolean
  liveUrl?: string
  githubUrl?: string
  startDate: string
  endDate?: string
  teamSize?: number
  role?: string
}

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt: string
  tags?: string[]
  featured: boolean
}

interface ToyProject {
  _id: string
  title: string
  slug: { current: string }
  description: string
  image?: any
  url?: string
  technologies: string[]
  category: string
  featured: boolean
}

interface CommandPaletteProviderProps {
  projects?: Project[]
  blogPosts?: BlogPost[]
  toyProjects?: ToyProject[]
  siteSettings?: SanitySiteSettings | null
  children: React.ReactNode
}

export const CommandPaletteProvider: React.FC<CommandPaletteProviderProps> = ({
  projects = [],
  blogPosts = [],
  toyProjects = [],
  siteSettings,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const router = useRouter()

  // Handle Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Generate all commands
  const commands = useMemo(() => {
    const allCommands: Command[] = []

    // Navigation Commands
    allCommands.push({
      id: 'nav-home',
      title: 'Home',
      description: 'Go to homepage',
      category: 'navigation',
      action: () => router.push('/'),
      keywords: ['home', 'index', 'main'],
    })

    allCommands.push({
      id: 'nav-journey',
      title: 'Journey',
      description: 'View my project journey',
      category: 'navigation',
      action: () => router.push('/journey'),
      keywords: ['journey', 'projects', 'work'],
    })

    allCommands.push({
      id: 'nav-writing',
      title: 'Writing',
      description: 'Read my blog posts',
      category: 'navigation',
      action: () => router.push('/writing'),
      keywords: ['writing', 'blog', 'articles', 'posts'],
    })

    allCommands.push({
      id: 'nav-contact',
      title: 'Contact',
      description: 'Get in touch with me',
      icon: '/assets/icons/sm/mail.png',
      category: 'navigation',
      action: () => router.push('/contact'),
      keywords: ['contact', 'email', 'reach', 'message'],
    })

    allCommands.push({
      id: 'nav-resume',
      title: 'Resume',
      description: 'View my resume',
      category: 'navigation',
      action: () => router.push('/resume'),
      keywords: ['resume', 'cv', 'curriculum vitae'],
    })

    // Project Commands (open in modal)
    projects.forEach((project) => {
      allCommands.push({
        id: `project-${project._id}`,
        title: project.title,
        description: project.description,
        category: 'projects',
        action: () => {
          setSelectedProject(project)
          setIsProjectModalOpen(true)
        },
        keywords: [
          ...project.technologies,
          project.category,
          project.status,
          ...(project.role ? [project.role] : []),
        ],
      })
    })

    // Blog Post Commands
    blogPosts.forEach((post) => {
      allCommands.push({
        id: `blog-${post._id}`,
        title: post.title,
        description: post.excerpt || 'Read this blog post',
        category: 'blogs',
        action: () => router.push(`/blogs/${post.slug.current}`),
        keywords: [...(post.tags || []), 'blog', 'article', 'post'],
      })
    })

    // Toy Project Commands
    toyProjects.forEach((toy) => {
      allCommands.push({
        id: `toy-${toy._id}`,
        title: toy.title,
        description: toy.description,
        category: 'toys',
        action: () => {
          if (toy.url) {
            window.open(toy.url, '_blank')
          }
        },
        keywords: [...toy.technologies, toy.category, 'toy', 'experiment'],
      })
    })

    // Social Media Commands
    if (siteSettings?.socialLinks) {
      if (siteSettings.socialLinks.github) {
        allCommands.push({
          id: 'social-github',
          title: 'GitHub',
          description: 'Visit my GitHub profile',
          icon: '/assets/icons/sm/github.png',
          category: 'social',
          action: () => window.open(siteSettings.socialLinks.github, '_blank'),
          keywords: ['github', 'code', 'repos', 'repositories'],
        })
      }

      if (siteSettings.socialLinks.linkedin) {
        allCommands.push({
          id: 'social-linkedin',
          title: 'LinkedIn',
          description: 'Connect with me on LinkedIn',
          icon: '/assets/icons/sm/linkedin.png',
          category: 'social',
          action: () => window.open(siteSettings.socialLinks.linkedin, '_blank'),
          keywords: ['linkedin', 'professional', 'network'],
        })
      }

      if (siteSettings.socialLinks.twitter) {
        allCommands.push({
          id: 'social-twitter',
          title: 'Twitter',
          description: 'Follow me on Twitter',
          icon: '/assets/icons/sm/twitter.png',
          category: 'social',
          action: () => window.open(siteSettings.socialLinks.twitter, '_blank'),
          keywords: ['twitter', 'tweets', 'social'],
        })
      }

      if (siteSettings.socialLinks.instagram) {
        allCommands.push({
          id: 'social-instagram',
          title: 'Instagram',
          description: 'Follow me on Instagram',
          icon: '/assets/icons/sm/instagram.png',
          category: 'social',
          action: () => window.open(siteSettings.socialLinks.instagram, '_blank'),
          keywords: ['instagram', 'photos', 'social'],
        })
      }
    }

    // Default social links if not in settings
    if (!siteSettings?.socialLinks?.github) {
      allCommands.push({
        id: 'social-github-default',
        title: 'GitHub',
        description: 'Visit my GitHub profile',
        icon: '/assets/icons/sm/github.png',
        category: 'social',
        action: () => window.open('https://github.com/thejackluo', '_blank'),
        keywords: ['github', 'code', 'repos'],
      })
    }

    // Email command
    const email = siteSettings?.contact?.email || 'jack@hexahacks.com'
    allCommands.push({
      id: 'action-email',
      title: 'Send Email',
      description: `Email me at ${email}`,
      icon: '/assets/icons/sm/mail.png',
      category: 'actions',
      action: () => window.open(`mailto:${email}`, '_blank'),
      keywords: ['email', 'contact', 'mail', 'message'],
    })

    // Calendly command
    allCommands.push({
      id: 'action-calendly',
      title: 'Schedule Meeting',
      description: 'Book a meeting with me',
      icon: '/assets/icons/sm/calendar.png',
      category: 'actions',
      action: () =>
        window.open('https://calendly.com/jackluo/20-minute-meeting', '_blank'),
      keywords: ['calendly', 'meeting', 'schedule', 'book', 'call'],
    })

    return allCommands
  }, [projects, blogPosts, toyProjects, siteSettings, router])

  return (
    <>
      {children}
      <CommandPalette
        commands={commands}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <ProjectModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false)
          setSelectedProject(null)
        }}
      />
    </>
  )
}
