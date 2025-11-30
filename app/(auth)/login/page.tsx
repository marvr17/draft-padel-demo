'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // MODO DEMO - Sin Supabase
      // Simular delay de autenticación
      await new Promise(resolve => setTimeout(resolve, 800))

      // Validar credenciales demo
      if (email === 'demo@draftpadel.com' && password === 'demo123') {
        // Guardar sesión demo en localStorage
        localStorage.setItem('demoUser', JSON.stringify({
          id: 'demo-user-1',
          nombre: 'Mario Ruiz',
          email: 'demo@draftpadel.com',
          nivel: 3.2,
          ubicacion: 'Guadalajara, México',
          bio: 'Jugador amateur, me gusta el pádel social'
        }))

        // Redirigir al feed
        router.push('/')
      } else {
        throw new Error('Credenciales incorrectas. Usa: demo@draftpadel.com / demo123')
      }
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-draft-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-draft-green rounded-2xl mb-4 overflow-hidden">
            <img
              src="/logo.jpg"
              alt="Draft Padel"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Draft Padel</h1>
          <p className="text-gray-400">Inicia sesión para continuar</p>
        </div>

        {/* Formulario */}
        <div className="bg-draft-gray rounded-2xl p-6 shadow-card">
          {/* Demo Info */}
          <div className="bg-draft-green/10 border border-draft-green/30 rounded-xl p-4 mb-4">
            <p className="text-draft-green text-sm font-semibold mb-1">🎮 Modo Demo</p>
            <p className="text-gray-300 text-xs">Email: <span className="font-mono">demo@draftpadel.com</span></p>
            <p className="text-gray-300 text-xs">Pass: <span className="font-mono">demo123</span></p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-draft-dark text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-draft-green border border-transparent"
                placeholder="tu@email.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-draft-dark text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-draft-green border border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-draft-green to-green-400 text-draft-black font-bold py-3 rounded-xl hover:shadow-neon transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Link a Registro */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              ¿No tienes cuenta?{' '}
              <Link href="/registro" className="text-draft-green font-semibold hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
