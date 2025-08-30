'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const KEY = 'btm_cookie_accepted_v1'
    
    // Only show if not accepted
    if (!localStorage.getItem(KEY)) {
      setIsVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('btm_cookie_accepted_v1', 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-3xl z-50 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between bg-gray-900/90 backdrop-blur-sm text-gray-100 rounded-lg p-4 shadow-lg border border-gray-800">
        <div className="flex items-start space-x-4 mb-4 md:mb-0">
          <svg className="w-6 h-6 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 7h2v6H9V7zM9 4h2v1H9V4z"/>
          </svg>
          <div className="text-sm">
            <div className="font-semibold">This website uses cookies</div>
            <div className="mt-1">
              This website uses cookies to improve your experience. By continuing, you agree to our use of cookies. 
              <Link href="/cookie-policy" className="underline text-blue-400 hover:text-blue-300 ml-1">
                Learn more
              </Link>
            </div>
          </div>
        </div>
    
        <div className="flex items-center space-x-3">
          <Link 
            href="/cookie-policy"
            className="px-3 py-2 text-sm rounded-md bg-gray-800 hover:bg-gray-700 border border-gray-700"
          >
            Manage
          </Link>
          <button 
            onClick={acceptCookies}
            className="px-4 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}