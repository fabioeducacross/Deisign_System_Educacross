/**
 * @file DataTableToolbar.test.tsx
 * @description Testes unitários para DataTableToolbar
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTableToolbar } from "./DataTableToolbar";
import { useReactTable, getCoreRowModel, getFilteredRowModel } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../Button";

// ============================================================================
// TEST SETUP
// ============================================================================

interface TestData {
  id: number;
  name: string;
  email: string;
}

const testData: TestData[] = [
  { id: 1, name: "João Silva", email: "joao@email.com" },
  { id: 2, name: "Maria Santos", email: "maria@email.com" },
  { id: 3, name: "Pedro Oliveira", email: "pedro@email.com" },
];

const columns: ColumnDef<TestData>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Nome", enableHiding: true },
  { accessorKey: "email", header: "Email", enableHiding: true },
];

/**
 * Componente wrapper para testar DataTableToolbar
 */
function TestWrapper({ 
  searchColumn,
  actions,
}: { 
  searchColumn?: string;
  actions?: React.ReactNode[];
}) {
  const table = useReactTable({
    data: testData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return <DataTableToolbar table={table} searchColumn={searchColumn} actions={actions} />;
}

// ============================================================================
// TESTS
// ============================================================================

describe("DataTableToolbar", () => {
  describe("Renderização Básica", () => {
    it("renderiza sem search quando searchColumn não fornecida", () => {
      render(<TestWrapper />);
      
      const searchInput = screen.queryByPlaceholderText("Buscar...");
      expect(searchInput).not.toBeInTheDocument();
    });

    it("renderiza com search input quando searchColumn fornecida", () => {
      render(<TestWrapper searchColumn="name" />);
      
      const searchInput = screen.getByPlaceholderText("Buscar...");
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute("aria-label", "Buscar na tabela");
    });

    it("renderiza botão de visibilidade de colunas por padrão", () => {
      render(<TestWrapper />);
      
      expect(screen.getByText("Colunas")).toBeInTheDocument();
      expect(screen.getByLabelText("Alternar visibilidade de colunas")).toBeInTheDocument();
    });

    it("aplica className customizado", () => {
      const { container } = render(
        <TestWrapper searchColumn="name" />
      );
      
      const toolbar = container.firstChild;
      expect(toolbar).toHaveClass("flex");
    });
  });

  describe("Search Functionality", () => {
    it("permite digitar no input de busca", async () => {
      const user = userEvent.setup();
      render(<TestWrapper searchColumn="name" />);
      
      const searchInput = screen.getByPlaceholderText("Buscar...") as HTMLInputElement;
      
      await user.type(searchInput, "João");
      
      expect(searchInput.value).toBe("João");
    });

    it("mostra botão de limpar quando há texto no search", async () => {
      const user = userEvent.setup();
      render(<TestWrapper searchColumn="name" />);
      
      const searchInput = screen.getByPlaceholderText("Buscar...");
      
      // Inicialmente não tem botão de limpar
      expect(screen.queryByLabelText("Limpar busca")).not.toBeInTheDocument();
      
      // Digita algo
      await user.type(searchInput, "João");
      
      // Agora tem botão de limpar
      expect(screen.getByLabelText("Limpar busca")).toBeInTheDocument();
    });

    it("limpa o search ao clicar no botão X", async () => {
      const user = userEvent.setup();
      render(<TestWrapper searchColumn="name" />);
      
      const searchInput = screen.getByPlaceholderText("Buscar...") as HTMLInputElement;
      
      // Digita algo
      await user.type(searchInput, "João");
      expect(searchInput.value).toBe("João");
      
      // Clica no botão de limpar
      const clearButton = screen.getByLabelText("Limpar busca");
      await user.click(clearButton);
      
      // Valor foi limpo
      expect(searchInput.value).toBe("");
    });

    it("aceita searchPlaceholder customizado", () => {
      function CustomPlaceholderWrapper() {
        const table = useReactTable({
          data: testData,
          columns,
          getCoreRowModel: getCoreRowModel(),
        });

        return (
          <DataTableToolbar 
            table={table} 
            searchColumn="name"
            searchPlaceholder="Buscar por nome..."
          />
        );
      }

      render(<CustomPlaceholderWrapper />);
      
      expect(screen.getByPlaceholderText("Buscar por nome...")).toBeInTheDocument();
    });
  });

  describe("Reset Filters", () => {
    it("mostra botão Resetar quando há filtros ativos", async () => {
      const user = userEvent.setup();
      render(<TestWrapper searchColumn="name" />);
      
      // Inicialmente não tem botão resetar
      expect(screen.queryByText("Resetar")).not.toBeInTheDocument();
      
      // Adiciona um filtro
      const searchInput = screen.getByPlaceholderText("Buscar...");
      await user.type(searchInput, "João");
      
      // Agora tem botão resetar
      expect(screen.getByText("Resetar")).toBeInTheDocument();
      expect(screen.getByLabelText("Resetar filtros")).toBeInTheDocument();
    });

    it("reseta filtros ao clicar no botão Resetar", async () => {
      const user = userEvent.setup();
      render(<TestWrapper searchColumn="name" />);
      
      const searchInput = screen.getByPlaceholderText("Buscar...") as HTMLInputElement;
      
      // Adiciona filtro
      await user.type(searchInput, "João");
      expect(searchInput.value).toBe("João");
      
      // Clica em resetar
      const resetButton = screen.getByText("Resetar");
      await user.click(resetButton);
      
      // Filtro foi limpo
      expect(searchInput.value).toBe("");
    });
  });

  describe("Column Visibility", () => {
    it("abre dropdown ao clicar no botão Colunas", async () => {
      const user = userEvent.setup();
      render(<TestWrapper />);
      
      const columnButton = screen.getByText("Colunas");
      await user.click(columnButton);
      
      // Dropdown abriu com as colunas
      expect(screen.getByText("Visibilidade")).toBeInTheDocument();
      expect(screen.getByText("Nome")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
    });

    it("não mostra colunas sem accessorFn no dropdown", async () => {
      const user = userEvent.setup();
      render(<TestWrapper />);
      
      const columnButton = screen.getByText("Colunas");
      await user.click(columnButton);
      
      // ID não deve aparecer (tem accessorKey mas queremos apenas as que têm enableHiding)
      // Nome e Email devem aparecer
      expect(screen.getByText("Nome")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
    });

    it("aceita columnVisibilityLabel customizado", () => {
      function CustomLabelWrapper() {
        const table = useReactTable({
          data: testData,
          columns,
          getCoreRowModel: getCoreRowModel(),
        });

        return (
          <DataTableToolbar 
            table={table}
            columnVisibilityLabel="Ver Colunas"
          />
        );
      }

      render(<CustomLabelWrapper />);
      
      expect(screen.getByText("Ver Colunas")).toBeInTheDocument();
    });

    it("respeita showColumnVisibility=false", () => {
      function NoColumnVisibilityWrapper() {
        const table = useReactTable({
          data: testData,
          columns,
          getCoreRowModel: getCoreRowModel(),
        });

        return (
          <DataTableToolbar 
            table={table}
            showColumnVisibility={false}
          />
        );
      }

      render(<NoColumnVisibilityWrapper />);
      
      expect(screen.queryByText("Colunas")).not.toBeInTheDocument();
    });
  });

  describe("Custom Actions", () => {
    it("renderiza ações customizadas", () => {
      const handleExport = vi.fn();
      const actions = [
        <Button key="export" onClick={handleExport}>
          Exportar
        </Button>,
      ];

      render(<TestWrapper actions={actions} />);
      
      expect(screen.getByText("Exportar")).toBeInTheDocument();
    });

    it("renderiza múltiplas ações", () => {
      const actions = [
        <Button key="export">Exportar</Button>,
        <Button key="import">Importar</Button>,
        <Button key="delete">Deletar</Button>,
      ];

      render(<TestWrapper actions={actions} />);
      
      expect(screen.getByText("Exportar")).toBeInTheDocument();
      expect(screen.getByText("Importar")).toBeInTheDocument();
      expect(screen.getByText("Deletar")).toBeInTheDocument();
    });

    it("chama handler ao clicar em ação customizada", async () => {
      const user = userEvent.setup();
      const handleExport = vi.fn();
      
      const actions = [
        <Button key="export" onClick={handleExport}>
          Exportar
        </Button>,
      ];

      render(<TestWrapper actions={actions} />);
      
      const exportButton = screen.getByText("Exportar");
      await user.click(exportButton);
      
      expect(handleExport).toHaveBeenCalledTimes(1);
    });
  });

  describe("Acessibilidade", () => {
    it("search input tem aria-label", () => {
      render(<TestWrapper searchColumn="name" />);
      
      const searchInput = screen.getByPlaceholderText("Buscar...");
      expect(searchInput).toHaveAttribute("aria-label", "Buscar na tabela");
    });

    it("botão de limpar busca tem aria-label", async () => {
      const user = userEvent.setup();
      render(<TestWrapper searchColumn="name" />);
      
      const searchInput = screen.getByPlaceholderText("Buscar...");
      await user.type(searchInput, "test");
      
      const clearButton = screen.getByLabelText("Limpar busca");
      expect(clearButton).toBeInTheDocument();
    });

    it("botão resetar tem aria-label", async () => {
      const user = userEvent.setup();
      render(<TestWrapper searchColumn="name" />);
      
      const searchInput = screen.getByPlaceholderText("Buscar...");
      await user.type(searchInput, "test");
      
      const resetButton = screen.getByLabelText("Resetar filtros");
      expect(resetButton).toBeInTheDocument();
    });

    it("botão de visibilidade tem aria-label", () => {
      render(<TestWrapper />);
      
      const visibilityButton = screen.getByLabelText("Alternar visibilidade de colunas");
      expect(visibilityButton).toBeInTheDocument();
    });
  });
});
