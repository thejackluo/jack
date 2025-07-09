'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useScrollProgress } from '@/hooks/useAnimations'

interface ScrollProgressProps {
  className?: string
  height?: string
  color?: string
  position?: 'top' | 'bottom'
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  className = '',
  height = '4px',
  color = 'bg-gradient-to-r from-blue-500 to-purple-600',
  position = 'top'
}) => {
  const { scrollProgress } = useScrollProgress()

  const positionClasses = position === 'top' 
    ? 'fixed top-0 left-0 right-0 z-50'
    : 'fixed bottom-0 left-0 right-0 z-50'

  return (
    <div className={`${positionClasses} ${className}`}>
      <div className="w-full bg-gray-200/20" style={{ height }}>
        <motion.div
          className={`h-full ${color}`}
          initial={{ width: '0%' }}
          animate={{ width: `${scrollProgress * 100}%` }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// Circular scroll progress indicator
export const CircularScrollProgress: React.FC<{
  size?: number
  strokeWidth?: number
  className?: string
}> = ({
  size = 60,
  strokeWidth = 4,
  className = ''
}) => {
  const { scrollProgress } = useScrollProgress()
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (scrollProgress * circumference)

  return (
    <div className={`fixed bottom-8 right-8 z-50 ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          style={{
            strokeDasharray,
            strokeDashoffset
          }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-white text-sm font-medium"
          animate={{ opacity: scrollProgress > 0.1 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {Math.round(scrollProgress * 100)}%
        </motion.span>
      </div>
    </div>
  )
}

// Reading time indicator
export const ReadingTimeIndicator: React.FC<{
  wordsPerMinute?: number
  totalWords: number
  className?: string
}> = ({
  wordsPerMinute = 200,
  totalWords,
  className = ''
}) => {
  const { scrollProgress } = useScrollProgress()
  const totalMinutes = Math.ceil(totalWords / wordsPerMinute)
  const readMinutes = Math.floor(scrollProgress * totalMinutes)
  const remainingMinutes = totalMinutes - readMinutes

  return (
    <motion.div
      className={`fixed top-4 left-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: scrollProgress > 0.05 ? 1 : 0, y: scrollProgress > 0.05 ? 0 : -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-2">
        <span>📖</span>
        <span>{remainingMinutes}m left</span>
      </div>
    </motion.div>
  )
}

// Scroll direction indicator
export const ScrollDirectionIndicator: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isScrollingUp } = useScrollProgress()

  return (
    <motion.div
      className={`fixed bottom-4 left-4 z-50 ${className}`}
      animate={{
        opacity: isScrollingUp ? 1 : 0,
        y: isScrollingUp ? 0 : 20
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-full">
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ↑
        </motion.div>
      </div>
    </motion.div>
  )
} 