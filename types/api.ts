// Promise Report Types
export interface PromiseReport {
  id: string
  reporterName: string | null
  accusedName: string
  description: string
  datePromised: string
  createdAt: string
  visibleAt: string
}

// Create Promise Request
export interface CreatePromiseRequest {
  reporterName?: string
  accusedName: string
  description: string
  datePromised: string // ISO 8601 datetime string
}

// Pagination Metadata
export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

// Public Promises Response
export interface PublicPromisesResponse {
  promises: PromiseReport[]
  pagination: PaginationMeta
}

// API Error Response
export interface ApiError {
  error: string
  message?: string
  details?: Array<{
    path: (string | number)[]
    message: string
  }>
}

