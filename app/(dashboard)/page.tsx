// app/(dashboard)/page.tsx
// Pantalla principal: Feed de partidos disponibles
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// Tipos
interface Partido {
  id: string
  status: 'hoy' | 'mañana' | 'proximo'
  hora: string
  organizador: {
    nombre: string
    nivel: number
    avatar: string
  }
  descripcion: string
  cancha: string
  jugadoresNecesarios: number
  nivelMinimo: number
  nivelMaximo: number
  interesados: number
  esTorneo?: boolean
}

export default function FeedPage() {
  const router = useRouter()

  // Mock data - Partidos destacados/recientes para el feed
  const [partidos] = useState<Partido[]>([
    {
      id: '1',
      status: 'hoy',
      hora: '18:00',
      organizador: {
        nombre: 'Mario R.',
        nivel: 3.2,
        avatar: '/avatars/mario.jpg'
      },
      descripcion: 'Partido tranquilo después del trabajo 🎾',
      cancha: 'Cancha 2',
      jugadoresNecesarios: 2,
      nivelMinimo: 3.0,
      nivelMaximo: 3.5,
      interesados: 2
    },
    {
      id: '2',
      status: 'hoy',
      hora: '19:30',
      organizador: {
        nombre: 'Laura M.',
        nivel: 2.5,
        avatar: '/avatars/laura.jpg'
      },
      descripcion: 'Principiantes bienvenidos! Partido para aprender y divertirnos 😊',
      cancha: 'Cancha 3',
      jugadoresNecesarios: 3,
      nivelMinimo: 1.5,
      nivelMaximo: 3.0,
      interesados: 1
    },
    {
      id: '3',
      status: 'hoy',
      hora: '20:00',
      organizador: {
        nombre: 'Carlos V.',
        nivel: 4.2,
        avatar: '/avatars/carlos.jpg'
      },
      descripcion: 'Partido intenso para nivel avanzado. Buscamos buenos jugadores',
      cancha: 'Cancha 1',
      jugadoresNecesarios: 1,
      nivelMinimo: 4.0,
      nivelMaximo: 5.0,
      interesados: 5
    },
    {
      id: '4',
      status: 'mañana',
      hora: '09:00',
      organizador: {
        nombre: 'Ana S.',
        nivel: 3.5,
        avatar: '/avatars/ana.jpg'
      },
      descripcion: 'Partido matutino antes del trabajo ☀️ Buena onda!',
      cancha: 'Cancha 2',
      jugadoresNecesarios: 2,
      nivelMinimo: 3.0,
      nivelMaximo: 4.0,
      interesados: 3
    },
    {
      id: '5',
      status: 'mañana',
      hora: '19:00',
      organizador: {
        nombre: 'Juan + 2 más',
        nivel: 4.0,
        avatar: '/avatars/juan.jpg'
      },
      descripcion: 'Partido competitivo, buen nivel porfa',
      cancha: 'Cancha 1',
      jugadoresNecesarios: 1,
      nivelMinimo: 4.0,
      nivelMaximo: 5.0,
      interesados: 3
    },
    {
      id: '6',
      status: 'mañana',
      hora: '21:00',
      organizador: {
        nombre: 'Roberto P.',
        nivel: 3.0,
        avatar: '/avatars/roberto.jpg'
      },
      descripcion: 'Partido nocturno, nivel intermedio. Ambiente relajado 🌙',
      cancha: 'Cancha 4',
      jugadoresNecesarios: 2,
      nivelMinimo: 2.5,
      nivelMaximo: 3.5,
      interesados: 4
    },
    {
      id: '7',
      status: 'proximo',
      hora: '18:00',
      organizador: {
        nombre: 'Sofia L.',
        nivel: 3.8,
        avatar: '/avatars/sofia.jpg'
      },
      descripcion: 'Partido del miércoles, nivel intermedio-avanzado',
      cancha: 'Cancha 2',
      jugadoresNecesarios: 3,
      nivelMinimo: 3.5,
      nivelMaximo: 4.5,
      interesados: 2
    },
    {
      id: '8',
      status: 'proximo',
      hora: '20:00',
      organizador: {
        nombre: 'RETAS DEL VIERNES',
        nivel: 0,
        avatar: '/avatars/event.jpg'
      },
      descripcion: 'Evento semanal - rotación de parejas cada 30min 🔥',
      cancha: 'Todas las canchas',
      jugadoresNecesarios: 0,
      nivelMinimo: 1.0,
      nivelMaximo: 5.0,
      interesados: 18,
      esTorneo: true
    },
    {
      id: '9',
      status: 'proximo',
      hora: '10:00',
      organizador: {
        nombre: 'Miguel A.',
        nivel: 2.8,
        avatar: '/avatars/miguel.jpg'
      },
      descripcion: 'Sábado por la mañana, nivel básico-intermedio',
      cancha: 'Cancha 3',
      jugadoresNecesarios: 2,
      nivelMinimo: 2.0,
      nivelMaximo: 3.5,
      interesados: 3
    }
  ])

  return (
    <div className="min-h-screen bg-draft-dark pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-draft-black/80 backdrop-blur-md border-b border-draft-gray">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="w-10 h-10 bg-draft-green rounded-lg overflow-hidden">
                <img
                  src="/logo.jpg"
                  alt="Draft Padel"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-xl font-bold text-white">Draft Padel</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Ubicación */}
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">Club Padel GDL</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </header>

      {/* Feed de partidos destacados */}
      <div className="px-4 py-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-lg">Partidos Destacados</h2>
          <button
            onClick={() => router.push('/dashboard/buscar')}
            className="text-draft-green text-sm font-semibold hover:underline"
          >
            Ver todos →
          </button>
        </div>

        {partidos.slice(0, 5).map((partido) => (
          <PartidoCard key={partido.id} partido={partido} />
        ))}
      </div>
    </div>
  )
}

