# Accordion Component

Componente de acordeão para expandir/colapsar seções de conteúdo de forma interativa.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@fabioeducacross/ui";

export default function FAQ() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>O que é o Educacross?</AccordionTrigger>
        <AccordionContent>
          Educacross é uma plataforma educacional completa.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Como posso me inscrever?</AccordionTrigger>
        <AccordionContent>
          Acesse a página de cadastro e preencha o formulário.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

## Props

### Accordion

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `type` | `"single" \| "multiple"` | `"single"` | Um ou múltiplos itens abertos simultaneamente |
| `value` | `string \| string[]` | - | Valor(es) dos itens expandidos (controlado) |
| `defaultValue` | `string \| string[]` | - | Valor inicial (não controlado) |
| `onValueChange` | `(value: string \| string[]) => void` | - | Callback ao mudar estado |
| `collapsible` | `boolean` | `false` | Permite fechar todos os itens (apenas `type="single"`) |
| `disabled` | `boolean` | `false` | Desabilita todo o acordeão |
| `variant` | `"default" \| "card" \| "ghost"` | `"default"` | Estilo visual |

### AccordionItem

| Prop | Tipo | Descrição |
|------|------|-----------|
| `value` | `string` | Identificador único do item (obrigatório) |
| `disabled` | `boolean` | Desabilita este item específico |
| `className` | `string` | Classes CSS adicionais |

### AccordionTrigger

| Prop | Tipo | Descrição |
|------|------|-----------|
| `className` | `string` | Classes CSS adicionais |
| `icon` | `React.ReactNode` | Ícone customizado (sobrepõe chevron padrão) |

### AccordionContent

| Prop | Tipo | Descrição |
|------|------|-----------|
| `className` | `string` | Classes CSS adicionais |

## Variantes

### Default (Borda Inferior)

```tsx
<Accordion type="single" collapsible variant="default">
  <AccordionItem value="1">
    <AccordionTrigger>Item 1</AccordionTrigger>
    <AccordionContent>Conteúdo com borda inferior.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="2">
    <AccordionTrigger>Item 2</AccordionTrigger>
    <AccordionContent>Conteúdo com borda inferior.</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Card (Estilo Card)

```tsx
<Accordion type="single" collapsible variant="card">
  <AccordionItem value="1">
    <AccordionTrigger>Card Item 1</AccordionTrigger>
    <AccordionContent>Cada item tem aparência de card separado.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="2">
    <AccordionTrigger>Card Item 2</AccordionTrigger>
    <AccordionContent>Com borda e espaçamento.</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Ghost (Sem Borda)

```tsx
<Accordion type="single" collapsible variant="ghost">
  <AccordionItem value="1">
    <AccordionTrigger>Ghost Item 1</AccordionTrigger>
    <AccordionContent>Visual minimalista sem bordas.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="2">
    <AccordionTrigger>Ghost Item 2</AccordionTrigger>
    <AccordionContent>Foco apenas no conteúdo.</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Tipo: Single vs Multiple

### Single (Apenas Um Aberto)

```tsx
<Accordion type="single" collapsible defaultValue="faq-1">
  <AccordionItem value="faq-1">
    <AccordionTrigger>FAQ 1</AccordionTrigger>
    <AccordionContent>Ao abrir outro, este fecha automaticamente.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="faq-2">
    <AccordionTrigger>FAQ 2</AccordionTrigger>
    <AccordionContent>Apenas um item pode estar aberto.</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Multiple (Vários Abertos)

