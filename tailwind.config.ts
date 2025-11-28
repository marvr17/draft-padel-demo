import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores principales de Draft Padel
        'draft-green': '#00FF00',      // Verde neón del logo
        'draft-black': '#000000',      // Negro del logo
        'draft-dark': '#0A0A0A',       // Negro más suave para backgrounds
        'draft-gray': '#1A1A1A',       // Gris oscuro para cards
        
        // Estados
        'status-available': '#00FF00',  // Verde: disponible
        'status-waiting': '#FFD700',    // Amarillo: esperando jugadores
        'status-upcoming': '#808080',   // Gris: próximamente
        'status-full': '#FF0000',       // Rojo: completo/ocupado
        
        // Niveles (border color según nivel de juego)
        'level-beginner': '#00FF00',    // 1.0-2.5
        'level-intermediate': '#FFD700', // 2.5-3.5
        'level-advanced': '#FF8C00',    // 3.5-4.5
        'level-pro': '#FF0000',         // 4.5-5.0
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0, 255, 0, 0.5)',
        'neon-lg': '0 0 20px rgba(0, 255, 0, 0.6)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
