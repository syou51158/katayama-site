'use client';

import { useEffect, useState } from 'react'

export function AccessibilityProvider() {
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState('normal')
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    // Check for user preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    // Apply high contrast mode
    if (highContrast) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [highContrast])

  useEffect(() => {
    // Apply font size
    document.documentElement.classList.remove('text-sm', 'text-lg', 'text-xl')
    if (fontSize === 'small') {
      document.documentElement.classList.add('text-sm')
    } else if (fontSize === 'large') {
      document.documentElement.classList.add('text-lg')
    } else if (fontSize === 'extra-large') {
      document.documentElement.classList.add('text-xl')
    }
  }, [fontSize])

  useEffect(() => {
    // Apply reduced motion
    if (reducedMotion) {
      document.documentElement.classList.add('reduce-motion')
    } else {
      document.documentElement.classList.remove('reduce-motion')
    }
  }, [reducedMotion])

  // Keyboard navigation enhancement
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip link functionality
      if (e.key === 'Tab' && e.shiftKey) {
        const skipLink = document.getElementById('skip-link')
        if (skipLink && document.activeElement === document.body) {
          skipLink.focus()
          e.preventDefault()
        }
      }

      // Escape key to close modals/overlays
      if (e.key === 'Escape') {
        const modals = document.querySelectorAll('[role="dialog"]')
        modals.forEach(modal => {
          const closeButton = modal.querySelector('[aria-label="閉じる"]') as HTMLElement
          if (closeButton) closeButton.click()
        })
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return null
}

export function SkipToContent() {
  return (
    <a
      id="skip-link"
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#1D2E45] text-white px-4 py-2 rounded-lg z-50"
    >
      メインコンテンツへスキップ
    </a>
  )
}

export function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState('normal')

  useEffect(() => {
    const savedHighContrast = localStorage.getItem('highContrast') === 'true'
    const savedFontSize = localStorage.getItem('fontSize') || 'normal'
    
    setHighContrast(savedHighContrast)
    setFontSize(savedFontSize)
  }, [])

  const toggleHighContrast = () => {
    const newValue = !highContrast
    setHighContrast(newValue)
    localStorage.setItem('highContrast', String(newValue))
    
    if (newValue) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }

  const changeFontSize = (size: string) => {
    setFontSize(size)
    localStorage.setItem('fontSize', size)
    
    document.documentElement.classList.remove('text-sm', 'text-lg', 'text-xl')
    if (size === 'small') {
      document.documentElement.classList.add('text-sm')
    } else if (size === 'large') {
      document.documentElement.classList.add('text-lg')
    } else if (size === 'extra-large') {
      document.documentElement.classList.add('text-xl')
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#1D2E45] text-white p-3 rounded-full shadow-lg hover:bg-[#2A3E5A] transition-colors"
        aria-label="アクセシビリティ設定"
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-64 border">
          <h3 className="font-semibold text-gray-800 mb-4">アクセシビリティ設定</h3>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={toggleHighContrast}
                  className="rounded border-gray-300 text-[#B79B6B] focus:ring-[#B79B6B]"
                />
                <span className="text-sm text-gray-700">ハイコントラスト</span>
              </label>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">文字サイズ</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => changeFontSize('small')}
                  className={`px-3 py-2 text-sm rounded border ${
                    fontSize === 'small'
                      ? 'bg-[#B79B6B] text-white border-[#B79B6B]'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  小
                </button>
                <button
                  onClick={() => changeFontSize('normal')}
                  className={`px-3 py-2 text-sm rounded border ${
                    fontSize === 'normal'
                      ? 'bg-[#B79B6B] text-white border-[#B79B6B]'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  標準
                </button>
                <button
                  onClick={() => changeFontSize('large')}
                  className={`px-3 py-2 text-sm rounded border ${
                    fontSize === 'large'
                      ? 'bg-[#B79B6B] text-white border-[#B79B6B]'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  大
                </button>
                <button
                  onClick={() => changeFontSize('extra-large')}
                  className={`px-3 py-2 text-sm rounded border ${
                    fontSize === 'extra-large'
                      ? 'bg-[#B79B6B] text-white border-[#B79B6B]'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  特大
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
          >
            閉じる
          </button>
        </div>
      )}
    </div>
  )
}