import { NextWebVitalsMetric } from 'next/app'

// Core Web Vitals tracking
export function reportWebVitals(metric: NextWebVitalsMetric) {
  // Send to analytics (Google Analytics, Plausible, etc.)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category:
        metric.label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value), // values must be integers
      event_label: metric.id, // id unique to current page load
      non_interaction: true, // avoids affecting bounce rate
    })
  }

  // Console logging for development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}: ${metric.value}`)
  }

  // Send to custom analytics endpoint
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metric: metric.name,
        value: metric.value,
        id: metric.id,
        label: metric.label,
        timestamp: new Date().toISOString(),
      }),
    }).catch(console.error)
  }
}

// Performance monitoring utilities
const performanceUtils = {
  // Measure page load time
  measurePageLoad: () => {
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigation) {
        return {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          totalLoadTime: navigation.loadEventEnd - navigation.fetchStart,
        }
      }
    }
    return null
  },

  // Measure resource loading
  measureResources: () => {
    if (typeof window !== 'undefined' && window.performance) {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
      return resources.map((resource) => ({
        name: resource.name,
        duration: resource.duration,
        size: resource.transferSize,
        type: resource.initiatorType,
      }))
    }
    return []
  },

  // Check if Core Web Vitals are within good thresholds
  checkWebVitalsHealth: (metrics: Record<string, number>) => {
    const thresholds = {
      LCP: 2500, // Largest Contentful Paint (good: <2.5s)
      FID: 100,  // First Input Delay (good: <100ms)
      CLS: 0.1,  // Cumulative Layout Shift (good: <0.1)
      TTFB: 800, // Time to First Byte (good: <800ms)
      FCP: 1800, // First Contentful Paint (good: <1.8s)
    }

    const health: Record<string, 'good' | 'needs-improvement' | 'poor'> = {}
    
    Object.entries(metrics).forEach(([metric, value]) => {
      const threshold = thresholds[metric as keyof typeof thresholds]
      if (threshold) {
        if (metric === 'CLS') {
          health[metric] = value < 0.1 ? 'good' : value < 0.25 ? 'needs-improvement' : 'poor'
        } else {
          health[metric] = value < threshold ? 'good' : value < threshold * 1.5 ? 'needs-improvement' : 'poor'
        }
      }
    })

    return health
  },

  // Get performance recommendations
  getRecommendations: (metrics: Record<string, number>) => {
    const recommendations: string[] = []
    const health = performanceUtils.checkWebVitalsHealth(metrics)

    Object.entries(health).forEach(([metric, status]) => {
      if (status === 'poor') {
        switch (metric) {
          case 'LCP':
            recommendations.push('Largest Contentful Paint (LCP) が悪いです。画像の最適化、Critical CSS、サーバーレスポンスの改善を検討してください。')
            break
          case 'FID':
            recommendations.push('First Input Delay (FID) が悪いです。JavaScriptの分割、長いタスクの最適化、サードパーティスクリプトの見直しを検討してください。')
            break
          case 'CLS':
            recommendations.push('Cumulative Layout Shift (CLS) が悪いです。画像のサイズ指定、フォントの読み込み、動的コンテンツの配置を最適化してください。')
            break
          case 'TTFB':
            recommendations.push('Time to First Byte (TTFB) が悪いです。サーバーのパフォーマンス、CDNの使用、キャッシュ戦略の見直しを検討してください。')
            break
          case 'FCP':
            recommendations.push('First Contentful Paint (FCP) が悪いです。HTMLの構造、CSSの最適化、フォントの読み込み方法を見直してください。')
            break
        }
      }
    })

    return recommendations
  },
}

// TypeScript declarations for global objects
declare global {
  interface Window {
    gtag: any
  }
}

// Export performance utilities
export { performanceUtils };