'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { notifyNuevoJugador, notifyPartidoCompleto, requestNotificationPermission } from '@/lib/notifications'

interface Message {
  id: string
  userId: string
  userName: string
  userNivel: number
  mensaje: string
  timestamp: Date
  isCurrentUser: boolean
}

// Datos mock del partido
const partidoDemo = {
  id: '1',
  organizador: {
    id: 'demo-user-1',
    nombre: 'Mario R.',
    nivel: 3.2
  },
  fecha: 'HOY',
  hora: '18:00',
  cancha: 'Cancha 2',
  club: 'Club Padel GDL',
  jugadoresActuales: 2,
  jugadoresMáximos: 4,
  descripcion: 'Partido tranquilo después del trabajo 🎾',
}

// Mensajes demo
const mensajesDemo: Message[] = [
  {
    id: '1',
    userId: 'user-2',
    userName: 'Juan C.',
    userNivel: 3.0,
    mensaje: '¡Me interesa! Nunca he jugado en ese club, ¿es techado?',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    isCurrentUser: false
  },
  {
    id: '2',
    userId: 'demo-user-1',
    userName: 'Mario R.',
    userNivel: 3.2,
    mensaje: 'Sí, todas las canchas son techadas. Te va a gustar!',
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
    isCurrentUser: true
  },
  {
    id: '3',
    userId: 'user-3',
    userName: 'Laura M.',
    userNivel: 3.5,
    mensaje: 'Yo también me apunto! 🎾',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    isCurrentUser: false
  },
  {
    id: '4',
    userId: 'demo-user-1',
    userName: 'Mario R.',
    userNivel: 3.2,
    mensaje: 'Genial! Ya solo falta 1 jugador más',
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
    isCurrentUser: true
  }
]

