import { Monitor, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme'
import type { Mode } from '@/lib/theme'

const NEXT: Record<Mode, Mode> = {
  light: 'dark',
  dark: 'system',
  system: 'light',
}

const ICON = {
  light: Sun,
  dark: Moon,
  system: Monitor,
}

/** Cycles light → dark → system. */
export function ModeToggle() {
  const { mode, setMode } = useTheme()
  const Icon = ICON[mode]

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setMode(NEXT[mode])}
      aria-label={`Appearance: ${mode}. Switch to ${NEXT[mode]}.`}
      title={`Appearance: ${mode}`}
    >
      <Icon />
    </Button>
  )
}
