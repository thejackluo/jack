'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import styles from '@/styles/commandPalette.module.css'

export interface Command {
  id: string
  title: string
  description?: string
  icon?: string
  category: 'navigation' | 'projects' | 'blogs' | 'social' | 'toys' | 'actions'
  action: () => void
  keywords?: string[]
}

interface CommandPaletteProps {
  commands: Command[]
  isOpen: boolean
  onClose: () => void
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  commands,
  isOpen,
  onClose,
}) => {
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  // Filter commands based on search
  const filteredCommands = useMemo(() => {
    if (!search) return commands

    const searchLower = search.toLowerCase()
    return commands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(searchLower) ||
        cmd.description?.toLowerCase().includes(searchLower) ||
        cmd.keywords?.some((keyword) => keyword.toLowerCase().includes(searchLower)) ||
        cmd.category.toLowerCase().includes(searchLower)
    )
  }, [commands, search])

  // Group commands by category
  const groupedCommands = useMemo(() => {
    const groups: Record<string, Command[]> = {
      navigation: [],
      projects: [],
      blogs: [],
      toys: [],
      social: [],
      actions: [],
    }

    filteredCommands.forEach((cmd) => {
      groups[cmd.category].push(cmd)
    })

    return groups
  }, [filteredCommands])

  // Reset search and selected index when opening
  useEffect(() => {
    if (isOpen) {
      setSearch('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action()
          onClose()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredCommands, selectedIndex, onClose])

  // Reset selected index when filtered commands change
  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  const renderCommandGroup = (category: string, commands: Command[]) => {
    if (commands.length === 0) return null

    const categoryLabels: Record<string, string> = {
      navigation: 'Navigation',
      projects: 'Projects',
      blogs: 'Blog Posts',
      toys: 'Toy Projects',
      social: 'Social Media',
      actions: 'Actions',
    }

    return (
      <div key={category} className={styles.commandGroup}>
        <div className={styles.groupLabel}>{categoryLabels[category]}</div>
        {commands.map((cmd, index) => {
          const globalIndex = filteredCommands.indexOf(cmd)
          const isSelected = globalIndex === selectedIndex

          return (
            <motion.div
              key={cmd.id}
              className={`${styles.commandItem} ${isSelected ? styles.selected : ''}`}
              onClick={() => {
                cmd.action()
                onClose()
              }}
              onMouseEnter={() => setSelectedIndex(globalIndex)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {cmd.icon && (
                <div className={styles.commandIcon}>
                  <Image src={cmd.icon} alt="" width={20} height={20} />
                </div>
              )}
              <div className={styles.commandContent}>
                <div className={styles.commandTitle}>{cmd.title}</div>
                {cmd.description && (
                  <div className={styles.commandDescription}>{cmd.description}</div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    )
  }

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

          {/* Command Palette */}
          <motion.div
            className={styles.palette}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Search Input */}
            <div className={styles.searchContainer}>
              <div className={styles.searchIcon}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
                autoFocus
              />
              <div className={styles.searchHint}>
                <kbd>ESC</kbd> to close
              </div>
            </div>

            {/* Commands List */}
            <div className={styles.commandsList}>
              {filteredCommands.length === 0 ? (
                <div className={styles.noResults}>
                  No results found for "{search}"
                </div>
              ) : (
                <>
                  {renderCommandGroup('navigation', groupedCommands.navigation)}
                  {renderCommandGroup('projects', groupedCommands.projects)}
                  {renderCommandGroup('blogs', groupedCommands.blogs)}
                  {renderCommandGroup('toys', groupedCommands.toys)}
                  {renderCommandGroup('social', groupedCommands.social)}
                  {renderCommandGroup('actions', groupedCommands.actions)}
                </>
              )}
            </div>

            {/* Footer */}
            <div className={styles.footer}>
              <div className={styles.footerHints}>
                <span>
                  <kbd>↑</kbd> <kbd>↓</kbd> to navigate
                </span>
                <span>
                  <kbd>↵</kbd> to select
                </span>
                <span>
                  <kbd>ESC</kbd> to close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
