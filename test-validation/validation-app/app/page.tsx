import { Button, Alert, Logo, Badge, ThemeSwitcher, ThemeProvider } from "@fabioeducacross/ui";
import "@fabioeducacross/ui/styles.css";

export default function Home() {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen p-8 space-y-8">
        <header className="flex items-center justify-between border-b pb-4">
          <Logo size="lg" />
          <ThemeSwitcher />
        </header>

        <main className="max-w-4xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Validação do Design System v0.2.0</h2>
            <p className="text-muted-foreground">
              Testando componentes do pacote @fabioeducacross/ui
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Buttons</h3>
            <div className="flex gap-3 flex-wrap">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Alerts</h3>
            <div className="space-y-3">
              <Alert variant="default">
                <strong>Info:</strong> This is a default alert
              </Alert>
              <Alert variant="destructive">
                <strong>Error:</strong> This is a destructive alert
              </Alert>
              <Alert variant="success">
                <strong>Success:</strong> This is a success alert
              </Alert>
              <Alert variant="warning">
                <strong>Warning:</strong> This is a warning alert
              </Alert>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Badges</h3>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Theme Test</h3>
            <p className="text-sm text-muted-foreground">
              Use o botão no canto superior direito para alternar entre temas claro/escuro
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-background">
                <p className="font-medium">Background</p>
                <p className="text-sm text-muted-foreground">bg-background</p>
              </div>
              <div className="p-4 border rounded-lg bg-muted">
                <p className="font-medium">Muted</p>
                <p className="text-sm text-muted-foreground">bg-muted</p>
              </div>
              <div className="p-4 border rounded-lg bg-accent">
                <p className="font-medium">Accent</p>
                <p className="text-sm text-muted-foreground">bg-accent</p>
              </div>
              <div className="p-4 border rounded-lg bg-primary text-primary-foreground">
                <p className="font-medium">Primary</p>
                <p className="text-sm">bg-primary</p>
              </div>
            </div>
          </section>

          <section className="mt-8 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">✅ Checklist de Validação:</h4>
            <ul className="space-y-1 text-sm">
              <li>✅ Importação de componentes funcionando</li>
              <li>✅ Importação de CSS (styles.css) funcionando</li>
              <li>✅ Logo renderizando corretamente (inline SVG fix)</li>
              <li>✅ Buttons com todas as variantes</li>
              <li>✅ Alerts com todas as variantes</li>
              <li>✅ Badges funcionando</li>
              <li>✅ ThemeSwitcher funcionando</li>
              <li>✅ Temas claro/escuro aplicando corretamente</li>
              <li>✅ Tokens CSS do Design System ativos</li>
            </ul>
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}
