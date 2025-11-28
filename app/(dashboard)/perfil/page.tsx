'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Profile {
  id: string
  nombre: string
  email: string
  nivel: number
  ubicacion?: string
  bio?: string
  partidosJugados?: number
  partidosCompletados?: number
}

export default function PerfilPage() {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = () => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('demoUser')
      if (userData) {
        const user = JSON.parse(userData)
        setProfile({
          ...user,
          partidosJugados: user.partidosJugados || 12,
          partidosCompletados: user.partidosCompletados || 8
        })
      } else {
        // Usuario por defecto
        setProfile({
          id: 'demo-user-1',
          nombre: 'Usuario Demo',
          email: 'demo@draftpadel.com',
          nivel: 3.2,
          ubicacion: 'Guadalajara, México',
          bio: 'Jugador amateur, me gusta el pádel social',
          partidosJugados: 12,
          partidosCompletados: 8
        })
      }
    }
  }

  const handleSave = () => {
    if (profile && typeof window !== 'undefined') {
      localStorage.setItem('demoUser', JSON.stringify(profile))
      setEditing(false)
      alert('Perfil actualizado correctamente')
    }
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('demoUser')
      router.push('/login')
    }
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-draft-dark flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-draft-dark pb-24">
      {/* Header */}
      <div className="bg-draft-black border-b border-draft-gray p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Mi Perfil</h1>
          <button
            onClick={handleLogout}
            className="text-red-500 text-sm font-semibold hover:underline"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Avatar y Info Principal */}
      <div className="bg-draft-gray border-b border-draft-black p-6">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-draft-green to-green-700 mb-4 flex items-center justify-center border-4 border-draft-green">
            <span className="text-draft-black font-bold text-4xl">
              {profile.nombre.charAt(0).toUpperCase()}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">{profile.nombre}</h2>
          <p className="text-gray-400 text-sm mb-3">{profile.email}</p>

          <div className="flex items-center gap-2 bg-draft-dark px-4 py-2 rounded-full">
            <span className="text-draft-green font-bold text-lg">⭐ {profile.nivel}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="bg-draft-gray rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-draft-green mb-1">
            {profile.partidosJugados}
          </p>
          <p className="text-gray-400 text-xs">Partidos</p>
        </div>
        <div className="bg-draft-gray rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-draft-green mb-1">
            {profile.nivel}
          </p>
          <p className="text-gray-400 text-xs">Nivel</p>
        </div>
        <div className="bg-draft-gray rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-draft-green mb-1">
            {profile.partidosCompletados}
          </p>
          <p className="text-gray-400 text-xs">Completados</p>
        </div>
      </div>

      {/* Logros */}
      <div className="p-4">
        <h3 className="text-white font-bold mb-3">Logros</h3>
        <div className="bg-draft-gray rounded-2xl p-4 space-y-3">
          {profile.partidosJugados && profile.partidosJugados >= 10 && (
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <p className="text-white font-semibold text-sm">10 partidos</p>
                <p className="text-gray-400 text-xs">Has jugado 10 partidos</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚡</span>
            <div>
              <p className="text-white font-semibold text-sm">Siempre puntual</p>
              <p className="text-gray-400 text-xs">Nunca llegas tarde</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🤝</span>
            <div>
              <p className="text-white font-semibold text-sm">Buen compañero</p>
              <p className="text-gray-400 text-xs">Excelente valoración</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Personal */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-bold">Información</h3>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="text-draft-green text-sm font-semibold hover:underline"
            >
              Editar
            </button>
          )}
        </div>

        <div className="bg-draft-gray rounded-2xl p-4 space-y-4">
          {/* Nivel */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Nivel de juego
            </label>
            {editing ? (
              <>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.5"
                  value={profile.nivel}
                  onChange={(e) => setProfile({ ...profile, nivel: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-draft-dark rounded-lg appearance-none cursor-pointer accent-draft-green"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">1.0 Principiante</span>
                  <span className="text-draft-green font-bold">{profile.nivel}</span>
                  <span className="text-xs text-gray-400">5.0 Pro</span>
                </div>
              </>
            ) : (
              <p className="text-white">{profile.nivel}</p>
            )}
          </div>

          {/* Ubicación */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Ubicación
            </label>
            {editing ? (
              <input
                type="text"
                value={profile.ubicacion || ''}
                onChange={(e) => setProfile({ ...profile, ubicacion: e.target.value })}
                className="w-full bg-draft-dark text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-draft-green"
                placeholder="Ciudad, País"
              />
            ) : (
              <p className="text-white">{profile.ubicacion || 'No especificada'}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Sobre mí
            </label>
            {editing ? (
              <textarea
                value={profile.bio || ''}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full bg-draft-dark text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-draft-green resize-none"
                rows={3}
                placeholder="Cuéntanos sobre ti..."
              />
            ) : (
              <p className="text-white">{profile.bio || 'No especificada'}</p>
            )}
          </div>

          {/* Botones de acción */}
          {editing && (
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setEditing(false)
                  loadProfile()
                }}
                className="flex-1 bg-draft-dark text-white py-3 rounded-xl font-semibold hover:bg-draft-dark/80 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-draft-green to-green-400 text-draft-black font-bold py-3 rounded-xl hover:shadow-neon transition-all"
              >
                Guardar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Historial (Mock) */}
      <div className="p-4">
        <h3 className="text-white font-bold mb-3">Historial Reciente</h3>
        <div className="bg-draft-gray rounded-2xl overflow-hidden">
          {[
            { fecha: '26 Nov', club: 'Club Padel GDL', completado: true },
            { fecha: '20 Nov', club: 'Club Padel GDL', completado: true },
            { fecha: '15 Nov', club: 'Padel Center', completado: false },
          ].map((partido, index) => (
            <div
              key={index}
              className="p-4 border-b border-draft-dark last:border-0 flex items-center justify-between"
            >
              <div>
                <p className="text-white text-sm font-semibold">{partido.fecha}</p>
                <p className="text-gray-400 text-xs">{partido.club}</p>
              </div>
              <div>
                {partido.completado ? (
                  <span className="text-draft-green text-xl">✓</span>
                ) : (
                  <span className="text-gray-500 text-xl">○</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
