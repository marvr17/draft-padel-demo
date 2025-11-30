// Utilidades para notificaciones locales
// Draft Padel - Modo Demo

export type NotificationType = 'partido_completo' | 'nuevo_jugador' | 'nuevo_mensaje' | 'general';

interface NotificationOptions {
  title: string;
  body: string;
  type: NotificationType;
  url?: string;
  vibrate?: boolean;
}

// Registrar Service Worker
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registrado:', registration);
      return registration;
    } catch (error) {
      console.error('Error al registrar Service Worker:', error);
      return null;
    }
  }
  return null;
}

// Solicitar permiso de notificaciones
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.log('Este navegador no soporta notificaciones');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

// Vibrar dispositivo
export function vibrate(pattern: number[] = [200, 100, 200]) {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
}

// Mostrar notificación local
export async function showNotification(options: NotificationOptions) {
  const hasPermission = await requestNotificationPermission();

  if (!hasPermission) {
    console.log('Permiso de notificaciones denegado');
    return;
  }

  // Vibrar si está habilitado
  if (options.vibrate !== false) {
    vibrate();
  }

  // Configuración de la notificación
  const notificationOptions: NotificationOptions & { icon?: string; badge?: string } = {
    ...options,
    icon: '/logo.jpg',
    badge: '/logo.jpg',
  };

  // Si hay Service Worker, usar su API
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification(options.title, {
      body: options.body,
      icon: notificationOptions.icon,
      badge: notificationOptions.badge,
      vibrate: options.vibrate !== false ? [200, 100, 200] : undefined,
      data: {
        url: options.url || '/',
        type: options.type,
      },
      tag: options.type, // Evita duplicados del mismo tipo
      requireInteraction: options.type === 'partido_completo', // Requiere acción del usuario para partidos completos
    });
  } else {
    // Fallback a Notification API nativa
    new Notification(options.title, {
      body: options.body,
      icon: notificationOptions.icon,
      vibrate: options.vibrate !== false ? [200, 100, 200] : undefined,
    });
  }
}

// Notificaciones específicas para eventos de la app

export async function notifyPartidoCompleto(nombrePartido: string, partidoId: string) {
  await showNotification({
    title: '🎾 ¡Partido Completo!',
    body: `El partido "${nombrePartido}" ya tiene todos los jugadores. ¡Es hora de jugar!`,
    type: 'partido_completo',
    url: `/anuncio/${partidoId}`,
    vibrate: true,
  });
}

export async function notifyNuevoJugador(nombreJugador: string, partidoId: string) {
  await showNotification({
    title: '👥 Nuevo Jugador',
    body: `${nombreJugador} se unió a tu partido`,
    type: 'nuevo_jugador',
    url: `/anuncio/${partidoId}`,
    vibrate: true,
  });
}

export async function notifyNuevoMensaje(nombreUsuario: string, mensaje: string, partidoId: string) {
  await showNotification({
    title: `💬 ${nombreUsuario}`,
    body: mensaje.length > 60 ? mensaje.substring(0, 60) + '...' : mensaje,
    type: 'nuevo_mensaje',
    url: `/anuncio/${partidoId}`,
    vibrate: false, // Vibración suave solo para mensajes
  });
}

// Inicializar notificaciones (llamar al cargar la app)
export async function initNotifications() {
  await registerServiceWorker();

  // Pedir permiso al usuario de forma no intrusiva
  // (mejor hacerlo después de la primera interacción)
  const hasPermission = Notification.permission === 'granted';

  if (!hasPermission && Notification.permission === 'default') {
    console.log('💡 Tip: Activa las notificaciones para recibir alertas de tus partidos');
  }

  return hasPermission;
}
