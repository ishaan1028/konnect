import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme'

const variants = [
  'default',
  'secondary',
  'outline',
  'ghost',
  'destructive',
  'link',
] as const

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        {title}
      </h2>
      {children}
    </section>
  )
}

function App() {
  const { theme, resolvedMode } = useTheme()
  const [count, setCount] = useState(0)

  return (
    <main className="bg-background text-foreground min-h-svh px-6 py-16">
      <div className="mx-auto flex max-w-2xl flex-col gap-10">
        <header className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">konnect</h1>
            <p className="text-muted-foreground text-sm">
              Theme <span className="text-foreground font-medium">{theme}</span>{' '}
              · <span className="text-foreground font-medium">{resolvedMode}</span>
            </p>
          </div>
          <ModeToggle />
        </header>

        <Section title="Color theme">
          <ThemeSwitcher />
        </Section>

        <Section title="Button variants">
          <div className="flex flex-wrap items-center gap-2">
            {variants.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant}
              </Button>
            ))}
          </div>
        </Section>

        <Section title="Sizes &amp; icons">
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Small</Button>
            <Button>
              Continue <ArrowRight />
            </Button>
            <Button size="lg" variant="secondary">
              <Check /> Large
            </Button>
            <Button disabled>Disabled</Button>
          </div>
        </Section>

        <Section title="Themed tokens">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {([1, 2, 3, 4, 5] as const).map((n) => (
              <div
                key={n}
                className="border-border overflow-hidden rounded-lg border"
              >
                <div
                  className="h-10"
                  style={{ backgroundColor: `var(--chart-${n})` }}
                />
                <p className="text-muted-foreground p-2 text-xs">chart-{n}</p>
              </div>
            ))}
          </div>
        </Section>

        <section className="border-border bg-card text-card-foreground space-y-3 rounded-xl border p-6">
          <h2 className="font-medium">Interactive check</h2>
          <p className="text-muted-foreground text-sm">
            Clicked <span className="text-foreground font-medium">{count}</span>{' '}
            {count === 1 ? 'time' : 'times'}.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setCount((c) => c + 1)}>Click me</Button>
            <Button variant="ghost" onClick={() => setCount(0)}>
              Reset
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
