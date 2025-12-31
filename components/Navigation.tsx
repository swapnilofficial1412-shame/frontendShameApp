'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const navLinks = [
    { href: '/', label: 'Dashboard' },
    { href: '/submit-promise', label: 'Submit' },
    { href: '/about', label: 'About' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border backdrop-blur-sm bg-opacity-95" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* App Name / Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-semibold text-foreground hover:text-accent-600 transition-colors duration-200 ease-out motion-reduce:transition-none focus:outline-none focus:ring-1 focus:ring-accent-600 focus:ring-offset-1"
              aria-label="Shame App - Go to homepage"
            >
              Shame
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors duration-200 ease-out motion-reduce:transition-none focus:outline-none focus:ring-1 focus:ring-accent-600 focus:ring-offset-1 ${
                  isActive(link.href)
                    ? 'bg-accent-600 text-white'
                    : 'text-foreground hover:bg-surface-elevated hover:text-accent-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-3 -mr-2 rounded text-foreground hover:bg-surface-elevated active:bg-surface-elevated focus:outline-none focus:ring-1 focus:ring-accent-600 focus:ring-offset-1 transition-colors duration-200 ease-out motion-reduce:transition-none touch-manipulation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border animate-fade-in">
            <nav className="flex flex-col py-2" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`px-4 py-4 rounded text-base font-medium transition-colors duration-200 ease-out motion-reduce:transition-none active:bg-surface-elevated touch-manipulation focus:outline-none focus:ring-1 focus:ring-accent-600 focus:ring-offset-1 ${
                    isActive(link.href)
                      ? 'bg-accent-600 text-white'
                      : 'text-foreground hover:bg-surface-elevated hover:text-accent-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

