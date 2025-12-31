interface EmptyStateProps {
  title?: string
  message?: string
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
}

export function EmptyState({
  title = 'No promises yet',
  message = 'There are no visible promises at the moment. Check back later or submit a new promise.',
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  const defaultIcon = (
    <svg
      className="h-12 w-12 sm:h-16 sm:w-16 text-subtle"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  )

  return (
    <div className="bg-surface border border-border rounded p-8 sm:p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center">
          {icon || defaultIcon}
        </div>
        <h3 className="mt-4 sm:mt-6 text-lg sm:text-xl font-semibold text-foreground">{title}</h3>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted max-w-sm mx-auto">{message}</p>
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            aria-label={actionLabel}
            className="mt-6 px-6 py-3 sm:py-2.5 text-base sm:text-sm font-medium text-white bg-accent-600 hover:bg-accent-700 active:bg-accent-800 rounded transition-colors duration-200 ease-out focus:outline-none focus:ring-1 focus:ring-accent-500 focus:ring-offset-1 motion-reduce:transition-none touch-manipulation"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  )
}

