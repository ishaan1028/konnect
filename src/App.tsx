import { useState } from 'react'
import { ArrowRight, Check, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

const variants = [
  'default',
  'secondary',
  'outline',
  'ghost',
  'destructive',
  'link',
] as const

function App() {
  const [dark, setDark] = useState(false)
  const [count, setCount] = useState(0)

  function toggleTheme() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <main className="bg-background text-foreground min-h-svh px-6 py-16">
      <div className="mx-auto flex max-w-2xl flex-col gap-10">
        <header className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">konnect</h1>
            <p className="text-muted-foreground text-sm">
              Tailwind v4 + shadcn/ui are wired up.
            </p>
          </div>
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {dark ? <Moon /> : <Sun />}
          </Button>
        </header>

        <section className="space-y-3">
          <h2 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Button variants
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {variants.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant}
              </Button>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Sizes &amp; icons
          </h2>
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
        </section>

        <section className="border-border bg-card text-card-foreground space-y-3 rounded-xl border p-6">
          <h2 className="font-medium">Interactive check</h2>
          <p className="text-muted-foreground text-sm">
            Clicked <span className="text-foreground font-medium">{count}</span>{' '}
            {count === 1 ? 'time' : 'times'}.
          </p>
          <Button onClick={() => setCount((c) => c + 1)}>Click me</Button>
        </section>
      </div>
    </main>
  )
}

export default App
