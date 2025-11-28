# Configuración de Supabase para Draft Padel

## Paso 1: Crear proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Guarda la contraseña de la base de datos

## Paso 2: Configurar variables de entorno

1. En el dashboard de Supabase, ve a **Settings** > **API**
2. Copia el **Project URL** y el **anon/public key**
3. Abre el archivo `.env.local` en la raíz del proyecto
4. Reemplaza los valores:

```env
NEXT_PUBLIC_SUPABASE_URL=tu-project-url-aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

## Paso 3: Ejecutar SQL para crear tablas

Ve a **SQL Editor** en Supabase y ejecuta este código:

```sql
-- Habilitar UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de perfiles de usuario
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  nivel NUMERIC(2,1) DEFAULT 3.0,
  avatar_url TEXT,
  ubicacion TEXT,
  bio TEXT,
  edad INTEGER,
  preferencia_horario TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Los usuarios pueden ver todos los perfiles"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Los usuarios pueden actualizar su propio perfil"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden insertar su propio perfil"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Paso 4: Configurar Storage para avatars

1. Ve a **Storage** en el dashboard de Supabase
2. Crea un nuevo bucket llamado `avatars`
3. Hazlo **público** (public bucket)
4. Configura las políticas de storage:

```sql
-- Política para subir avatars
CREATE POLICY "Los usuarios pueden subir su avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Política para actualizar avatars
CREATE POLICY "Los usuarios pueden actualizar su avatar"
  ON storage.objects FOR UPDATE
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Política para ver avatars
CREATE POLICY "Todos pueden ver avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');
```

## Paso 5: Configurar autenticación

1. Ve a **Authentication** > **Settings**
2. En **Email Templates**, personaliza los emails si quieres
3. En **Auth Providers**, habilita **Email** (ya debería estar habilitado)

## Paso 6: Reiniciar el servidor

Después de configurar las variables de entorno:

```bash
# Detener el servidor (Ctrl+C)
# Volver a iniciar
npm run dev
```

## ¡Listo!

Ahora puedes:
1. Ir a http://localhost:3000
2. Ver el intro animado
3. Registrarte con email/password
4. Completar tu perfil
5. Subir tu foto de perfil
6. Navegar por la aplicación

## Próximos pasos (opcional)

- Configurar el dominio de producción en Supabase
- Personalizar los emails de autenticación
- Agregar autenticación con Google/Facebook
- Configurar políticas de seguridad más complejas
