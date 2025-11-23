import { cn } from "@/lib/utils"

// Skeleton loader component
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
      {...props}
    />
  )
}

// Card skeleton
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  )
}

// Hero section skeleton
export function HeroSkeleton() {
  return (
    <div className="relative bg-gradient-to-r from-[#1D2E45] to-[#2A3E5A] text-white">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Skeleton className="h-12 w-3/4 mx-auto bg-white/20" />
          <Skeleton className="h-6 w-full mx-auto bg-white/10" />
          <Skeleton className="h-6 w-5/6 mx-auto bg-white/10" />
          <div className="flex justify-center space-x-4 pt-4">
            <Skeleton className="h-12 w-32 bg-white/20" />
            <Skeleton className="h-12 w-32 bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Grid skeleton
export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

// List skeleton
export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6 flex space-x-4">
          <Skeleton className="h-16 w-16 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Form skeleton
export function FormSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="space-y-4">
        <div>
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
      <Skeleton className="h-12 w-32" />
    </div>
  )
}

// Table skeleton
export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {Array.from({ length: cols }).map((_, i) => (
                <th key={i} className="px-6 py-3 text-left">
                  <Skeleton className="h-4 w-20" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i}>
                {Array.from({ length: cols }).map((_, j) => (
                  <td key={j} className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Loading spinner
export function LoadingSpinner({ size = 'medium', className }: { size?: 'small' | 'medium' | 'large'; className?: string }) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  }

  return (
    <div className={cn('flex justify-center items-center', className)}>
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-[#B79B6B]`} />
    </div>
  )
}

// Loading dots
export function LoadingDots({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
  const sizeClasses = {
    small: 'w-2 h-2',
    medium: 'w-3 h-3',
    large: 'w-4 h-4',
  }

  return (
    <div className="flex justify-center items-center space-x-1">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className={`${sizeClasses[size]} bg-[#B79B6B] rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  )
}

// Progress bar
export function ProgressBar({ progress, className }: { progress: number; className?: string }) {
  return (
    <div className={cn('w-full bg-gray-200 rounded-full h-2', className)}>
      <div
        className="bg-[#B79B6B] h-2 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
      />
    </div>
  )
}

// Full page loading
export function FullPageLoading({ message = '読み込み中...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center space-y-4">
        <LoadingSpinner size="large" />
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  )
}

// Section loading
export function SectionLoading({ message = '読み込み中...' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center space-y-4">
        <LoadingSpinner size="medium" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}