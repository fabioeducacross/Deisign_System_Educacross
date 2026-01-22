# DataTable — Organismo (Tabela com Dados)

## 1. Resumo

**O que é:** Componente de tabela avançado com suporte a paginação, ordenação, filtros, seleção de linhas e ações em massa.

**Quando usar:**
- ✅ Listagem de dados tabulares com muitas linhas (>20)
- ✅ Quando usuário precisa ordenar, filtrar ou buscar
- ✅ Ações em massa (deletar selecionados, exportar, etc.)
- ✅ Dashboards e relatórios administrativos

**Quando NÃO usar:**
- ❌ Listas simples (<10 itens) — use `Table` básico ou `List`
- ❌ Dados que cabem melhor em Cards (ex: catálogo de produtos)
- ❌ Mobile-first com layout complexo (considere Cards + filtros)

---

## 2. Anatomia

```tsx
<DataTable>
  <Toolbar>              {/* Busca, filtros, ações */}
    <SearchInput />
    <FilterDropdown />
    <BulkActions />
  </Toolbar>
  
  <Table>
    <TableHeader>        {/* Colunas com ordenação */}
      <TableRow>
        <TableHead sortable />
      </TableRow>
    </TableHeader>
    
    <TableBody>          {/* Dados + skeleton/empty */}
      <TableRow selectable />
    </TableBody>
  </Table>
  
  <Footer>               {/* Paginação + contador */}
    <RowCounter />
    <Pagination />
  </Footer>
</DataTable>
```

**Estrutura visual:**

```
┌────────────────────────────────────────────────────────────┐
│ 🔍 Buscar...    🔽 Filtros    [Ações em massa ▼]  (+) Novo│ ← Toolbar
├────────────────────────────────────────────────────────────┤
│ ☐ | Nome ↑       | Email          | Status    | Ações     │ ← Header
├────────────────────────────────────────────────────────────┤
│ ☑ | João Silva   | joao@email.com | Ativo  ✓  | [⋮]      │
│ ☐ | Maria Santos | maria@email.   | Inativo   | [⋮]      │
│ ☐ | Pedro Costa  | pedro@email.   | Pendente  | [⋮]      │
├────────────────────────────────────────────────────────────┤
│ Mostrando 1-20 de 156 resultados     [< 1 2 3 ... 8 >]   │ ← Footer
└────────────────────────────────────────────────────────────┘
```

---

## 3. Estados & Variações

### **Estados de Dados**

| Estado | Aparência | Quando |
|--------|-----------|--------|
| **Loading** | Skeleton rows (3-5 linhas) | Carregando dados inicial |
| **LoadingMore** | Spinner no footer | Paginação infinita |
| **Empty** | Ilustração + mensagem + CTA | Sem dados para exibir |
| **EmptyFiltered** | "Nenhum resultado encontrado" + botão limpar | Filtros não retornaram dados |
| **Error** | Mensagem de erro + botão retry | Falha ao carregar dados |
| **Populated** | Dados renderizados normalmente | Estado padrão com dados |

### **Estados de Seleção**

| Estado | Checkbox Header | Comportamento |
|--------|-----------------|---------------|
| **None** | Desmarcado | Nenhuma linha selecionada |
| **Some** | Indeterminate (-) | Algumas linhas selecionadas |
| **All** | Marcado (✓) | Todas linhas da página selecionadas |
| **AllPages** | Marcado + badge "156" | Todas linhas de todas páginas |

### **Variações de Densidade**

```tsx
density: "compact" | "comfortable" | "spacious"

compact:     py-2 px-3 (máximo de dados em tela)
comfortable: py-3 px-4 (padrão - equilíbrio)
spacious:    py-4 px-6 (foco em leitura)
```

### **Variações de Layout**

```tsx
layout: "fixed" | "auto"

fixed: Colunas com largura fixa (scroll horizontal se necessário)
auto:  Colunas se ajustam ao conteúdo
```

---

## 4. API de Props

### **DataTable**

