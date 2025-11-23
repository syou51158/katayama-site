'use client';

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  loading = 'lazy',
  sizes = '100vw',
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Preload critical images
    if (priority && typeof window !== 'undefined') {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    }
  }, [src, priority])

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setError(true)
    setIsLoading(false)
    onError?.()
  }

  // Generate blur data URL for placeholder
  const generateBlurDataURL = (w: number, h: number) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return undefined as unknown as string
    }
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#f3f4f6'
      ctx.fillRect(0, 0, w, h)
    }
    return canvas.toDataURL()
  }

  // Fallback for missing images
  if (error) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <div className="text-gray-400 text-center p-4">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">画像を読み込めません</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        priority={priority}
        loading={loading}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL || (typeof window !== 'undefined' && width && height ? generateBlurDataURL(width, height) : undefined)}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
}

// Image optimization utility
export const imageUtils = {
  // Generate responsive image sizes
  generateSizes: (size: 'thumbnail' | 'small' | 'medium' | 'large' | 'hero') => {
    const sizes = {
      thumbnail: { width: 150, height: 150 },
      small: { width: 300, height: 200 },
      medium: { width: 600, height: 400 },
      large: { width: 800, height: 600 },
      hero: { width: 1200, height: 600 },
    }
    return sizes[size]
  },

  // Calculate aspect ratio
  getAspectRatio: (width: number, height: number) => {
    return (height / width) * 100
  },

  // Generate srcSet for responsive images
  generateSrcSet: (src: string, width: number) => {
    const multipliers = [1, 1.5, 2, 3]
    return multipliers
      .map(multiplier => `${src}?width=${Math.round(width * multiplier)} ${Math.round(width * multiplier)}w`)
      .join(', ')
  },

  // Optimize image for different devices
  getOptimizedImage: (src: string, options: { width?: number; height?: number; quality?: number } = {}) => {
    const params = new URLSearchParams()
    if (options.width) params.set('width', options.width.toString())
    if (options.height) params.set('height', options.height.toString())
    if (options.quality) params.set('quality', options.quality.toString())
    
    return `${src}?${params.toString()}`
  },
}

// Lazy loading hook
export function useLazyLoad(ref: React.RefObject<HTMLElement>, options?: IntersectionObserverInit) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true)
        observer.unobserve(entry.target)
      }
    }, options)

    observer.observe(ref.current)

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, options])

  return isIntersecting
}