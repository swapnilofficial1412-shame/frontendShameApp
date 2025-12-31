import type { PromiseReport } from '@/types/api'
import { timeSince, formatExactTimestamp } from '@/utils/dateUtils'

interface PromiseCardProps {
  promise: PromiseReport
}

export function PromiseCard({ promise }: PromiseCardProps) {
  const relativeTime = timeSince(promise.datePromised)
  const exactTimestamp = formatExactTimestamp(promise.datePromised)

  return (
    <article
      className="group relative bg-surface border border-border rounded p-4 sm:p-6 transition-colors duration-200 ease-out hover:border-accent-600 focus-within:ring-1 focus-within:ring-accent-600 focus-within:ring-offset-1 motion-reduce:transition-none h-full flex flex-col"
      aria-labelledby={`promise-${promise.id}-name`}
      aria-describedby={`promise-${promise.id}-description promise-${promise.id}-time`}
    >
      {/* Accent Indicator - Left Border */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out motion-reduce:transition-none" />

      {/* Header Section */}
      <header className="flex items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4 flex-shrink-0">
        <h3
          id={`promise-${promise.id}-name`}
          className="text-lg sm:text-xl font-semibold text-foreground flex-1 min-w-0 line-clamp-2"
          title={promise.accusedName}
        >
          {promise.accusedName}
        </h3>
        <time
          id={`promise-${promise.id}-time`}
          dateTime={promise.datePromised}
          className="text-xs sm:text-sm text-muted whitespace-nowrap flex-shrink-0"
          title={exactTimestamp}
        >
          {relativeTime}
        </time>
      </header>

      {/* Description Section - Flexible, scrollable if needed */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <p 
          id={`promise-${promise.id}-description`} 
          className="text-sm sm:text-base text-foreground leading-relaxed line-clamp-4 sm:line-clamp-5"
          title={promise.description}
        >
          {promise.description}
        </p>
      </div>

      {/* Accent Dot Indicator (Subtle) */}
      <div
        className="absolute top-6 right-6 w-1.5 h-1.5 bg-accent-600 opacity-40 group-hover:opacity-60 transition-opacity duration-200 ease-out motion-reduce:transition-none"
        aria-hidden="true"
      />
    </article>
  )
}

