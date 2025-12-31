interface ErrorMessageProps {
  title?: string
  message: string
  details?: string
  onRetry?: () => void
  className?: string
}

export function ErrorMessage({
  title = 'Something went wrong',
  message,
  details,
  onRetry,
  className = '',
}: ErrorMessageProps) {
  return (
    <div
      className={`bg-surface border border-border rounded p-4 sm:p-6 animate-fade-in ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 sm:h-6 sm:w-6 text-accent-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted mb-2">{message}</p>
          {details && (
            <p className="text-xs text-subtle mb-3">{details}</p>
          )}
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              aria-label="Retry loading promises"
              className="text-sm font-medium text-accent-600 hover:text-accent-700 active:text-accent-800 focus:outline-none focus:ring-1 focus:ring-accent-500 focus:ring-offset-1 rounded px-4 py-2.5 transition-colors duration-200 ease-out motion-reduce:transition-none touch-manipulation"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

