# Card Component

Componente container para agrupar conteúdo relacionado com bordas, sombras e áreas semânticas.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@fabioeducacross/ui";

export default function ProductCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Título do Card</CardTitle>
        <CardDescription>Descrição opcional do conteúdo</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Conteúdo principal do card.</p>
      </CardContent>
      <CardFooter>
        <Button>Ação</Button>
      </CardFooter>
    </Card>
  );
}
```

## Props

### Card

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `"default" \| "elevated" \| "outline" \| "interactive"` | `"default"` | Estilo visual do card |
| `padding` | `"none" \| "sm" \| "default" \| "lg"` | `"default"` | Espaçamento interno |
| `className` | `string` | - | Classes CSS adicionais |

### CardHeader

| Prop | Tipo | Descrição |
|------|------|-----------|
| `className` | `string` | Classes CSS adicionais |

### CardTitle

| Prop | Tipo | Descrição |
|------|------|-----------|
| `className` | `string` | Classes CSS adicionais |
| `as` | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"` | Tag HTML (padrão: `h3`) |

### CardDescription

| Prop | Tipo | Descrição |
|------|------|-----------|
| `className` | `string` | Classes CSS adicionais |

### CardContent / CardFooter

| Prop | Tipo | Descrição |
|------|------|-----------|
| `className` | `string` | Classes CSS adicionais |

## Variantes

### Default (Sombra Sutil)

```tsx
<Card variant="default">
  <CardHeader>
    <CardTitle>Card Padrão</CardTitle>
  </CardHeader>
  <CardContent>
    Sombra sutil para separação visual.
  </CardContent>
</Card>
```

### Elevated (Sombra Elevada)

```tsx
<Card variant="elevated">
  <CardHeader>
    <CardTitle>Card Elevado</CardTitle>
  </CardHeader>
  <CardContent>
    Sombra mais pronunciada com hover effect.
  </CardContent>
</Card>
```

### Outline (Apenas Borda)

```tsx
<Card variant="outline">
  <CardHeader>
    <CardTitle>Card Outline</CardTitle>
  </CardHeader>
  <CardContent>
    Sem sombra, apenas borda para visual minimalista.
  </CardContent>
</Card>
```

### Interactive (Clicável)

```tsx
<Card variant="interactive" onClick={() => navigate("/detalhes")}>
  <CardHeader>
    <CardTitle>Card Interativo</CardTitle>
  </CardHeader>
  <CardContent>
    Cursor pointer com hover effect para ações.
  </CardContent>
</Card>
```

## Padding

```tsx
<div className="space-y-4">
  <Card padding="none">
    <div className="p-6">
      <CardTitle>Sem Padding</CardTitle>
      <p>Controle manual de espaçamento.</p>
    </div>
  </Card>

  <Card padding="sm">
    <CardTitle>Padding Pequeno</CardTitle>
  </Card>

  <Card padding="default">
    <CardTitle>Padding Padrão</CardTitle>
  </Card>

  <Card padding="lg">
    <CardTitle>Padding Grande</CardTitle>
  </Card>
</div>
```

## Exemplos de Uso

### Card de Perfil de Usuário

```tsx
<Card>
  <CardHeader className="flex flex-row items-center gap-4">
    <Avatar>
      <AvatarImage src="/user.jpg" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <div>
      <CardTitle>João da Silva</CardTitle>
      <CardDescription>Desenvolvedor Full Stack</CardDescription>
    </div>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">
      Especialista em React e Node.js com 5 anos de experiência.
    </p>
  </CardContent>
  <CardFooter className="gap-2">
    <Button>Seguir</Button>
    <Button variant="outline">Mensagem</Button>
  </CardFooter>
</Card>
```

### Card de Estatística

```tsx
<Card variant="outline">
  <CardHeader className="flex flex-row items-center justify-between pb-2">
    <CardTitle className="text-sm font-medium">
      Total de Vendas
    </CardTitle>
    <Icons.DollarSign className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">R$ 45.231,89</div>
    <p className="text-xs text-muted-foreground">
      +20.1% em relação ao mês passado
    </p>
  </CardContent>
</Card>
```

