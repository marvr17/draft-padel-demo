'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Mostrar splash primero
    router.push('/splash')
  }, [router])

  return (
    <div className="min-h-screen bg-draft-dark flex items-center justify-center">
      <div className="text-white">Cargando...</div>
    </div>
  )
}
