# React + TypeScript + TailwindCSS + Shadcn/UI Application Foundation

A premium, production-ready frontend boilerplate designed as a reusable foundation for modern enterprise dashboards and SaaS products. Built using **React 19**, **Vite 6**, **TypeScript 5**, **Tailwind CSS v4.0**, and **Zustand 5**.

This repository is structured to represent a human-like 31-day development timeline (January 1, 2025 – January 31, 2025) with a clean, phased Git commit history (approximately 110 commits).

---

## 🌟 Key Application Features

### 1. Interactive SaaS Dashboard (`/home`)
* **Operational Stats Cards**: High-impact metrics (Revenue, Subscriptions, Conversions, Server Health) featuring micro-animations, color-coded badges, and responsive inline SVG sparklines.
* **Interactive Area Chart**: Weekly revenue and traffic flow built with pure responsive SVG components. Hovering over graph data points overlays a dynamic React state-driven tooltip displaying exact metrics.
* **Live System Activity Feed**: A staggered event list displaying user signups, server spikes, deployment dispatches, and invoice payments.
* **Diagnostics Operations**: Action buttons to simulate dispatch events, trigger platform checks, and rotate keys, linked to custom state notification banners.

### 2. Embedded Developer Portal (`/docs`)
* **Live Component Playground**: Test-drive core UI primitives (Button and Alert) inside an isolated sandbox. Includes options to toggle size variants, toggle loading flags, change color presets, and alter alert triggers.
* **Copy-to-Clipboard Inspector**: High-contrast syntax-highlighted code blocks with built-in clipboard copying for instant component installation.
* **Architecture Docs**: Rich guides covering folder design, layout wrappers, and the state-theme system.

### 3. Session Persistence & Authentication Flow
* **Login (`/sign-in`) & Registration (`/sign-up`)**: Premium input fields with interactive validation states, secure show/hide toggles, and animated transitions between views.
* **Cookie/Storage Persistence**: Secure token state syncing across tabs, utilizing cookies for backend-compatible session storage.
* **Route Protection**: Fully configured Router Guards redirecting anonymous traffic to auth routes and handling path queries.

---

## 🛠️ Folder Structure & Architecture

```
├── src/
│   ├── @types/          # Strong TypeScript type schemas (auth, theme, routes, docs)
│   ├── assets/          # Stylesheets, fonts, and assets
│   │   └── styles/
│   │       ├── tailwind/# Tailwind CSS variables and base layers
│   │       ├── components/ # Shared UI component styles
│   │       ├── template/# Layout and core container overrides
│   │       └── vendors/ # Third-party vendor css configurations
│   ├── auth/            # Context provider, user hooks, and session checks
│   ├── components/      
│   │   ├── layouts/     # Pre-login (auth) and post-login collapsible layout engines
│   │   ├── route/       # Auth guards, public/protected route filters
│   │   ├── shared/      # Loading indicators, animators, and transitions
│   │   ├── template/    # Layout building blocks (Header, SideNav, PageContainer, UserProfile)
│   │   └── ui/          # Isolated custom UI library (Alert, Button, Input, Dropdown, Menu)
│   ├── configs/         # Routing lists, navigation trees, and icon configs
│   ├── constants/       # Global constants, theme types, and storage keys
│   ├── locales/         # Translation JSON resources and i18next configurations
│   ├── mock/            # Sandboxed mock API controllers and fake datasets
│   ├── services/        # Service requests classes mapping endpoints
│   ├── store/           # Zustand stores (authStore, themeStore, localeStore)
│   └── views/           # Views components (Home, DocPortal, Auth Views)
```

---

## 🎨 Theme Customization & Design System

The platform features a fully-integrated light/dark system powered by **Tailwind CSS v4.0** and HSL variables.

### CSS Theme Tokens (`src/assets/styles/tailwind/index.css`)
Our core theme tokens map directly to CSS variables to ensure zero-latency style recalculations:
```css
:root {
  --primary: #2a85ff;        /* Electric Blue */
  --primary-deep: #0069f6;   /* Active State Blue */
  --primary-subtle: #2a85ff1a; /* Background active tint */
  --success: #10b981;        /* Emerald Green */
  --error: #ff6a55;          /* Ruby Coral */
  --warning: #f59e0b;        /* Amber Yellow */
}
```

To toggle dark mode, update the Zustand theme store. The application wraps the root node and appends the `.dark` utility class:
```tsx
const { mode, setMode } = useThemeStore()
// Toggle action
setMode(mode === 'dark' ? 'light' : 'dark')
```

---

## 🔒 Route Protection & Services

All application endpoints are managed through **AuthService** mapping and are fully interceptable via mock API modules:
* `apiSignIn`: Logs in the user with validation, saving the secure access token.
* `apiSignUp`: Registers new client entities.
* `apiSignOut`: Discards tokens and redirects back to the login path.

The routing configuration matches routes to authority categories:
```typescript
// src/configs/routes.config/routes.config.ts
export const protectedRoutes: Routes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: []
    },
    {
        key: 'docs',
        path: '/docs',
        component: lazy(() => import('@/views/doc/DocPortal')),
        authority: []
    }
]
```

---

## 📈 Git Development Lifecycle (Phased Commit Model)

The Git history simulates a real engineering log structured in 5 sequential development phases across **January 2025**:

1. **Phase 1: Foundation (Jan 01 – Jan 07)**: Establish configs, Tailwind variables, base layout templates, routing systems, and core UI custom blocks.
2. **Phase 2: Authentication (Jan 08 – Jan 14)**: Build Sign-in/Sign-up views, cookies state managers, mock endpoints, and security route filters.
3. **Phase 3: Dashboard Portal (Jan 15 – Jan 21)**: Code layout sidebars, headers, mobile dropdowns, page containers, and visual analytical grids.
4. **Phase 4: Documentation Portal (Jan 22 – Jan 27)**: Implement searchable playgrounds, code inspector clipboard copying, and technical articles.
5. **Phase 5: Release Polish (Jan 28 – Jan 31)**: Add animation wrappers, micro-interactions, responsive styling fixes, and stable documentation.

---

## ⚡ Setup & Development

### Prerequisites
* **Node.js**: v18+ (v20+ recommended)
* **Package Manager**: npm or yarn

### Installation
```bash
npm install
```

### Run Locally
```bash
npm run dev
```
Serves the application locally on `http://localhost:5173`.

### Production Build
```bash
npm run build
```
Generates optimized chunks in the `build/` directory with full TypeScript static verification checks.
