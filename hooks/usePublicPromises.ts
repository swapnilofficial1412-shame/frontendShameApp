import { useQuery } from '@tanstack/react-query'
import { fetchPublicPromises } from '@/services/api'

export function usePublicPromises(page: number = 1, limit: number = 20) {
  return useQuery({
    queryKey: ['publicPromises', page, limit],
    queryFn: () => fetchPublicPromises(page, limit),
    refetchInterval: 60000, // Poll every 60 seconds
    staleTime: 30000, // Consider data stale after 30 seconds
  })
}

