import { apiClient } from '@/lib/axios'
import type {
  CreatePromiseRequest,
  PromiseReport,
  PublicPromisesResponse,
} from '@/types/api'

/**
 * Create a new promise report 
 */
export async function createPromise(
  data: CreatePromiseRequest
): Promise<PromiseReport> {
  const response = await apiClient.post<PromiseReport>('/api/promises', data)
  return response.data
}

/**
 * Fetch public (visible) promises with pagination
 */
export async function fetchPublicPromises(
  page: number = 1,
  limit: number = 20
): Promise<PublicPromisesResponse> {
  const response = await apiClient.get<PublicPromisesResponse>(
    '/api/promises/public',
    {
      params: {
        page,
        limit,
      },
    }
  )
  return response.data
}

