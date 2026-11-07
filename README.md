# 16 Personalities

Sitio informativo sobre los 16 tipos de personalidad MBTI, construido con Vite, React, TypeScript, React Router y Tailwind CSS.

## Ejecutar en local

```bash
npm install
npm run dev
```

Otros comandos:

```bash
npm run build     # comprueba tipos (tsc) y genera dist/
npm run preview   # sirve el build de producción
```

## API

La aplicación consume dos endpoints públicos de Personality.fyi (sin autenticación, datos con licencia CC0):

- `GET /api/v1/types`: catálogo de los 16 tipos.
- `GET /api/v1/types/{CODE}`: detalle de un tipo por su código.

## Funcionalidades

- Página de inicio con una ruleta animada de cuatro secciones y las 4 dimensiones del MBTI.
- Exploración con búsqueda en tiempo real y filtros por grupo (Analysts, Diplomats, Explorers y Sentinels) con contador. La búsqueda y el grupo viven en la URL.
- Detalle de cada tipo en una ruta dinámica (`/types/:id`).
- Colección de personalidades guardadas, que persiste entre rutas y recargas con `localStorage`.
- Tema claro y oscuro persistente, con la preferencia del sistema como valor inicial.
- Estados visibles de carga, error y vacío.
- Formulario de contacto controlado con validación de nombre, email y mensaje, y botón deshabilitado mientras sea inválido.
- Toasts de éxito, error e info con cierre automático (se pausan al pasar el mouse).
- Diálogo de confirmación nativo (`<dialog>` + `useRef` + `showModal()`) antes de quitar un elemento de la colección o enviar el formulario.
- Diseño responsive con utilidades de Tailwind y accesibilidad (HTML semántico, `alt`, `aria-*`, `htmlFor`).

### Dark pattern intencional

El diálogo para quitar una personalidad de la colección usa un dark pattern **a propósito y solo con fines didácticos**:
confirmshaming en el texto del botón y jerarquía visual invertida (el botón de conservar es el grande y el de quitar es un enlace pequeño y gris).
Está explicado con comentarios en [`src/hooks/useCollectionActions.ts`](src/hooks/useCollectionActions.ts) y [`src/components/ui/ConfirmDialog.tsx`](src/components/ui/ConfirmDialog.tsx).
El diálogo de envío del formulario es la versión honesta.

## Estructura del proyecto

```text
src/
├── components/
│   ├── contact/       # ContactForm, FormField
│   ├── home/          # GroupWheel, DimensionsSection, DimensionCard
│   ├── layout/        # AppLayout, Navigation, Footer, Logo, ThemeToggle
│   ├── personality/   # PersonalityCard, PersonalityGrid, GroupFilters
│   └── ui/            # ConfirmDialog, Toast, ResultStatus, SearchField, SectionHeading
├── constants/         # Datos estáticos de la interfaz (dimensiones MBTI)
├── context/           # CollectionContext, ConfirmContext, ToastContext
├── hooks/             # useFetch, useLocalStorage, useTheme, useCollectionActions
├── pages/             # Home, TypeExplorer, TypeDetails, Collection, Contact, NotFound
├── services/          # api.ts (llamadas a Personality.fyi)
├── types/             # Tipos compartidos de TypeScript
├── utils/             # groups.ts (grupos MBTI), validation.ts (validación del formulario)
├── App.tsx            # Solo define las rutas
└── main.tsx           # Punto de entrada y proveedores de contexto
```

### Decisiones de diseño

- **`App.tsx` solo enruta.** El layout compartido vive en `AppLayout` y usa `<Outlet />`.
- **Estado global en contextos.** La colección (`CollectionContext`) está por encima del router para persistir entre rutas. Los toasts y las confirmaciones se piden desde cualquier componente con `useToast()` y `useConfirm()`; este último devuelve una promesa (`true` si se confirmó).
- **Hooks reutilizables.** `useFetch` centraliza loading, error y cancelación con `AbortController`; `useLocalStorage` tolera un almacenamiento bloqueado o corrupto.
- **Nombres en inglés** en todo el código (carpetas, componentes, funciones y variables).

## Despliegue

El proyecto incluye `vercel.json` con una regla de reescritura para que las rutas de React Router (por ejemplo `/types/ENFP`) funcionen al recargar la página en Vercel.

---

MBTI es una herramienta para la reflexión y la comunicación, no un diagnóstico psicológico ni una etiqueta definitiva.
