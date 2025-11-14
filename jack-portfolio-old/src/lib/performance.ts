/**
 * Performance Optimization Utilities
 * Comprehensive tools for optimizing loading, images, and performance monitoring
 */

// Image optimization utilities
export interface ImageOptimizationOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'avif' | 'png' | 'jpg'
  priority?: boolean
  blur?: boolean
}

/**
 * Generate optimized image URLs with size and format options
 */
export function getOptimizedImageUrl(
  src: string, 
  options: ImageOptimizationOptions = {}
): string {
  if (!src || src.startsWith('data:')) return src
  
  const { width, height, quality = 85, format = 'webp' } = options
  
  // For Next.js Image component or external image optimization services
  const params = new URLSearchParams()
  
  if (width) params.set('w', width.toString())
  if (height) params.set('h', height.toString())
  if (quality !== 85) params.set('q', quality.toString())
  if (format !== 'webp') params.set('fm', format)
  
  const queryString = params.toString()
  return queryString ? `${src}?${queryString}` : src
}

/**
 * Generate responsive image srcSet for different screen sizes
 */
export function generateResponsiveSrcSet(
  src: string,
  sizes: number[] = [640, 768, 1024, 1280, 1536]
): string {
  return sizes
    .map(size => `${getOptimizedImageUrl(src, { width: size })} ${size}w`)
    .join(', ')
}

// Loading strategies
export type LoadingStrategy = 'lazy' | 'eager' | 'progressive'

/**
 * Get optimal loading strategy based on position and priority
 */
export function getLoadingStrategy(
  isAboveFold: boolean,
  isPriority: boolean = false
): LoadingStrategy {
  if (isPriority || isAboveFold) return 'eager'
  return 'lazy'
}

// Progressive loading utilities
export interface ProgressiveImageState {
  isLoading: boolean
  isLoaded: boolean
  hasError: boolean
  src: string
  placeholder?: string
}

/**
 * Create blur placeholder from image URL
 */
export function createBlurPlaceholder(src: string): string {
  return getOptimizedImageUrl(src, { 
    width: 20, 
    height: 20, 
    quality: 10, 
    blur: true 
  })
}

// Performance monitoring
export interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  interactionTime?: number
  errorCount: number
}

/**
 * Performance monitoring class for tracking component performance
 */
export class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetrics> = new Map()
  private observers: Map<string, PerformanceObserver> = new Map()

  /**
   * Start monitoring performance for a component
   */
  startMonitoring(componentName: string): void {
    if (typeof window === 'undefined') return

    const startTime = performance.now()
    
    // Track largest contentful paint for this component
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            this.updateMetric(componentName, {
              loadTime: entry.startTime - startTime,
              renderTime: performance.now() - startTime,
              errorCount: 0
            })
          }
        })
      })
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
      this.observers.set(componentName, observer)
    }
  }

  /**
   * Stop monitoring and cleanup observers
   */
  stopMonitoring(componentName: string): void {
    const observer = this.observers.get(componentName)
    if (observer) {
      observer.disconnect()
      this.observers.delete(componentName)
    }
  }

  /**
   * Update performance metrics for a component
   */
  updateMetric(componentName: string, metrics: Partial<PerformanceMetrics>): void {
    const existing = this.metrics.get(componentName) || {
      loadTime: 0,
      renderTime: 0,
      errorCount: 0
    }
    
    this.metrics.set(componentName, { ...existing, ...metrics })
  }

  /**
   * Get performance metrics for a component
   */
  getMetrics(componentName: string): PerformanceMetrics | undefined {
    return this.metrics.get(componentName)
  }

  /**
   * Get all performance metrics
   */
  getAllMetrics(): Record<string, PerformanceMetrics> {
    return Object.fromEntries(this.metrics)
  }

  /**
   * Log performance metrics to console (development only)
   */
  logMetrics(): void {
    if (process.env.NODE_ENV !== 'development') return
    
    console.group('🚀 Performance Metrics')
    this.metrics.forEach((metrics, componentName) => {
      console.log(`${componentName}:`, {
        'Load Time': `${metrics.loadTime.toFixed(2)}ms`,
        'Render Time': `${metrics.renderTime.toFixed(2)}ms`,
        'Errors': metrics.errorCount
      })
    })
    console.groupEnd()
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor()

// Code splitting utilities
export interface LazyComponentOptions {
  fallback?: React.ComponentType
  retryCount?: number
  timeout?: number
}

/**
 * Enhanced dynamic import with retry logic and timeout
 */
export async function dynamicImportWithRetry<T>(
  importFn: () => Promise<T>,
  options: LazyComponentOptions = {}
): Promise<T> {
  const { retryCount = 3, timeout = 10000 } = options
  
  for (let attempt = 0; attempt <= retryCount; attempt++) {
    try {
      // Add timeout to the import
      const importPromise = importFn()
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Import timeout')), timeout)
      })
      
      return await Promise.race([importPromise, timeoutPromise])
    } catch (error) {
      console.warn(`Import attempt ${attempt + 1} failed:`, error)
      
      if (attempt === retryCount) {
        throw error
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
    }
  }
  
  throw new Error('All import attempts failed')
}

