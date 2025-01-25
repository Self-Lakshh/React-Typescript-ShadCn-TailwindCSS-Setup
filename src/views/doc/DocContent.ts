export interface DocSection {
    id: string
    title: string
    category: string
    description: string
    content: string
    codeSample?: string
}

export const docContent: DocSection[] = [
    {
        id: 'overview',
        title: 'Platform Overview',
        category: 'Getting Started',
        description: 'Introduction to this enterprise React + TypeScript application foundation.',
        content: `Welcome to the custom **React + TypeScript + Tailwind CSS** application foundation. This template is designed as a reusable starter kit for modern dashboard applications, optimized for performance, scalability, and state-of-the-art visual aesthetics.

### Key Features
* **Modular Architecture**: Strongly typed directory structure separating views, state, configuration, and layout concerns.
* **Tailwind CSS v4.0**: Modern styling utilizing CSS variables and utility classes, supporting instant light/dark mode switches.
* **State Management**: Powered by **Zustand 5**, featuring lightweight stores for authentication, routing, and UI theme states.
* **Route Protection**: Fully configured router guard system utilizing token and session checks to redirect unauthenticated traffic.
* **Component Library**: Tailored form elements, loaders, and status alerts designed from scratch to avoid heavy external dependencies.
* **Framer Motion Animations**: Fluid layout entries and staggered list transitions for polished micro-interactions.`
    },
    {
        id: 'architecture',
        title: 'System Architecture',
        category: 'Guides',
        description: 'Deep dive into the routing, layouts, and state management systems of the application.',
        content: `The application follows a unidirectional data flow and clean separation of concerns.

### 1. Routing & Route Guards
Routes are split into \`publicRoutes\` (e.g. login, sign-up) and \`protectedRoutes\` (e.g. dashboard, settings) inside \`src/configs/routes.config/\`.
The routing engine uses React Lazy-loading (\`React.lazy\`) and is wrapped by the \`App\` component. 
The \`AuthProvider\` handles state-based authentication and automatically redirects users based on auth cookies or local session storage.

### 2. Multi-Layout System
Layouts are managed by the \`Layout\` component, which switches between:
* **PreLoginLayout**: Wraps unauthenticated views (e.g. login) and applies full-bleed graphic layouts.
* **PostLoginLayout**: Loads once authentication passes, rendering a collapsible sidebar, header with profile dropdowns, and fluid content wrapper.

### 3. Zustand Stores
* \`useAuthStore\`: Stores user profile tokens and session persistence status.
* \`useThemeStore\`: Governs light/dark mode, layouts, direction, and menu collapse states.`
    },
    {
        id: 'styling',
        title: 'Theme & Customization',
        category: 'Guides',
        description: 'How to customize colors, dark mode, and global layouts using Tailwind CSS v4 variables.',
        content: `The design system is governed by css variables mapped within the Tailwind CSS configuration.

### CSS Variables Mapping
Our custom palette utilizes cohesive theme names bound to standard CSS variables inside \`src/assets/styles/tailwind/index.css\`:
* \`--primary\`: Base brand color (default: Blue #2a85ff)
* \`--primary-deep\`: Active or hover state
* \`--primary-subtle\`: Background tint for active badges (10% opacity)
* \`--error\`: Warning/destructive actions
* \`--success\`: Validation and positive statuses
* \`--warning\`: Alert states

### Activating Dark Mode
Dark mode is activated by appending the \`dark\` class to the \`<html>\` or \`<body>\` node. The \`Theme\` component listens to \`useThemeStore\` and applies the class dynamically. All components use the prefix \`dark:\` to handle styling transitions.`,
        codeSample: `// tailwind.config.cjs
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary)',
        'primary-deep': 'var(--primary-deep)',
        'success': 'var(--success)',
      }
    }
  }
}`
    },
    {
        id: 'component-button',
        title: 'Button Component',
        category: 'Components',
        description: 'Interactive demo of the modular button component with variants and loading states.',
        content: `The custom \`Button\` component handles loading indicators, click animations, size modifications, and custom icon injections. It is completely isolated and compiled inside \`src/components/ui/Button/\`.`,
        codeSample: `import { Button } from '@/components/ui/Button'

// Primary variant
<Button variant="solid" color="primary">Click Me</Button>

// Outline variant with loading indicator
<Button variant="twoTone" loading={true}>Saving Changes</Button>

// Large destructive button
<Button variant="solid" color="danger" size="lg">Delete Account</Button>`
    },
    {
        id: 'component-alert',
        title: 'Alert Component',
        category: 'Components',
        description: 'Status warnings and check alerts showing micro-animations.',
        content: `The \`Alert\` component provides visually rich warnings, success confirmations, and error flags. Built-in integration with \`framer-motion\` allows it to fade in/out smoothly and support custom timeout dismisses.`,
        codeSample: `import Alert from '@/components/ui/Alert'

// Success Alert with Check icon
<Alert showIcon={true} type="success" title="Success!">
  Your changes have been saved successfully.
</Alert>

// Dismissible Danger Alert
<Alert type="danger" closable={true} onClose={() => console.log('closed')}>
  An unexpected server error occurred.
</Alert>`
    }
]
