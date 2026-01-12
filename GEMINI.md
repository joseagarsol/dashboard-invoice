# Contexto del Proyecto: Dashboard Invoice (Next.js 15 + React 19)

Este archivo define las reglas arquitectónicas, el stack tecnológico y las convenciones de código para este proyecto. Úsalo como "Source of Truth" antes de generar o refactorizar código.

## 🛠 Tech Stack (Bleeding Edge)

- **Framework:** Next.js 15 (App Router, Turbopack).
- **Runtime:** Node.js 24+.
- **Core:** React 19 (RSC, Server Actions, `useActionState`, `useOptimistic`).
- **Lenguaje:** TypeScript (Strict mode).
- **Base de Datos:** PostgreSQL (Neon Tech - Serverless).
- **ORM:** Drizzle ORM (sintaxis SQL-like).
- **Estilos:** Tailwind CSS + Shadcn/ui.
- **Validación:** Zod.
- **Iconos:** Lucide React.

## 🏗 Arquitectura de Carpetas (Vertical Slicing / Feature-First)

Evitamos agrupar por "tipo de archivo" (controllers, views). Agrupamos por **Dominio/Feature**.

```text
src/
├── app/                 # SOLO Routing. Archivos page.tsx, layout.tsx, loading.tsx.
│                        # Mínima lógica aquí, solo composición.
├── components/
│   ├── ui/              # Componentes base de Shadcn (Button, Input...). NO tocar lógica.
│   └── shared/          # Componentes reutilizables globales (Navbar, Footer).
├── db/                  # Capa de datos.
│   ├── index.ts         # Singleton de conexión Drizzle.
│   └── schema.ts        # Definición de tablas y tipos inferidos.
├── features/            # ⭐️ NÚCLEO DEL PROYECTO
│   ├── [feature-name]/  # ej: invoices, customers
│   │   ├── components/  # Componentes UI específicos de esta feature.
│   │   ├── actions.ts   # Server Actions ('use server'). Lógica de mutación.
│   │   ├── forms/       # Componentes de formulario (Client Components).
│   │   └── utils.ts     # Helpers de dominio.
└── lib/                 # Utilidades agnósticas (cn, formatters).
```

## 📝 Reglas de Desarrollo

### 1. Data Fetching (React Server Components)

- **NO** usar `useEffect` para pedir datos iniciales.
- **NO** usar `axios` o `react-query` (tanstack query) a menos que sea estrictamente necesario para estado cliente complejo.
- **SÍ** hacer consultas directas a la DB en `page.tsx` o componentes marcados como `async`.

```typescript
// ✅ PATRÓN CORRECTO
import { db } from "@/db";
export default async function Page() {
  const data = await db.select().from(table); // Directo a DB en servidor
  return <List data={data} />;
}
```

### 2. Mutaciones (Server Actions)

- **NO** crear rutas API REST (`/app/api/...`) manualmente.
- **SÍ** usar **Server Actions** en `features/[feature]/actions.ts`.
- **SÍ** usar `revalidatePath` para refrescar datos tras una mutación.
- Los formularios usan la prop `action={myServerAction}`.

### 3. Base de Datos (Drizzle & Neon)

- Usar siempre las definiciones de `src/db/schema.ts`.
- No escribir SQL crudo a menos que sea imposible hacerlo con el query builder de Drizzle.
- **Convención monetaria:** Los precios se guardan siempre como **INTEGER** (céntimos) para evitar errores de coma flotante. (Ej: 10.00€ -> 1000).

### 4. Estilos (Tailwind)

- Usar `clsx` y `tailwind-merge` (o la utilidad `cn`) para clases condicionales.
- Diseño "Mobile First".
- Variables CSS para temas (definidas en `globals.css`).

## 🎯 Objetivo del Proyecto

Dashboard de gestión B2B (SaaS). Priorizamos:

1. **Simplicidad:** Menos dependencias es mejor.
2. **Type Safety:** Todo debe estar tipado (DB -> Backend -> Frontend).
3. **Performance:** Renderizado en servidor (SSR) por defecto.
