# Tabs Component

Componente de abas para organizar conteúdo em seções navegáveis.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@fabioeducacross/ui";

export default function Dashboard() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="analytics">Análises</TabsTrigger>
        <TabsTrigger value="reports">Relatórios</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <p>Conteúdo da visão geral.</p>
      </TabsContent>

      <TabsContent value="analytics">
        <p>Gráficos e métricas de análise.</p>
      </TabsContent>

      <TabsContent value="reports">
        <p>Relatórios detalhados.</p>
      </TabsContent>
    </Tabs>
  );
}
```

## Props

### Tabs

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `value` | `string` | - | Aba ativa (controlado) |
| `defaultValue` | `string` | - | Aba inicial (não controlado) |
| `onValueChange` | `(value: string) => void` | - | Callback ao trocar de aba |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Orientação das abas |
| `className` | `string` | - | Classes CSS adicionais |

### TabsList

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `"default" \| "outline" \| "pills" \| "rounded"` | `"default"` | Estilo visual da lista |
| `className` | `string` | - | Classes CSS adicionais |

### TabsTrigger

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `value` | `string` | - | Identificador da aba (obrigatório) |
| `disabled` | `boolean` | `false` | Desabilita esta aba |
| `icon` | `React.ReactNode` | - | Ícone opcional antes do texto |
| `className` | `string` | - | Classes CSS adicionais |

### TabsContent

| Prop | Tipo | Descrição |
|------|------|-----------|
| `value` | `string` | Identificador da aba (obrigatório) |
| `className` | `string` | Classes CSS adicionais |
| `forceMount` | `boolean` | Mantém conteúdo montado mesmo quando inativo |

## Variantes

### Default (Com Fundo)

```tsx
<Tabs defaultValue="tab1">
  <TabsList variant="default">
    <TabsTrigger value="tab1">Aba 1</TabsTrigger>
    <TabsTrigger value="tab2">Aba 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Conteúdo 1</TabsContent>
  <TabsContent value="tab2">Conteúdo 2</TabsContent>
</Tabs>
```

### Outline (Linha Inferior)

```tsx
<Tabs defaultValue="tab1">
  <TabsList variant="outline">
    <TabsTrigger value="tab1">Aba 1</TabsTrigger>
    <TabsTrigger value="tab2">Aba 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Conteúdo com linha inferior.</TabsContent>
  <TabsContent value="tab2">Conteúdo 2</TabsContent>
</Tabs>
```

### Pills (Estilo Pílula)

```tsx
<Tabs defaultValue="tab1">
  <TabsList variant="pills">
    <TabsTrigger value="tab1">Aba 1</TabsTrigger>
    <TabsTrigger value="tab2">Aba 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Abas arredondadas como pílulas.</TabsContent>
  <TabsContent value="tab2">Conteúdo 2</TabsContent>
</Tabs>
```

### Rounded (Educacross Style)

```tsx
<Tabs defaultValue="tab1">
  <TabsList variant="rounded">
    <TabsTrigger value="tab1">Aba 1</TabsTrigger>
    <TabsTrigger value="tab2">Aba 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Estilo arredondado característico.</TabsContent>
  <TabsContent value="tab2">Conteúdo 2</TabsContent>
</Tabs>
```

## Orientação

### Horizontal (Padrão)

```tsx
<Tabs defaultValue="home" orientation="horizontal">
  <TabsList>
    <TabsTrigger value="home">Início</TabsTrigger>
    <TabsTrigger value="profile">Perfil</TabsTrigger>
    <TabsTrigger value="settings">Configurações</TabsTrigger>
  </TabsList>
  <TabsContent value="home">Conteúdo do Início</TabsContent>
  <TabsContent value="profile">Conteúdo do Perfil</TabsContent>
  <TabsContent value="settings">Conteúdo de Configurações</TabsContent>