| Prop | Tipo | Default | Obrigatório | Descrição |
|------|------|---------|-------------|-----------|
| `data` | `T[]` | `[]` | ✅ | Array de objetos a exibir |
| `columns` | `Column<T>[]` | — | ✅ | Definição de colunas |
| `loading` | `boolean` | `false` | ❌ | Mostra skeleton |
| `error` | `string` | `undefined` | ❌ | Mensagem de erro |
| `onRetry` | `() => void` | — | ❌ | Callback para retry |
| `emptyMessage` | `string` | "Nenhum dado" | ❌ | Mensagem quando vazio |
| `density` | `"compact" \| "comfortable" \| "spacious"` | `"comfortable"` | ❌ | Densidade de linhas |
| `selectable` | `boolean` | `false` | ❌ | Habilita seleção de linhas |
| `selectedRows` | `Set<string>` | — | ❌ | IDs das linhas selecionadas |
| `onSelectionChange` | `(ids: Set<string>) => void` | — | ❌ | Callback de seleção |
| `sortable` | `boolean` | `true` | ❌ | Habilita ordenação |
| `sortBy` | `string` | — | ❌ | Coluna atualmente ordenada |
| `sortOrder` | `"asc" \| "desc"` | `"asc"` | ❌ | Direção da ordenação |
| `onSort` | `(column: string, order: "asc" \| "desc") => void` | — | ❌ | Callback de ordenação |
| `pagination` | `boolean` | `true` | ❌ | Habilita paginação |
| `page` | `number` | `1` | ❌ | Página atual |
| `pageSize` | `number` | `20` | ❌ | Itens por página |
| `totalItems` | `number` | — | ⚠️ | Total (obrigatório se pagination) |
| `onPageChange` | `(page: number) => void` | — | ❌ | Callback de paginação |
| `searchable` | `boolean` | `true` | ❌ | Mostra campo de busca |
| `searchValue` | `string` | `""` | ❌ | Valor da busca |
| `onSearch` | `(query: string) => void` | — | ❌ | Callback de busca |
| `filters` | `Filter[]` | `[]` | ❌ | Filtros disponíveis |
| `activeFilters` | `Record<string, any>` | `{}` | ❌ | Filtros ativos |
| `onFilterChange` | `(filters: Record<string, any>) => void` | — | ❌ | Callback de filtros |
| `bulkActions` | `BulkAction[]` | `[]` | ❌ | Ações em massa |
| `rowActions` | `RowAction<T>[]` | `[]` | ❌ | Ações por linha |
| `className` | `string` | `""` | ❌ | Classes adicionais |

### **Column Definition**

```tsx
interface Column<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  accessorFn?: (row: T) => any;
  cell?: (value: any, row: T) => React.ReactNode;
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  hidden?: boolean;
}
```

### **Filter Definition**

```tsx
interface Filter {
  id: string;
  label: string;
  type: "select" | "multi-select" | "date-range" | "number-range";
  options?: { label: string; value: string }[];
  placeholder?: string;
}
```

### **Action Definitions**

```tsx
interface BulkAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  variant?: "default" | "destructive";
  onAction: (selectedIds: Set<string>) => void;
}

interface RowAction<T> {
  id: string;
  label: string;
  icon?: React.ReactNode;
  variant?: "default" | "destructive";
  onAction: (row: T) => void;
  hidden?: (row: T) => boolean;
}
```

---

## 5. Acessibilidade

### **Estrutura Semântica**

```tsx
<div role="region" aria-label="Tabela de alunos">
  {/* Toolbar */}
  <div role="toolbar" aria-label="Ferramentas da tabela">
    <input 
      type="search" 
      aria-label="Buscar alunos"
      role="searchbox"
    />
    <button aria-label="Filtrar resultados">Filtros</button>
  </div>
  
  {/* Table */}
  <table role="table" aria-busy={loading}>
    <thead>
      <tr role="row">
        <th role="columnheader" aria-sort="ascending">
          <button aria-label="Ordenar por nome (crescente)">
            Nome
          </button>
        </th>
      </tr>
    </thead>
    <tbody role="rowgroup">
      <tr 
        role="row" 
        aria-selected={selected}
        aria-rowindex={index + 1}
      >
        <td role="cell">João Silva</td>
      </tr>
    </tbody>
  </table>
  
  {/* Pagination */}
  <nav aria-label="Paginação da tabela">
    <button aria-label="Página anterior" disabled={page === 1}>
      Anterior
    </button>
    <button aria-label="Página 1" aria-current="page">1</button>
    <button aria-label="Página 2">2</button>
  </nav>
</div>
```

