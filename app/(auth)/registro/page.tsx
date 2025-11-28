'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Schema de validación
const registroSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
  nivel: z.number().min(1.0).max(5.0),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

type RegistroForm = z.infer<typeof registroSchema>

export default function RegistroPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistroForm>({
    resolver: zodResolver(registroSchema),
    defaultValues: {
      nivel: 3.0,
    },
  })

  const nivelActual = watch('nivel')

  const onSubmit = async (formData: RegistroForm) => {
    setLoading(true)
    setError(null)

    try {
      // MODO DEMO - Sin Supabase
      // Simular delay de creación de cuenta
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Guardar usuario demo en localStorage
      localStorage.setItem('demoUser', JSON.stringify({
        id: 'demo-user-' + Date.now(),
        nombre: formData.nombre,
        email: formData.email,
        nivel: formData.nivel,
        ubicacion: '',
        bio: ''
      }))

      // Redirigir directamente al feed (sin onboarding para simplificar demo)
      router.push('/')
    } catch (err: any) {
      setError(err.message || 'Error al crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-draft-dark flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-draft-green rounded-2xl mb-3">
            <span className="text-draft-black font-bold text-3xl">D</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Crear Cuenta</h1>
          <p className="text-gray-400 text-sm">Únete a la comunidad de Draft Padel</p>
        </div>

        {/* Formulario */}
        <div className="bg-draft-gray rounded-2xl p-6 shadow-card">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Error general */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-2">
                Nombre completo
              </label>
              <input
                id="nombre"
                type="text"
                {...register('nombre')}
                className="w-full bg-draft-dark text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-draft-green border border-transparent"
                placeholder="Juan Pérez"
              />
              {errors.nombre && (
                <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="w-full bg-draft-dark text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-draft-green border border-transparent"
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Nivel */}
            <div>
              <label htmlFor="nivel" className="block text-sm font-medium text-gray-300 mb-2">
                Nivel de juego: <span className="text-draft-green font-bold">{nivelActual || 3.0}</span>
              </label>
              <input
                id="nivel"
                type="range"
                min="1.0"
                max="5.0"
                step="0.5"
                {...register('nivel', { valueAsNumber: true })}
                className="w-full h-2 bg-draft-dark rounded-lg appearance-none cursor-pointer accent-draft-green"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1.0 Principiante</span>
                <span>5.0 Profesional</span>
              </div>
              {errors.nivel && (
                <p className="text-red-500 text-xs mt-1">{errors.nivel.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                {...register('password')}
                className="w-full bg-draft-dark text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-draft-green border border-transparent"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirmar Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className="w-full bg-draft-dark text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-draft-green border border-transparent"
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-draft-green to-green-400 text-draft-black font-bold py-3 rounded-xl hover:shadow-neon transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
          </form>

          {/* Link a Login */}
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" className="text-draft-green font-semibold hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
