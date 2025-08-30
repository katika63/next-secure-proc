// components/layout/Layout.js
'use client';

import { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  const vantaRef = useRef(null);

  useEffect(() => {
    // Initialize Vanta.js background effect
    const initVanta = async () => {
      if (typeof window !== 'undefined') {
        const { default: NET } = await import('vanta/dist/vanta.net.min');
        const three = await import('three');
        
        NET({
          el: vantaRef.current,
          THREE: three.default,
          color: 0x3b82f6,
          backgroundColor: 0x111827,
          points: 12.00,
          maxDistance: 22.00,
          spacing: 18.00,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00
        });
      }
    };

    initVanta();

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-gray-900 text-gray-100 font-sans">
      <div id="vanta-bg" ref={vantaRef} className="fixed top-0 left-0 w-full h-full z-[-1]"></div>
      <div className="content-wrapper min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}