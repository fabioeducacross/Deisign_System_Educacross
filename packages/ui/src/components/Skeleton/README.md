# Skeleton Component

Componente de placeholder animado para estados de carregamento.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { Skeleton } from "@fabioeducacross/ui";

export default function MySkeleton() {
  return <Skeleton className="h-12 w-12 rounded-full" />;
}
```

## Props

### Skeleton

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `"default" \| "primary" \| "card"` | `"default"` | Estilo visual do skeleton |
| `className` | `string` | - | Classes CSS adicionais |

### SkeletonText

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `lines` | `number` | `3` | Número de linhas a exibir |
| `lastLineWidth` | `string` | `"60%"` | Largura da última linha (CSS width) |
| `className` | `string` | - | Classes CSS adicionais |

## Variantes

```tsx
<div className="space-y-4">
  {/* Default: fundo cinza neutro */}
  <Skeleton variant="default" className="h-4 w-full" />

  {/* Primary: fundo com tom da cor primária (20% opacidade) */}
  <Skeleton variant="primary" className="h-4 w-full" />

  {/* Card: fundo cinza com borda (para simular cards) */}
  <Skeleton variant="card" className="h-20 w-full rounded-lg" />
</div>
```

## Exemplos de Uso

### Avatar com Nome

```tsx
<div className="flex items-center gap-3">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-3 w-[200px]" />
  </div>
</div>
```

### Card de Produto

```tsx
<Card>
  <CardContent className="p-4">
    <Skeleton variant="card" className="h-48 w-full mb-4 rounded-md" />
    <Skeleton className="h-4 w-3/4 mb-2" />
    <Skeleton className="h-3 w-1/2" />
  </CardContent>
</Card>
```

### Lista de Itens

```tsx
<div className="space-y-4">
  {Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className="flex items-center gap-3">
      <Skeleton className="h-10 w-10 rounded-md" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  ))}
</div>
```

### Tabela com Loading

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nome</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {Array.from({ length: 5 }).map((_, i) => (
      <TableRow key={i}>
        <TableCell>
          <Skeleton className="h-4 w-[150px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[200px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-6 w-[80px] rounded-full" />
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Formulário com Loading

```tsx
<div className="space-y-4">
  <div className="space-y-2">
    <Skeleton className="h-4 w-20" /> {/* Label */}
    <Skeleton className="h-10 w-full" /> {/* Input */}
  </div>
  <div className="space-y-2">
    <Skeleton className="h-4 w-20" />
    <Skeleton className="h-10 w-full" />
  </div>
  <Skeleton className="h-10 w-24" /> {/* Button */}
</div>
```

### Texto com Parágrafos (SkeletonText)

```tsx
import { SkeletonText } from "@fabioeducacross/ui";

// Simular 5 linhas de texto, última linha com 60% de largura
<SkeletonText lines={5} lastLineWidth="60%" />

// Simular parágrafo curto
<SkeletonText lines={3} lastLineWidth="40%" />
```

### Card Completo com Loading

```tsx
function SkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-2/3 mb-2" /> {/* Title */}
        <Skeleton className="h-4 w-1/2" /> {/* Description */}
      </CardHeader>
      <CardContent>
        <SkeletonText lines={4} lastLineWidth="70%" />
      </CardContent>
      <CardFooter className="justify-between">
        <Skeleton className="h-10 w-24" /> {/* Button */}
        <Skeleton className="h-10 w-24" /> {/* Button */}
      </CardFooter>
    </Card>
  );
}
```

### Perfil Completo

```tsx
function ProfileSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="h-24 w-24 rounded-full" />
      <div className="space-y-2 text-center w-full">
        <Skeleton className="h-6 w-48 mx-auto" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}
```

## Casos de Uso Comuns

### Componente com Loading State

```tsx
function UserList() {
  const { data: users, isLoading } = useQuery("users", fetchUsers);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

### Skeleton Condicional

```tsx
function DataCard({ data, isLoading }) {
  return (
    <Card>
      <CardHeader>
        {isLoading ? (
          <Skeleton className="h-6 w-1/2" />
        ) : (
          <CardTitle>{data.title}</CardTitle>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <SkeletonText lines={3} />
        ) : (
          <p>{data.content}</p>
        )}
      </CardContent>
    </Card>
  );
}
```

### Dashboard com Loading

```tsx
function Dashboard() {
  const { data, isLoading } = useQuery("dashboard", fetchDashboard);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-8 w-32" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  return <DashboardContent data={data} />;
}
```

## Acessibilidade

O componente Skeleton segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **aria-busy**: Marque container pai com `aria-busy="true"` durante loading
- ✅ **aria-live**: Use `aria-live="polite"` para anunciar quando conteúdo carregar
- ✅ **Não interativo**: Skeleton não deve receber foco ou eventos de clique
- ✅ **Mensagem de carregamento**: Sempre forneça texto alternativo

### Exemplo Acessível

```tsx
<div aria-busy={isLoading} aria-live="polite">
  {isLoading ? (
    <>
      <span className="sr-only">Carregando usuários...</span>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <UserList users={users} />
  )}
</div>
```

## Boas Práticas

### ✅ Correto

```tsx
// Usar tamanhos próximos ao conteúdo real
<Skeleton className="h-4 w-[250px]" /> // Para texto
<Skeleton className="h-10 w-10 rounded-full" /> // Para avatar

// Manter estrutura visual consistente
{isLoading ? <Skeleton className="h-6 w-1/2" /> : <h2>{title}</h2>}

// Usar SkeletonText para parágrafos
<SkeletonText lines={4} lastLineWidth="60%" />
```

### ❌ Incorreto

```tsx
// Skeleton sem dimensões definidas (colapsa)
<Skeleton />

// Muitas linhas uniformes (não parece texto real)
<div>
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-full" />
</div>

// Mostrar spinner E skeleton ao mesmo tempo (redundante)
{isLoading && (
  <>
    <Spinner />
    <Skeleton className="h-10 w-full" />
  </>
)}
```

## Links

- [Storybook - Skeleton Stories](../../../../apps/storybook/stories/components/Skeleton.stories.tsx)
- [Código Fonte](./Skeleton.tsx)
- [Testes](./Skeleton.test.tsx)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido
- 💡 Exemplos práticos (tabelas, cards, perfis)

### v0.1.1
- ✨ Lançamento inicial
- 🎨 3 variantes (default, primary, card)
- ⚡ Animação `animate-pulse` integrada
- 📝 Componente helper `SkeletonText` para parágrafos
- 🔧 Props `lines` e `lastLineWidth` para controle fino
