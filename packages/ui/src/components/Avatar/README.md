# Avatar Component

Componente de imagem de perfil com fallback e suporte a múltiplos tamanhos.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@fabioeducacross/ui";

export default function MyAvatar() {
  return (
    <Avatar>
      <AvatarImage src="/avatar.jpg" alt="João Silva" />
      <AvatarFallback>JS</AvatarFallback>
    </Avatar>
  );
}
```

## Props

### Avatar

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `size` | `"xs" \| "sm" \| "default" \| "lg" \| "xl" \| "2xl"` | `"default"` | Tamanho do avatar |
| `className` | `string` | - | Classes CSS adicionais |

### AvatarImage

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `src` | `string` | - | URL da imagem |
| `alt` | `string` | - | Texto alternativo (acessibilidade) |
| `onLoadingStatusChange` | `(status: "loading" \| "loaded" \| "error") => void` | - | Callback para mudança de status |

### AvatarFallback

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `delayMs` | `number` | `0` | Atraso antes de exibir fallback |
| `className` | `string` | - | Classes CSS adicionais |

## Tamanhos

```tsx
<div className="flex items-end gap-2">
  <Avatar size="xs"> {/* 24px (h-6) */}
    <AvatarImage src="/avatar.jpg" alt="XS" />
    <AvatarFallback>XS</AvatarFallback>
  </Avatar>

  <Avatar size="sm"> {/* 32px (h-8) */}
    <AvatarImage src="/avatar.jpg" alt="SM" />
    <AvatarFallback>SM</AvatarFallback>
  </Avatar>

  <Avatar size="default"> {/* 40px (h-10) */}
    <AvatarImage src="/avatar.jpg" alt="Default" />
    <AvatarFallback>MD</AvatarFallback>
  </Avatar>

  <Avatar size="lg"> {/* 48px (h-12) */}
    <AvatarImage src="/avatar.jpg" alt="LG" />
    <AvatarFallback>LG</AvatarFallback>
  </Avatar>

  <Avatar size="xl"> {/* 64px (h-16) */}
    <AvatarImage src="/avatar.jpg" alt="XL" />
    <AvatarFallback>XL</AvatarFallback>
  </Avatar>

  <Avatar size="2xl"> {/* 96px (h-24) */}
    <AvatarImage src="/avatar.jpg" alt="2XL" />
    <AvatarFallback>2XL</AvatarFallback>
  </Avatar>
</div>
```

## Exemplos de Uso

### Avatar com Status Online

```tsx
<div className="relative">
  <Avatar>
    <AvatarImage src="/avatar.jpg" alt="João Silva" />
    <AvatarFallback>JS</AvatarFallback>
  </Avatar>
  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
