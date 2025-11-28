'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SplashPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animación de progreso
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 30)

    // Verificar si hay sesión y redirigir
    const timer = setTimeout(() => {
      const user = localStorage.getItem('demoUser')
      if (user) {
        router.push('/') // Ya está en dashboard
      } else {
        router.push('/login')
      }
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-draft-dark flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-draft-green/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-draft-green/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center">
        {/* Logo animado */}
        <div className="mb-8 animate-bounce-slow">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-draft-green to-green-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-draft-green/50 relative">
            <div className="absolute inset-0 bg-draft-green rounded-3xl animate-ping opacity-20"></div>
            <span className="text-draft-black font-bold text-6xl relative z-10">D</span>
          </div>
        </div>

        {/* Texto */}
        <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
          Draft Padel
        </h1>
        <p className="text-gray-400 text-lg mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Encuentra tu partido perfecto
        </p>

        {/* Barra de progreso */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-draft-gray rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-draft-green to-green-400 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-draft-green text-sm mt-2 font-semibold">
            {progress < 100 ? 'Cargando...' : '¡Listo!'}
          </p>
        </div>
      </div>

      {/* Versión */}
      <div className="absolute bottom-8 text-center">
        <p className="text-gray-500 text-xs">
          Modo Demo · v1.0
        </p>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
