export function PromiseCardSkeleton() {
  return (
    <div className="bg-surface border border-border rounded p-4 sm:p-6 animate-pulse h-full flex flex-col">
      <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4 flex-shrink-0">
        <div className="h-6 sm:h-7 bg-primary-300 rounded w-32 flex-1"></div>
        <div className="h-3 sm:h-4 bg-primary-300 rounded w-20 flex-shrink-0"></div>
      </div>
      <div className="flex-1 space-y-2">
        <div className="h-3 sm:h-4 bg-primary-300 rounded w-full"></div>
        <div className="h-3 sm:h-4 bg-primary-300 rounded w-5/6"></div>
        <div className="h-3 sm:h-4 bg-primary-300 rounded w-4/6"></div>
        <div className="h-3 sm:h-4 bg-primary-300 rounded w-3/4"></div>
        <div className="h-3 sm:h-4 bg-primary-300 rounded w-2/3"></div>
      </div>
    </div>
  )
}

