/**
 * Responsive Design Utilities
 * Tools for managing responsive behavior, device detection, and viewport handling
 */

// Breakpoint definitions (matches Tailwind CSS defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type Breakpoint = keyof typeof BREAKPOINTS

// Device type detection
export type DeviceType = 'mobile' | 'tablet' | 'desktop'

/**
 * Detect device type based on viewport width
 */
export function getDeviceType(width: number): DeviceType {
  if (width < BREAKPOINTS.md) return 'mobile'
  if (width < BREAKPOINTS.lg) return 'tablet'
  return 'desktop'
}

/**
 * Check if current viewport matches a breakpoint condition
 */
export function matchesBreakpoint(
  width: number, 
  breakpoint: Breakpoint, 
  condition: 'min' | 'max' = 'min'
): boolean {
  const breakpointValue = BREAKPOINTS[breakpoint]
  return condition === 'min' ? width >= breakpointValue : width < breakpointValue
}

// Responsive value utilities
export interface ResponsiveValue<T> {
  base: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}

/**
 * Get responsive value based on current viewport width
 */
export function getResponsiveValue<T>(
  responsiveValue: ResponsiveValue<T>,
  width: number
): T {
  // Check from largest to smallest breakpoint
  const breakpoints: Breakpoint[] = ['2xl', 'xl', 'lg', 'md', 'sm']
  
  for (const bp of breakpoints) {
    if (responsiveValue[bp] !== undefined && width >= BREAKPOINTS[bp]) {
      return responsiveValue[bp] as T
    }
  }
  
  return responsiveValue.base
}

/**
 * Generate responsive CSS classes based on breakpoints
 */
export function generateResponsiveClasses(
  baseClass: string,
  responsiveValues: Partial<Record<Breakpoint | 'base', string>>
): string {
  const classes: string[] = []
  
  // Add base class
  if (responsiveValues.base) {
    classes.push(`${baseClass}-${responsiveValues.base}`)
  }
  
  // Add responsive classes
  Object.entries(responsiveValues).forEach(([breakpoint, value]) => {
    if (breakpoint !== 'base' && value) {
      classes.push(`${breakpoint}:${baseClass}-${value}`)
    }
  })
  
  return classes.join(' ')
}

// Touch and gesture utilities
export interface TouchGestureOptions {
  threshold?: number
  timeout?: number
  passive?: boolean
}

export interface SwipeDirection {
  direction: 'left' | 'right' | 'up' | 'down'
  distance: number
  duration: number
}

/**
 * Detect swipe gestures on touch devices
 */
export function detectSwipe(
  element: HTMLElement,
  onSwipe: (direction: SwipeDirection) => void,
  options: TouchGestureOptions = {}
): () => void {
  const { threshold = 50, timeout = 500, passive = true } = options
  
  let startX = 0
  let startY = 0
  let startTime = 0
  
  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    startX = touch.clientX
    startY = touch.clientY
    startTime = Date.now()
  }
  
  const handleTouchEnd = (e: TouchEvent) => {
    const touch = e.changedTouches[0]
    const endX = touch.clientX
    const endY = touch.clientY
    const endTime = Date.now()
    
    const deltaX = endX - startX
    const deltaY = endY - startY
    const duration = endTime - startTime
    
    if (duration > timeout) return
    
    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)
    
    if (Math.max(absX, absY) < threshold) return
    
    if (absX > absY) {
      // Horizontal swipe
      onSwipe({
        direction: deltaX > 0 ? 'right' : 'left',
        distance: absX,
        duration
      })
    } else {
      // Vertical swipe
      onSwipe({
        direction: deltaY > 0 ? 'down' : 'up',
        distance: absY,
        duration
      })
    }
  }
  
  element.addEventListener('touchstart', handleTouchStart, { passive })
  element.addEventListener('touchend', handleTouchEnd, { passive })
  
  return () => {
    element.removeEventListener('touchstart', handleTouchStart)
    element.removeEventListener('touchend', handleTouchEnd)
  }
}

// Responsive image sizing
export interface ResponsiveImageSizes {
  mobile: { width: number; height: number }
  tablet: { width: number; height: number }
  desktop: { width: number; height: number }
}

/**
 * Get optimal image dimensions for current device
 */
export function getResponsiveImageSize(
  sizes: ResponsiveImageSizes,
  deviceType: DeviceType
): { width: number; height: number } {
  return sizes[deviceType]
}

/**
 * Generate sizes attribute for responsive images
 */
export function generateImageSizes(
  sizes: Partial<Record<Breakpoint, string>>
): string {
  const sizeEntries = Object.entries(sizes)
    .filter(([_, value]) => value)
    .map(([breakpoint, value]) => {
      if (breakpoint === 'base') return value
      return `(min-width: ${BREAKPOINTS[breakpoint as Breakpoint]}px) ${value}`
    })
  
  return sizeEntries.reverse().join(', ')
}