</Tabs>
```

### Vertical

```tsx
<Tabs defaultValue="account" orientation="vertical" className="flex">
  <TabsList className="flex-col h-auto">
    <TabsTrigger value="account">Conta</TabsTrigger>
    <TabsTrigger value="privacy">Privacidade</TabsTrigger>
    <TabsTrigger value="notifications">Notificações</TabsTrigger>
  </TabsList>
  
  <div className="flex-1 ml-4">
    <TabsContent value="account">Configurações da conta</TabsContent>
    <TabsContent value="privacy">Configurações de privacidade</TabsContent>
    <TabsContent value="notifications">Preferências de notificação</TabsContent>
  </div>
</Tabs>
```

## Exemplos de Uso

### Tabs com Ícones

```tsx
<Tabs defaultValue="home">
  <TabsList>
    <TabsTrigger value="home">
      <Icons.Home className="h-4 w-4 mr-2" />
      Início
    </TabsTrigger>
    <TabsTrigger value="user">
      <Icons.User className="h-4 w-4 mr-2" />
      Perfil
    </TabsTrigger>
    <TabsTrigger value="settings">
      <Icons.Settings className="h-4 w-4 mr-2" />
      Configurações
    </TabsTrigger>
  </TabsList>
  
  <TabsContent value="home">Página inicial</TabsContent>
  <TabsContent value="user">Dados do perfil</TabsContent>
  <TabsContent value="settings">Configurações da conta</TabsContent>
</Tabs>
```

### Tabs com Badge de Notificação

```tsx
<Tabs defaultValue="messages">
  <TabsList>
    <TabsTrigger value="messages">
      Mensagens
      <Badge variant="destructive" className="ml-2">
        3
      </Badge>
    </TabsTrigger>
    <TabsTrigger value="requests">
      Solicitações
      <Badge variant="secondary" className="ml-2">
        12
      </Badge>
    </TabsTrigger>
    <TabsTrigger value="archived">Arquivados</TabsTrigger>
  </TabsList>
  
  <TabsContent value="messages">3 novas mensagens</TabsContent>
  <TabsContent value="requests">12 solicitações pendentes</TabsContent>
  <TabsContent value="archived">Conversas arquivadas</TabsContent>
