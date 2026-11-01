'use client'

import React from 'react'

interface CookieSettingsButtonProps {
  className?: string
  children?: React.ReactNode
}

export default function CookieSettingsButton({
  className = 'inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors shadow-md',
  children = (
    <>
      <i className="fas fa-cookie-bite text-cyan-300"></i>
      <span>Manage Cookie Preferences</span>
    </>
  ),
}: CookieSettingsButtonProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('openCookiePreferences'))
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      aria-label="Manage Cookie Preferences"
    >
      {children}
    </button>
  )
}
