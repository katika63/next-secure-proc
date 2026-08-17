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
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x0084ff,
          backgroundColor: 0x030712,
          points: 14.00,
          maxDistance: 22.00,
          spacing: 14.00
        })
      }
    }

    // Load Three.js first, then Vanta.js
    const loadScripts = async () => {
      try {
        if (!window.THREE) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
            script.onload = resolve
            script.onerror = reject
            document.head.appendChild(script)
          })
        }

        if (!window.VANTA) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js'
            script.onload = resolve
            script.onerror = reject
            document.head.appendChild(script)
          })
        }

        initVanta()
      } catch (error) {
        console.error('Failed to load Vanta.js 3D background:', error)
      }
    }

    loadScripts()

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy()
      }
    }
  }, [])

  return <div id="vanta-bg" className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10" />
}

export default VantaBackground