### **Regras Obrigatórias**

- ✅ **Região nomeada** com `aria-label` descritivo
- ✅ **Toolbar com role e label** para leitores de tela
- ✅ **Busca com role searchbox** e label
- ✅ **aria-sort** nas colunas ordenáveis (ascending/descending/none)
- ✅ **aria-selected** nas linhas selecionadas
- ✅ **aria-busy** durante loading
- ✅ **aria-live="polite"** no contador de resultados
- ✅ **Navegação por teclado completa**

### **Navegação por Teclado**

| Tecla | Ação |
|-------|------|
| **Tab** | Move entre controles (busca → filtros → tabela → paginação) |
| **Shift+Tab** | Move para trás |
| **Espaço** | Seleciona linha (se selectable) |
| **Enter** | Abre ação padrão da linha |
| **↑/↓** | Navega entre linhas (opcional, modo grid) |
| **Home/End** | Primeira/última linha visível |
| **Ctrl+A** | Seleciona todas (se selectable) |

---

## 6. Práticas Recomendadas

### **✅ DO (Faça)**

1. **Ordenação padrão sensata** — Coluna mais relevante (ex: "Nome" ou "Data de criação desc")
2. **Loading progressivo** — Skeleton de 3-5 linhas em vez de spinner gigante
3. **Empty state útil** — Ilustração + mensagem + CTA ("Adicionar primeiro aluno")
4. **Busca com debounce** — 300-500ms para evitar chamadas excessivas
5. **Filtros persistentes** — Manter na URL/localStorage quando apropriado
6. **Exportação visível** — Botão "Exportar CSV" quando houver muitos dados
7. **Ações contextuais** — Mostrar apenas ações permitidas por linha
8. **Contadores claros** — "Mostrando 1-20 de 156 alunos" em vez de números soltos

### **❌ DON'T (Evite)**

1. ❌ **Ordenação sem indicador visual** — Sempre mostre seta ↑/↓
2. ❌ **Paginação sem contador** — Usuário precisa saber total de páginas
3. ❌ **Linhas muito apertadas** — Mínimo 36px de altura para touch
4. ❌ **Muitas colunas visíveis** — Priorize, use "Mais detalhes" se necessário
5. ❌ **Filtros ocultos demais** — Devem ser descobertos facilmente
6. ❌ **Seleção sem feedback visual** — Highlight claro em linhas selecionadas
7. ❌ **Ações em massa sem confirmação** — Especialmente delete
8. ❌ **Loading sem skeleton** — Spinner sozinho dá impressão de lentidão

---

## 7. Exemplos de Uso

### **Exemplo 1: Tabela de Alunos (Professor)**

```tsx
import { DataTable } from "@fabioeducacross/ui";
import { useState } from "react";

interface Student {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  progress: number;
}

function StudentsTable() {
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
  const { data, loading, error } = useStudents();
  
  const columns: Column<Student>[] = [
    {
      id: "name",
      header: "Nome",
      accessorKey: "name",
      sortable: true,
    },
    {
      id: "email",
      header: "E-mail",
      accessorKey: "email",
      sortable: true,
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (value) => (
        <Badge variant={value === "active" ? "success" : "secondary"}>
          {value === "active" ? "Ativo" : value === "pending" ? "Pendente" : "Inativo"}
        </Badge>
      ),
    },
    {
      id: "progress",
      header: "Progresso",
      accessorKey: "progress",
      align: "right",
      cell: (value) => `${value}%`,
    },
  ];
  
  const bulkActions: BulkAction[] = [
    {
      id: "activate",
      label: "Ativar selecionados",
      icon: <CheckCircle size={16} />,
      onAction: (ids) => activateStudents(Array.from(ids)),
    },
    {
      id: "delete",
      label: "Remover selecionados",
      icon: <Trash2 size={16} />,
      variant: "destructive",
      onAction: (ids) => {
        if (confirm(`Remover ${ids.size} alunos?`)) {
          deleteStudents(Array.from(ids));
        }
      },
    },
  ];
  
  const rowActions: RowAction<Student>[] = [
    {
      id: "edit",
      label: "Editar",
      icon: <Edit size={16} />,
      onAction: (student) => navigate(`/students/${student.id}/edit`),
    },
    {
      id: "view-progress",
      label: "Ver progresso",
      icon: <TrendingUp size={16} />,
      onAction: (student) => navigate(`/students/${student.id}/progress`),
    },
    {
      id: "send-message",
      label: "Enviar mensagem",
      icon: <Mail size={16} />,
      onAction: (student) => openMessageModal(student),
    },
  ];
  
  return (
    <DataTable
      data={data}
      columns={columns}
      loading={loading}
      error={error}
      selectable
      selectedRows={selectedStudents}
      onSelectionChange={setSelectedStudents}
      bulkActions={bulkActions}
      rowActions={rowActions}
      searchable
      searchValue={searchQuery}
      onSearch={setSearchQuery}
      pagination
      page={currentPage}
      pageSize={20}
      totalItems={totalStudents}
      onPageChange={setCurrentPage}
      emptyMessage="Nenhum aluno encontrado"
    />
  );
}
```

