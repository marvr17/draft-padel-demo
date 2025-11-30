'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import SplashScreen from './splash-screen'
import BottomNav from './bottom-nav'
import { initNotifications } from '@/lib/notifications'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    // Verificar si ya se mostró el splash en esta sesión
    const hasShownSplash = sessionStorage.getItem('splashShown')

    if (!hasShownSplash && pathname === '/') {
      setShowSplash(true)
    }

    // Inicializar notificaciones cuando la app carga
    initNotifications().catch(console.error)
  }, [pathname])

  const handleSplashFinish = () => {
    sessionStorage.setItem('splashShown', 'true')
    setShowSplash(false)
  }

  // No mostrar BottomNav en páginas de autenticación o splash
  const showBottomNav = !pathname.startsWith('/login') &&
                        !pathname.startsWith('/registro') &&
                        !pathname.startsWith('/splash') &&
                        pathname !== '/'

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      {children}
      {showBottomNav && !showSplash && <BottomNav />}
    </>
  )
}
