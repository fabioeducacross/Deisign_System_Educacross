import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DataTableEmptyState,
  DataTableSkeleton,
  Button,
} from "@fabioeducacross/ui";
import { RefreshCw, Plus } from "react-feather";

/**
 * ## DataTable - Estados e Loading
 * 
 * Componentes auxiliares para gerenciar estados vazios e loading no DataTable.
 */
const meta: Meta<typeof DataTableEmptyState> = {
  title: "Patterns/DataTable/Estados",
  component: DataTableEmptyState,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Componentes para exibir estados de loading (skeleton) e estados vazios (empty states) em tabelas de dados.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTableEmptyState>;

/**
 * Estado padrão quando não há dados disponíveis.
 */
export const NoData: Story = {
  render: () => (
    <DataTableEmptyState
      variant="no-data"
      actionLabel="Adicionar primeiro item"
      onAction={() => alert("Ação: Adicionar item")}
    />
  ),  parameters: {
    multiFrameworkCode: {
      react: `import { DataTableEmptyState } from "@fabioeducacross/ui";

<DataTableEmptyState
  variant="no-data"
  actionLabel="Adicionar primeiro item"
  onAction={() => alert("Ção: Adicionar item")}
/>`,
      vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="text-center p-5">
    <div class="mb-3">
      <svg class="text-muted" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>
    </div>
    <h5 class="mb-2">Nenhum dado disponível</h5>
    <p class="text-muted mb-3">Comece adicionando o primeiro item.</p>
    <button class="btn btn-primary" @click="handleAction">
      Adicionar primeiro item
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    handleAction() {
      alert('Ção: Adicionar item');
    },
  },
};
</script>`,
      vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDataTableEmptyState
    variant="no-data"
    action-label="Adicionar primeiro item"
    @action="handleAction"
  />
</template>

<script setup lang="ts">
import { EdDataTableEmptyState } from "@fabioeducacross/ui-vue3";

const handleAction = () => {
  alert('Ção: Adicionar item');
};
</script>`,
    },
  },};

/**
 * Estado quando uma busca não retorna resultados.
 */
export const NoResults: Story = {
  render: () => (
    <DataTableEmptyState
      variant="no-results"
      actionLabel="Limpar filtros"
      onAction={() => alert("Ação: Limpar filtros")}
    />
  ),  parameters: {
    multiFrameworkCode: {
      react: `import { DataTableEmptyState } from "@fabioeducacross/ui";

<DataTableEmptyState
  variant="no-results"
  actionLabel="Limpar filtros"
  onAction={() => alert("Ção: Limpar filtros")}
/>`,
      vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="text-center p-5">
    <div class="mb-3">
      <svg class="text-muted" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
      </svg>
    </div>
    <h5 class="mb-2">Nenhum resultado encontrado</h5>
    <p class="text-muted mb-3">Tente ajustar seus filtros.</p>
    <button class="btn btn-primary" @click="handleAction">
      Limpar filtros
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    handleAction() {
      alert('Ção: Limpar filtros');
    },
  },
};
</script>`,
      vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDataTableEmptyState
    variant="no-results"
    action-label="Limpar filtros"
    @action="handleAction"
  />
</template>

<script setup lang="ts">
import { EdDataTableEmptyState } from "@fabioeducacross/ui-vue3";

const handleAction = () => {
  alert('Ção: Limpar filtros');
};
</script>`,
    },
  },};

/**
 * Estado de erro com opção de retry.
 */
export const Error: Story = {
  render: () => (
    <DataTableEmptyState
      variant="error"
      actionLabel="Tentar novamente"
      onAction={() => alert("Ação: Retry")}
    />
  ),  parameters: {
    multiFrameworkCode: {
      react: `import { DataTableEmptyState } from "@fabioeducacross/ui";

<DataTableEmptyState
  variant="error"
  actionLabel="Tentar novamente"
  onAction={() => alert("Ção: Retry")}
/>`,
      vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="text-center p-5">
    <div class="mb-3">
      <svg class="text-danger" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg>
    </div>
    <h5 class="mb-2">Erro ao carregar dados</h5>
    <p class="text-muted mb-3">Ocorreu um problema. Tente novamente.</p>
    <button class="btn btn-danger" @click="handleAction">
      Tentar novamente
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    handleAction() {
      alert('Ção: Retry');
    },
  },
};
</script>`,
      vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDataTableEmptyState
    variant="error"
    action-label="Tentar novamente"
    @action="handleAction"
  />
</template>

<script setup lang="ts">
import { EdDataTableEmptyState } from "@fabioeducacross/ui-vue3";

const handleAction = () => {
  alert('Ção: Retry');
};
</script>`,
    },
  },};

/**
 * Empty state com conteúdo customizado.
 */