// Bundle optimization utilities
export interface BundleInfo {
  size: number
  gzipSize?: number
  modules: string[]
  loadTime: number
}

/**
 * Analyze bundle performance (development only)
 */
export function analyzeBundlePerformance(): void {
  if (process.env.NODE_ENV !== 'development' || typeof window === 'undefined') return
  
  // Use Performance API to track resource loading
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
  
  const scripts = resources.filter(resource => 
    resource.name.includes('.js') || resource.name.includes('.mjs')
  )
  
  console.group('📦 Bundle Analysis')
  scripts.forEach(script => {
    const loadTime = script.responseEnd - script.requestStart
    const size = script.transferSize || 0
    
    console.log(`${script.name.split('/').pop()}:`, {
      'Load Time': `${loadTime.toFixed(2)}ms`,
      'Transfer Size': `${(size / 1024).toFixed(2)}KB`,
      'Cache Status': script.transferSize === 0 ? 'Cached' : 'Downloaded'
    })
  })
  console.groupEnd()
}

// Web Vitals monitoring
export interface WebVitalsMetrics {
  CLS: number | null // Cumulative Layout Shift
  FID: number | null // First Input Delay
  FCP: number | null // First Contentful Paint
  LCP: number | null // Largest Contentful Paint
  TTFB: number | null // Time to First Byte
}

/**
 * Monitor Core Web Vitals
 */
export function monitorWebVitals(callback?: (metrics: WebVitalsMetrics) => void): void {
  if (typeof window === 'undefined') return
  
  const metrics: WebVitalsMetrics = {
    CLS: null,
    FID: null,
    FCP: null,
    LCP: null,
    TTFB: null
  }
  
  // Monitor performance entries
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      switch (entry.entryType) {
        case 'paint':
          if (entry.name === 'first-contentful-paint') {
            metrics.FCP = entry.startTime
          }
          break
        case 'largest-contentful-paint':
          metrics.LCP = entry.startTime
          break
        case 'layout-shift':
          if (!(entry as any).hadRecentInput) {
            metrics.CLS = (metrics.CLS || 0) + (entry as any).value
          }
          break
        case 'first-input':
          metrics.FID = (entry as any).processingStart - entry.startTime
          break
        case 'navigation':
          metrics.TTFB = (entry as PerformanceNavigationTiming).responseStart
          break
      }
    })
    
    if (callback) {
      callback(metrics)
    }
  })
  
  observer.observe({
    entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift', 'first-input', 'navigation']
  })
}

// Performance optimization hooks and utilities for React components
export interface ComponentPerformanceOptions {
  enableMetrics?: boolean
  logMetrics?: boolean
  threshold?: number // ms
}

/**
 * Get performance optimization recommendations
 */
export function getPerformanceRecommendations(metrics: WebVitalsMetrics): string[] {
  const recommendations: string[] = []
  
  if (metrics.LCP && metrics.LCP > 2500) {
    recommendations.push('Optimize Largest Contentful Paint: Consider lazy loading, image optimization, or server-side rendering')
  }
  
  if (metrics.FID && metrics.FID > 100) {
    recommendations.push('Reduce First Input Delay: Break up long-running JavaScript tasks, use code splitting')
  }
  
  if (metrics.CLS && metrics.CLS > 0.1) {
    recommendations.push('Improve Cumulative Layout Shift: Set explicit dimensions for images and ads')
  }
  
  if (metrics.FCP && metrics.FCP > 1800) {
    recommendations.push('Optimize First Contentful Paint: Reduce server response time, optimize critical resources')
  }
  
  if (metrics.TTFB && metrics.TTFB > 800) {
    recommendations.push('Improve Time to First Byte: Optimize server performance, use CDN, enable compression')
  }
  
  return recommendations
} 