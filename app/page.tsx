'use client'

import { usePublicPromises } from '@/hooks/usePublicPromises'
import { PromiseCard } from '@/components/PromiseCard'
import { PromiseCardSkeleton } from '@/components/PromiseCardSkeleton'
import { EmptyState } from '@/components/EmptyState'
import { ErrorMessage } from '@/components/ErrorMessage'
import { LoadingState } from '@/components/LoadingState'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const { data, isLoading, isError, error, refetch } = usePublicPromises(1, 20)

  const getErrorMessage = () => {
    if (error instanceof Error) {
      if (error.message.includes('Cannot connect') || error.message.includes('Network Error')) {
        return {
          message: 'Unable to connect to the server.',
          details: 'Please make sure the backend server is running on http://localhost:3000',
        }
      }
      return {
        message: error.message,
        details: 'Please try again in a moment.',
      }
    }
    return {
      message: 'Failed to load promises.',
      details: 'Please try again in a moment.',
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Section */}
      <header className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Public Dashboard
        </h1>
        <p className="text-sm sm:text-base text-muted" role="status" aria-live="polite">
          View all visible promises. Updates every 60 seconds.
        </p>
      </header>

      {/* Loading State */}
      {isLoading && (
        <LoadingState
          skeleton={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-fade-in"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <PromiseCardSkeleton />
                </div>
              ))}
            </div>
          }
        />
      )}

      {/* Error State */}
      {isError && (
        <ErrorMessage
          title="Error loading promises"
          message={getErrorMessage().message}
          details={getErrorMessage().details}
          onRetry={() => refetch()}
        />
      )}

      {/* Success State */}
      {!isLoading && !isError && data && (
        <>
          {data.promises.length === 0 ? (
            <div className="animate-fade-in">
              <EmptyState
                title="No visible promises"
                message="There are no visible promises at the moment. Newly submitted promises become visible after a delay period. Be the first to submit one!"
                actionLabel="Submit a Promise"
                onAction={() => router.push('/submit-promise')}
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Results Count */}
              <div className="flex items-center justify-between">
                <p className="text-xs sm:text-sm text-muted" role="status" aria-live="polite">
                  Showing <span className="font-medium text-foreground">{data.promises.length}</span> of{' '}
                  <span className="font-medium text-foreground">{data.pagination.total}</span> promises
                </p>
              </div>

              {/* Promise Cards Grid */}
              <section aria-label="Promise cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
                {data.promises.map((promise, index) => (
                  <div
                    key={promise.id}
                    className="animate-fade-in h-full"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <PromiseCard promise={promise} />
                  </div>
                ))}
              </section>
            </div>
          )}
        </>
      )}
    </div>
  )
}

