/**
 * @file DataTableEmptyState.test.tsx
 * @description Testes para DataTableEmptyState
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTableEmptyState } from "./DataTableEmptyState";
import { FileQuestion } from "lucide-react";

describe("DataTableEmptyState", () => {
  describe("Variants", () => {
    it("renderiza variant no-data por padrão", () => {
      render(<DataTableEmptyState />);
      
      expect(screen.getByText("Nenhum dado disponível")).toBeInTheDocument();
      expect(screen.getByText("Não há dados para exibir no momento.")).toBeInTheDocument();
    });

    it("renderiza variant no-results", () => {
      render(<DataTableEmptyState variant="no-results" />);
      
      expect(screen.getByText("Nenhum resultado encontrado")).toBeInTheDocument();
      expect(screen.getByText("Tente ajustar os filtros ou termos de busca.")).toBeInTheDocument();
    });

    it("renderiza variant error", () => {
      render(<DataTableEmptyState variant="error" />);
      
      expect(screen.getByText("Erro ao carregar dados")).toBeInTheDocument();
      expect(screen.getByText(/Ocorreu um erro ao tentar carregar os dados/)).toBeInTheDocument();
    });
  });

  describe("Customização de conteúdo", () => {
    it("aceita title customizado", () => {
      render(
        <DataTableEmptyState
          variant="no-data"
          title="Nenhum usuário cadastrado"
        />
      );
      
      expect(screen.getByText("Nenhum usuário cadastrado")).toBeInTheDocument();
      expect(screen.queryByText("Nenhum dado disponível")).not.toBeInTheDocument();
    });

    it("aceita description customizada", () => {
      render(
        <DataTableEmptyState
          variant="no-data"
          description="Comece adicionando seu primeiro item."
        />
      );
      
      expect(screen.getByText("Comece adicionando seu primeiro item.")).toBeInTheDocument();
    });

    it("aceita ícone customizado", () => {
      render(
        <DataTableEmptyState
          variant="no-data"
          icon={<FileQuestion data-testid="custom-icon" />}
        />
      );
      
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
  });

  describe("Actions", () => {
    it("renderiza botão de ação principal", () => {
      const handleAction = vi.fn();
      
      render(
        <DataTableEmptyState
          variant="no-data"
          actionLabel="Adicionar item"
          onAction={handleAction}
        />
      );
      
      expect(screen.getByRole("button", { name: "Adicionar item" })).toBeInTheDocument();
    });

    it("chama handler ao clicar no botão principal", async () => {
      const user = userEvent.setup();
      const handleAction = vi.fn();
      
      render(
        <DataTableEmptyState
          variant="no-data"
          actionLabel="Adicionar"
          onAction={handleAction}
        />
      );
      
      await user.click(screen.getByRole("button", { name: "Adicionar" }));
      expect(handleAction).toHaveBeenCalledTimes(1);
    });

    it("renderiza botão secundário", () => {
      render(
        <DataTableEmptyState
          variant="no-results"
          actionLabel="Limpar filtros"
          onAction={vi.fn()}
          secondaryActionLabel="Ver todos"
          onSecondaryAction={vi.fn()}
        />
      );
      
      expect(screen.getByRole("button", { name: "Limpar filtros" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Ver todos" })).toBeInTheDocument();
    });

    it("chama handler do botão secundário", async () => {
      const user = userEvent.setup();
      const handleSecondary = vi.fn();
      
      render(
        <DataTableEmptyState
          variant="no-results"
          actionLabel="Ação 1"
          onAction={vi.fn()}
          secondaryActionLabel="Ação 2"
          onSecondaryAction={handleSecondary}
        />
      );
      
      await user.click(screen.getByRole("button", { name: "Ação 2" }));
      expect(handleSecondary).toHaveBeenCalledTimes(1);
    });

    it("não renderiza ações se não fornecidas", () => {
      const { container } = render(<DataTableEmptyState variant="no-data" />);
      
      expect(container.querySelector("button")).toBeNull();
    });
  });

  describe("Acessibilidade", () => {
    it("tem role status", () => {
      const { container } = render(<DataTableEmptyState variant="no-data" />);
      
      const statusElement = container.querySelector('[role="status"]');
      expect(statusElement).toBeInTheDocument();
    });

    it("tem aria-live polite", () => {
      const { container } = render(<DataTableEmptyState variant="no-data" />);
      
      const liveElement = container.querySelector('[aria-live="polite"]');
      expect(liveElement).toBeInTheDocument();
    });
  });

  describe("Estilo e classes", () => {
    it("aplica className customizado", () => {
      const { container } = render(
        <DataTableEmptyState variant="no-data" className="custom-class" />
      );
      
      const element = container.querySelector('[role="status"]');
      expect(element).toHaveClass("custom-class");
    });

    it("mantém classes base junto com customizado", () => {
      const { container } = render(
        <DataTableEmptyState variant="no-data" className="my-class" />
      );
      
      const element = container.querySelector('[role="status"]');
      expect(element).toHaveClass("flex");
      expect(element).toHaveClass("flex-col");
      expect(element).toHaveClass("my-class");
    });
  });

  describe("Cenários de uso", () => {
    it("renderiza estado de tabela sem dados inicial", () => {
      render(
        <DataTableEmptyState
          variant="no-data"
          title="Nenhum produto cadastrado"
          description="Comece adicionando seu primeiro produto."
          actionLabel="Adicionar produto"
          onAction={vi.fn()}
        />
      );
      
      expect(screen.getByText("Nenhum produto cadastrado")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Adicionar produto" })).toBeInTheDocument();
    });

    it("renderiza estado de busca sem resultados", () => {
      render(
        <DataTableEmptyState
          variant="no-results"
          actionLabel="Limpar busca"
          onAction={vi.fn()}
        />
      );
      
      expect(screen.getByText("Nenhum resultado encontrado")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Limpar busca" })).toBeInTheDocument();
    });

    it("renderiza estado de erro com retry", () => {
      render(
        <DataTableEmptyState
          variant="error"
          actionLabel="Tentar novamente"
          onAction={vi.fn()}
        />
      );
      
      expect(screen.getByText("Erro ao carregar dados")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Tentar novamente" })).toBeInTheDocument();
    });
  });
});