### **Exemplo 2: Tabela de Missões (Admin)**

```tsx
function MissionsTable() {
  const filters: Filter[] = [
    {
      id: "subject",
      label: "Disciplina",
      type: "multi-select",
      options: [
        { label: "Matemática", value: "math" },
        { label: "Português", value: "portuguese" },
        { label: "Ciências", value: "science" },
      ],
    },
    {
      id: "difficulty",
      label: "Dificuldade",
      type: "select",
      options: [
        { label: "Fácil", value: "easy" },
        { label: "Médio", value: "medium" },
        { label: "Difícil", value: "hard" },
      ],
    },
    {
      id: "dateRange",
      label: "Data de criação",
      type: "date-range",
    },
  ];
  
  return (
    <DataTable
      data={missions}
      columns={missionColumns}
      filters={filters}
      activeFilters={activeFilters}
      onFilterChange={setActiveFilters}
      density="compact"
      sortBy="createdAt"
      sortOrder="desc"
      onSort={handleSort}
    />
  );
}
```

### **Exemplo 3: Tabela Responsiva (Mobile-First)**

```tsx
function ResponsiveDataTable() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  if (isMobile) {
    // Em mobile, usar Cards em vez de tabela
    return (
      <div className="space-y-4">
        {data.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>{/* Detalhes */}</CardContent>
          </Card>
        ))}
        <Pagination />
      </div>
    );
  }
  
  return <DataTable data={data} columns={columns} />;
}
```

---

## 8. Responsividade

### **Mobile (<640px)**

**Estratégia 1: Card Layout (Recomendado)**
```tsx
// Substituir tabela por cards empilhados
<div className="space-y-3">
  {data.map(item => <MobileCard key={item.id} data={item} />)}
</div>
```

**Estratégia 2: Horizontal Scroll**
```tsx
<div className="overflow-x-auto">
  <DataTable 
    density="compact"
    layout="fixed" 
    style={{ minWidth: "600px" }}
  />
</div>
```

**Estratégia 3: Colunas Prioritárias**
```tsx
// Mostrar apenas 2-3 colunas essenciais
const mobileColumns = columns.filter(col => 
  ["name", "status", "actions"].includes(col.id)
);
```

### **Tablet (640-1024px)**

- Densidade `compact` padrão
- Scroll horizontal se necessário
- Toolbar com botões menores
- Paginação com números reduzidos

### **Desktop (>1024px)**

- Densidade `comfortable` ou `spacious`
- Todas as colunas visíveis
- Hover states em linhas
- Tooltips em células truncadas

---

## 9. Conteúdo & Microcopy

### **Empty States**

| Contexto | Mensagem | CTA |
|----------|----------|-----|
| Sem dados ainda | "Nenhum aluno cadastrado ainda" | "Adicionar primeiro aluno" |
| Filtros sem resultado | "Nenhum aluno encontrado com esses filtros" | "Limpar filtros" |
| Erro ao carregar | "Não foi possível carregar os alunos" | "Tentar novamente" |
| Busca vazia | "Nenhum resultado para 'João Silva'" | "Limpar busca" |

