import { Variants, Transition } from 'framer-motion'

// MARK: - Animation Variants
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.02,
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

export const slideUpVariants: Variants = {
  hidden: {
    y: 100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export const staggerContainerVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

export const staggerItemVariants: Variants = {
  hidden: {
    y: 50,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

export const scaleInVariants: Variants = {
  hidden: {
    scale: 0.8,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

export const slideInFromLeftVariants: Variants = {
  hidden: {
    x: -100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

export const slideInFromRightVariants: Variants = {
  hidden: {
    x: 100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

// MARK: - Advanced Animations
export const morphVariants: Variants = {
  initial: {
    borderRadius: "20px",
    scale: 1
  },
  hover: {
    borderRadius: "40px",
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
}

export const pulseVariants: Variants = {
  initial: {
    scale: 1,
    opacity: 1
  },
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const bounceVariants: Variants = {
  initial: {
    y: 0
  },
  bounce: {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const rotateVariants: Variants = {
  initial: {
    rotate: 0
  },
  spin: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  },
  wiggle: {
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
}

// MARK: - Scroll Animations
export const scrollFadeInVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

export const parallaxVariants: Variants = {
  initial: {
    y: 0
  },
  animate: {
    y: -50,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  }
}

// MARK: - Transition Presets
export const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 1
}

export const smoothTransition: Transition = {
  duration: 0.6,
  ease: [0.6, -0.05, 0.01, 0.99]
}

export const quickTransition: Transition = {
  duration: 0.3,
  ease: "easeOut"
}

export const slowTransition: Transition = {
  duration: 1.2,
  ease: [0.6, -0.05, 0.01, 0.99]
}

// MARK: - Interactive Animations
export const buttonHoverVariants: Variants = {
  initial: {
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)"
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
    transition: {
      duration: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
}

export const cardHoverVariants: Variants = {
  initial: {
    y: 0,
    rotateX: 0,
    rotateY: 0,
    boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
  },
  hover: {
    y: -10,
    rotateX: 5,
    rotateY: 5,
    boxShadow: "0px 20px 40px rgba(0,0,0,0.2)",
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

export const imageHoverVariants: Variants = {
  initial: {
    scale: 1,
    filter: "brightness(1) saturate(1)"
  },
  hover: {
    scale: 1.1,
    filter: "brightness(1.1) saturate(1.2)",
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

// MARK: - Text Animations
export const typewriterVariants: Variants = {
  hidden: {
    width: 0
  },
  visible: {
    width: "100%",
    transition: {
      duration: 2,
      ease: "easeInOut"
    }
  }
}

export const letterRevealVariants: Variants = {
  hidden: {
    y: 50,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

// MARK: - Loading Animations
export const skeletonVariants: Variants = {
  initial: {
    opacity: 0.6
  },
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const spinnerVariants: Variants = {
  initial: {
    rotate: 0
  },
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

// MARK: - Utility Functions
export const createStaggerContainer = (staggerDelay: number = 0.1): Variants => ({
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.2
    }
  }
})

export const createFadeInUp = (delay: number = 0, duration: number = 0.6): Variants => ({
  hidden: {
    y: 30,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay,
      duration,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
})

export const createScaleIn = (delay: number = 0, scale: number = 0.8): Variants => ({
  hidden: {
    scale,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay,
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
})

// MARK: - Advanced Scroll Animations
export const createScrollAnimation = (offset: number = 50): Variants => ({
  hidden: {
    y: offset,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
})

// MARK: - Performance Optimized Animations
export const reducedMotionVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  }
}

export const getAnimationVariants = (prefersReducedMotion: boolean, normalVariants: Variants): Variants => {
  return prefersReducedMotion ? reducedMotionVariants : normalVariants
} 