```tsx
<Accordion type="multiple" defaultValue={["filter-1", "filter-2"]}>
  <AccordionItem value="filter-1">
    <AccordionTrigger>Categoria</AccordionTrigger>
    <AccordionContent>
      <Checkbox id="cat1" /> <Label htmlFor="cat1">Tecnologia</Label>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="filter-2">
    <AccordionTrigger>Preço</AccordionTrigger>
    <AccordionContent>
      <Checkbox id="price1" /> <Label htmlFor="price1">Até R$ 100</Label>
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

## Exemplos de Uso

### FAQ (Perguntas Frequentes)

```tsx
function FAQ() {
  const faqs = [
    {
      question: "Como resetar minha senha?",
      answer: "Clique em 'Esqueci minha senha' na tela de login e siga as instruções enviadas por e-mail."
    },
    {
      question: "Qual o prazo de entrega?",
      answer: "O prazo padrão é de 5 a 10 dias úteis após a confirmação do pagamento."
    },
    {
      question: "Posso cancelar meu pedido?",
      answer: "Sim, você pode cancelar em até 24 horas após a compra sem custos adicionais."
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
      <Accordion type="single" collapsible variant="card">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
```

### Filtros de Busca (Múltiplos Abertos)

```tsx
function SearchFilters() {
  const [filters, setFilters] = useState({
    category: [],
    price: [],
    brand: []
  });

  return (
    <Accordion type="multiple" defaultValue={["category", "price"]}>
      <AccordionItem value="category">
        <AccordionTrigger>
          Categoria
          <Badge variant="secondary" className="ml-auto">
            {filters.category.length}
          </Badge>
        </AccordionTrigger>
        <AccordionContent className="space-y-2">
          {["Eletrônicos", "Livros", "Roupas"].map((cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox id={cat} />
              <Label htmlFor={cat}>{cat}</Label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="price">
        <AccordionTrigger>Faixa de Preço</AccordionTrigger>
        <AccordionContent className="space-y-2">
          <RadioGroup>
            <div className="flex items-center space-x-2">
              <Radio value="0-50" id="p1" />
              <Label htmlFor="p1">Até R$ 50</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Radio value="50-100" id="p2" />
              <Label htmlFor="p2">R$ 50 - R$ 100</Label>
            </div>
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

### Conteúdo Educacional (Módulos do Curso)

```tsx
function CourseModules() {
  const modules = [
    {
      title: "Módulo 1: Introdução",
      lessons: ["Visão geral", "Instalação", "Primeiro projeto"],
      duration: "45min"
    },
    {
      title: "Módulo 2: Fundamentos",
      lessons: ["Componentes", "Props", "Estado"],
      duration: "1h 30min"
    }
  ];

  return (
    <Accordion type="single" collapsible variant="card">
      {modules.map((module, index) => (
        <AccordionItem key={index} value={`module-${index}`}>
          <AccordionTrigger>
            <div className="flex items-center justify-between w-full">
              <span>{module.title}</span>
              <span className="text-sm text-muted-foreground mr-2">
                {module.duration}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2">
              {module.lessons.map((lesson, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Icons.PlayCircle className="h-4 w-4 text-primary" />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
```

### Accordion com Ícones Customizados

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="success">
    <AccordionTrigger
      icon={<Icons.CheckCircle className="h-5 w-5 text-success" />}
    >
      Etapa Concluída
    </AccordionTrigger>
    <AccordionContent>
      Parabéns! Esta etapa foi concluída com sucesso.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="warning">
    <AccordionTrigger
      icon={<Icons.AlertTriangle className="h-5 w-5 text-warning" />}
    >
      Atenção Necessária
    </AccordionTrigger>
    <AccordionContent>
      Esta etapa requer revisão antes de prosseguir.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Accordion Controlado

```tsx
function ControlledAccordion() {
  const [openItem, setOpenItem] = useState<string>("item-1");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={() => setOpenItem("item-1")} size="sm">
          Abrir Item 1
        </Button>
        <Button onClick={() => setOpenItem("item-2")} size="sm">
          Abrir Item 2
        </Button>
        <Button onClick={() => setOpenItem("")} size="sm" variant="outline">
          Fechar Todos
        </Button>
      </div>

      <Accordion
        type="single"
        collapsible
        value={openItem}
        onValueChange={setOpenItem}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Item Controlado 1</AccordionTrigger>
          <AccordionContent>Conteúdo do item 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item Controlado 2</AccordionTrigger>
          <AccordionContent>Conteúdo do item 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
```

### Accordion Desabilitado

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="enabled">
    <AccordionTrigger>Item Habilitado</AccordionTrigger>
    <AccordionContent>Você pode abrir este item.</AccordionContent>
  </AccordionItem>

  <AccordionItem value="disabled" disabled>
    <AccordionTrigger className="opacity-50 cursor-not-allowed">
      Item Desabilitado
    </AccordionTrigger>
    <AccordionContent>Este conteúdo não pode ser acessado.</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Acessibilidade

O componente Accordion segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **Navegação por teclado**: `Tab` para focar, `Enter/Space` para expandir/colapsar, `Arrow Up/Down` para navegar entre itens
- ✅ **Foco visível**: Anel de foco com `focus-visible:ring-2`
- ✅ **ARIA completo**: `role="region"`, `aria-expanded`, `aria-controls`, `aria-labelledby`
- ✅ **Semântica clara**: Headers usam heading apropriado (h3 por padrão)
- ✅ **Estados claros**: Ícone chevron indica visualmente estado aberto/fechado

### Exemplo Acessível Completo

```tsx
<section aria-labelledby="faq-heading">
  <h2 id="faq-heading" className="text-2xl font-bold mb-4">
    Perguntas Frequentes
  </h2>
  
  <Accordion type="single" collapsible>
    <AccordionItem value="q1">
      <AccordionTrigger>
        Como posso entrar em contato com o suporte?
      </AccordionTrigger>
      <AccordionContent>
        <p>Você pode nos contatar através de:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>E-mail: suporte@educacross.com</li>
          <li>Telefone: (11) 1234-5678</li>
          <li>Chat online: disponível 24/7</li>
        </ul>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</section>
```

## Animação

O Accordion usa animação CSS nativa para transições suaves:

```tsx
{/* Animação padrão (200ms) */}
<Accordion type="single" collapsible>
  <AccordionItem value="1">
    <AccordionTrigger>Item com animação suave</AccordionTrigger>
    <AccordionContent>Expansão e colapso animados.</AccordionContent>
  </AccordionItem>
</Accordion>

{/* Customizar velocidade */}
<AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up duration-300">
  Animação mais lenta (300ms)
</AccordionContent>
```

## Links

- [Storybook - Accordion Stories](../../../../apps/storybook/stories/components/Accordion.stories.tsx)
- [Código Fonte](./Accordion.tsx)
- [Testes](./Accordion.test.tsx)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido
- 💡 Exemplos avançados (FAQ, filtros, módulos)

### v0.1.1
- ✨ Lançamento inicial
- 🎨 3 variantes (default, card, ghost)
- 🔧 Tipos single e multiple
- ⌨️ Navegação completa por teclado
- 🎬 Animações suaves de expansão/colapso
