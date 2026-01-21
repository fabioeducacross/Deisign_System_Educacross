# Pagination Component

Componente de paginação para navegação entre páginas de dados.

## Instalação

```bash
npm install @fabioeducacross/ui
```

## Uso Básico

```tsx
import { Pagination } from "@fabioeducacross/ui";

export default function MyPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `currentPage` | `number` | `1` | Página atual (obrigatório) |
| `totalPages` | `number` | - | Total de páginas (obrigatório) |
| `onPageChange` | `(page: number) => void` | - | Callback ao mudar página (obrigatório) |
| `siblingCount` | `number` | `1` | Quantidade de páginas ao redor da atual |
| `showFirstLast` | `boolean` | `true` | Mostrar botões primeira/última |
| `showPrevNext` | `boolean` | `true` | Mostrar botões anterior/próxima |
| `variant` | `"default" \| "outline" \| "ghost"` | `"default"` | Estilo dos botões |
| `size` | `"default" \| "sm" \| "lg"` | `"default"` | Tamanho dos botões |

## Exemplos de Uso

### Paginação Básica

```tsx
<Pagination
  currentPage={5}
  totalPages={20}
  onPageChange={(page) => console.log(`Ir para página ${page}`)}
/>
```

### Paginação com Tabela

```tsx
function PaginatedTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);
  
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data.length / pageSize)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
```

### Paginação com Informação de Total

```tsx
function PaginationWithInfo() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;
  const totalItems = 237;
  const totalPages = Math.ceil(totalItems / pageSize);
  
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Mostrando <strong>{startItem}</strong> a <strong>{endItem}</strong> de{" "}
        <strong>{totalItems}</strong> resultados
      </p>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
```

### Paginação com Tamanho de Página Dinâmico

```tsx
function DynamicPageSize() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const totalPages = Math.ceil(data.length / pageSize);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Label>Itens por página:</Label>
        <Select value={String(pageSize)} onValueChange={(v) => {
          setPageSize(Number(v));
          setCurrentPage(1); // Reset para primeira página
        }}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
```

### Variantes de Estilo

```tsx
<div className="space-y-4">
  <Pagination
    variant="default"
    currentPage={3}
    totalPages={10}
    onPageChange={console.log}
  />
  
  <Pagination
    variant="outline"
    currentPage={3}
    totalPages={10}
    onPageChange={console.log}
  />
  
  <Pagination
    variant="ghost"
    currentPage={3}
    totalPages={10}
    onPageChange={console.log}
  />
</div>
```

### Tamanhos

```tsx
<div className="space-y-4">
  <Pagination
    size="sm"
    currentPage={5}
    totalPages={10}
    onPageChange={console.log}
  />
  
  <Pagination
    size="default"
    currentPage={5}
    totalPages={10}
    onPageChange={console.log}
  />
  
  <Pagination
    size="lg"
    currentPage={5}
    totalPages={10}
    onPageChange={console.log}
  />
</div>
```

### Paginação Compacta (Poucas Páginas)

```tsx
<Pagination
  currentPage={2}
  totalPages={5}
  onPageChange={console.log}
  siblingCount={0}
  showFirstLast={false}
/>
```

### Paginação com API

```tsx
function APIPagenation() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(`/api/items?page=${currentPage}&limit=20`);
      const json = await response.json();
      setData(json.items);
      setTotalPages(json.totalPages);
      setLoading(false);
    };
    
    fetchData();
  }, [currentPage]);
  
  return (
    <div className="space-y-4">
      {loading ? (
        <SkeletonTable />
      ) : (
        <Table>
          {/* Renderizar dados */}
        </Table>
      )}
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
```

### Paginação com Scroll to Top

```tsx
function PaginationWithScroll() {
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    // Scroll suave para o topo
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <div ref={containerRef}>
      <Table>...</Table>
      <Pagination
        currentPage={currentPage}
        totalPages={20}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
```

### Paginação com URL Sync

```tsx
function URLSyncedPagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  
  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });
  };
  
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={15}
      onPageChange={handlePageChange}
    />
  );
}
```

## Acessibilidade

O componente Pagination segue as diretrizes **WCAG 2.1 nível AA**:

- ✅ **Navegação por teclado**: Tab para focar, Enter/Space para clicar
- ✅ **ARIA labels**: `aria-label="Paginação"`, `aria-current="page"` na página ativa
- ✅ **Botões desabilitados**: Primeira/Anterior desabilitados na primeira página
- ✅ **Foco visível**: Anel de foco com `focus-visible:ring-2`
- ✅ **Semântica**: Usa `<nav>` com role apropriado

### Exemplo Acessível Completo

```tsx
<nav aria-label="Navegação de páginas">
  <Pagination
    currentPage={5}
    totalPages={20}
    onPageChange={(page) => {
      setCurrentPage(page);
      // Anunciar mudança para screen readers
      announceToScreenReader(`Navegando para página ${page} de 20`);
    }}
  />
</nav>
```

## Boas Práticas

### ✅ Correto

```tsx
// Resetar para página 1 ao mudar filtros
const handleFilterChange = (newFilter) => {
  setFilter(newFilter);
  setCurrentPage(1); // Sempre resetar
};

// Mostrar informação de contexto
<div className="flex justify-between">
  <p>Mostrando 1-25 de 237 resultados</p>
  <Pagination {...props} />
</div>

// Desabilitar navegação durante loading
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={loading ? undefined : setCurrentPage}
/>
```

### ❌ Incorreto

```tsx
// Não validar página
<Pagination
  currentPage={999} // Página inexistente
  totalPages={10}
/>

// Paginação sem contexto (confuso)
<Pagination currentPage={5} totalPages={100} />
// Faltando informação de quantos itens por página

// Não sincronizar com dados
<Pagination currentPage={page} /> 
// Mas tabela mostra dados da página 1
```

## Links

- [Storybook - Pagination Stories](../../../../apps/storybook/stories/components/Pagination.stories.tsx)
- [Código Fonte](./Pagination.tsx)
- [Testes](./Pagination.test.tsx)

## Changelog

### v0.2.0
- 📝 Documentação completa adicionada
- ♿ Guia de acessibilidade expandido
- 💡 Exemplos práticos (API, URL sync, scroll to top)

### v0.1.1
- ✨ Lançamento inicial
- 🎨 3 variantes (default, outline, ghost)
- 📏 3 tamanhos (sm, default, lg)
- 🔢 Controle de siblingCount
- ⌨️ Navegação por teclado
- ♿ ARIA labels completos
