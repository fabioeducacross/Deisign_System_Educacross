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
  ),
};

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
  ),
};

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
  ),
};

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
  ),
};

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
  ),
};

/**
 * Skeleton de loading com configuração padrão.
 */
export const LoadingDefault: Story = {
  render: () => <DataTableSkeleton />,
};

/**
 * Skeleton com toolbar e pagination.
 */
export const LoadingComplete: Story = {
  render: () => (
    <DataTableSkeleton showToolbar showPagination rows={8} columns={6} />
  ),
};

/**
 * Skeleton compacto (2 colunas, 3 linhas).
 */
export const LoadingCompact: Story = {
  render: () => <DataTableSkeleton rows={3} columns={2} showHeader={false} />,
};

/**
 * Skeleton com altura customizada.
 */
export const LoadingTall: Story = {
  render: () => <DataTableSkeleton rows={5} columns={4} rowHeight="h-16" />,
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
};

// Adicionar React import para StateTransition
import * as React from "react";
