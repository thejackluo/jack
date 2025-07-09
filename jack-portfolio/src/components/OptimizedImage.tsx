'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'
import { 
  getOptimizedImageUrl, 
  generateResponsiveSrcSet, 
  getLoadingStrategy,
  createBlurPlaceholder,
  performanceMonitor,
  type ImageOptimizationOptions,
  type ProgressiveImageState
} from '@/lib/performance'

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'alt' | 'onError'> {
  src: string
  alt: string
  optimization?: ImageOptimizationOptions
  enableProgressiveLoading?: boolean
  enablePerformanceTracking?: boolean
  isAboveFold?: boolean
  fallbackSrc?: string
  onLoadComplete?: () => void
  onError?: (error: Error) => void
}

/**
 * High-performance image component with optimization features:
 * - Automatic format optimization (WebP/AVIF)
 * - Progressive loading with blur placeholder
 * - Responsive srcSet generation
 * - Performance monitoring
 * - Error handling with fallback
 * - Above-the-fold detection for loading strategy
 */
export function OptimizedImage({
  src,
  alt,
  optimization = {},
  enableProgressiveLoading = true,
  enablePerformanceTracking = false,
  isAboveFold = false,
  fallbackSrc,
  onLoadComplete,
  onError,
  className,
  ...props
}: OptimizedImageProps) {
  const [imageState, setImageState] = useState<ProgressiveImageState>({
    isLoading: true,
    isLoaded: false,
    hasError: false,
    src: src,
    placeholder: enableProgressiveLoading ? createBlurPlaceholder(src) : undefined
  })
  
  const imageRef = useRef<HTMLImageElement>(null)
  const loadStartTime = useRef<number>(0)
  const componentId = `OptimizedImage-${src.split('/').pop()}`

  // Generate optimized image URLs
  const optimizedSrc = getOptimizedImageUrl(src, optimization)
  const responsiveSrcSet = generateResponsiveSrcSet(src)
  const loadingStrategy = getLoadingStrategy(isAboveFold, optimization.priority)

  // Performance tracking
  useEffect(() => {
    if (enablePerformanceTracking) {
      performanceMonitor.startMonitoring(componentId)
      loadStartTime.current = performance.now()
    }

    return () => {
      if (enablePerformanceTracking) {
        performanceMonitor.stopMonitoring(componentId)
      }
    }
  }, [componentId, enablePerformanceTracking])

  // Handle image load success
  const handleLoad = useCallback(() => {
    const loadTime = performance.now() - loadStartTime.current

    setImageState(prev => ({
      ...prev,
      isLoading: false,
      isLoaded: true,
      hasError: false
    }))

    if (enablePerformanceTracking) {
      performanceMonitor.updateMetric(componentId, {
        loadTime,
        renderTime: loadTime,
        errorCount: 0
      })
    }

    onLoadComplete?.()
  }, [componentId, enablePerformanceTracking, onLoadComplete])

  // Handle image load error
  const handleError = useCallback((error: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const loadTime = performance.now() - loadStartTime.current

    setImageState(prev => ({
      ...prev,
      isLoading: false,
      isLoaded: false,
      hasError: true,
      src: fallbackSrc || prev.src
    }))

    if (enablePerformanceTracking) {
      performanceMonitor.updateMetric(componentId, {
        loadTime,
        renderTime: loadTime,
        errorCount: 1
      })
    }

    const imageError = new Error(`Failed to load image: ${src}`)
    onError?.(imageError)
  }, [componentId, enablePerformanceTracking, fallbackSrc, src, onError])

  // Handle loading start
  const handleLoadingStart = useCallback(() => {
    loadStartTime.current = performance.now()
    setImageState(prev => ({
      ...prev,
      isLoading: true,
      hasError: false
    }))
  }, [])

  // Progressive loading implementation
  if (enableProgressiveLoading && imageState.placeholder && imageState.isLoading) {
    return (
      <div className={`relative overflow-hidden ${className || ''}`}>
        {/* Blur placeholder */}
        <Image
          {...props}
          ref={imageRef}
          src={imageState.placeholder}
          alt={alt}
          className={`blur-sm transition-opacity duration-300 ${className || ''}`}
          loading="eager"
          onLoadingComplete={handleLoadingStart}
        />
        
        {/* Main image */}
        <Image
          {...props}
          src={optimizedSrc}
          alt={alt}
          className={`absolute inset-0 transition-opacity duration-500 ${
            imageState.isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className || ''}`}
          loading={loadingStrategy === 'lazy' ? 'lazy' : 'eager'}
          priority={optimization.priority}
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
    )
  }

  // Standard image implementation
  return (
    <Image
      {...props}
      ref={imageRef}
      src={imageState.hasError && fallbackSrc ? fallbackSrc : optimizedSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${
        imageState.isLoaded ? 'opacity-100' : 'opacity-70'
      } ${className || ''}`}
      loading={loadingStrategy === 'lazy' ? 'lazy' : 'eager'}
      priority={optimization.priority}
      onLoad={handleLoad}
      onError={handleError}
      onLoadingComplete={handleLoadingStart}
    />
  )
}

// Hook for managing multiple images performance
export function useImagePerformance(images: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set(images))

  const handleImageLoad = useCallback((src: string) => {
    setLoadedImages(prev => new Set(prev).add(src))
    setLoadingImages(prev => {
      const next = new Set(prev)
      next.delete(src)
      return next
    })
  }, [])

  const handleImageError = useCallback((src: string) => {
    setFailedImages(prev => new Set(prev).add(src))
    setLoadingImages(prev => {
      const next = new Set(prev)
      next.delete(src)
      return next
    })
  }, [])

  const allImagesLoaded = loadingImages.size === 0
  const loadProgress = ((images.length - loadingImages.size) / images.length) * 100

  return {
    loadedImages,
    failedImages,
    loadingImages,
    allImagesLoaded,
    loadProgress,
    handleImageLoad,
    handleImageError
  }
}

// Lazy loading image gallery component
export interface LazyImageGalleryProps {
  images: Array<{
    src: string
    alt: string
    width?: number
    height?: number
  }>
  className?: string
  onAllImagesLoaded?: () => void
}

export function LazyImageGallery({ 
  images, 
  className, 
  onAllImagesLoaded 
}: LazyImageGalleryProps) {
  const { 
    allImagesLoaded, 
    loadProgress, 
    handleImageLoad, 
    handleImageError 
  } = useImagePerformance(images.map(img => img.src))

  useEffect(() => {
    if (allImagesLoaded && onAllImagesLoaded) {
      onAllImagesLoaded()
    }
  }, [allImagesLoaded, onAllImagesLoaded])

  return (
    <div className={className}>
      {/* Loading progress indicator */}
      {!allImagesLoaded && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-blue-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Loading images... {Math.round(loadProgress)}%
          </p>
        </div>
      )}

      {/* Image grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <OptimizedImage
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={image.width || 400}
            height={image.height || 300}
            enableProgressiveLoading={true}
            enablePerformanceTracking={true}
            isAboveFold={index < 3} // First 3 images are above fold
            className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            onLoadComplete={() => handleImageLoad(image.src)}
            onError={() => handleImageError(image.src)}
          />
        ))}
      </div>
    </div>
  )
}

export default OptimizedImage 