### Card de Formulário

```tsx
<Card>
  <CardHeader>
    <CardTitle>Criar conta</CardTitle>
    <CardDescription>
      Preencha os dados abaixo para criar sua conta
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="name">Nome completo</Label>
      <Input id="name" placeholder="Digite seu nome" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="email">E-mail</Label>
      <Input id="email" type="email" placeholder="seu@email.com" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="password">Senha</Label>
      <Input id="password" type="password" />
    </div>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Criar conta</Button>
  </CardFooter>
</Card>
```

### Card Interativo (Lista de Produtos)

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {products.map((product) => (
    <Card
      key={product.id}
      variant="interactive"
      onClick={() => navigate(`/produto/${product.id}`)}
    >
      <CardHeader padding="none">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <CardDescription>{product.category}</CardDescription>
        <p className="text-xl font-bold mt-2">
          R$ {product.price.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  ))}
</div>
```

### Card com Imagem de Fundo

```tsx
<Card
  padding="none"
  className="relative overflow-hidden h-64"
  style={{
    backgroundImage: "url('/hero.jpg')",
    backgroundSize: "cover",
  }}
>
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
  <CardHeader className="relative z-10 text-white mt-auto">
    <CardTitle className="text-2xl">Título Destacado</CardTitle>
    <CardDescription className="text-white/90">
      Descrição sobre a imagem de fundo
    </CardDescription>
  </CardHeader>
</Card>
```

### Card de Notificação

```tsx
<Card variant="outline" className="border-l-4 border-l-primary">
  <CardHeader className="flex flex-row items-start gap-3">
    <Icons.Info className="h-5 w-5 text-primary mt-0.5" />
    <div>
      <CardTitle className="text-base">Nova mensagem</CardTitle>
      <CardDescription>Você tem 3 mensagens não lidas</CardDescription>
    </div>
  </CardHeader>
  <CardFooter>
    <Button size="sm" variant="ghost">Ver mensagens</Button>
  </CardFooter>
</Card>
```

### Card de Tabela

```tsx
<Card>
  <CardHeader>
    <CardTitle>Usuários Recentes</CardTitle>
    <CardDescription>Lista de novos cadastros da semana</CardDescription>
  </CardHeader>
  <CardContent padding="none">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Data</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </CardContent>
</Card>
```

## Acessibilidade

O componente Card segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **Semântica clara**: Usa `<div>` com roles adequados quando necessário
- ✅ **Foco visível**: Cards interativos têm foco com `focus-visible:ring-2`
- ✅ **Contraste**: Textos seguem contraste mínimo 4.5:1
- ✅ **Navegação por teclado**: Cards interativos acessíveis via Tab + Enter/Space
- ✅ **Hierarquia de heading**: CardTitle usa heading semântico (h1-h6)

### Card Interativo Acessível

```tsx
<Card
  variant="interactive"
  onClick={() => navigate("/curso/1")}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate("/curso/1");
    }
  }}
  tabIndex={0}
  role="button"
  aria-label="Ver detalhes do curso React Avançado"
>
  <CardHeader>
    <CardTitle>React Avançado</CardTitle>
    <CardDescription>Aprenda hooks, context e performance</CardDescription>
  </CardHeader>
  <CardContent>
    <Badge>10 módulos</Badge>
  </CardContent>
</Card>
```

## Composições Comuns

### Grid de Cards

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <Card key={item.id}>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>{item.content}</CardContent>
    </Card>
  ))}
</div>
```

### Card Stack (Empilhado)

```tsx
<div className="space-y-4">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>
```

## Links

- [Storybook - Card Stories](../../../../apps/storybook/stories/components/Card.stories.tsx)
- [Código Fonte](./Card.tsx)
- [Testes](./Card.test.tsx)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido
- 💡 Exemplos de composições e casos de uso

### v0.1.1
- ✨ Lançamento inicial
- 🎨 4 variantes (default, elevated, outline, interactive)
- 📏 4 níveis de padding (none, sm, default, lg)
- 🧩 Componentes auxiliares (Header, Title, Description, Content, Footer)