### **Contadores**

| Formato | Quando usar |
|---------|-------------|
| "10 alunos" | Total pequeno (<100) |
| "156 alunos" | Total médio (100-999) |
| "1.234 alunos" | Total grande (1000+) |
| "Mostrando 1-20 de 156" | Paginação ativa |
| "2 selecionados" | Após seleção |

### **Ações em Massa**

| Ruim ❌ | Bom ✅ |
|---------|--------|
| Deletar | Remover 5 alunos |
| Ativar | Ativar selecionados (2) |
| Exportar | Exportar 156 alunos para CSV |

---

## 10. Relação no Atomic Design

```
DataTable (ORGANISMO)
├── Toolbar (MOLÉCULA)
│   ├── SearchInput (MOLÉCULA)
│   │   ├── Icon (ÁTOMO)
│   │   └── Input (ÁTOMO)
│   ├── FilterDropdown (MOLÉCULA)
│   │   ├── Button (ÁTOMO)
│   │   └── Popover (MOLÉCULA)
│   └── BulkActionsMenu (MOLÉCULA)
│       ├── Button (ÁTOMO)
│       └── DropdownMenu (MOLÉCULA)
├── Table (ORGANISMO)
│   ├── TableHeader (MOLÉCULA)
│   ├── TableBody (MOLÉCULA)
│   └── TableRow (MOLÉCULA)
│       ├── Checkbox (ÁTOMO)
│       ├── TableCell (ÁTOMO)
│       └── RowActionsMenu (MOLÉCULA)
└── Footer (MOLÉCULA)
    ├── RowCounter (ÁTOMO)
    └── Pagination (MOLÉCULA)

Usado em:
├── StudentsDashboard (TEMPLATE)
├── MissionsManagement (TEMPLATE)
└── ReportsPage (PÁGINA)
```

---

## 11. Checklist de Validação

### **Acessibilidade**

- [x] Região nomeada com `aria-label`
- [x] Toolbar com role e labels apropriados
- [x] Campo de busca com `role="searchbox"`
- [x] `aria-sort` em colunas ordenáveis
- [x] `aria-selected` em linhas selecionadas
- [x] `aria-busy` durante loading
- [x] Navegação completa por teclado
- [x] Foco visível em todos os controles
- [x] Ações anunciadas por leitores de tela

### **Consistência Visual**

- [x] Usa tokens de cor e espaçamento
- [x] Densidade configurável (compact/comfortable/spacious)
- [x] Estados hover/focus/selected distinguíveis
- [x] Skeleton consistente com estrutura final
- [x] Ícones padronizados (ordenação, ações)

### **Conteúdo & UX**

- [x] Empty states úteis com CTAs
- [x] Contadores claros (ex: "Mostrando 1-20 de 156")
- [x] Mensagens de erro acionáveis
- [x] Confirmação em ações destrutivas em massa
- [x] Feedback visual em operações (loading, sucesso)

### **Performance**

- [x] Virtualização para listas muito grandes (>1000 itens)
- [x] Debounce em busca (300-500ms)
- [x] Loading incremental em scroll infinito
- [x] Memo em células complexas para evitar re-render

### **Dev & Escalabilidade**

- [x] API declarativa (columns como array de objetos)
- [x] Suporta controle ou estado interno
- [x] Extensível via render props (custom cells)
- [x] TypeScript types genéricos (`<T>`)
- [x] Testável (queries por role/label/text)

---

## 12. Próximos Passos

1. ⏳ Implementar `DataTable` com features básicas (data + columns)
2. ⏳ Adicionar seleção de linhas (checkbox + bulk actions)
3. ⏳ Implementar ordenação (client-side e server-side)
4. ⏳ Adicionar busca e filtros
5. ⏳ Integrar paginação (controlled)
6. ⏳ Criar variantes de densidade
7. ⏳ Adicionar suporte a virtualização (react-virtual)
8. ⏳ Documentar no Storybook com dados reais
9. ⏳ Criar testes de interação (play functions)
10. ⏳ Implementar exportação para CSV/Excel
