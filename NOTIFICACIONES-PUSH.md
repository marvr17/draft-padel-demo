# Guía: Notificaciones Push Reales con Firebase

Esta guía te muestra cómo implementar notificaciones push reales que funcionen **incluso cuando la app está cerrada**.

## ¿Qué tienes ahora? (Notificaciones Locales)

✅ Notificaciones cuando la app está abierta
✅ Vibración del dispositivo
✅ Service Worker básico
❌ **NO** funciona cuando la app está cerrada
❌ **NO** se pueden enviar desde el servidor

## ¿Qué necesitas para Push Reales?

🎯 Firebase Cloud Messaging (FCM)
🎯 Backend para enviar notificaciones
🎯 Tokens de usuario almacenados
🎯 Service Worker configurado con FCM

---

## Parte 1: Configurar Firebase Cloud Messaging

### 1.1 Crear proyecto en Firebase

1. Ve a https://console.firebase.google.com/
2. Crea un nuevo proyecto: "Draft Padel"
3. Habilita Firebase Cloud Messaging (FCM)
4. Obtén tu `server_key` y `sender_id`

### 1.2 Instalar dependencias

```bash
npm install firebase
```

### 1.3 Crear archivo de configuración Firebase

Crea `lib/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Obtener token FCM del usuario
export async function getFCMToken(): Promise<string | null> {
  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });
    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Error obteniendo FCM token:', error);
    return null;
  }
}

// Escuchar notificaciones cuando la app está abierta
export function onMessageListener() {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('Mensaje recibido:', payload);
      resolve(payload);
    });
  });
}
```

### 1.4 Configurar variables de entorno

Crea `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=draft-padel.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=draft-padel
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=draft-padel.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
NEXT_PUBLIC_FIREBASE_VAPID_KEY=tu_vapid_key
```

---

## Parte 2: Actualizar Service Worker

Reemplaza `public/sw.js` con este código que integra FCM:

```javascript
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Configuración de Firebase (usar las mismas variables)
firebase.initializeApp({
  apiKey: "tu_api_key",
  authDomain: "draft-padel.firebaseapp.com",
  projectId: "draft-padel",
  storageBucket: "draft-padel.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
});

const messaging = firebase.messaging();

// Manejar notificaciones en background
messaging.onBackgroundMessage((payload) => {
  console.log('Notificación en background:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.jpg',
    badge: '/logo.jpg',
    vibrate: [200, 100, 200],
    data: { url: payload.data?.url || '/' }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Click en notificación
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
```

---

## Parte 3: Registrar Token del Usuario

Actualiza `components/client-layout.tsx`:

```typescript
import { getFCMToken } from '@/lib/firebase';

useEffect(() => {
  // Obtener token FCM y guardarlo
  async function registerFCM() {
    const token = await getFCMToken();
    if (token) {
      // Guardar token en tu backend
      await fetch('/api/save-fcm-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          fcmToken: token
        })
      });
    }
  }

  registerFCM();
}, []);
```

---

## Parte 4: Backend para Enviar Notificaciones

### 4.1 Opción A: API Route en Next.js

Crea `app/api/send-notification/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { userId, title, body, url } = await req.json();

  // Obtener FCM token del usuario desde tu DB
  const userToken = await getUserFCMToken(userId);

  if (!userToken) {
    return NextResponse.json({ error: 'No FCM token' }, { status: 400 });
  }

  // Enviar notificación vía FCM
  const fcmResponse = await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `key=${process.env.FIREBASE_SERVER_KEY}`
    },
    body: JSON.stringify({
      to: userToken,
      notification: {
        title,
        body,
        icon: '/logo.jpg',
        click_action: url
      },
      data: { url }
    })
  });

  return NextResponse.json(await fcmResponse.json());
}
```

### 4.2 Opción B: Supabase Edge Functions

Crea `supabase/functions/send-notification/index.ts`:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const { userId, title, body, url } = await req.json()

  // Obtener token FCM del usuario
  const { data: user } = await supabase
    .from('users')
    .select('fcm_token')
    .eq('id', userId)
    .single()

  if (!user?.fcm_token) {
    return new Response(JSON.stringify({ error: 'No token' }), { status: 400 })
  }

  // Enviar a FCM
  const fcmResponse = await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `key=${Deno.env.get('FIREBASE_SERVER_KEY')}`
    },
    body: JSON.stringify({
      to: user.fcm_token,
      notification: { title, body, icon: '/logo.jpg' },
      data: { url }
    })
  })

  return new Response(JSON.stringify(await fcmResponse.json()))
})
```

---

## Parte 5: Usar en la App

### Cuando alguien se une a un partido:

```typescript
const handleUnirse = async () => {
  // ... tu código actual ...

  // Notificar al organizador
  await fetch('/api/send-notification', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: partido.organizadorId,
      title: '👥 Nuevo Jugador',
      body: `${user.nombre} se unió a tu partido`,
      url: `/anuncio/${partido.id}`
    })
  });
}
```

### Cuando el partido se completa:

```typescript
if (nuevosJugadores === 4) {
  // Notificar a todos los participantes
  for (const participanteId of partido.participantes) {
    await fetch('/api/send-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: participanteId,
        title: '🎾 ¡Partido Completo!',
        body: `El partido "${partido.descripcion}" está listo. ¡A jugar!`,
        url: `/anuncio/${partido.id}`
      })
    });
  }
}
```

---

## Parte 6: Testing

### Probar notificaciones manualmente:

```bash
curl -X POST https://fcm.googleapis.com/fcm/send \
  -H "Authorization: key=TU_SERVER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "USUARIO_FCM_TOKEN",
    "notification": {
      "title": "Test",
      "body": "Notificación de prueba",
      "icon": "/logo.jpg"
    }
  }'
```

---

## Resumen

### Lo que tienes ahora (Local):
- ✅ Notificaciones mientras la app está abierta
- ✅ Vibración
- ⚠️ No funciona con app cerrada

### Con Firebase FCM (Push Real):
- ✅ Notificaciones incluso con app cerrada
- ✅ Enviadas desde el servidor
- ✅ Vibración y sonido
- ✅ Click abre la URL específica
- ✅ Funciona en iOS y Android

### Costos:
- Firebase FCM es **GRATIS** (sin límites)
- Solo pagas por backend (Vercel/Supabase según uso)

---

## Próximos Pasos

1. Crear proyecto en Firebase Console
2. Instalar firebase SDK
3. Configurar Service Worker con FCM
4. Agregar backend para guardar tokens
5. Implementar API para enviar notificaciones
6. Probar en dispositivo real

¿Necesitas ayuda con algún paso específico?