// Componente Card de Partido
function PartidoCard({ partido }: { partido: Partido }) {
  const router = useRouter()

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'hoy':
        return {
          emoji: '🟢',
          label: 'HOY',
          bgColor: 'bg-status-available/10',
          textColor: 'text-status-available',
          borderColor: 'border-status-available'
        }
      case 'mañana':
        return {
          emoji: '🟡',
          label: 'MAÑANA',
          bgColor: 'bg-status-waiting/10',
          textColor: 'text-status-waiting',
          borderColor: 'border-status-waiting'
        }
      default:
        return {
          emoji: '⚪',
          label: 'PRÓXIMAMENTE',
          bgColor: 'bg-status-upcoming/10',
          textColor: 'text-status-upcoming',
          borderColor: 'border-status-upcoming'
        }
    }
  }

  const statusConfig = getStatusConfig(partido.status)

  return (
    <div className={`bg-draft-gray rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02] border ${statusConfig.borderColor} border-opacity-30`}>
      {/* Status Badge */}
      <div className={`${statusConfig.bgColor} px-4 py-2 border-b ${statusConfig.borderColor} border-opacity-20`}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{statusConfig.emoji}</span>
          <span className={`text-sm font-bold ${statusConfig.textColor}`}>
            {statusConfig.label} {partido.hora}
          </span>
        </div>
      </div>

      <div className="p-5">
        {/* Organizador */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            {/* Avatar placeholder */}
            <div className="w-12 h-12 bg-gradient-to-br from-draft-green to-green-700 rounded-full flex items-center justify-center">
              <span className="text-draft-black font-bold">
                {partido.organizador.nombre.charAt(0)}
              </span>
            </div>
            {/* Nivel badge */}
            {!partido.esTorneo && (
              <div className="absolute -bottom-1 -right-1 bg-draft-black rounded-full px-1.5 py-0.5 border-2 border-draft-gray">
                <span className="text-xs font-bold text-draft-green">
                  ⭐ {partido.organizador.nivel}
                </span>
              </div>
            )}
          </div>
          
          <div>
            <p className="text-white font-semibold">{partido.organizador.nombre}</p>
            {!partido.esTorneo && (
              <p className="text-gray-400 text-sm">
                Nivel {partido.organizador.nivel}
              </p>
            )}
          </div>
        </div>

        {/* Descripción */}
        <p className="text-gray-300 mb-4 leading-relaxed">
          {partido.descripcion}
        </p>

        {/* Info del partido */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">📍</span>
            <span className="text-white">{partido.cancha}</span>
          </div>
          
          {!partido.esTorneo && (
            <>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">🎯</span>
                <span className="text-white">
                  Busco: {partido.jugadoresNecesarios} {partido.jugadoresNecesarios === 1 ? 'jugador' : 'jugadores'}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">📊</span>
                <span className="text-white">
                  Nivel: {partido.nivelMinimo} - {partido.nivelMaximo}
                </span>
              </div>
            </>
          )}
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">👥</span>
            <span className="text-white">
              {partido.interesados} {partido.interesados === 1 ? 'interesado' : 'interesados'}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        {!partido.esTorneo && (
          <div className="mb-4">
            <div className="h-1 bg-draft-dark rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-draft-green to-green-400 transition-all duration-500"
                style={{ width: `${(4 - partido.jugadoresNecesarios) / 4 * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={() => router.push(`/anuncio/${partido.id}`)}
          className="w-full bg-gradient-to-r from-draft-green to-green-400 text-draft-black font-bold py-3 rounded-xl hover:shadow-neon transition-all duration-300 hover:scale-105 active:scale-95"
        >
          💬 {partido.esTorneo ? 'APUNTARME' : 'UNIRME'}
        </button>
      </div>
    </div>
  )
}
