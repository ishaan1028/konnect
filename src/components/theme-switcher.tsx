import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { THEMES, useTheme } from '@/lib/theme'

/** Three swatch buttons that switch the app's color palette. */
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div role="group" aria-label="Color theme" className="flex flex-wrap gap-2">
      {THEMES.map(({ id, label }) => {
        const active = theme === id
        return (
          <Button
            key={id}
            variant="outline"
            aria-pressed={active}
            onClick={() => setTheme(id)}
            className={active ? 'border-primary ring-primary/25 ring-2' : undefined}
          >
            <span
              data-swatch={id}
              aria-hidden="true"
              className="border-foreground/10 size-3.5 rounded-full border"
            />
            {label}
            {active && <Check aria-hidden="true" />}
          </Button>
        )
      })}
    </div>
  )
}
