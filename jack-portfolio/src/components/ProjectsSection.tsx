'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { urlFor } from '@/lib/sanity'
import { Button } from '@/components/ui/Button'
import styles from '@/styles/creative.module.css'

interface Project {
  title: string
  slug: { current: string }
  description: string
  longDescription: any[]
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
  sortOrder: number
}

interface ProjectsSectionProps {
  projects?: Project[]
  className?: string
}

const categoryLabels = {
  web: 'Web Development',
  mobile: 'Mobile App',
  desktop: 'Desktop App',
  ai: 'AI/ML',
  data: 'Data Science',
  game: 'Game Development',
  iot: 'IoT',
  other: 'Other'
}

const statusLabels = {
  'in-progress': 'In Progress',
  'completed': 'Completed',
  'on-hold': 'On Hold',
  'cancelled': 'Cancelled'
}

// Helper function to get image URL for both Sanity assets and regular paths
const getImageUrl = (image: any): string => {
  if (!image) return '/assets/images/projects/calendai.png' // fallback
  
  // If it's a regular path (mock data), return it directly
  if (typeof image.asset._ref === 'string' && image.asset._ref.startsWith('/')) {
    return image.asset._ref
  }
  
  // If it's a Sanity asset, use urlFor
  try {
    return urlFor(image).url()
  } catch (error) {
    console.log('Error processing image:', error)
    return '/assets/images/projects/calendai.png' // fallback
  }
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects = [],
  className = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('featured')

  const categories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category))
    return Array.from(cats).sort()
  }, [projects])

  const statuses = useMemo(() => {
    const stats = new Set(projects.map(p => p.status))
    return Array.from(stats).sort()
  }, [projects])

  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus
      return matchesCategory && matchesStatus
    })

    // Sort projects
    filtered.sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      }
      if (sortBy === 'date') {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title)
      }
      return a.sortOrder - b.sortOrder
    })

    return filtered
  }, [projects, selectedCategory, selectedStatus, sortBy])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99] as const
      }
    }
  }

  const filterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.6, -0.05, 0.01, 0.99] as const
      }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    })
  }

  return (
    <section className={`${styles.creativeContainer} ${className}`}>
      <div className={styles.creativeCity} />
      <div className={styles.creativeAngularFilter} />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-5xl font-bold text-white mb-4 font-elianto">
              Projects
            </h2>
            <p className="text-xl text-white/80 font-stellar">
              Showcasing my work and creative solutions
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div 
            className="flex flex-wrap gap-4 mb-8 justify-center"
            variants={filterVariants}
          >
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All Categories
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {categoryLabels[category as keyof typeof categoryLabels] || category}
                </Button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedStatus === 'all' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedStatus('all')}
              >
                All Status
              </Button>
              {statuses.map(status => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedStatus(status)}
                >
                  {statusLabels[status as keyof typeof statusLabels] || status}
                </Button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm font-stellar backdrop-blur-sm"
              >
                <option value="featured">Featured First</option>
                <option value="date">Latest First</option>
                <option value="title">Alphabetical</option>
              </select>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.slug.current}
                  className="relative group"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                  transition={{ duration: 0.3 }}
                >
                  {/* Project Card */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Project Image */}
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={getImageUrl(project.image)}
                        alt={project.image.alt || project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-white font-dual truncate">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`inline-block w-2 h-2 rounded-full ${
                            project.status === 'completed' ? 'bg-green-400' :
                            project.status === 'in-progress' ? 'bg-blue-400' :
                            project.status === 'on-hold' ? 'bg-yellow-400' :
                            'bg-red-400'
                          }`} />
                          <span className="text-white/60 text-xs font-stellar">
                            {statusLabels[project.status as keyof typeof statusLabels]}
                          </span>
                        </div>
                      </div>

                      <p className="text-white/80 text-sm mb-4 font-stellar line-clamp-3">
                        {project.description}
                      </p>

                      {/* Category & Date */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-white/10 text-white/80 px-2 py-1 rounded text-xs font-stellar">
                          {categoryLabels[project.category as keyof typeof categoryLabels]}
                        </span>
                        <span className="text-white/60 text-xs font-stellar">
                          {formatDate(project.startDate)}
                          {project.endDate && ` - ${formatDate(project.endDate)}`}
                        </span>
                      </div>

                      {/* Technologies */}
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="bg-gradient-to-r from-blue-400/20 to-purple-400/20 text-white/80 px-2 py-1 rounded text-xs font-stellar"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-white/60 text-xs font-stellar">
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Project Details */}
                      <div className="flex items-center justify-between text-xs text-white/60 mb-4">
                        {project.role && (
                          <span className="font-stellar">Role: {project.role}</span>
                        )}
                        {project.teamSize && (
                          <span className="font-stellar">Team: {project.teamSize}</span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {project.liveUrl && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => window.open(project.liveUrl, '_blank')}
                            className="flex-1"
                          >
                            Live Demo
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(project.githubUrl, '_blank')}
                            className="flex-1"
                          >
                            GitHub
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`/projects/${project.slug.current}`, '_blank')}
                          className="flex-1"
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Projects Message */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-12"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="text-white/60 text-lg font-stellar">
                No projects found matching your criteria.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory('all')
                  setSelectedStatus('all')
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
} 