export const CustomContent: Story = {
  render: () => (
    <DataTableEmptyState
      variant="no-data"
      title="Nenhum produto cadastrado"
      description="Comece adicionando seu primeiro produto ao catálogo."
      icon={<Plus size={48} />}
      actionLabel="Adicionar produto"
      onAction={() => alert("Ação: Adicionar produto")}
      secondaryActionLabel="Importar CSV"
      onSecondaryAction={() => alert("Ação: Importar")}
    />
  ),  parameters: {
    multiFrameworkCode: {
      react: `import { DataTableEmptyState } from "@fabioeducacross/ui";
import { Plus } from "react-feather";

<DataTableEmptyState
  variant="no-data"
  title="Nenhum produto cadastrado"
  description="Comece adicionando seu primeiro produto ao catálogo."
  icon={<Plus size={48} />}
  actionLabel="Adicionar produto"
  onAction={() => alert("Ção: Adicionar produto")}
  secondaryActionLabel="Importar CSV"
  onSecondaryAction={() => alert("Ção: Importar")}
/>`,
      vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="text-center p-5">
    <div class="mb-3">
      <svg class="text-muted" width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
      </svg>
    </div>
    <h5 class="mb-2">Nenhum produto cadastrado</h5>
    <p class="text-muted mb-3">Comece adicionando seu primeiro produto ao catálogo.</p>
    <div class="d-flex gap-2 justify-content-center">
      <button class="btn btn-primary" @click="handleAdd">
        Adicionar produto
      </button>
      <button class="btn btn-outline-secondary" @click="handleImport">
        Importar CSV
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleAdd() {
      alert('Ção: Adicionar produto');
    },
    handleImport() {
      alert('Ção: Importar');
    },
  },
};
</script>`,
      vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDataTableEmptyState
    variant="no-data"
    title="Nenhum produto cadastrado"
    description="Comece adicionando seu primeiro produto ao catálogo."
    action-label="Adicionar produto"
    @action="handleAdd"
    secondary-action-label="Importar CSV"
    @secondary-action="handleImport"
  >
    <template #icon>
      <Plus :size="48" />
    </template>
  </EdDataTableEmptyState>
</template>

<script setup lang="ts">
import { EdDataTableEmptyState } from "@fabioeducacross/ui-vue3";
import { Plus } from "lucide-vue-next";

const handleAdd = () => alert('Ção: Adicionar produto');
const handleImport = () => alert('Ção: Importar');
</script>`,
    },
  },};

/**
 * Empty state com ações primária e secundária.
 */
export const WithSecondaryAction: Story = {
  render: () => (
    <DataTableEmptyState
      variant="error"
      actionLabel="Recarregar"
      onAction={() => alert("Ação: Recarregar")}
      secondaryActionLabel="Ver logs"
      onSecondaryAction={() => alert("Ação: Ver logs")}
    />
  ),  parameters: {
    multiFrameworkCode: {
      react: `import { DataTableEmptyState } from "@fabioeducacross/ui";

<DataTableEmptyState
  variant="error"
  actionLabel="Recarregar"
  onAction={() => alert("Ção: Recarregar")}
  secondaryActionLabel="Ver logs"
  onSecondaryAction={() => alert("Ção: Ver logs")}
/>`,
      vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="text-center p-5">
    <div class="mb-3">
      <svg class="text-danger" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
      </svg>
    </div>
    <h5 class="mb-2">Erro ao carregar dados</h5>
    <p class="text-muted mb-3">Ocorreu um problema. Tente novamente.</p>
    <div class="d-flex gap-2 justify-content-center">
      <button class="btn btn-danger" @click="handleReload">
        Recarregar
      </button>
      <button class="btn btn-outline-secondary" @click="handleLogs">
        Ver logs
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleReload() {
      alert('Ção: Recarregar');
    },
    handleLogs() {
      alert('Ção: Ver logs');
    },
  },
};
</script>`,
      vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDataTableEmptyState
    variant="error"
    action-label="Recarregar"
    @action="handleReload"
    secondary-action-label="Ver logs"
    @secondary-action="handleLogs"
  />
</template>

<script setup lang="ts">
import { EdDataTableEmptyState } from "@fabioeducacross/ui-vue3";

const handleReload = () => alert('Ção: Recarregar');
const handleLogs = () => alert('Ção: Ver logs');
</script>`,
    },
  },};

/**
 * Skeleton de loading com configuração padrão.
 */
