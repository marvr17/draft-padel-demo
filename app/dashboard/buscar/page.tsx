'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Partido {
  id: string
  status: 'hoy' | 'mañana' | 'proximo'
  hora: string
  organizador: {
    nombre: string
    nivel: number
  }
  descripcion: string
  cancha: string
  jugadoresNecesarios: number
  nivelMinimo: number
  nivelMaximo: number
}

const partidosDemo: Partido[] = [
  {
    id: '1',
    status: 'hoy',
    hora: '18:00',
    organizador: { nombre: 'Mario R.', nivel: 3.2 },
    descripcion: 'Partido tranquilo después del trabajo',
    cancha: 'Cancha 2',
    jugadoresNecesarios: 2,
    nivelMinimo: 3.0,
    nivelMaximo: 3.5
  },
  {
    id: '2',
    status: 'hoy',
    hora: '19:30',
    organizador: { nombre: 'Laura M.', nivel: 2.5 },
    descripcion: 'Principiantes bienvenidos! Partido para aprender',
    cancha: 'Cancha 3',
    jugadoresNecesarios: 3,
    nivelMinimo: 1.5,
    nivelMaximo: 3.0
  },
  {
    id: '3',
    status: 'hoy',
    hora: '20:00',
    organizador: { nombre: 'Carlos V.', nivel: 4.2 },
    descripcion: 'Partido intenso para nivel avanzado',
    cancha: 'Cancha 1',
    jugadoresNecesarios: 1,
    nivelMinimo: 4.0,
    nivelMaximo: 5.0
  },
  {
    id: '4',
    status: 'mañana',
    hora: '09:00',
    organizador: { nombre: 'Ana S.', nivel: 3.5 },
    descripcion: 'Partido matutino antes del trabajo',
    cancha: 'Cancha 2',
    jugadoresNecesarios: 2,
    nivelMinimo: 3.0,
    nivelMaximo: 4.0
  },
  {
    id: '5',
    status: 'mañana',
    hora: '19:00',
    organizador: { nombre: 'Juan P.', nivel: 4.0 },
    descripcion: 'Partido competitivo, buen nivel',
    cancha: 'Cancha 1',
    jugadoresNecesarios: 1,
    nivelMinimo: 4.0,
    nivelMaximo: 5.0
  },
  {
    id: '6',
    status: 'mañana',
    hora: '21:00',
    organizador: { nombre: 'Roberto P.', nivel: 3.0 },
    descripcion: 'Partido nocturno, nivel intermedio',
    cancha: 'Cancha 4',
    jugadoresNecesarios: 2,
    nivelMinimo: 2.5,
    nivelMaximo: 3.5
  },
  {
    id: '7',
    status: 'proximo',
    hora: '18:00',
    organizador: { nombre: 'Sofia L.', nivel: 3.8 },
    descripcion: 'Partido del miércoles, nivel intermedio-avanzado',
    cancha: 'Cancha 2',
    jugadoresNecesarios: 3,
    nivelMinimo: 3.5,
    nivelMaximo: 4.5
  },
  {
    id: '8',
    status: 'proximo',
    hora: '10:00',
    organizador: { nombre: 'Miguel A.', nivel: 2.8 },
    descripcion: 'Sábado por la mañana, nivel básico-intermedio',
    cancha: 'Cancha 3',
    jugadoresNecesarios: 2,
    nivelMinimo: 2.0,
    nivelMaximo: 3.5
  },
  {
    id: '9',
    status: 'hoy',
    hora: '17:00',
    organizador: { nombre: 'Patricia G.', nivel: 3.3 },
    descripcion: 'Partido corto de 1 hora',
    cancha: 'Cancha 4',
    jugadoresNecesarios: 1,
    nivelMinimo: 3.0,
    nivelMaximo: 4.0
  },
  {
    id: '10',
    status: 'mañana',
    hora: '12:00',
    organizador: { nombre: 'Diego M.', nivel: 4.5 },
    descripcion: 'Partido de mediodía, nivel profesional',
    cancha: 'Cancha 1',
    jugadoresNecesarios: 3,
    nivelMinimo: 4.0,
    nivelMaximo: 5.0
  }
]

