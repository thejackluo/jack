'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useAnimations'
import { 
  slideUpVariants, 
  fadeInVariants, 
  staggerContainerVariants,
  createScrollAnimation
} from '@/lib/animations'

interface AnimatedSectionProps {
  children: React.ReactNode
  variant?: 'slideUp' | 'fadeIn' | 'stagger' | 'custom'
  customVariants?: any
  className?: string
  threshold?: number
  delay?: number
  offset?: number
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  variant = 'slideUp',
  customVariants,
  className = '',
  threshold = 0.1,
  delay = 0,
  offset = 50
}) => {
  const getVariants = () => {
    switch (variant) {
      case 'fadeIn':
        return fadeInVariants
      case 'stagger':
        return staggerContainerVariants
      case 'custom':
        return customVariants || slideUpVariants
      default:
        return createScrollAnimation(offset)
    }
  }

  const { ref, controls } = useScrollAnimation(getVariants(), threshold)

  return (
    <motion.section
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
    >
      {children}
    </motion.section>
  )
} 