// Viewport utilities
export interface ViewportInfo {
  width: number
  height: number
  deviceType: DeviceType
  orientation: 'portrait' | 'landscape'
  pixelRatio: number
}

/**
 * Get comprehensive viewport information
 */
export function getViewportInfo(): ViewportInfo {
  if (typeof window === 'undefined') {
    return {
      width: 1024,
      height: 768,
      deviceType: 'desktop',
      orientation: 'landscape',
      pixelRatio: 1
    }
  }
  
  const width = window.innerWidth
  const height = window.innerHeight
  
  return {
    width,
    height,
    deviceType: getDeviceType(width),
    orientation: width > height ? 'landscape' : 'portrait',
    pixelRatio: window.devicePixelRatio || 1
  }
}

// Accessibility utilities for responsive design
export interface A11yResponsiveOptions {
  reducedMotion?: boolean
  highContrast?: boolean
  largeFonts?: boolean
}

/**
 * Detect accessibility preferences
 */
export function getA11yPreferences(): A11yResponsiveOptions {
  if (typeof window === 'undefined') {
    return {
      reducedMotion: false,
      highContrast: false,
      largeFonts: false
    }
  }
  
  return {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    highContrast: window.matchMedia('(prefers-contrast: high)').matches,
    largeFonts: window.matchMedia('(prefers-reduced-data: reduce)').matches
  }
}

// Layout optimization utilities
export interface ResponsiveLayoutConfig {
  columns: ResponsiveValue<number>
  gap: ResponsiveValue<string>
  padding: ResponsiveValue<string>
}

/**
 * Generate responsive grid configuration
 */
export function generateResponsiveGrid(
  config: ResponsiveLayoutConfig,
  width: number
): {
  columns: number
  gap: string
  padding: string
} {
  return {
    columns: getResponsiveValue(config.columns, width),
    gap: getResponsiveValue(config.gap, width),
    padding: getResponsiveValue(config.padding, width)
  }
}

// Performance considerations for responsive design
export interface ResponsivePerformanceOptions {
  lazyLoadThreshold?: ResponsiveValue<number>
  imageQuality?: ResponsiveValue<number>
  animationDuration?: ResponsiveValue<number>
}

/**
 * Get performance-optimized settings for current device
 */
export function getResponsivePerformanceSettings(
  options: ResponsivePerformanceOptions,
  deviceType: DeviceType
): {
  lazyLoadThreshold: number
  imageQuality: number
  animationDuration: number
} {
  const width = getViewportInfo().width
  
  const defaults: ResponsivePerformanceOptions = {
    lazyLoadThreshold: { base: 100, md: 200, lg: 300 },
    imageQuality: { base: 75, md: 85, lg: 90 },
    animationDuration: { base: 150, md: 200, lg: 300 }
  }
  
  const merged = { ...defaults, ...options }
  
  return {
    lazyLoadThreshold: getResponsiveValue(merged.lazyLoadThreshold!, width),
    imageQuality: getResponsiveValue(merged.imageQuality!, width),
    animationDuration: getResponsiveValue(merged.animationDuration!, width)
  }
}

// Responsive typography utilities
export interface ResponsiveTypography {
  fontSize: ResponsiveValue<string>
  lineHeight: ResponsiveValue<string>
  letterSpacing?: ResponsiveValue<string>
}

/**
 * Generate responsive typography classes
 */
export function generateResponsiveTypography(
  config: ResponsiveTypography
): string {
  const classes: string[] = []
  
  // Font size
  const fontSizeClasses = generateResponsiveClasses('text', {
    base: config.fontSize.base,
    sm: config.fontSize.sm,
    md: config.fontSize.md,
    lg: config.fontSize.lg,
    xl: config.fontSize.xl,
    '2xl': config.fontSize['2xl']
  })
  
  // Line height
  const lineHeightClasses = generateResponsiveClasses('leading', {
    base: config.lineHeight.base,
    sm: config.lineHeight.sm,
    md: config.lineHeight.md,
    lg: config.lineHeight.lg,
    xl: config.lineHeight.xl,
    '2xl': config.lineHeight['2xl']
  })
  
  classes.push(fontSizeClasses, lineHeightClasses)
  
  // Letter spacing (optional)
  if (config.letterSpacing) {
    const letterSpacingClasses = generateResponsiveClasses('tracking', {
      base: config.letterSpacing.base,
      sm: config.letterSpacing.sm,
      md: config.letterSpacing.md,
      lg: config.letterSpacing.lg,
      xl: config.letterSpacing.xl,
      '2xl': config.letterSpacing['2xl']
    })
    classes.push(letterSpacingClasses)
  }
  
  return classes.filter(Boolean).join(' ')
} 