</Tabs>
```

### Tabs Controladas

```tsx
function ControlledTabs() {
  const [activeTab, setActiveTab] = useState("step1");

  const handleNext = () => {
    const steps = ["step1", "step2", "step3"];
    const currentIndex = steps.indexOf(activeTab);
    if (currentIndex < steps.length - 1) {
      setActiveTab(steps[currentIndex + 1]);
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="step1">Passo 1</TabsTrigger>
        <TabsTrigger value="step2">Passo 2</TabsTrigger>
        <TabsTrigger value="step3">Passo 3</TabsTrigger>
      </TabsList>

      <TabsContent value="step1">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent>
            <Input placeholder="Nome completo" />
          </CardContent>
          <CardFooter>
            <Button onClick={handleNext}>Próximo</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="step2">
        <Card>
          <CardHeader>
            <CardTitle>Detalhes Adicionais</CardTitle>
          </CardHeader>
          <CardContent>
            <Input placeholder="E-mail" />
          </CardContent>
          <CardFooter>
            <Button onClick={handleNext}>Próximo</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="step3">
        <Card>
          <CardHeader>
            <CardTitle>Confirmação</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Revise suas informações antes de enviar.</p>
          </CardContent>
          <CardFooter>
            <Button>Concluir</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
```

### Tabs com Cards

```tsx
<Tabs defaultValue="courses">
  <TabsList>
    <TabsTrigger value="courses">Meus Cursos</TabsTrigger>
    <TabsTrigger value="saved">Salvos</TabsTrigger>
    <TabsTrigger value="completed">Concluídos</TabsTrigger>
  </TabsList>

  <TabsContent value="courses" className="space-y-4">
    {courses.map((course) => (
      <Card key={course.id}>
        <CardHeader>
          <CardTitle>{course.title}</CardTitle>
          <CardDescription>Progresso: {course.progress}%</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </CardContent>
      </Card>
    ))}
  </TabsContent>

  <TabsContent value="saved">Cursos salvos para depois</TabsContent>
  <TabsContent value="completed">Cursos que você concluiu</TabsContent>
</Tabs>
```

### Tabs Desabilitadas

```tsx
<Tabs defaultValue="available">
  <TabsList>
    <TabsTrigger value="available">Disponível</TabsTrigger>
    <TabsTrigger value="premium" disabled>
      Premium
      <Icons.Lock className="h-3 w-3 ml-2" />
    </TabsTrigger>
    <TabsTrigger value="admin" disabled>
      Admin
    </TabsTrigger>
  </TabsList>

  <TabsContent value="available">
    Conteúdo público disponível
  </TabsContent>
  <TabsContent value="premium">
    Requer assinatura premium
  </TabsContent>
  <TabsContent value="admin">
    Acesso apenas para administradores
  </TabsContent>
</Tabs>
```

### Tabs em Layout Complexo

```tsx
function ProductPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Descrição</TabsTrigger>
            <TabsTrigger value="specs">Especificações</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações (28)</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="prose">
            <h3>Sobre o produto</h3>
            <p>Descrição detalhada do produto...</p>
          </TabsContent>

          <TabsContent value="specs">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Peso</TableCell>
                  <TableCell>1.2 kg</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Dimensões</TableCell>
                  <TableCell>30 x 20 x 5 cm</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="reviews">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <CardTitle>{review.author}</CardTitle>
                </CardHeader>
                <CardContent>{review.text}</CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>R$ 299,90</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Adicionar ao carrinho</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

## Acessibilidade

O componente Tabs segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **Navegação por teclado**: `Tab` para focar tabs, `Arrow Left/Right` para navegar entre tabs, `Home/End` para primeira/última tab
- ✅ **Foco visível**: Anel de foco com `focus-visible:ring-2`
- ✅ **ARIA completo**: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`
- ✅ **Estados claros**: Tab ativa visualmente destacada
- ✅ **Semântica**: Estrutura acessível para leitores de tela

### Exemplo Acessível Completo

```tsx
<section aria-labelledby="settings-heading">
  <h2 id="settings-heading" className="sr-only">
    Configurações da Conta
  </h2>
  
  <Tabs defaultValue="general">
    <TabsList aria-label="Categorias de configurações">
      <TabsTrigger value="general">Geral</TabsTrigger>
      <TabsTrigger value="security">Segurança</TabsTrigger>
      <TabsTrigger value="privacy">Privacidade</TabsTrigger>
    </TabsList>

    <TabsContent value="general" className="focus:outline-none">
      <h3 className="text-lg font-semibold mb-4">Configurações Gerais</h3>
      {/* Conteúdo */}
    </TabsContent>

    <TabsContent value="security" className="focus:outline-none">
      <h3 className="text-lg font-semibold mb-4">Configurações de Segurança</h3>
      {/* Conteúdo */}
    </TabsContent>

    <TabsContent value="privacy" className="focus:outline-none">
      <h3 className="text-lg font-semibold mb-4">Configurações de Privacidade</h3>
      {/* Conteúdo */}
    </TabsContent>
  </Tabs>
</section>
```

## Animação

Transições suaves entre conteúdos:

```tsx
<TabsContent
  value="tab1"
  className="data-[state=active]:animate-in data-[state=inactive]:animate-out fade-in-0 fade-out-0"
>
  Conteúdo com animação de fade
</TabsContent>
```

## Links

- [Storybook - Tabs Stories](../../../../apps/storybook/stories/components/Tabs.stories.tsx)
- [Código Fonte](./Tabs.tsx)
- [Testes](./Tabs.test.tsx)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido
- 💡 Exemplos avançados (ícones, badges, vertical, controladas)

### v0.1.1
- ✨ Lançamento inicial
- 🎨 4 variantes (default, outline, pills, rounded)
- 🔄 Orientação horizontal e vertical
- ⌨️ Navegação completa por teclado
- 🎬 Suporte a animações de transição
