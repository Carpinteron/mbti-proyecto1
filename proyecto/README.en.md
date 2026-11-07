# 16 Personalities

[Versión en español](README.md)

An informative website about the 16 MBTI personality types, built with Vite, React, TypeScript, React Router and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Other commands:

```bash
npm run build     # type-checks (tsc) and builds dist/
npm run preview   # serves the production build
```

## API

The app requests two public Personality.fyi endpoints (no authentication required, data licensed under CC0):

- `GET /api/v1/types`: catalog of all 16 types.
- `GET /api/v1/types/{CODE}`: profile details for a type by code.

## Features

- Landing page with an animated four-section wheel and the 4 MBTI dimensions.
- Explorer with real-time search and group filters (Analysts, Diplomats, Explorers and Sentinels) with result counts. Search and group are kept in the URL.
- Details for every type on a dynamic route (`/types/:id`).
- Collection of saved personalities, persisted across routes and reloads with `localStorage`.
- Persistent light and dark themes, using the system preference as the initial value.
- Visible loading, error and empty states.
- Controlled contact form with name, email and message validation, and a disabled button while invalid.
- Success, error and info toasts with auto-dismiss (paused on hover).
- Native confirmation dialog (`<dialog>` + `useRef` + `showModal()`) before removing an item from the collection or sending the form.
- Responsive design with Tailwind utilities and accessibility (semantic HTML, `alt`, `aria-*`, `htmlFor`).

### Intentional dark pattern

The dialog for removing a personality from the collection uses a dark pattern **on purpose and only for teaching purposes**:
confirmshaming in the button text and an inverted visual hierarchy (the keep button is large and the remove action is a small gray link).
It is explained in code comments in [`src/hooks/useCollectionActions.ts`](src/hooks/useCollectionActions.ts) and [`src/components/ui/ConfirmDialog.tsx`](src/components/ui/ConfirmDialog.tsx).
The contact form's send dialog is the honest version.

## Project structure

```text
src/
├── components/
│   ├── collection/    # EmptyCollection
│   ├── contact/       # ContactForm, FormField
│   ├── home/          # GroupWheel, DimensionsSection, DimensionCard
│   ├── layout/        # AppLayout, Navigation, Footer, Logo, ThemeToggle
│   ├── personality/   # PersonalityCard, PersonalityGrid, GroupFilters, DimensionFilterPopover
│   └── ui/            # Button, ToggleButton, ConfirmDialog, Toast, ErrorState, ResultStatus, SearchField, SectionHeading
├── constants/         # Static UI data (MBTI dimensions)
├── context/           # CollectionContext, ConfirmContext, ToastContext
├── hooks/             # useFetch, useLocalStorage, useTheme, useCollectionActions
├── pages/             # Home, TypeExplorer, TypeDetails, Collection, Contact, NotFound
├── services/          # api.ts (Personality.fyi requests)
├── types/             # Shared TypeScript types
├── utils/             # groups.ts (MBTI groups), validation.ts (form validation)
├── App.tsx            # Only defines the routes
└── main.tsx           # Entry point and context providers
```

### Design decisions

- **`App.tsx` only routes.** The shared layout lives in `AppLayout` and renders an `<Outlet />`.
- **Global state in contexts.** The collection (`CollectionContext`) sits above the router so it persists between routes. Toasts and confirmations can be requested from any component with `useToast()` and `useConfirm()`; the latter returns a promise (`true` when confirmed).
- **Reusable hooks.** `useFetch` centralizes loading, error and cancellation with `AbortController`; `useLocalStorage` tolerates blocked or corrupted storage.
- **Tailwind v4 styling.** Theme colors are declared as tokens in `@theme` (`bg-surface`, `text-muted`, `border-line`, `bg-accent`...) that point at CSS variables, so light/dark mode switches on its own. Each MBTI group color is a `tone-*` utility (`@utility`) exposing `bg-tone-soft` and `text-tone-strong`. Buttons are reused through `Button`, `LinkButton` and `ToggleButton`.
- **`useFetch` with `async/await`**, loading, error and empty states, and cancellation with `AbortController`.
- **English naming** across the codebase (folders, components, functions and variables).

## Deployment

The project ships a `vercel.json` rewrite rule so React Router routes (for example `/types/ENFP`) keep working when the page is reloaded on Vercel.

---

MBTI is a tool for reflection and communication, not a psychological diagnosis or a definitive label.
