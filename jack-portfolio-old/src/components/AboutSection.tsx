'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { urlFor } from '@/lib/sanity'
import type { SanitySiteSettings } from '@/lib/sanity'
import styles from '@/styles/about.module.css'
import Image from 'next/image';

interface Skill {
  name: string
  category: string
  proficiency: string
  proficiencyScore: number
  description?: string
  yearsOfExperience?: number
  icon?: any
  featured: boolean
}

interface Experience {
  title: string
  company: string
  location?: string
  type?: string
  startDate: string
  endDate?: string
  current: boolean
  description: any[]
  skills: string[]
  achievements: string[]
  companyUrl?: string
}

interface Education {
  degree: string
  field?: string
  institution: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  description?: string
  gpa?: string
  honors: string[]
  activities: string[]
  relevantCourses: string[]
  institutionUrl?: string
}

interface AboutSectionProps {
  siteSettings?: SanitySiteSettings | null
  skills?: Skill[]
  experience?: Experience[]
  education?: Education[]
  className?: string
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  siteSettings,
  skills = [],
  experience = [],
  education = [],
  className = ''
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const
      }
    }
  }

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    })
  }

  return (
    <section className={`${styles.aboutMain} ${className}`}>
      {/* Profile Section */}
      <div className={styles.aboutMainTop}>
        {/* Profile Image */}
        {siteSettings?.author?.profileImage && (
          <motion.div
            className={styles.lgCircle}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img
              src={urlFor(siteSettings.author.profileImage).url()}
              alt={siteSettings.author.profileImage.alt || siteSettings.author.name}
              className="object-cover"
            />
          </motion.div>
        )}

        {/* Social Media Links */}
        {siteSettings?.socialLinks && (
          <div className={styles.smSmList}>
            {siteSettings.socialLinks.github && (
              <motion.a
                href={siteSettings.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.smCircle} ${styles.glass}`}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image src="/assets/icons/sm/github.png" alt="GitHub" width={24} height={24} />
              </motion.a>
            )}
            {siteSettings.socialLinks.linkedin && (
              <motion.a
                href={siteSettings.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.smCircle} ${styles.glass}`}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image src="/assets/icons/sm/linkedin.png" alt="LinkedIn" width={24} height={24} />
              </motion.a>
            )}
            {siteSettings.socialLinks.twitter && (
              <motion.a
                href={siteSettings.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.smCircle} ${styles.glass}`}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image src="/assets/icons/sm/twitter.png" alt="Twitter" width={24} height={24} />
              </motion.a>
            )}
            {siteSettings.socialLinks.instagram && (
              <motion.a
                href={siteSettings.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.smCircle} ${styles.glass}`}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image src="/assets/icons/sm/instagram.png" alt="Instagram" width={24} height={24} />
              </motion.a>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className={styles.aboutMainTextBody}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Bio Section */}
          {siteSettings?.author?.bio && (
            <motion.div className={styles.aboutRow} variants={itemVariants}>
              <h2 className="text-3xl font-bold text-white mb-4 font-elianto">About Me</h2>
              <p className="text-white/80 text-lg leading-relaxed font-stellar">
                {siteSettings.author.bio}
              </p>
            </motion.div>
          )}

          {/* Skills Section */}
          {skills.length > 0 && (
            <motion.div className={styles.aboutRow} variants={itemVariants}>
              <h2 className="text-3xl font-bold text-white mb-6 font-elianto">Skills</h2>
              <div className="space-y-6">
                {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                  <div key={category} className="space-y-3">
                    <h3 className="text-xl font-semibold text-white/90 font-dual capitalize">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {categorySkills.map((skill) => (
                        <motion.div
                          key={skill.name}
                          className={`${styles.glass} p-4 rounded-lg`}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              {skill.icon && (
                                <img
                                  src={urlFor(skill.icon).url()}
                                  alt={skill.name}
                                  className="w-6 h-6"
                                />
                              )}
                              <span className="text-white font-medium font-stellar">
                                {skill.name}
                              </span>
                            </div>
                            <span className="text-white/60 text-sm font-dual">
                              {skill.proficiency}
                            </span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.proficiencyScore}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.2 }}
                            />
                          </div>
                          {skill.yearsOfExperience && (
                            <p className="text-white/60 text-sm mt-2 font-stellar">
                              {skill.yearsOfExperience} years experience
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Experience Section */}
          {experience.length > 0 && (
            <motion.div className={styles.aboutRow} variants={itemVariants}>
              <h2 className="text-3xl font-bold text-white mb-6 font-elianto">Experience</h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    className={`${styles.glass} p-6 rounded-lg`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white font-dual">
                          {exp.title}
                        </h3>
                        <p className="text-white/80 font-stellar">
                          {exp.companyUrl ? (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-blue-400 transition-colors"
                            >
                              {exp.company}
                            </a>
                          ) : (
                            exp.company
                          )}
                          {exp.location && ` • ${exp.location}`}
                        </p>
                      </div>
                      <div className="text-white/60 text-sm font-stellar">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : 'Present'}
                      </div>
                    </div>
                    
                    {exp.type && (
                      <div className="mb-4">
                        <span className="inline-block bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm font-stellar">
                          {exp.type}
                        </span>
                      </div>
                    )}

                    {exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-gradient-to-r from-blue-400/20 to-purple-400/20 text-white/80 px-2 py-1 rounded text-sm font-stellar"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {exp.achievements.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-white/90 font-medium font-dual">Key Achievements:</h4>
                        <ul className="space-y-1 text-white/80 font-stellar">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <motion.div className={styles.aboutRow} variants={itemVariants}>
              <h2 className="text-3xl font-bold text-white mb-6 font-elianto">Education</h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    className={`${styles.glass} p-6 rounded-lg`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white font-dual">
                          {edu.degree}
                          {edu.field && ` in ${edu.field}`}
                        </h3>
                        <p className="text-white/80 font-stellar">
                          {edu.institutionUrl ? (
                            <a
                              href={edu.institutionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-blue-400 transition-colors"
                            >
                              {edu.institution}
                            </a>
                          ) : (
                            edu.institution
                          )}
                          {edu.location && ` • ${edu.location}`}
                        </p>
                      </div>
                      <div className="text-white/60 text-sm font-stellar">
                        {formatDate(edu.startDate)} - {edu.current ? 'Present' : edu.endDate ? formatDate(edu.endDate) : 'Present'}
                      </div>
                    </div>

                    {edu.gpa && (
                      <div className="mb-4">
                        <span className="inline-block bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm font-stellar">
                          GPA: {edu.gpa}
                        </span>
                      </div>
                    )}

                    {edu.description && (
                      <p className="text-white/80 mb-4 font-stellar">
                        {edu.description}
                      </p>
                    )}

                    {edu.honors.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-white/90 font-medium font-dual mb-2">Honors & Awards:</h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.honors.map((honor) => (
                            <span
                              key={honor}
                              className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-white/80 px-2 py-1 rounded text-sm font-stellar"
                            >
                              {honor}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {edu.activities.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-white/90 font-medium font-dual mb-2">Activities & Clubs:</h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.activities.map((activity) => (
                            <span
                              key={activity}
                              className="bg-gradient-to-r from-green-400/20 to-blue-400/20 text-white/80 px-2 py-1 rounded text-sm font-stellar"
                            >
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {edu.relevantCourses.length > 0 && (
                      <div>
                        <h4 className="text-white/90 font-medium font-dual mb-2">Relevant Courses:</h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.relevantCourses.map((course) => (
                            <span
                              key={course}
                              className="bg-gradient-to-r from-purple-400/20 to-pink-400/20 text-white/80 px-2 py-1 rounded text-sm font-stellar"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
} 