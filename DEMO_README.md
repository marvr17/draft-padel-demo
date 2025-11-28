# Draft Padel - Modo Demo 🎾

## ✅ Funcionalidades Completadas

Todas las páginas están funcionando en **modo demo** (sin necesidad de Supabase):

### 1. **Autenticación (Demo)**
- ✅ Login con credenciales demo
- ✅ Registro de nuevos usuarios (se guarda en localStorage)
- ✅ Sesión persistente en localStorage

**Credenciales Demo:**
- Email: `demo@draftpadel.com`
- Password: `demo123`

### 2. **Feed Principal**
- ✅ Lista de partidos disponibles con datos mock
- ✅ Cards con toda la información (organizador, nivel, hora, etc.)
- ✅ Navegación al detalle del partido
- ✅ Estados visuales (HOY, MAÑANA, PRÓXIMO)

### 3. **Crear Partido**
- ✅ Formulario completo con todos los campos
- ✅ Selección de fecha (Hoy, Mañana, Personalizada)
- ✅ Selección de hora
- ✅ Selección de cancha
- ✅ Rango de nivel requerido
- ✅ Vista previa en tiempo real
- ✅ Simulación de publicación

### 4. **Detalle + Chat**
- ✅ Información del partido
- ✅ Chat funcional en tiempo real (modo demo)
- ✅ Envío de mensajes
- ✅ Barra de progreso de jugadores
- ✅ Botón "UNIRME" dinámico
- ✅ Botón "RESERVAR CANCHA" cuando está completo

### 5. **Lista de Chats**
- ✅ Conversaciones de partidos activos
- ✅ Indicador de mensajes no leídos
- ✅ Timestamp relativo
- ✅ Estado del partido (completo/incompleto)
- ✅ Navegación al detalle

### 6. **Búsqueda**
- ✅ Barra de búsqueda por texto
- ✅ Filtros por fecha (Hoy, Mañana, Próximo)
- ✅ Filtro por nivel
- ✅ Resultados en tiempo real
- ✅ Contador de resultados

### 7. **Perfil**
- ✅ Visualización de datos del usuario
- ✅ Edición de perfil
- ✅ Stats (partidos jugados, nivel, completados)
- ✅ Logros
- ✅ Historial de partidos
- ✅ Cerrar sesión

### 8. **Bottom Navigation**
- ✅ Navegación entre todas las secciones
- ✅ Botón central elevado para "Crear"
- ✅ Indicadores activos

---

## 🚀 Cómo Probar la App

### 1. Instalar dependencias

```bash
cd draft-padel
npm install
```

### 2. Correr en desarrollo

```bash
npm run dev
```

### 3. Abrir en el navegador

```
http://localhost:3000
```

### 4. Iniciar sesión

Usa las credenciales demo:
- **Email:** `demo@draftpadel.com`
- **Password:** `demo123`

O crea una cuenta nueva desde "Regístrate aquí".

---

## 🎮 Flujo de Prueba Sugerido

1. **Login** → Usa las credenciales demo o regístrate
2. **Feed** → Explora los partidos disponibles
3. **Detalle** → Click en "UNIRME" de cualquier partido
4. **Chat** → Envía mensajes en la conversación
5. **Crear** → Click en el botón central para crear un partido
6. **Buscar** → Usa filtros para buscar partidos
7. **Chats** → Ve todas tus conversaciones activas
8. **Perfil** → Edita tu información personal

---

## 📦 Dependencias Necesarias

Asegúrate de tener instaladas estas dependencias:

```json
{
  "date-fns": "^latest",
  "zod": "^latest",
  "react-hook-form": "^latest",
  "@hookform/resolvers": "^latest"
}
```

Si faltan, instálalas:

```bash
npm install date-fns zod react-hook-form @hookform/resolvers
```

---

## 💾 Datos Demo

Todos los datos están **hardcodeados** en los componentes:

- **Partidos:** `app/(dashboard)/page.tsx`
- **Chats:** `app/(dashboard)/chats/page.tsx`
- **Búsqueda:** `app/(dashboard)/buscar/page.tsx`
- **Usuario:** `localStorage.demoUser`

---

## 🎨 Diseño

La app sigue el diseño de Canva:
- Verde neón (`#00FF00`) como color principal
- Dark theme (`#0A0A0A`, `#1A1A1A`)
- Mobile-first
- Animaciones suaves

---

## 🔄 Próximos Pasos (Integración Real)

Para convertir esto en una app real con Supabase:

1. Configurar proyecto en Supabase
2. Ejecutar `schema.sql`
3. Configurar `.env.local` con las keys
4. Reemplazar datos mock por queries a Supabase
5. Implementar real-time subscriptions en el chat
6. Implementar autenticación real

---

## ✨ Características del Modo Demo

- ✅ Sin dependencia de backend
- ✅ Datos persistentes en localStorage
- ✅ Todo funcional visualmente
- ✅ Simula delays de red
- ✅ Perfecto para presentaciones y testing

---

¡Disfruta probando Draft Padel! 🎾
