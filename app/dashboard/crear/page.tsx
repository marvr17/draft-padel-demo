'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { format, addDays } from 'date-fns'
import { es } from 'date-fns/locale'

export default function CrearPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Form state
  const [fecha, setFecha] = useState<'hoy' | 'mañana' | 'custom'>('hoy')
  const [fechaCustom, setFechaCustom] = useState('')
  const [hora, setHora] = useState('18:00')
  const [nivelMin, setNivelMin] = useState(3.0)
  const [nivelMax, setNivelMax] = useState(3.5)
  const [jugadores, setJugadores] = useState(3)
  const [mensaje, setMensaje] = useState('')
  const [cancha, setCancha] = useState('Cancha 2')

  // Get user from localStorage
  const getUserData = () => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('demoUser')
      if (userData) {
        return JSON.parse(userData)
      }
    }
    return { nombre: 'Usuario', nivel: 3.2 }
  }

  const user = getUserData()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // MODO DEMO - Simular creación de partido
      await new Promise(resolve => setTimeout(resolve, 1000))

      // En una app real, aquí guardaríamos en Supabase
      alert('¡Partido publicado exitosamente! 🎾')

      // Redirigir al feed
      router.push('/')
    } catch (error) {
      console.error('Error:', error)
      alert('Error al publicar el partido')
    } finally {
      setLoading(false)
    }
  }

  const getDateLabel = () => {
    if (fecha === 'hoy') return 'HOY'
    if (fecha === 'mañana') return 'MAÑANA'
    if (fechaCustom) {
      const date = new Date(fechaCustom)
      return format(date, "d 'de' MMMM", { locale: es }).toUpperCase()
    }
    return 'PRÓXIMAMENTE'
  }

  return (
    <div className="min-h-screen bg-draft-dark pb-24">
      {/* Header */}
      <div className="bg-draft-black border-b border-draft-gray p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-white hover:text-draft-green transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-white">Crear Partido</h1>
          <div className="w-6"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Fecha */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            📅 ¿Cuándo?
          </label>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <button
              type="button"
              onClick={() => setFecha('hoy')}
              className={`py-3 rounded-xl font-semibold transition-all ${
                fecha === 'hoy'
                  ? 'bg-draft-green text-draft-black'
                  : 'bg-draft-gray text-white hover:bg-draft-gray/80'
              }`}
            >
              Hoy
            </button>
            <button
              type="button"
              onClick={() => setFecha('mañana')}
              className={`py-3 rounded-xl font-semibold transition-all ${
                fecha === 'mañana'
                  ? 'bg-draft-green text-draft-black'
                  : 'bg-draft-gray text-white hover:bg-draft-gray/80'
              }`}
            >
              Mañana
            </button>
            <button
              type="button"
              onClick={() => setFecha('custom')}
              className={`py-3 rounded-xl font-semibold transition-all ${
                fecha === 'custom'
                  ? 'bg-draft-green text-draft-black'
                  : 'bg-draft-gray text-white hover:bg-draft-gray/80'
              }`}
            >
              Otra
            </button>
          </div>

          {fecha === 'custom' && (
            <input
              type="date"
              value={fechaCustom}
              onChange={(e) => setFechaCustom(e.target.value)}
              min={format(new Date(), 'yyyy-MM-dd')}
              className="w-full bg-draft-gray text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-draft-green"
            />
          )}
        </div>

        {/* Hora */}
        <div>
          <label htmlFor="hora" className="block text-sm font-medium text-gray-300 mb-2">
            ⏰ ¿A qué hora?
          </label>
          <select
            id="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            className="w-full bg-draft-gray text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-draft-green"
          >
            {Array.from({ length: 24 }, (_, i) => {
              const hour = i.toString().padStart(2, '0')
              return (
                <option key={`${hour}:00`} value={`${hour}:00`}>{hour}:00</option>
              )
            })}
          </select>
        </div>

        {/* Cancha */}
        <div>
          <label htmlFor="cancha" className="block text-sm font-medium text-gray-300 mb-2">
            📍 Cancha
          </label>
          <select
            id="cancha"
            value={cancha}
            onChange={(e) => setCancha(e.target.value)}
            className="w-full bg-draft-gray text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-draft-green"
          >
            <option value="Cancha 1">Cancha 1</option>
            <option value="Cancha 2">Cancha 2</option>
            <option value="Cancha 3">Cancha 3</option>
            <option value="Cancha 4">Cancha 4</option>
          </select>
        </div>

        {/* Jugadores necesarios */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            🎯 ¿Cuántos jugadores necesitas? <span className="text-draft-green font-bold">{jugadores}</span>
          </label>
          <input
            type="range"
            min="1"
            max="3"
            value={jugadores}
            onChange={(e) => setJugadores(parseInt(e.target.value))}
            className="w-full h-2 bg-draft-gray rounded-lg appearance-none cursor-pointer accent-draft-green"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1 jugador</span>
            <span>3 jugadores</span>
          </div>
        </div>

        {/* Nivel requerido */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            📊 Nivel requerido: <span className="text-draft-green font-bold">{nivelMin.toFixed(1)} - {nivelMax.toFixed(1)}</span>
          </label>

          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-400 mb-1">Mínimo</p>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.5"
                value={nivelMin}
                onChange={(e) => {
                  const val = parseFloat(e.target.value)
                  setNivelMin(val)
                  if (val > nivelMax) setNivelMax(val)
                }}
                className="w-full h-2 bg-draft-gray rounded-lg appearance-none cursor-pointer accent-draft-green"
              />
            </div>

            <div>
              <p className="text-xs text-gray-400 mb-1">Máximo</p>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.5"
                value={nivelMax}
                onChange={(e) => {
                  const val = parseFloat(e.target.value)
                  setNivelMax(val)
                  if (val < nivelMin) setNivelMin(val)
                }}
                className="w-full h-2 bg-draft-gray rounded-lg appearance-none cursor-pointer accent-draft-green"
              />
            </div>
          </div>

          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1.0 Principiante</span>
            <span>5.0 Profesional</span>
          </div>
        </div>

        {/* Mensaje */}
        <div>
          <label htmlFor="mensaje" className="block text-sm font-medium text-gray-300 mb-2">
            💬 Mensaje (opcional)
          </label>
          <textarea
            id="mensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows={3}
            maxLength={200}
            placeholder="Ej: Partido tranquilo después del trabajo 🎾"
            className="w-full bg-draft-gray text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-draft-green resize-none"
          />
          <p className="text-xs text-gray-400 mt-1 text-right">{mensaje.length}/200</p>
        </div>

        {/* Preview */}
        <div>
          <p className="block text-sm font-medium text-gray-300 mb-3">
            👁️ Vista previa
          </p>
          <div className="bg-draft-gray rounded-2xl overflow-hidden shadow-card border border-draft-green/30">
            <div className="bg-draft-green/10 px-4 py-2 border-b border-draft-green/20">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🟢</span>
                <span className="text-sm font-bold text-draft-green">
                  {getDateLabel()} {hora}
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-draft-green to-green-700 rounded-full flex items-center justify-center">
                    <span className="text-draft-black font-bold">
                      {user.nombre.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-draft-black rounded-full px-1.5 py-0.5 border-2 border-draft-gray">
                    <span className="text-xs font-bold text-draft-green">
                      ⭐ {user.nivel}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-white font-semibold">{user.nombre} (Tú)</p>
                  <p className="text-gray-400 text-sm">Nivel {user.nivel}</p>
                </div>
              </div>

              <p className="text-gray-300 mb-3 text-sm">
                {mensaje || 'Sin mensaje adicional'}
              </p>

              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">📍</span>
                  <span className="text-white">{cancha}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">🎯</span>
                  <span className="text-white">Busco: {jugadores} {jugadores === 1 ? 'jugador' : 'jugadores'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">📊</span>
                  <span className="text-white">Nivel: {nivelMin.toFixed(1)} - {nivelMax.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-draft-green to-green-400 text-draft-black font-bold py-4 rounded-xl hover:shadow-neon transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Publicando...' : '🚀 PUBLICAR PARTIDO'}
        </button>
      </form>
    </div>
  )
}
