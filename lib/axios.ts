import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth tokens or other headers here if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Provide better error messages
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      error.message = 'Cannot connect to backend server. Make sure it is running on http://localhost:3000'
    } else if (error.response) {
      // Server responded with error status
      error.message = error.response.data?.message || error.response.data?.error || error.message
    } else if (error.request) {
      // Request was made but no response received
      error.message = 'No response from server. Check if backend is running.'
    }
    return Promise.reject(error)
  }
)

