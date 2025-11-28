// types/database.types.ts
// Tipos generados desde el schema de Supabase
// Para regenerar: npx supabase gen types typescript --project-id your-project-id > types/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          nombre: string
          telefono: string | null
          nivel_juego: number | null
          bio: string | null
          avatar_url: string | null
          partidos_jugados: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          nombre: string
          telefono?: string | null
          nivel_juego?: number | null
          bio?: string | null
          avatar_url?: string | null
          partidos_jugados?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          telefono?: string | null
          nivel_juego?: number | null
          bio?: string | null
          avatar_url?: string | null
          partidos_jugados?: number
          created_at?: string
          updated_at?: string
        }
      }
      clubes: {
        Row: {
          id: string
          nombre: string
          direccion: string
          ciudad: string
          telefono: string | null
          horario_apertura: string
          horario_cierre: string
          intervalo_minutos: number
          created_at: string
        }
        Insert: {
          id?: string
          nombre: string
          direccion: string
          ciudad: string
          telefono?: string | null
          horario_apertura: string
          horario_cierre: string
          intervalo_minutos?: number
          created_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          direccion?: string
          ciudad?: string
          telefono?: string | null
          horario_apertura?: string
          horario_cierre?: string
          intervalo_minutos?: number
          created_at?: string
        }
      }
      canchas: {
        Row: {
          id: string
          club_id: string
          numero: number
          nombre: string | null
          activa: boolean
          created_at: string
        }
        Insert: {
          id?: string
          club_id: string
          numero: number
          nombre?: string | null
          activa?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          club_id?: string
          numero?: number
          nombre?: string | null
          activa?: boolean
          created_at?: string
        }
      }
      disponibilidad: {
        Row: {
          id: string
          cancha_id: string
          fecha: string
          hora_inicio: string
          hora_fin: string
          disponible: boolean
          created_at: string
        }
        Insert: {
          id?: string
          cancha_id: string
          fecha: string
          hora_inicio: string
          hora_fin: string
          disponible?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          cancha_id?: string
          fecha?: string
          hora_inicio?: string
          hora_fin?: string
          disponible?: boolean
          created_at?: string
        }
      }
      anuncios: {
        Row: {
          id: string
          creador_id: string
          club_id: string
          cancha_id: string | null
          fecha: string
          hora_inicio: string
          nivel_minimo: number
          nivel_maximo: number
          jugadores_necesarios: number
          descripcion: string | null
          status: 'abierto' | 'completo' | 'reservado' | 'cancelado'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          creador_id: string
          club_id: string
          cancha_id?: string | null
          fecha: string
          hora_inicio: string
          nivel_minimo: number
          nivel_maximo: number
          jugadores_necesarios?: number
          descripcion?: string | null
          status?: 'abierto' | 'completo' | 'reservado' | 'cancelado'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          creador_id?: string
          club_id?: string
          cancha_id?: string | null
          fecha?: string
          hora_inicio?: string
          nivel_minimo?: number
          nivel_maximo?: number
          jugadores_necesarios?: number
          descripcion?: string | null
          status?: 'abierto' | 'completo' | 'reservado' | 'cancelado'
          created_at?: string
          updated_at?: string
        }
      }
      interesados: {
        Row: {
          id: string
          anuncio_id: string
          user_id: string
          mensaje_inicial: string | null
          confirmado: boolean
          created_at: string
        }
        Insert: {
          id?: string
          anuncio_id: string
          user_id: string
          mensaje_inicial?: string | null
          confirmado?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          anuncio_id?: string
          user_id?: string
          mensaje_inicial?: string | null
          confirmado?: boolean
          created_at?: string
        }
      }
      mensajes: {
        Row: {
          id: string
          anuncio_id: string
          from_user_id: string
          mensaje: string
          leido: boolean
          created_at: string
        }
        Insert: {
          id?: string
          anuncio_id: string
          from_user_id: string
          mensaje: string
          leido?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          anuncio_id?: string
          from_user_id?: string
          mensaje?: string
          leido?: boolean
          created_at?: string
        }
      }
      reservas: {
        Row: {
          id: string
          anuncio_id: string
          club_id: string
          cancha_id: string
          fecha: string
          hora_inicio: string
          hora_fin: string
          jugadores: string[]
          confirmada_por_club: boolean
          pagada: boolean
          created_at: string
        }
        Insert: {
          id?: string
          anuncio_id: string
          club_id: string
          cancha_id: string
          fecha: string
          hora_inicio: string
          hora_fin: string
          jugadores: string[]
          confirmada_por_club?: boolean
          pagada?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          anuncio_id?: string
          club_id?: string
          cancha_id?: string
          fecha?: string
          hora_inicio?: string
          hora_fin?: string
          jugadores?: string[]
          confirmada_por_club?: boolean
          pagada?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
