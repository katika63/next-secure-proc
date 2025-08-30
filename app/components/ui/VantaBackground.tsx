'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    VANTA: any
    THREE: any
  }
}

const VantaBackground = () => {
  useEffect(() => {
    let vantaEffect: any = null

    const initVanta = () => {
      if (typeof window !== 'undefined' && window.VANTA && window.THREE) {
        vantaEffect = window.VANTA.NET({
          el: "#vanta-bg",
          color: 0x3b82f6,
          backgroundColor: 0x0f172a,
          points: 12,
          maxDistance: 20,
          spacing: 15
        })
      }
    }

    // Load Three.js first, then Vanta
    const loadScripts = async () => {
      try {
        // Load Three.js
        if (!window.THREE) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
            script.onload = resolve
            script.onerror = reject
            document.head.appendChild(script)
          })
        }

        // Load Vanta.js
        if (!window.VANTA) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js'
            script.onload = resolve
            script.onerror = reject
            document.head.appendChild(script)
          })
        }

        // Initialize Vanta effect
        initVanta()
      } catch (error) {
        console.error('Failed to load Vanta.js:', error)
      }
    }

    loadScripts()

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy()
      }
    }
  }, [])

  return <div id="vanta-bg" className="fixed top-0 left-0 w-full h-full -z-10" />
}

export default VantaBackground