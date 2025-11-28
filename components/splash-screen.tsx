'use client'

import { useEffect, useState } from 'react'

interface SplashScreenProps {
  onFinish: () => void
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [visible, setVisible] = useState(true)
  const [logoScale, setLogoScale] = useState(false)
  const [textVisible, setTextVisible] = useState(false)

  useEffect(() => {
    // Animación del logo - escala
    setTimeout(() => setLogoScale(true), 100)

    // Animación del texto
    setTimeout(() => setTextVisible(true), 800)

    // Ocultar el splash después de 4 segundos
    const timer = setTimeout(() => {
      setVisible(false)
      // Esperar a que termine la animación de salida antes de llamar onFinish
      setTimeout(onFinish, 500)
    }, 4000)

    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-draft-dark transition-all duration-500 ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-draft-green/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-draft-green/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-draft-green/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Logo animado */}
      <div className="relative text-center">
        {/* Logo real con animación */}
        <div className={`relative mb-8 transition-all duration-1000 ${
          logoScale ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 -rotate-12'
        }`}>
          <div className="relative w-56 h-56 mx-auto">
            {/* Efecto de glow detrás del logo - más intenso */}
            <div className="absolute inset-0 bg-draft-green/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute inset-0 bg-draft-green/20 rounded-full blur-2xl animate-ping"></div>

            {/* Logo con efecto de brillo giratorio */}
            <div className="relative w-full h-full">
              <img
                src="/logo.jpg"
                alt="Draft Padel"
                className="relative w-full h-full object-contain rounded-2xl shadow-neon-lg"
              />
              {/* Shine effect que cruza el logo */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shine"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Texto del logo con animación secuencial */}
        <div className={`space-y-3 transition-all duration-700 ${
          textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-gray-400 text-base font-light tracking-wide">
            Encuentra tu próximo partido
          </p>
        </div>

        {/* Loader mejorado */}
        <div className={`mt-10 flex justify-center transition-all duration-700 delay-300 ${
          textVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex space-x-2">
            <div className="w-2.5 h-2.5 bg-draft-green rounded-full animate-bounce shadow-neon" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2.5 h-2.5 bg-draft-green rounded-full animate-bounce shadow-neon" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2.5 h-2.5 bg-draft-green rounded-full animate-bounce shadow-neon" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