export default function BuscarPage() {
  const router = useRouter()
  const [busqueda, setBusqueda] = useState('')
  const [filtroFecha, setFiltroFecha] = useState<'todos' | 'hoy' | 'mañana' | 'proximo'>('todos')
  const [filtroNivel, setFiltroNivel] = useState<number | null>(null)
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  // Filtrar partidos
  const partidosFiltrados = partidosDemo.filter(partido => {
    // Filtro de búsqueda
    if (busqueda) {
      const searchLower = busqueda.toLowerCase()
      const matchBusqueda =
        partido.organizador.nombre.toLowerCase().includes(searchLower) ||
        partido.descripcion.toLowerCase().includes(searchLower) ||
        partido.cancha.toLowerCase().includes(searchLower)

      if (!matchBusqueda) return false
    }

    // Filtro de fecha
    if (filtroFecha !== 'todos' && partido.status !== filtroFecha) {
      return false
    }

    // Filtro de nivel
    if (filtroNivel !== null) {
      if (filtroNivel < partido.nivelMinimo || filtroNivel > partido.nivelMaximo) {
        return false
      }
    }

    return true
  })

  const limpiarFiltros = () => {
    setBusqueda('')
    setFiltroFecha('todos')
    setFiltroNivel(null)
  }

  const hayFiltrosActivos = busqueda || filtroFecha !== 'todos' || filtroNivel !== null

  return (
    <div className="min-h-screen bg-draft-dark pb-24">
      {/* Header */}
      <div className="bg-draft-black border-b border-draft-gray p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-white mb-3">Buscar Partidos</h1>

        {/* Barra de búsqueda */}
        <div className="relative mb-3">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, descripción..."
            className="w-full bg-draft-gray text-white placeholder-gray-500 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-draft-green"
          />
          <svg className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          {busqueda && (
            <button
              onClick={() => setBusqueda('')}
              className="absolute right-3 top-3.5 text-gray-500 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Botón de filtros */}
        <div className="flex gap-2">
          <button
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-semibold transition-all ${
              mostrarFiltros || hayFiltrosActivos
                ? 'bg-draft-green text-draft-black'
                : 'bg-draft-gray text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filtros
            {hayFiltrosActivos && <span className="bg-draft-black rounded-full w-2 h-2"></span>}
          </button>

          {hayFiltrosActivos && (
            <button
              onClick={limpiarFiltros}
              className="px-4 py-2 bg-draft-gray text-white rounded-xl font-semibold hover:bg-draft-gray/80 transition-all"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Panel de filtros */}
      {mostrarFiltros && (
        <div className="bg-draft-gray border-b border-draft-black p-4 space-y-4">
          {/* Filtro de fecha */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              📅 Cuándo
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: 'todos', label: 'Todos' },
                { value: 'hoy', label: 'Hoy' },
                { value: 'mañana', label: 'Mañana' },
                { value: 'proximo', label: 'Próximo' }
              ].map(opcion => (
                <button
                  key={opcion.value}
                  onClick={() => setFiltroFecha(opcion.value as any)}
                  className={`py-2 rounded-xl text-sm font-semibold transition-all ${
                    filtroFecha === opcion.value
                      ? 'bg-draft-green text-draft-black'
                      : 'bg-draft-dark text-white hover:bg-draft-dark/80'
                  }`}
                >
                  {opcion.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro de nivel */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              📊 Mi nivel: {filtroNivel !== null ? filtroNivel.toFixed(1) : 'Todos'}
            </label>
            <input
              type="range"
              min="1.0"
              max="5.0"
              step="0.5"
              value={filtroNivel || 3.0}
              onChange={(e) => setFiltroNivel(parseFloat(e.target.value))}
              className="w-full h-2 bg-draft-dark rounded-lg appearance-none cursor-pointer accent-draft-green"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1.0</span>
              <button
                onClick={() => setFiltroNivel(null)}
                className="text-draft-green hover:underline"
              >
                Ver todos
              </button>
              <span>5.0</span>
            </div>
          </div>
        </div>
      )}

      {/* Resultados */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-400 text-sm">
            {partidosFiltrados.length} {partidosFiltrados.length === 1 ? 'partido' : 'partidos'} encontrados
          </p>
        </div>

        {partidosFiltrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="w-24 h-24 bg-draft-gray rounded-full flex items-center justify-center mb-4">
              <span className="text-5xl">🔍</span>
            </div>
            <h3 className="text-white font-semibold mb-2">No hay resultados</h3>
            <p className="text-gray-400 text-sm text-center mb-6">
              Intenta con otros filtros o búsqueda
            </p>
            <button
              onClick={limpiarFiltros}
              className="text-draft-green font-semibold hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {partidosFiltrados.map(partido => (
              <div
                key={partido.id}
                onClick={() => router.push(`/anuncio/${partido.id}`)}
                className="bg-draft-gray rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-draft-green/30"
              >
                <div className="bg-draft-green/10 px-4 py-2 border-b border-draft-green/20">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      {partido.status === 'hoy' ? '🟢' : partido.status === 'mañana' ? '🟡' : '⚪'}
                    </span>
                    <span className="text-sm font-bold text-draft-green uppercase">
                      {partido.status} {partido.hora}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-draft-green to-green-700 rounded-full flex items-center justify-center">
                        <span className="text-draft-black font-bold">
                          {partido.organizador.nombre.charAt(0)}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-draft-black rounded-full px-1.5 py-0.5 border-2 border-draft-gray">
                        <span className="text-xs font-bold text-draft-green">
                          ⭐ {partido.organizador.nivel}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-white font-semibold">{partido.organizador.nombre}</p>
                      <p className="text-gray-400 text-sm">Nivel {partido.organizador.nivel}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-3 text-sm">{partido.descripcion}</p>

                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">📍</span>
                      <span className="text-white">{partido.cancha}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">🎯</span>
                      <span className="text-white">
                        Busco: {partido.jugadoresNecesarios} {partido.jugadoresNecesarios === 1 ? 'jugador' : 'jugadores'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">📊</span>
                      <span className="text-white">
                        Nivel: {partido.nivelMinimo.toFixed(1)} - {partido.nivelMaximo.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
