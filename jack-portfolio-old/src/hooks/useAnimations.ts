'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useAnimation, useInView } from 'framer-motion'
import { Variants } from 'framer-motion'
import { getAnimationVariants } from '@/lib/animations'

// MARK: - Reduced Motion Detection
export const usePrefersReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

// MARK: - Scroll Animation Hook
export const useScrollAnimation = (variants: Variants, threshold: number = 0.1) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { 
    amount: threshold,
    once: true,
    margin: "0px 0px -100px 0px"
  })
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (inView) {
      const animationVariants = getAnimationVariants(prefersReducedMotion, variants)
      controls.start('visible')
    }
  }, [inView, controls, variants, prefersReducedMotion])

  return { ref, controls, inView }
}

// MARK: - Advanced Scroll Hook with Progress
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(currentScrollY / scrollHeight, 1)
      
      setScrollProgress(progress)
      setIsScrollingUp(currentScrollY < lastScrollY)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return { scrollProgress, isScrollingUp, scrollY: lastScrollY }
}

// MARK: - Intersection Observer Hook
export const useIntersectionObserver = (
  threshold: number = 0.1,
  rootMargin: string = '0px'
) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        if (entry.isIntersecting && !hasBeenVisible) {
          setHasBeenVisible(true)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.unobserve(element)
  }, [threshold, rootMargin, hasBeenVisible])

  return { ref, isVisible, hasBeenVisible }
}

// MARK: - Parallax Hook
export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const scrollY = window.scrollY
      const rate = scrollY * -speed
      setOffset(rate)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return { ref, offset }
}

// MARK: - Mouse Tracking Hook
export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return mousePosition
}

// MARK: - Element Hover Hook
export const useHover = () => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLElement>(null)

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseEnter, handleMouseLeave])

  return { ref, isHovered }
}

// MARK: - Staggered Animation Hook
export const useStaggeredAnimation = (
  items: any[],
  variants: Variants,
  staggerDelay: number = 0.1
) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (inView) {
      const animationVariants = getAnimationVariants(prefersReducedMotion, variants)
      items.forEach((_, index) => {
        controls.start('visible', { delay: index * staggerDelay })
      })
    }
  }, [inView, controls, items, staggerDelay, variants, prefersReducedMotion])

  return { ref, controls }
}

// MARK: - Animation Performance Hook
export const useAnimationPerformance = () => {
  const [isHighPerformance, setIsHighPerformance] = useState(true)
  const [frameRate, setFrameRate] = useState(60)

  useEffect(() => {
    let frames = 0
    let startTime = performance.now()

    const measurePerformance = () => {
      frames++
      const currentTime = performance.now()
      
      if (currentTime - startTime >= 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - startTime))
        setFrameRate(fps)
        setIsHighPerformance(fps >= 30)
        
        frames = 0
        startTime = currentTime
      }
      
      requestAnimationFrame(measurePerformance)
    }

    const rafId = requestAnimationFrame(measurePerformance)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return { isHighPerformance, frameRate }
}

// MARK: - Viewport Size Hook
export const useViewportSize = () => {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

// MARK: - Page Transition Hook
export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  const startTransition = useCallback(() => {
    if (!prefersReducedMotion) {
      setIsTransitioning(true)
    }
  }, [prefersReducedMotion])

  const endTransition = useCallback(() => {
    setIsTransitioning(false)
  }, [])

  return { isTransitioning, startTransition, endTransition, prefersReducedMotion }
}

// MARK: - Custom Animation Hook
export const useCustomAnimation = (
  variants: Variants,
  dependencies: any[] = []
) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (inView) {
      const animationVariants = getAnimationVariants(prefersReducedMotion, variants)
      controls.start('visible')
    }
  }, [inView, controls, prefersReducedMotion, ...dependencies])

  const replay = useCallback(() => {
    controls.start('hidden').then(() => {
      controls.start('visible')
    })
  }, [controls])

  return { ref, controls, replay, inView }
}

// MARK: - Text Animation Hook
export const useTextAnimation = (text: string, delay: number = 50) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  const startAnimation = useCallback(() => {
    if (prefersReducedMotion) {
      setDisplayedText(text)
      return
    }

    setIsAnimating(true)
    let currentIndex = 0
    
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsAnimating(false)
        clearInterval(interval)
      }
    }, delay)

    return () => clearInterval(interval)
  }, [text, delay, prefersReducedMotion])

  const resetAnimation = useCallback(() => {
    setDisplayedText('')
    setIsAnimating(false)
  }, [])

  return { displayedText, startAnimation, resetAnimation, isAnimating }
} 