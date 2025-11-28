'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, Search, PlusCircle, MessageCircle, User } from 'lucide-react'

export default function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: 'Inicio',
      icon: Home,
      path: '/'
    },
    {
      name: 'Buscar',
      icon: Search,
      path: '/buscar'
    },
    {
      name: 'Crear',
      icon: PlusCircle,
      path: '/crear',
      special: true
    },
    {
      name: 'Chats',
      icon: MessageCircle,
      path: '/chats'
    },
    {
      name: 'Perfil',
      icon: User,
      path: '/perfil'
    }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-draft-black/80 border-t border-white/10"></div>

      {/* Gradient overlay */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-draft-green/50 to-transparent"></div>

      <div className="relative px-4 pb-2 pt-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.path
            const Icon = item.icon

            if (item.special) {
              return (
                <Link key={item.name} href={item.path} className="relative -mt-8">
                  <div className="relative group">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-draft-green/40 rounded-full blur-2xl animate-pulse group-hover:blur-3xl transition-all"></div>

                    {/* Pelota de Padel Button */}
                    <div className="relative w-16 h-16 rounded-full hover:scale-110 active:scale-95 transition-transform duration-300 cursor-pointer">
                      {/* Pelota base con gradiente */}
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-draft-green to-green-500 rounded-full shadow-2xl border-4 border-draft-black"></div>

                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full"></div>

                      {/* Agujeros de la pelota (patrón de pádel) */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 64">
                        {/* Agujeros distribuidos */}
                        <circle cx="20" cy="18" r="2.5" fill="#1A1A1A" opacity="0.3" />
                        <circle cx="32" cy="15" r="2.5" fill="#1A1A1A" opacity="0.3" />
                        <circle cx="44" cy="18" r="2.5" fill="#1A1A1A" opacity="0.3" />

                        <circle cx="15" cy="28" r="2.5" fill="#1A1A1A" opacity="0.3" />
                        <circle cx="26" cy="26" r="2.5" fill="#1A1A1A" opacity="0.3" />
                        <circle cx="38" cy="26" r="2.5" fill="#1A1A1A" opacity="0.3" />
                        <circle cx="49" cy="28" r="2.5" fill="#1A1A1A" opacity="0.3" />

                        <circle cx="20" cy="36" r="2.5" fill="#1A1A1A" opacity="0.3" />
                        <circle cx="32" cy="35" r="2.5" fill="#1A1A1A" opacity="0.3" />
                        <circle cx="44" cy="36" r="2.5" fill="#1A1A1A" opacity="0.3" />

                        <circle cx="15" cy="46" r="2.5" fill="#1A1A1A" opacity="0.3" />
                        <circle cx="26" cy="45" r="2.5" fill="#1A1A1A" opacity="0.3" />
                        <circle cx="38" cy="45" r="2.5" fill="#1A1A1A" opacity="0.3" />
                        <circle cx="49" cy="46" r="2.5" fill="#1A1A1A" opacity="0.3" />
                      </svg>

                      {/* Icono + centrado */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-draft-black drop-shadow-lg" strokeWidth={3} />
                      </div>

                      {/* Shadow 3D effect */}
                      <div className="absolute -bottom-1 inset-x-0 h-3 bg-black/20 blur-md rounded-full scale-90"></div>
                    </div>
                  </div>
                </Link>
              )
            }

            return (
              <Link
                key={item.name}
                href={item.path}
                className="relative flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all duration-300 group hover:bg-white/5"
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-draft-green rounded-full">
                    <div className="absolute inset-0 bg-draft-green rounded-full animate-ping"></div>
                  </div>
                )}

                {/* Icon with hover effect */}
                <div className="relative">
                  <Icon
                    className={`w-6 h-6 transition-all duration-300 ${
                      isActive
                        ? 'text-draft-green scale-110'
                        : 'text-gray-400 group-hover:text-white group-hover:scale-110'
                    }`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />

                  {/* Hover glow */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-draft-green/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-xs font-medium transition-all duration-300 ${
                    isActive ? 'text-draft-green' : 'text-gray-400 group-hover:text-white'
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
