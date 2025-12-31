interface LoadingStateProps {
  message?: string
  skeleton?: React.ReactNode
  className?: string
}

export function LoadingState({
  message = 'Loading...',
  skeleton,
  className = '',
}: LoadingStateProps) {
  if (skeleton) {
    return <div className={className}>{skeleton}</div>
  }

  return (
    <div className={`flex flex-col items-center justify-center p-12 ${className}`}>
      <div className="flex items-center gap-3">
        <svg
          className="animate-spin h-6 w-6 text-accent-600"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <p className="text-sm text-muted">{message}</p>
      </div>
    </div>
  )
}

