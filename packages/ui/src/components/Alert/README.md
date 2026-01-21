# Alert Component

Componente de alerta para exibir mensagens importantes aos usuários.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { Alert, AlertTitle, AlertDescription } from "@fabioeducacross/ui";

export default function MyAlert() {
  return (
    <Alert>
      <AlertTitle>Atenção!</AlertTitle>
      <AlertDescription>
        Esta é uma mensagem importante para o usuário.
      </AlertDescription>
    </Alert>
  );
}
```

## Props

### Alert

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `"default" \| "destructive" \| "success" \| "warning" \| "info"` | `"default"` | Estilo visual do alerta |
| `className` | `string` | - | Classes CSS adicionais |

### AlertTitle

| Prop | Tipo | Descrição |
|------|------|-----------|
| `className` | `string` | Classes CSS adicionais |

### AlertDescription

| Prop | Tipo | Descrição |
|------|------|-----------|
| `className` | `string` | Classes CSS adicionais |

## Variantes

### Default (Neutro)

```tsx
<Alert variant="default">
  <AlertTitle>Informação</AlertTitle>
  <AlertDescription>
    Mensagem neutra para o usuário.
  </AlertDescription>
</Alert>
```

### Destructive (Erro/Crítico)

```tsx
<Alert variant="destructive">
  <AlertTitle>Erro!</AlertTitle>
  <AlertDescription>
    Ocorreu um erro ao processar sua solicitação.
  </AlertDescription>
</Alert>
```

### Success (Sucesso)

```tsx
<Alert variant="success">
  <AlertTitle>Sucesso!</AlertTitle>
  <AlertDescription>
    Sua operação foi concluída com sucesso.
  </AlertDescription>
</Alert>
```

### Warning (Aviso)

```tsx
<Alert variant="warning">
  <AlertTitle>Atenção!</AlertTitle>
  <AlertDescription>
    Esta ação requer sua atenção antes de continuar.
  </AlertDescription>
</Alert>
```

### Info (Informativo)

```tsx
<Alert variant="info">
  <AlertTitle>Dica</AlertTitle>
  <AlertDescription>
    Você sabia que pode usar atalhos de teclado?
  </AlertDescription>
</Alert>
```

## Exemplos de Uso

### Alert com Ícone

```tsx
import { Icons } from "@fabioeducacross/ui";

<Alert variant="warning">
  <Icons.AlertTriangle className="h-4 w-4" />
  <AlertTitle>Sua sessão vai expirar em breve</AlertTitle>
  <AlertDescription>
    Você será desconectado em 5 minutos devido à inatividade.
  </AlertDescription>
</Alert>
```

### Alert com Ação

```tsx
<Alert variant="info">
  <Icons.Info className="h-4 w-4" />
  <AlertTitle>Nova versão disponível</AlertTitle>
  <AlertDescription className="flex items-center justify-between">
    <span>Uma atualização está disponível para download.</span>
    <Button size="sm" variant="outline">Atualizar Agora</Button>
  </AlertDescription>
</Alert>
```

### Alert com Link

```tsx
<Alert variant="success">
  <Icons.CheckCircle className="h-4 w-4" />
  <AlertTitle>Pagamento confirmado</AlertTitle>
  <AlertDescription>
    Seu pagamento foi processado com sucesso.{" "}
    <a href="/recibo" className="font-medium underline">
      Ver recibo
    </a>
  </AlertDescription>