</div>
```

### Avatar com Tooltip

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Avatar>
        <AvatarImage src="/avatar.jpg" alt="João Silva" />
        <AvatarFallback>JS</AvatarFallback>
      </Avatar>
    </TooltipTrigger>
    <TooltipContent>
      <p className="font-medium">João Silva</p>
      <p className="text-xs text-muted-foreground">Desenvolvedor</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Grupo de Avatares (Stacking)

```tsx
function AvatarGroup({ users, max = 3 }) {
  const visibleUsers = users.slice(0, max);
  const remaining = users.length - max;

  return (
    <div className="flex -space-x-2">
      {visibleUsers.map((user) => (
        <Avatar
          key={user.id}
          size="sm"
          className="border-2 border-background"
        >
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
      ))}
      {remaining > 0 && (
        <Avatar size="sm" className="border-2 border-background">
          <AvatarFallback>+{remaining}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

// Uso
<AvatarGroup
  users={[
    { id: 1, name: "João", initials: "JS", avatar: "/1.jpg" },
    { id: 2, name: "Maria", initials: "MC", avatar: "/2.jpg" },
    { id: 3, name: "Pedro", initials: "PA", avatar: "/3.jpg" },
    { id: 4, name: "Ana", initials: "AS", avatar: "/4.jpg" },
  ]}
  max={3}
/>
```

### Avatar Clicável (Perfil)

```tsx
<Avatar
  className="cursor-pointer hover:ring-2 hover:ring-primary"
  onClick={() => navigate("/perfil/joao")}
>
  <AvatarImage src="/avatar.jpg" alt="João Silva" />
  <AvatarFallback>JS</AvatarFallback>
</Avatar>
```

### Avatar com Badge de Notificação

```tsx
<div className="relative inline-block">
  <Avatar>
    <AvatarImage src="/avatar.jpg" alt="João Silva" />
    <AvatarFallback>JS</AvatarFallback>
  </Avatar>
  <Badge
    variant="destructive"
    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
  >
    3
  </Badge>
</div>
```

### Avatar com Carregamento

```tsx
function LoadingAvatar() {
  const [status, setStatus] = useState("loading");

  return (
    <Avatar>
      <AvatarImage
        src="/avatar.jpg"
        alt="João Silva"
        onLoadingStatusChange={setStatus}
      />
      {status === "loading" ? (
        <Skeleton className="h-full w-full rounded-full" />
      ) : (
        <AvatarFallback>JS</AvatarFallback>
      )}
    </Avatar>
  );
}
```

### Lista de Usuários

```tsx
<div className="space-y-2">
  {users.map((user) => (
    <div key={user.id} className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.initials}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">{user.name}</p>
        <p className="text-xs text-muted-foreground">{user.role}</p>
      </div>
    </div>
  ))}
</div>
```

### Avatar com Ícone

```tsx
<Avatar>
  <AvatarFallback>
    <Icons.User className="h-5 w-5" />
  </AvatarFallback>
</Avatar>
```

## Casos de Uso Comuns

### Perfil Completo

```tsx
function UserProfile({ user }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar size="xl">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <Badge variant="softPrimary" size="sm" className="mt-2">
            {user.role}
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
}
```

### Comentários com Avatar

```tsx
function Comment({ comment }) {
  return (
    <div className="flex gap-3">
      <Avatar size="sm">
        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
        <AvatarFallback>{comment.author.initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{comment.author.name}</span>
          <span className="text-xs text-muted-foreground">
            {comment.timestamp}
          </span>
        </div>
        <p className="text-sm mt-1">{comment.text}</p>
      </div>
    </div>
  );
}
```

## Acessibilidade

O componente Avatar segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **alt text**: Sempre forneça `alt` descritivo em `AvatarImage`
- ✅ **Fallback**: Use iniciais ou ícone quando imagem falhar
- ✅ **Contraste**: Fallback usa cores do Design System (4.5:1)
- ✅ **Foco visível**: Avatares clicáveis têm `focus:ring-2`

### Exemplo Acessível

```tsx
<Avatar>
  <AvatarImage
    src="/avatar.jpg"
    alt="João Silva, Desenvolvedor Senior"
  />
  <AvatarFallback aria-label="Iniciais de João Silva">
    JS
  </AvatarFallback>
</Avatar>
```

## Boas Práticas

### ✅ Correto

```tsx
// Sempre incluir fallback
<Avatar>
  <AvatarImage src="/avatar.jpg" alt="João Silva" />
  <AvatarFallback>JS</AvatarFallback>
</Avatar>

// Alt text descritivo
<AvatarImage src="/avatar.jpg" alt="João Silva, CEO" />

// Tamanho apropriado para contexto
<Avatar size="sm">...</Avatar> // Em listas
<Avatar size="xl">...</Avatar> // Em perfis
```

### ❌ Incorreto

```tsx
// Sem fallback (mostra nada se imagem falhar)
<Avatar>
  <AvatarImage src="/avatar.jpg" alt="João" />
</Avatar>

// Alt text genérico (inacessível)
<AvatarImage src="/avatar.jpg" alt="avatar" />

// Fallback vazio
<AvatarFallback></AvatarFallback>
```

## Links

- [Storybook - Avatar Stories](../../../../apps/storybook/stories/components/Avatar.stories.tsx)
- [Código Fonte](./Avatar.tsx)
- [Testes](./Avatar.test.tsx)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido
- 💡 Exemplos práticos (grupos, status, tooltip)

### v0.1.1
- ✨ Lançamento inicial
- 📏 6 tamanhos (xs: 24px → 2xl: 96px)
- 🎨 Fallback com bg-muted
- ♿ Suporte a alt text e ARIA
- 🔄 Callback de status de carregamento
