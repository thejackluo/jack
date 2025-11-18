'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import styles from '@/styles/projectModal.module.css'

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

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!project) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    })
  }

  const statusColors: Record<string, string> = {
    completed: '#22c55e',
    'in-progress': '#3b82f6',
    'on-hold': '#f59e0b',
    cancelled: '#ef4444',
  }

  const statusColor = statusColors[project.status] || '#6b7280'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Close Button */}
            <button className={styles.closeButton} onClick={onClose}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Modal Content */}
            <div className={styles.content}>
              {/* Project Image */}
              {project.image && (
                <div className={styles.imageContainer}>
                  <Image
                    src={urlFor(project.image).width(1200).url()}
                    alt={project.title}
                    fill
                    className={styles.image}
                  />
                </div>
              )}

              {/* Project Header */}
              <div className={styles.header}>
                <div className={styles.headerTop}>
                  <h1 className={styles.title}>{project.title}</h1>
                  <div className={styles.badges}>
                    <span
                      className={styles.statusBadge}
                      style={{ backgroundColor: statusColor }}
                    >
                      {project.status.replace('-', ' ')}
                    </span>
                    {project.featured && (
                      <span className={styles.featuredBadge}>Featured</span>
                    )}
                  </div>
                </div>

                <p className={styles.description}>{project.description}</p>

                {/* Meta Information */}
                <div className={styles.meta}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Category:</span>
                    <span className={styles.metaValue}>{project.category}</span>
                  </div>
                  {project.role && (
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Role:</span>
                      <span className={styles.metaValue}>{project.role}</span>
                    </div>
                  )}
                  {project.teamSize && (
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Team Size:</span>
                      <span className={styles.metaValue}>{project.teamSize}</span>
                    </div>
                  )}
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Timeline:</span>
                    <span className={styles.metaValue}>
                      {formatDate(project.startDate)}
                      {project.endDate && ` - ${formatDate(project.endDate)}`}
                      {!project.endDate && ' - Present'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Technologies</h2>
                  <div className={styles.technologies}>
                    {project.technologies.map((tech, index) => (
                      <span key={index} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Long Description */}
              {project.longDescription && project.longDescription.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>About This Project</h2>
                  <div className={styles.longDescription}>
                    <PortableText value={project.longDescription} />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className={styles.actions}>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionButton}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 16a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"
                        fill="currentColor"
                      />
                      <path
                        d="M10 5a5 5 0 0 0-5 5h2a3 3 0 0 1 3-3V5z"
                        fill="currentColor"
                      />
                    </svg>
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionButton}
                  >
                    <Image
                      src="/assets/icons/sm/github.png"
                      alt="GitHub"
                      width={20}
                      height={20}
                    />
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
