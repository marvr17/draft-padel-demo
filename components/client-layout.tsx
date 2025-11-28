'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import SplashScreen from './splash-screen'
import BottomNav from './bottom-nav'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    // Verificar si ya se mostró el splash en esta sesión
    const hasShownSplash = sessionStorage.getItem('splashShown')

    if (!hasShownSplash && pathname === '/') {
      setShowSplash(true)
    }
  }, [pathname])

  const handleSplashFinish = () => {
    sessionStorage.setItem('splashShown', 'true')
    setShowSplash(false)
  }

  // No mostrar BottomNav en páginas de autenticación
  const showBottomNav = !pathname.startsWith('/login') && !pathname.startsWith('/registro')

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      {children}
      {showBottomNav && <BottomNav />}
    </>
  )
}
