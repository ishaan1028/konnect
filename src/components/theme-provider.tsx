import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  DEFAULT_MODE,
  DEFAULT_THEME,
  STORAGE_KEY_MODE,
  STORAGE_KEY_THEME,
  ThemeContext,
  applyTheme,
  isMode,
  isTheme,
} from '@/lib/theme'
import type { Mode, Theme } from '@/lib/theme'

function readStored<T>(key: string, guard: (v: unknown) => v is T, fallback: T) {
  try {
    const stored = localStorage.getItem(key)
    return guard(stored) ? stored : fallback
  } catch {
    // Private mode or blocked storage — fall back to the default.
    return fallback
  }
}

function persist(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Non-fatal: the theme still applies for this session.
  }
}

function prefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() =>
    readStored(STORAGE_KEY_THEME, isTheme, DEFAULT_THEME),
  )
  const [mode, setModeState] = useState<Mode>(() =>
    readStored(STORAGE_KEY_MODE, isMode, DEFAULT_MODE),
  )
  const [systemDark, setSystemDark] = useState(prefersDark)

  // Keep the document in sync. The inline script in index.html already applied
  // the stored values before first paint, so this is a no-op on mount.
  useEffect(() => {
    applyTheme(theme, mode)
  }, [theme, mode, systemDark])

  // Tracked unconditionally rather than only while mode === 'system': if the OS
  // flipped while we weren't listening, switching back to 'system' would
  // otherwise apply a stale value.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    persist(STORAGE_KEY_THEME, next)
  }, [])

  const setMode = useCallback((next: Mode) => {
    setModeState(next)
    persist(STORAGE_KEY_MODE, next)
  }, [])

  const value = useMemo(
    () => ({
      theme,
      mode,
      resolvedMode: (mode === 'system' ? (systemDark ? 'dark' : 'light') : mode) as
        | 'light'
        | 'dark',
      setTheme,
      setMode,
    }),
    [theme, mode, systemDark, setTheme, setMode],
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}