export default function DetallePartidoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [mensajes, setMensajes] = useState<Message[]>(mensajesDemo)
  const [nuevoMensaje, setNuevoMensaje] = useState('')
  const [jugadoresActuales, setJugadoresActuales] = useState(partidoDemo.jugadoresActuales)

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

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])

  const handleEnviarMensaje = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nuevoMensaje.trim()) return

    const mensaje: Message = {
      id: Date.now().toString(),
      userId: user.id || 'demo-user-current',
      userName: user.nombre,
      userNivel: user.nivel,
      mensaje: nuevoMensaje,
      timestamp: new Date(),
      isCurrentUser: true
    }

    setMensajes([...mensajes, mensaje])
    setNuevoMensaje('')
  }

  const handleUnirse = async () => {
    if (jugadoresActuales < partidoDemo.jugadoresMáximos) {
      // Pedir permiso de notificaciones en la primera interacción
      await requestNotificationPermission()

      const nuevosJugadores = jugadoresActuales + 1
      setJugadoresActuales(nuevosJugadores)

      // Agregar mensaje automático de unión
      const mensajeUnion: Message = {
        id: Date.now().toString(),
        userId: user.id || 'demo-user-current',
        userName: user.nombre,
        userNivel: user.nivel,
        mensaje: '¡Me uno al partido! 🎾',
        timestamp: new Date(),
        isCurrentUser: true
      }

      setMensajes([...mensajes, mensajeUnion])

      // Notificar al organizador (simulado después de 2 segundos)
      setTimeout(() => {
        notifyNuevoJugador(user.nombre, params.id)
      }, 2000)

      // Si el partido se completa, notificar a todos
      if (nuevosJugadores === partidoDemo.jugadoresMáximos) {
        setTimeout(() => {
          notifyPartidoCompleto(partidoDemo.descripcion, params.id)
        }, 3000)
      }
    }
  }

  const handleReservar = () => {
    alert('🎉 ¡Cancha reservada exitosamente!\n\nDetalles:\n- Club Padel GDL\n- Cancha 2\n- HOY 18:00\n- 4 jugadores confirmados')
    router.push('/')
  }

  const progreso = (jugadoresActuales / partidoDemo.jugadoresMáximos) * 100
  const faltanJugadores = partidoDemo.jugadoresMáximos - jugadoresActuales
  const partidoCompleto = jugadoresActuales === partidoDemo.jugadoresMáximos

  return (
    <div className="min-h-screen bg-draft-dark flex flex-col pb-20">
      {/* Header */}
      <div className="bg-draft-black border-b border-draft-gray p-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="text-white hover:text-draft-green transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-draft-green to-green-700 rounded-full flex items-center justify-center">
                <span className="text-draft-black font-bold">
                  {partidoDemo.organizador.nombre.charAt(0)}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-draft-black rounded-full px-1 py-0.5 border border-draft-gray">
                <span className="text-xs font-bold text-draft-green">
                  {partidoDemo.organizador.nivel}
                </span>
              </div>
            </div>

            <div>
              <p className="text-white font-semibold">{partidoDemo.organizador.nombre}</p>
              <p className="text-gray-400 text-xs">Organizador</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info del partido */}
      <div className="bg-draft-gray border-b border-draft-black p-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🟢</span>
            <span className="text-white font-bold">{partidoDemo.fecha} · {partidoDemo.hora}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">📍</span>
            <span className="text-white">{partidoDemo.cancha} · {partidoDemo.club}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">👥</span>
            <span className="text-white">
              {faltanJugadores === 0
                ? 'Partido completo'
                : `Faltan ${faltanJugadores} ${faltanJugadores === 1 ? 'jugador' : 'jugadores'}`
              }
            </span>
          </div>
        </div>

        {/* Barra de progreso con puntos */}
        <div className="mt-4">
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: partidoDemo.jugadoresMáximos }).map((_, i) => (
              <div
                key={i}
                className={`h-3 flex-1 rounded-full transition-all duration-300 ${
                  i < jugadoresActuales
                    ? 'bg-draft-green'
                    : 'bg-draft-dark'
                }`}
              />
            ))}
          </div>
          <div className="text-center mt-2">
            <span className="text-draft-green font-bold text-sm">
              {jugadoresActuales}/{partidoDemo.jugadoresMáximos} confirmados
            </span>
          </div>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center">
          <span className="text-xs text-gray-500 bg-draft-gray px-3 py-1 rounded-full">
            💬 Conversación del partido
          </span>
        </div>

        {mensajes.map((mensaje) => (
          <div
            key={mensaje.id}
            className={`flex ${mensaje.isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${mensaje.isCurrentUser ? 'items-end' : 'items-start'}`}>
              {!mensaje.isCurrentUser && (
                <div className="flex items-center gap-2 mb-1 ml-2">
                  <span className="text-xs font-semibold text-gray-400">
                    {mensaje.userName}
                  </span>
                  <span className="text-xs text-draft-green">
                    ⭐ {mensaje.userNivel}
                  </span>
                </div>
              )}

              <div
                className={`rounded-2xl px-4 py-2 ${
                  mensaje.isCurrentUser
                    ? 'bg-draft-green text-draft-black rounded-br-sm'
                    : 'bg-draft-gray text-white rounded-bl-sm'
                }`}
              >
                <p className="text-sm">{mensaje.mensaje}</p>
              </div>

              <div className={`mt-1 ${mensaje.isCurrentUser ? 'text-right mr-2' : 'ml-2'}`}>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(mensaje.timestamp, {
                    addSuffix: true,
                    locale: es
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input de mensaje */}
      <div className="bg-draft-gray border-t border-draft-black p-4">
        <form onSubmit={handleEnviarMensaje} className="flex gap-2">
          <input
            type="text"
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-draft-dark text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-draft-green"
          />
          <button
            type="submit"
            disabled={!nuevoMensaje.trim()}
            className="bg-draft-green text-draft-black px-6 py-3 rounded-xl font-bold hover:shadow-neon transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        </form>
      </div>

      {/* Bottom CTA */}
      <div className="bg-draft-black border-t border-draft-gray p-4">
        {faltanJugadores > 0 ? (
          <div className="space-y-2">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 text-center">
              <span className="text-yellow-500 text-sm font-semibold">
                ⚠️ Falta {faltanJugadores} {faltanJugadores === 1 ? 'jugador' : 'jugadores'} para completar
              </span>
            </div>
            <button
              onClick={handleUnirse}
              className="w-full bg-gradient-to-r from-draft-green to-green-400 text-draft-black font-bold py-4 rounded-xl hover:shadow-neon transition-all duration-300 hover:scale-105 active:scale-95"
            >
              💬 UNIRME AL PARTIDO
            </button>
          </div>
        ) : (
          <button
            onClick={handleReservar}
            className="w-full bg-gradient-to-r from-draft-green to-green-400 text-draft-black font-bold py-4 rounded-xl hover:shadow-neon transition-all duration-300 hover:scale-105 active:scale-95"
          >
            🔒 RESERVAR CANCHA
          </button>
        )}
      </div>
    </div>
  )
}
