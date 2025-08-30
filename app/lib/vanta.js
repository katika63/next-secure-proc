'use client'

export const initVanta = () => {
  if (typeof window !== 'undefined') {
    // Load Vanta.js dynamically
    Promise.all([
      import('three'),
      import('vanta/dist/vanta.net.min')
    ]).then(([THREE, NET]) => {
      if (typeof window.VANTA !== 'undefined') {
        window.VANTA.NET({
          el: "#vanta-bg",
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x3b82f6,
          backgroundColor: 0x111827,
          points: 12.00,
          maxDistance: 22.00,
          spacing: 18.00,
          THREE: THREE.default
        })
      }
    }).catch(error => {
      console.error('Error loading Vanta.js:', error)
    })
  }
}