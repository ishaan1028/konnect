import { createContext, use } from 'react'

/** Color palettes defined in `src/index.css` via `[data-theme="…"]`. */
export const THEMES = [
  { id: 'black', label: 'Black' },
  { id: 'green', label: 'Green' },
  { id: 'violet', label: 'Violet' },
] as const

export type Theme = (typeof THEMES)[number]['id']

/** `system` follows the OS setting and keeps following it as it changes. */
export type Mode = 'light' | 'dark' | 'system'

export const STORAGE_KEY_THEME = 'konnect-theme'
export const STORAGE_KEY_MODE = 'konnect-mode'

export const DEFAULT_THEME: Theme = 'black'
export const DEFAULT_MODE: Mode = 'system'

export function isTheme(value: unknown): value is Theme {
  return THEMES.some((theme) => theme.id === value)
}

export function isMode(value: unknown): value is Mode {
  return value === 'light' || value === 'dark' || value === 'system'
}

/**
 * Writes the theme to the document root. This is the only place styling is
 * applied: components never read theme state, so switching costs one attribute
 * write plus a style recalc — no React re-render of the tree.
 */
export function applyTheme(theme: Theme, mode: Mode) {
  const root = document.documentElement
  const resolved =
    mode === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : mode

  root.dataset.theme = theme
  root.classList.toggle('dark', resolved === 'dark')
  root.style.colorScheme = resolved
}

export type ThemeContextValue = {
  theme: Theme
  mode: Mode
  /** `mode` resolved against the OS setting — never `system`. */
  resolvedMode: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  setMode: (mode: Mode) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const context = use(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a <ThemeProvider>')
  }
  return context
}