export const LoadingDefault: Story = {
  render: () => <DataTableSkeleton />,
  parameters: {
    multiFrameworkCode: {
      react: `import { DataTableSkeleton } from "@fabioeducacross/ui";

<DataTableSkeleton />`,
      vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="p-3">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th v-for="i in 4" :key="i">
              <div class="placeholder-glow">
                <span class="placeholder col-12"></span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in 5" :key="row">
            <td v-for="col in 4" :key="col">
              <div class="placeholder-glow">
                <span class="placeholder col-12"></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>`,
      vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDataTableSkeleton />
</template>

<script setup lang="ts">
import { EdDataTableSkeleton } from "@fabioeducacross/ui-vue3";
</script>`,
    },
  },
};

/**
 * Skeleton com toolbar e pagination.
 */
export const LoadingComplete: Story = {
  render: () => (
    <DataTableSkeleton showToolbar showPagination rows={8} columns={6} />
  ),
  parameters: {
    multiFrameworkCode: {
      react: `import { DataTableSkeleton } from "@fabioeducacross/ui";

<DataTableSkeleton 
  showToolbar 
  showPagination 
  rows={8} 
  columns={6} 
/>`,
      vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="p-3">
    <!-- Toolbar skeleton -->
    <div class="d-flex justify-content-between align-items-center mb-3 placeholder-glow">
      <span class="placeholder" style="width: 200px; height: 40px;"></span>
      <span class="placeholder" style="width: 100px; height: 40px;"></span>
    </div>
    
    <!-- Table skeleton -->
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th v-for="col in 6" :key="col">
              <span class="placeholder col-12"></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in 8" :key="row">
            <td v-for="col in 6" :key="col">
              <span class="placeholder col-12"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Pagination skeleton -->
    <div class="d-flex justify-content-between align-items-center mt-3 placeholder-glow">
      <span class="placeholder" style="width: 150px; height: 36px;"></span>
      <span class="placeholder" style="width: 200px; height: 36px;"></span>
    </div>
  </div>
</template>`,
      vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDataTableSkeleton 
    :show-toolbar="true" 
    :show-pagination="true" 
    :rows="8" 
    :columns="6" 
  />
</template>

<script setup lang="ts">
import { EdDataTableSkeleton } from "@fabioeducacross/ui-vue3";
</script>`,
    },
  },
};

/**
 * Skeleton compacto (2 colunas, 3 linhas).
 */
export const LoadingCompact: Story = {
  render: () => <DataTableSkeleton rows={3} columns={2} showHeader={false} />,
  parameters: {
    multiFrameworkCode: {
      react: `import { DataTableSkeleton } from "@fabioeducacross/ui";

<DataTableSkeleton 
  rows={3} 
  columns={2} 
  showHeader={false} 
/>`,
      vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="p-3">
    <div class="table-responsive">
      <table class="table">
        <tbody>
          <tr v-for="row in 3" :key="row">
            <td v-for="col in 2" :key="col">
              <div class="placeholder-glow">
                <span class="placeholder col-12"></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>`,
      vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDataTableSkeleton 
    :rows="3" 
    :columns="2" 
    :show-header="false" 
  />
</template>

<script setup lang="ts">
import { EdDataTableSkeleton } from "@fabioeducacross/ui-vue3";
</script>`,
    },
  },
};

/**
 * Skeleton com altura customizada.
 */
export const LoadingTall: Story = {
  render: () => <DataTableSkeleton rows={5} columns={4} rowHeight="h-16" />,
  parameters: {
    multiFrameworkCode: {
      react: `import { DataTableSkeleton } from "@fabioeducacross/ui";

<DataTableSkeleton 
  rows={5} 
  columns={4} 
  rowHeight="h-16" 
/>`,
      vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="p-3">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th v-for="i in 4" :key="i">
              <div class="placeholder-glow">
                <span class="placeholder col-12"></span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in 5" :key="row" style="height: 64px">
            <td v-for="col in 4" :key="col">
              <div class="placeholder-glow">
                <span class="placeholder col-12"></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>`,
      vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDataTableSkeleton 
    :rows="5" 
    :columns="4" 
    row-height="h-16" 
  />
</template>

<script setup lang="ts">
import { EdDataTableSkeleton } from "@fabioeducacross/ui-vue3";
</script>`,
    },
  },
};

/**
 * Exemplo de transição: Loading → Dados → Empty State.
 * 
 * Demonstra como alternar entre os estados conforme o status da requisição.
 */