</Alert>
```

### Alert Dismissível

```tsx
function DismissibleAlert() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Alert variant="default" className="relative">
      <AlertTitle>Novidades!</AlertTitle>
      <AlertDescription>
        Confira as novas funcionalidades da plataforma.
      </AlertDescription>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
      >
        <Icons.X className="h-4 w-4" />
        <span className="sr-only">Fechar</span>
      </button>
    </Alert>
  );
}
```

### Alert de Formulário com Validação

```tsx
function FormWithAlert() {
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <form>
      {errors.length > 0 && (
        <Alert variant="destructive" className="mb-4">
          <Icons.AlertCircle className="h-4 w-4" />
          <AlertTitle>Erros encontrados</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-4 space-y-1">
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      {/* Campos do formulário */}
    </form>
  );
}
```

### Alert de Sistema (Banner)

```tsx
<Alert variant="warning" className="rounded-none border-x-0 border-t-0">
  <Icons.AlertTriangle className="h-4 w-4" />
  <AlertTitle>Manutenção programada</AlertTitle>
  <AlertDescription>
    O sistema estará em manutenção no dia 25/01 das 02h às 06h.
  </AlertDescription>
</Alert>
```

### Alert Inline (Compact)

```tsx
<Alert variant="info" className="py-2">
  <div className="flex items-center gap-2">
    <Icons.Info className="h-4 w-4" />
    <p className="text-sm">Dica rápida: Use Ctrl+K para buscar.</p>
  </div>
</Alert>
```

### Alert com Lista de Tarefas

```tsx
<Alert variant="success">
  <Icons.CheckCircle className="h-4 w-4" />
  <AlertTitle>Configuração inicial completa</AlertTitle>
  <AlertDescription>
    <p className="mb-2">Você concluiu as seguintes etapas:</p>
    <ul className="space-y-1">
      <li className="flex items-center gap-2">
        <Icons.Check className="h-3 w-3 text-green-600" />
        Perfil criado
      </li>
      <li className="flex items-center gap-2">
        <Icons.Check className="h-3 w-3 text-green-600" />
        E-mail verificado
      </li>
      <li className="flex items-center gap-2">
        <Icons.Check className="h-3 w-3 text-green-600" />
        Primeiro login realizado
      </li>
    </ul>
  </AlertDescription>
</Alert>
```

### Alert com Countdown

```tsx
function CountdownAlert() {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  return (
    <Alert variant="warning">
      <Icons.Clock className="h-4 w-4" />
      <AlertTitle>Sessão expirando</AlertTitle>
      <AlertDescription>
        Sua sessão expirará em <strong>{seconds}</strong> segundos.{" "}
        <Button size="sm" variant="link" className="p-0 h-auto">
          Continuar conectado
        </Button>
      </AlertDescription>
    </Alert>
  );
}
```

## Acessibilidade

O componente Alert segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **Role semântico**: Usa `role="alert"` para anúncio automático por leitores de tela
- ✅ **Contraste**: Todas as variantes seguem contraste mínimo 4.5:1
- ✅ **Ícones descritivos**: Ícones complementam texto, não substituem
- ✅ **Foco visível**: Botões de ação têm foco com `focus-visible:ring-2`
- ✅ **Leitura clara**: Hierarquia com AlertTitle e AlertDescription

### Exemplo Acessível Completo

```tsx
<Alert
  variant="destructive"
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
>
  <Icons.AlertCircle className="h-4 w-4" aria-hidden="true" />
  <AlertTitle id="error-title">Erro ao salvar</AlertTitle>
  <AlertDescription id="error-desc">
    Não foi possível salvar suas alterações. Verifique sua conexão e tente novamente.
  </AlertDescription>
  <Button
    size="sm"
    variant="outline"
    className="mt-2"
    aria-label="Tentar novamente"
  >
    Tentar Novamente
  </Button>
</Alert>
```

## Boas Práticas

### ✅ Correto

```tsx
{/* Ícone + título + descrição clara */}
<Alert variant="warning">
  <Icons.AlertTriangle className="h-4 w-4" />
  <AlertTitle>Atenção necessária</AlertTitle>
  <AlertDescription>
    Você tem 3 tarefas pendentes que expiram hoje.
  </AlertDescription>
</Alert>

{/* Usar variant apropriada para o contexto */}
<Alert variant="success">
  <AlertTitle>Dados salvos</AlertTitle>
  <AlertDescription>Suas alterações foram salvas.</AlertDescription>
</Alert>
```

### ❌ Incorreto

```tsx
{/* Apenas título sem descrição (contexto insuficiente) */}
<Alert>
  <AlertTitle>Erro</AlertTitle>
</Alert>

{/* Variant errada para o contexto */}
<Alert variant="success">
  <AlertTitle>Erro crítico!</AlertTitle>
  <AlertDescription>Falha ao processar.</AlertDescription>
</Alert>

{/* Ícone sem texto (inacessível) */}
<Alert>
  <Icons.Info className="h-4 w-4" />
</Alert>
```

## Composição com Outros Componentes

### Alert + Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Configurações de Conta</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <Alert variant="info">
      <Icons.Info className="h-4 w-4" />
      <AlertDescription>
        Alterações nesta seção afetam toda a sua conta.
      </AlertDescription>
    </Alert>
    {/* Formulário */}
  </CardContent>
</Card>
```

### Multiple Alerts (Stack)

```tsx
<div className="space-y-3">
  <Alert variant="warning">
    <AlertTitle>Aviso 1</AlertTitle>
    <AlertDescription>Primeira mensagem importante.</AlertDescription>
  </Alert>
  <Alert variant="info">
    <AlertTitle>Aviso 2</AlertTitle>
    <AlertDescription>Segunda mensagem importante.</AlertDescription>
  </Alert>
</div>
```

## Links

- [Storybook - Alert Stories](../../../../apps/storybook/stories/components/Alert.stories.tsx)
- [Código Fonte](./Alert.tsx)
- [Testes](./Alert.test.tsx)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido
- 💡 Exemplos práticos e boas práticas

### v0.1.1
- ✨ Lançamento inicial
- 🎨 5 variantes (default, destructive, success, warning, info)
- ♿ Role="alert" para acessibilidade
- 🧩 Componentes auxiliares (AlertTitle, AlertDescription)
