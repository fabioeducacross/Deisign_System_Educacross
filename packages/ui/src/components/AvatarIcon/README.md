# AvatarIcon Component

Ícone padrão do Educacross para uso em avatares quando não há imagem personalizada.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { Avatar, AvatarIcon, AvatarFallback } from "@fabioeducacross/ui";

export default function MyAvatar() {
  return (
    <Avatar>
      <AvatarIcon />
      <AvatarFallback>EC</AvatarFallback>
    </Avatar>
  );
}
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Tamanho do ícone |
| `className` | `string` | - | Classes CSS adicionais |
| `alt` | `string` | `"Avatar Educacross"` | Texto alternativo (acessibilidade) |

## Tamanhos

```tsx
<div className="flex items-end gap-4">
  <Avatar size="sm">
    <AvatarIcon size="sm" />     {/* 32px (h-8) */}
  </Avatar>

  <Avatar size="default">
    <AvatarIcon size="default" /> {/* 40px (h-10) */}
  </Avatar>

  <Avatar size="lg">
    <AvatarIcon size="lg" />     {/* 48px (h-12) */}
  </Avatar>
</div>
```

## Exemplos de Uso

### Avatar Padrão (Sem Imagem)

```tsx
<Avatar>
  <AvatarIcon />
</Avatar>
```

### Avatar com Fallback

```tsx
<Avatar>
  <AvatarImage src="/avatar.jpg" alt="João Silva" />
  <AvatarIcon />
  <AvatarFallback>JS</AvatarFallback>
</Avatar>
```

### Lista de Usuários Sem Foto

```tsx
function UserList({ users }) {
  return (
    <div className="space-y-3">
      {users.map((user) => (
        <div key={user.id} className="flex items-center gap-3">
          <Avatar>
            {user.avatar ? (
              <AvatarImage src={user.avatar} alt={user.name} />
            ) : (
              <AvatarIcon />
            )}
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Contas Guest/Anônimas

```tsx
function GuestAvatar() {
  return (
    <Avatar>
      <AvatarIcon />
      <AvatarFallback>
        <Icons.User className="h-5 w-5" />
      </AvatarFallback>
    </Avatar>
  );
}
```

### Avatar com Badge

```tsx
<div className="relative">
  <Avatar>
    <AvatarIcon />
  </Avatar>
  <Badge
    variant="softPrimary"
    className="absolute -bottom-1 -right-1"
    size="sm"
  >
    Educacross
  </Badge>
</div>
```

### Avatar do Sistema/Bot

```tsx
function SystemAvatar() {
  return (
    <div className="flex items-center gap-2">
      <Avatar size="sm">
        <AvatarIcon size="sm" />
      </Avatar>
      <div>
        <p className="text-sm font-medium">Assistente Educacross</p>
        <Badge variant="softPrimary" size="sm">Bot</Badge>
      </div>
    </div>
  );
}
```

## Implementação Técnica

O `AvatarIcon` usa uma **data URL Base64** para garantir renderização consistente:

```tsx
// Internamente:
<img
  src={avatarDataUrl} // SVG embutido como base64
  alt="Avatar Educacross"
  className="h-10 w-10 object-contain"
/>
```

**Vantagens:**
- ✅ Sem requisição HTTP extra
- ✅ Renderização instantânea
- ✅ Funciona offline
- ✅ Ícone oficial do Educacross (do Figma)

## Quando Usar

### ✅ Usar AvatarIcon quando:
- Usuário não tem foto de perfil cadastrada
- Conta é guest/anônima
- Avatar do sistema/bot/assistente
- Placeholder temporário enquanto imagem carrega

### ❌ Não usar quando:
- Usuário tem foto personalizada (use `AvatarImage`)
- Quer iniciais do nome (use `AvatarFallback`)
- Precisa ícone genérico (use `<Icons.User />`)

## Comparação: AvatarIcon vs AvatarFallback vs Icon

| Componente | Quando Usar | Visual |
|------------|-------------|--------|
| `AvatarIcon` | Avatar padrão Educacross, contas sistema/bot | Logotipo Educacross |
| `AvatarFallback` | Iniciais do usuário (ex: "JS") | Texto com bg-muted |
| `<Icon name="User" />` | Ícone genérico de usuário | Ícone Feather |

```tsx
// AvatarIcon (identidade Educacross)
<Avatar>
  <AvatarIcon />
</Avatar>

// AvatarFallback (iniciais)
<Avatar>
  <AvatarFallback>JS</AvatarFallback>
</Avatar>

// Icon genérico
<Avatar>
  <AvatarFallback>
    <Icon name="User" />
  </AvatarFallback>
</Avatar>
```

## Acessibilidade

O componente AvatarIcon segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **alt text**: "Avatar Educacross" por padrão (pode ser sobrescrito)
- ✅ **object-contain**: Garante proporção correta
- ✅ **role="img"**: Tag `<img>` nativa com semântica adequada

### Exemplo Acessível

```tsx
<Avatar>
  <AvatarIcon alt="Avatar padrão do sistema Educacross" />
</Avatar>
```

## Boas Práticas

### ✅ Correto

```tsx
// Usar como fallback para imagens
<Avatar>
  <AvatarImage src={user.avatar} alt={user.name} />
  <AvatarIcon />
  <AvatarFallback>{user.initials}</AvatarFallback>
</Avatar>

// Tamanho consistente com Avatar pai
<Avatar size="lg">
  <AvatarIcon size="lg" />
</Avatar>
```

### ❌ Incorreto

```tsx
// Tamanhos incompatíveis (visual quebrado)
<Avatar size="xs">
  <AvatarIcon size="lg" /> {/* Muito grande */}
</Avatar>

// Usar como ícone fora de Avatar (não é o propósito)
<Button>
  <AvatarIcon /> {/* Use Icon ou CustomIcon */}
  Educacross
</Button>
```

## Links

- [Código Fonte](./AvatarIcon.tsx)
- [Avatar Component](../Avatar/README.md)
- [Storybook - Avatar Stories](../../../../apps/storybook/stories/components/Avatar.stories.tsx)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido
- 💡 Exemplos práticos (guest, bot, sistema)

### v0.1.1
- ✨ Lançamento inicial
- 🎨 3 tamanhos (sm, default, lg)
- 📦 SVG embutido como data URL base64
- 🖼️ Ícone oficial do Educacross do Figma
- ♿ alt text padrão "Avatar Educacross"
