'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPromise } from '@/services/api'
import type { CreatePromiseRequest } from '@/types/api'
import { LoadingSpinner } from '@/components/LoadingSpinner'

interface FormErrors {
  accusedName?: string
  description?: string
  datePromised?: string
  reporterName?: string
}

export default function SubmitPromise() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<CreatePromiseRequest>({
    reporterName: '',
    accusedName: '',
    description: '',
    datePromised: '',
  })

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.accusedName.trim()) {
      newErrors.accusedName = 'Accused name is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters'
    }

    if (!formData.datePromised) {
      newErrors.datePromised = 'Date promised is required'
    } else {
      const selectedDate = new Date(formData.datePromised)
      const now = new Date()
      if (selectedDate > now) {
        newErrors.datePromised = 'Date cannot be in the future'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      // Convert datetime-local format to ISO 8601 format
      const datePromisedISO = formData.datePromised
        ? new Date(formData.datePromised).toISOString()
        : formData.datePromised

      await createPromise({
        ...formData,
        reporterName: formData.reporterName?.trim() || undefined,
        datePromised: datePromisedISO,
      })

      setIsSuccess(true)
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          reporterName: '',
          accusedName: '',
          description: '',
          datePromised: '',
        })
        setIsSuccess(false)
        router.push('/')
      }, 2000)
    } catch (error: any) {
      console.error('Error submitting promise:', error)
      
      // Handle validation errors from API
      if (error.response?.data?.details) {
        const apiErrors: FormErrors = {}
        error.response.data.details.forEach((detail: any) => {
          const field = detail.path[0]
          if (field === 'accusedName') apiErrors.accusedName = detail.message
          if (field === 'description') apiErrors.description = detail.message
          if (field === 'datePromised') apiErrors.datePromised = detail.message
        })
        setErrors(apiErrors)
      } else {
        setErrors({
          description: error.response?.data?.message || 'Failed to submit promise. Please try again.',
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // Calculate visibility date (24 hours from now, informational)
  const getVisibilityDate = () => {
    const now = new Date()
    const visibleAt = new Date(now.getTime() + 24 * 60 * 60 * 1000)
    return visibleAt.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Submit Promise</h1>
          <p className="text-sm sm:text-base text-muted">
            Submit a new promise to track accountability.
          </p>
        </header>

        <div
          className="bg-surface border border-border rounded p-6 sm:p-8 text-center animate-fade-in"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-accent-100 p-3" aria-hidden="true">
              <svg
                className="h-8 w-8 text-accent-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Promise Submitted Successfully!
          </h2>
          <p className="text-base text-muted mb-4">
            Your promise has been recorded and will be visible to the public after the delay period.
          </p>
          <p className="text-sm text-subtle">
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Submit Promise</h1>
        <p className="text-sm sm:text-base text-muted">
          Submit a new promise to track accountability. All submissions are anonymous and will become visible after a delay period.
        </p>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate aria-label="Submit promise form">
        <div className="bg-surface border border-border rounded p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Reporter Name (Optional) */}
          <div>
            <label
              htmlFor="reporterName"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Your Name <span className="text-subtle font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              id="reporterName"
              name="reporterName"
              value={formData.reporterName}
              onChange={handleChange}
              placeholder="Leave blank to remain anonymous"
              aria-invalid={!!errors.reporterName}
              aria-describedby={errors.reporterName ? 'reporterName-error' : undefined}
              className={`w-full px-4 py-3 sm:py-2.5 bg-background border rounded text-base sm:text-sm text-foreground placeholder:text-subtle focus:outline-none focus:ring-1 focus:ring-accent-600 focus:border-transparent transition-colors duration-200 ease-out motion-reduce:transition-none touch-manipulation ${
                errors.reporterName
                  ? 'border-accent-500'
                  : 'border-border'
              }`}
            />
            {errors.reporterName && (
              <p id="reporterName-error" className="mt-1.5 text-sm text-accent-600" role="alert">
                {errors.reporterName}
              </p>
            )}
          </div>

          {/* Accused Name (Required) */}
          <div>
            <label
              htmlFor="accusedName"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Accused Name <span className="text-accent-600" aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="accusedName"
              name="accusedName"
              value={formData.accusedName}
              onChange={handleChange}
              placeholder="Name of the person who made the promise"
              required
              aria-required="true"
              aria-invalid={!!errors.accusedName}
              aria-describedby={errors.accusedName ? 'accusedName-error accusedName-help' : 'accusedName-help'}
              className={`w-full px-4 py-3 sm:py-2.5 bg-background border rounded text-base sm:text-sm text-foreground placeholder:text-subtle focus:outline-none focus:ring-1 focus:ring-accent-600 focus:border-transparent transition-colors duration-200 ease-out motion-reduce:transition-none touch-manipulation ${
                errors.accusedName
                  ? 'border-accent-500'
                  : 'border-border'
              }`}
            />
            {errors.accusedName ? (
              <p id="accusedName-error" className="mt-1.5 text-sm text-accent-600" role="alert">
                {errors.accusedName}
              </p>
            ) : (
              <p id="accusedName-help" className="sr-only">
                Enter the name of the person who made the promise
              </p>
            )}
          </div>

          {/* Description (Required) */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Promise Description <span className="text-accent-600" aria-label="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the promise that was made..."
              required
              aria-required="true"
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? 'description-error description-help' : 'description-help'}
              className={`w-full px-4 py-3 sm:py-2.5 bg-background border rounded-md text-base sm:text-sm text-foreground placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 ease-out resize-none motion-reduce:transition-none touch-manipulation ${
                errors.description
                  ? 'border-accent-500'
                  : 'border-border'
              }`}
            />
            {errors.description ? (
              <p id="description-error" className="mt-1.5 text-sm text-accent-600" role="alert">
                {errors.description}
              </p>
            ) : null}
            <p id="description-help" className="mt-1.5 text-xs text-subtle">
              Minimum 10 characters required
            </p>
          </div>

          {/* Date Promised (Required) */}
          <div>
            <label
              htmlFor="datePromised"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Date Promise Was Made <span className="text-accent-600" aria-label="required">*</span>
            </label>
            <input
              type="datetime-local"
              id="datePromised"
              name="datePromised"
              value={formData.datePromised}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={!!errors.datePromised}
              aria-describedby={errors.datePromised ? 'datePromised-error datePromised-help' : 'datePromised-help'}
              max={new Date().toISOString().slice(0, 16)}
              className={`w-full px-4 py-3 sm:py-2.5 bg-background border rounded-md text-base sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 ease-out motion-reduce:transition-none touch-manipulation ${
                errors.datePromised
                  ? 'border-accent-500'
                  : 'border-border'
              }`}
            />
            {errors.datePromised ? (
              <p id="datePromised-error" className="mt-1.5 text-sm text-accent-600" role="alert">
                {errors.datePromised}
              </p>
            ) : null}
            <p id="datePromised-help" className="mt-1.5 text-xs text-subtle">
              Select the date and time when the promise was made
            </p>
          </div>

          {/* Visibility Delay Info */}
          <div className="bg-surface-elevated border border-border-muted rounded p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 text-accent-600 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-foreground mb-1">
                  Visibility Delay
                </p>
                <p className="text-xs text-muted leading-relaxed">
                  Your promise will become visible to the public approximately{' '}
                  <span className="font-medium text-foreground">{getVisibilityDate()}</span>.
                  This delay helps ensure accountability and prevents abuse.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ethical Disclaimer */}
        <div className="bg-surface-elevated border border-border-muted rounded-md p-3 sm:p-4">
          <div className="flex items-start gap-2 sm:gap-3">
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5 text-primary-500 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2">
              <p className="text-xs sm:text-sm font-medium text-foreground">
                Community Guidelines
              </p>
              <div className="text-xs text-muted space-y-1.5 leading-relaxed">
                <p>
                  This platform is designed for <strong className="text-foreground">accountability, not harassment</strong>.
                  Please ensure your submission promotes constructive transparency.
                </p>
                <p>
                  <strong className="text-foreground">Do not submit:</strong> hate speech, personal abuse, or information about private individuals.
                  Focus on public commitments and professional promises.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => router.push('/')}
            disabled={isSubmitting}
            aria-label="Cancel and return to dashboard"
            className="px-6 py-3.5 sm:py-2.5 text-base sm:text-sm font-medium text-foreground hover:bg-surface-elevated active:bg-surface-elevated rounded transition-colors duration-200 ease-out motion-reduce:transition-none touch-manipulation focus:outline-none focus:ring-1 focus:ring-accent-600 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            aria-label={isSubmitting ? 'Submitting promise, please wait' : 'Submit promise'}
            aria-busy={isSubmitting}
            className="px-6 py-3.5 sm:py-2.5 text-base sm:text-sm font-medium text-white bg-accent-600 hover:bg-accent-700 active:bg-accent-800 rounded transition-colors duration-200 ease-out focus:outline-none focus:ring-1 focus:ring-accent-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed motion-reduce:transition-none touch-manipulation"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                Submitting...
              </span>
            ) : (
              'Submit Promise'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
