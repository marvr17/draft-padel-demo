'use client'

import { useRouter } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

interface Chat {
  id: string
  partidoId: string
  partidoTitulo: string
  ultimoMensaje: string
  timestamp: Date
  noLeidos: number
  organizador: {
    nombre: string
    nivel: number
  }
  jugadores: number
  jugadoresMax: number
}

const chatsDemo: Chat[] = [
  {
    id: '1',
    partidoId: '1',
    partidoTitulo: 'HOY 18:00 - Cancha 2',
    ultimoMensaje: 'Genial! Ya solo falta 1 jugador más',
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
    noLeidos: 2,
    organizador: {
      nombre: 'Mario R.',
      nivel: 3.2
    },
    jugadores: 3,
    jugadoresMax: 4
  },
  {
    id: '2',
    partidoId: '2',
    partidoTitulo: 'HOY 19:30 - Cancha 3',
    ultimoMensaje: 'Tranquilos, es para principiantes 😊',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    noLeidos: 1,
    organizador: {
      nombre: 'Laura M.',
      nivel: 2.5
    },
    jugadores: 2,
    jugadoresMax: 4
  },
  {
    id: '3',
    partidoId: '3',
    partidoTitulo: 'HOY 20:00 - Cancha 1',
    ultimoMensaje: 'Confirmado! Nos vemos en 2 horas',
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
    noLeidos: 0,
    organizador: {
      nombre: 'Carlos V.',
      nivel: 4.2
    },
    jugadores: 4,
    jugadoresMax: 4
  },
  {
    id: '4',
    partidoId: '4',
    partidoTitulo: 'MAÑANA 09:00 - Cancha 2',
    ultimoMensaje: 'Alguien puede traer pelotas?',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    noLeidos: 3,
    organizador: {
      nombre: 'Ana S.',
      nivel: 3.5
    },
    jugadores: 3,
    jugadoresMax: 4
  },
  {
    id: '5',
    partidoId: '5',
    partidoTitulo: 'MAÑANA 19:00 - Cancha 1',
    ultimoMensaje: 'Perfecto, nos vemos mañana',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    noLeidos: 0,
    organizador: {
      nombre: 'Juan + 2 más',
      nivel: 4.0
    },
    jugadores: 4,
    jugadoresMax: 4
  },
  {
    id: '6',
    partidoId: '6',
    partidoTitulo: 'MAÑANA 21:00 - Cancha 4',
    ultimoMensaje: 'Buenísimo! Ya somos 3',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    noLeidos: 0,
    organizador: {
      nombre: 'Roberto P.',
      nivel: 3.0
    },
    jugadores: 3,
    jugadoresMax: 4
  },
  {
    id: '7',
    partidoId: '8',
    partidoTitulo: 'VIERNES 20:00 - Torneo',
    ultimoMensaje: 'Se viene el partidazo del viernes 🔥',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    noLeidos: 8,
    organizador: {
      nombre: 'RETAS DEL VIERNES',
      nivel: 0
    },
    jugadores: 18,
    jugadoresMax: 20
  }
]

export default function ChatsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-draft-dark pb-24">
      {/* Header */}
      <div className="bg-draft-black border-b border-draft-gray p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-white">Mis Conversaciones</h1>
        <p className="text-gray-400 text-sm mt-1">
          Chats de partidos activos
        </p>
      </div>

      {/* Lista de chats */}
      <div className="divide-y divide-draft-gray">
        {chatsDemo.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="w-24 h-24 bg-draft-gray rounded-full flex items-center justify-center mb-4">
              <span className="text-5xl">💬</span>
            </div>
            <h3 className="text-white font-semibold mb-2">No tienes conversaciones</h3>
            <p className="text-gray-400 text-sm text-center mb-6">
              Únete a un partido para empezar a chatear
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-draft-green to-green-400 text-draft-black font-bold px-6 py-3 rounded-xl hover:shadow-neon transition-all"
            >
              Ver partidos disponibles
            </button>
          </div>
        ) : (
          chatsDemo.map((chat) => (
            <div
              key={chat.id}
              onClick={() => router.push(`/anuncio/${chat.partidoId}`)}
              className="p-4 hover:bg-draft-gray/50 transition-colors cursor-pointer active:bg-draft-gray"
            >
              <div className="flex gap-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-draft-green to-green-700 rounded-full flex items-center justify-center">
                    <span className="text-draft-black font-bold text-xl">
                      {chat.organizador.nombre.charAt(0)}
                    </span>
                  </div>

                  {/* Badge de no leídos */}
                  {chat.noLeidos > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {chat.noLeidos}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header del chat */}
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-sm">
                        {chat.organizador.nombre}
                      </h3>
                      <p className="text-draft-green text-xs">
                        {chat.partidoTitulo}
                      </p>
                    </div>
                    <span className="text-gray-500 text-xs ml-2 flex-shrink-0">
                      {formatDistanceToNow(chat.timestamp, {
                        addSuffix: true,
                        locale: es
                      })}
                    </span>
                  </div>

                  {/* Último mensaje */}
                  <p className={`text-sm truncate ${
                    chat.noLeidos > 0 ? 'text-white font-semibold' : 'text-gray-400'
                  }`}>
                    {chat.ultimoMensaje}
                  </p>

                  {/* Status del partido */}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500 text-xs">👥</span>
                      <span className="text-gray-400 text-xs">
                        {chat.jugadores}/{chat.jugadoresMax}
                      </span>
                    </div>

                    {chat.jugadores === chat.jugadoresMax && (
                      <div className="bg-draft-green/20 border border-draft-green/30 px-2 py-0.5 rounded-full">
                        <span className="text-draft-green text-xs font-semibold">
                          Completo
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Empty state alternativo con sugerencias */}
      {chatsDemo.length > 0 && (
        <div className="p-4 mt-6">
          <div className="bg-draft-gray rounded-2xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-3">
              💡 Tip: Únete a más partidos para ampliar tu red
            </p>
            <button
              onClick={() => router.push('/')}
              className="text-draft-green font-semibold text-sm hover:underline"
            >
              Ver todos los partidos →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
