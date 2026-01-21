# Table Component

Componente de tabela semântica para exibição de dados tabulares.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@fabioeducacross/ui";

export default function MyTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>João Silva</TableCell>
          <TableCell>joao@example.com</TableCell>
          <TableCell><Badge>Ativo</Badge></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Maria Costa</TableCell>
          <TableCell>maria@example.com</TableCell>
          <TableCell><Badge variant="secondary">Inativo</Badge></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

## Componentes

| Componente | Descrição |
|------------|-----------|
| `Table` | Container principal da tabela com scroll automático |
| `TableHeader` | Seção de cabeçalho (`<thead>`) |
| `TableBody` | Seção de corpo (`<tbody>`) |
| `TableFooter` | Seção de rodapé (`<tfoot>`) |
| `TableRow` | Linha da tabela (`<tr>`) |
| `TableHead` | Célula de cabeçalho (`<th>`) |
| `TableCell` | Célula de dados (`<td>`) |
| `TableCaption` | Legenda da tabela (`<caption>`) |

## Exemplos de Uso

### Tabela Simples com Caption

```tsx
<Table>
  <TableCaption>Lista de usuários cadastrados</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>ID</TableHead>
      <TableHead>Nome</TableHead>
      <TableHead>Cargo</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>1</TableCell>
      <TableCell>João Silva</TableCell>
      <TableCell>Desenvolvedor</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>2</TableCell>
      <TableCell>Maria Costa</TableCell>
      <TableCell>Designer</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Tabela com Ações

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Produto</TableHead>
      <TableHead>Preço</TableHead>
      <TableHead className="text-right">Ações</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {products.map((product) => (
      <TableRow key={product.id}>
        <TableCell>{product.name}</TableCell>
        <TableCell>R$ {product.price.toFixed(2)}</TableCell>
        <TableCell className="text-right">
          <Button size="sm" variant="ghost">
            <Icons.Edit className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost">
            <Icons.Trash className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Tabela com Seleção (Checkbox)

```tsx
function SelectableTable() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleAll = () => {
    setSelected(selected.length === users.length ? [] : users.map(u => u.id));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <Checkbox
              checked={selected.length === users.length}
              onCheckedChange={toggleAll}
            />
          </TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>E-mail</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <Checkbox
                checked={selected.includes(user.id)}
                onCheckedChange={(checked) => {
                  setSelected(checked
                    ? [...selected, user.id]
                    : selected.filter(id => id !== user.id)
                  );
                }}
              />
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Tabela com Ordenação

```tsx
function SortableTable() {
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <button
              onClick={() => handleSort("name")}
              className="flex items-center gap-1"
            >
              Nome
              {sortBy === "name" && (
                sortOrder === "asc" ? <Icons.ChevronUp className="h-4 w-4" /> : <Icons.ChevronDown className="h-4 w-4" />
              )}
            </button>
          </TableHead>
          <TableHead>E-mail</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Tabela com Paginação

```tsx
function PaginatedTable() {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(data.length / pageSize)}
        onPageChange={setPage}
      />
    </>
  );
}
```

### Tabela com Rodapé (Totais)

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Produto</TableHead>
      <TableHead className="text-right">Quantidade</TableHead>
      <TableHead className="text-right">Total</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {items.map((item) => (
      <TableRow key={item.id}>
        <TableCell>{item.product}</TableCell>
        <TableCell className="text-right">{item.quantity}</TableCell>
        <TableCell className="text-right">R$ {item.total.toFixed(2)}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2} className="font-bold">Total Geral</TableCell>
      <TableCell className="text-right font-bold">
        R$ {items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
      </TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

### Tabela Responsiva (Scroll Horizontal)

```tsx
<div className="rounded-md border">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="min-w-[200px]">Nome</TableHead>
        <TableHead className="min-w-[200px]">E-mail</TableHead>
        <TableHead className="min-w-[150px]">Telefone</TableHead>
        <TableHead className="min-w-[150px]">Cidade</TableHead>
        <TableHead className="min-w-[100px]">Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {/* Dados com scroll horizontal automático */}
    </TableBody>
  </Table>
</div>
```

### Tabela com Estados de Linha

```tsx
<Table>
  <TableBody>
    <TableRow>
      <TableCell>Linha padrão</TableCell>
    </TableRow>
    <TableRow className="bg-muted/50">
      <TableCell>Linha destacada</TableCell>
    </TableRow>
    <TableRow className="opacity-50">
      <TableCell>Linha desabilitada</TableCell>
    </TableRow>
    <TableRow className="hover:bg-accent">
      <TableCell>Linha com hover</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Tabela com Expandible Rows

```tsx
function ExpandableTable() {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleRow = (id: string) => {
    setExpanded(expanded.includes(id)
      ? expanded.filter(e => e !== id)
      : [...expanded, id]
    );
  };

  return (
    <Table>
      <TableBody>
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <TableRow>
              <TableCell>
                <button onClick={() => toggleRow(item.id)}>
                  {expanded.includes(item.id) ? (
                    <Icons.ChevronDown className="h-4 w-4" />
                  ) : (
                    <Icons.ChevronRight className="h-4 w-4" />
                  )}
                </button>
              </TableCell>
              <TableCell>{item.name}</TableCell>
            </TableRow>
            {expanded.includes(item.id) && (
              <TableRow>
                <TableCell colSpan={2} className="bg-muted/30">
                  <div className="p-4">
                    Detalhes adicionais sobre {item.name}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
```

## Acessibilidade

O componente Table segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **Semântica HTML**: Usa elementos nativos (`<table>`, `<thead>`, `<tbody>`)
- ✅ **Caption**: Use `<TableCaption>` para contexto
- ✅ **Scope headers**: `<th scope="col">` para headers de coluna
- ✅ **Keyboard navigation**: Navegável com Tab
- ✅ **Contraste**: Texto e bordas seguem contraste mínimo 4.5:1

### Exemplo Acessível Completo

```tsx
<Table>
  <TableCaption>
    Lista de funcionários cadastrados em 2024
  </TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">Nome</TableHead>
      <TableHead scope="col">Departamento</TableHead>
      <TableHead scope="col" className="text-right">Salário</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>João Silva</TableCell>
      <TableCell>TI</TableCell>
      <TableCell className="text-right">R$ 8.000,00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Composição com Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Usuários Ativos</CardTitle>
    <CardDescription>Lista de todos os usuários atualmente ativos</CardDescription>
  </CardHeader>
  <CardContent>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell><Badge>Ativo</Badge></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </CardContent>
</Card>
```

## Links

- [Storybook - Table Stories](../../../../apps/storybook/stories/components/Table.stories.tsx)
- [Código Fonte](./Table.tsx)
- [Testes](./Table.test.tsx)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido
- 💡 Exemplos práticos (seleção, ordenação, paginação, expansível)

### v0.1.1
- ✨ Lançamento inicial
- 🎨 Componentes semânticos HTML
- 📱 Scroll horizontal responsivo
- 🔧 Suporte a TableFooter e TableCaption