export const StateTransition: Story = {
  render: () => {
    const [state, setState] = React.useState<"loading" | "data" | "empty" | "error">("loading");

    return (
      <div className="space-y-4">
        <div className="flex gap-2 justify-center">
          <Button size="sm" variant="outline" onClick={() => setState("loading")}>
            Loading
          </Button>
          <Button size="sm" variant="outline" onClick={() => setState("data")}>
            Com Dados
          </Button>
          <Button size="sm" variant="outline" onClick={() => setState("empty")}>
            Sem Dados
          </Button>
          <Button size="sm" variant="outline" onClick={() => setState("error")}>
            Erro
          </Button>
        </div>

        <div className="border rounded-md p-4">
          {state === "loading" && <DataTableSkeleton rows={5} />}

          {state === "data" && (
            <div className="text-center p-8 text-muted-foreground">
              <p>✅ Tabela com dados renderizada aqui</p>
            </div>
          )}

          {state === "empty" && (
            <DataTableEmptyState
              variant="no-results"
              actionLabel="Limpar filtros"
              onAction={() => alert("Limpar")}
            />
          )}

          {state === "error" && (
            <DataTableEmptyState
              variant="error"
              actionLabel="Tentar novamente"
              onAction={() => setState("loading")}
            />
          )}
        </div>
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `import { DataTableSkeleton, DataTableEmptyState, Button } from "@fabioeducacross/ui";
import { useState } from "react";

const [state, setState] = useState<"loading" | "data" | "empty" | "error">("loading");

<div className="space-y-4">
  <div className="flex gap-2 justify-center">
    <Button size="sm" variant="outline" onClick={() => setState("loading")}>Loading</Button>
    <Button size="sm" variant="outline" onClick={() => setState("data")}>Com Dados</Button>
    <Button size="sm" variant="outline" onClick={() => setState("empty")}>Sem Dados</Button>
    <Button size="sm" variant="outline" onClick={() => setState("error")}>Erro</Button>
  </div>

  <div className="border rounded-md p-4">
    {state === "loading" && <DataTableSkeleton rows={5} />}
    {state === "data" && (
      <div className="text-center p-8 text-muted-foreground">
        <p>✅ Tabela com dados renderizada aqui</p>
      </div>
    )}
    {state === "empty" && (
      <DataTableEmptyState
        variant="no-results"
        actionLabel="Limpar filtros"
        onAction={() => alert("Limpar")}
      />
    )}
    {state === "error" && (
      <DataTableEmptyState
        variant="error"
        actionLabel="Tentar novamente"
        onAction={() => setState("loading")}
      />
    )}
  </div>
</div>`,
      vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div>
    <div class="d-flex gap-2 justify-content-center mb-3">
      <button class="btn btn-sm btn-outline-primary" @click="state = 'loading'">Loading</button>
      <button class="btn btn-sm btn-outline-primary" @click="state = 'data'">Com Dados</button>
      <button class="btn btn-sm btn-outline-primary" @click="state = 'empty'">Sem Dados</button>
      <button class="btn btn-sm btn-outline-primary" @click="state = 'error'">Erro</button>
    </div>

    <div class="border rounded p-4">
      <div v-if="state === 'loading'" class="table-responsive">
        <table class="table">
          <tbody>
            <tr v-for="row in 5" :key="row">
              <td v-for="col in 4" :key="col">
                <div class="placeholder-glow">
                  <span class="placeholder col-12"></span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="state === 'data'" class="text-center p-5 text-muted">
        <p>✅ Tabela com dados renderizada aqui</p>
      </div>

      <div v-if="state === 'empty'" class="text-center p-5">
        <h5>Nenhum resultado encontrado</h5>
        <button class="btn btn-primary mt-3">Limpar filtros</button>
      </div>

      <div v-if="state === 'error'" class="text-center p-5">
        <h5 class="text-danger">Erro ao carregar dados</h5>
        <button class="btn btn-danger mt-3" @click="state = 'loading'">
          Tentar novamente
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: 'loading',
    };
  },
};
</script>`,
      vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="space-y-4">
    <div class="flex gap-2 justify-center">
      <EdButton size="sm" variant="outline" @click="state = 'loading'">Loading</EdButton>
      <EdButton size="sm" variant="outline" @click="state = 'data'">Com Dados</EdButton>
      <EdButton size="sm" variant="outline" @click="state = 'empty'">Sem Dados</EdButton>
      <EdButton size="sm" variant="outline" @click="state = 'error'">Erro</EdButton>
    </div>

    <div class="border rounded-md p-4">
      <EdDataTableSkeleton v-if="state === 'loading'" :rows="5" />
      
      <div v-if="state === 'data'" class="text-center p-8 text-muted-foreground">
        <p>✅ Tabela com dados renderizada aqui</p>
      </div>
      
      <EdDataTableEmptyState
        v-if="state === 'empty'"
        variant="no-results"
        action-label="Limpar filtros"
        @action="() => alert('Limpar')"
      />
      
      <EdDataTableEmptyState
        v-if="state === 'error'"
        variant="error"
        action-label="Tentar novamente"
        @action="state = 'loading'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { EdDataTableSkeleton, EdDataTableEmptyState, EdButton } from "@fabioeducacross/ui-vue3";

const state = ref<"loading" | "data" | "empty" | "error">("loading");
</script>`,
    },
  },
};

// Adicionar React import para StateTransition
import * as React from "react";
