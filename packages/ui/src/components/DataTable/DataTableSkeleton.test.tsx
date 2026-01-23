/**
 * @file DataTableSkeleton.test.tsx
 * @description Testes para DataTableSkeleton
 */

import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { DataTableSkeleton } from "./DataTableSkeleton";

describe("DataTableSkeleton", () => {
  describe("Renderização básica", () => {
    it("renderiza skeleton com valores padrão", () => {
      const { container } = render(<DataTableSkeleton />);
      
      // 5 rows x 4 columns = 20 cells
      const skeletons = container.querySelectorAll('[class*="animate-pulse"]');
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it("renderiza número customizado de linhas", () => {
      const { container } = render(<DataTableSkeleton rows={3} columns={2} />);
      
      // 3 rows, cada uma com células
      const rows = container.querySelectorAll('[class*="divide-y"] > div');
      expect(rows).toHaveLength(3);
    });

    it("renderiza número customizado de colunas", () => {
      const { container } = render(<DataTableSkeleton rows={1} columns={5} />);
      
      // Primeira linha deve ter 5 skeletons (uma por coluna)
      const firstRow = container.querySelector('[class*="divide-y"] > div');
      const cells = firstRow?.querySelectorAll('[class*="animate-pulse"]');
      expect(cells).toHaveLength(5);
    });
  });

  describe("Seções opcionais", () => {
    it("mostra header por padrão", () => {
      const { container } = render(<DataTableSkeleton />);
      
      const header = container.querySelector('[class*="border-b"]');
      expect(header).toBeInTheDocument();
    });

    it("esconde header quando showHeader é false", () => {
      const { container } = render(<DataTableSkeleton showHeader={false} />);
      
      // Verifica que não há header específico com border-b
      const header = container.querySelector('[class*="border-b"][class*="bg-muted"]');
      expect(header).not.toBeInTheDocument();
    });

    it("mostra toolbar quando showToolbar é true", () => {
      const { container } = render(<DataTableSkeleton showToolbar />);
      
      // Toolbar tem 3 skeletons (search input + 2 buttons)
      const toolbar = container.querySelector('[class*="justify-between"]');
      expect(toolbar).toBeInTheDocument();
    });

    it("não mostra toolbar por padrão", () => {
      const { container } = render(<DataTableSkeleton />);
      
      // Verifica que não há div com justify-between antes da table
      const allDivs = container.querySelectorAll('div');
      const toolbarLike = Array.from(allDivs).find(div => 
        div.className.includes('justify-between') && 
        div.querySelector('[class*="w-64"]')
      );
      expect(toolbarLike).toBeUndefined();
    });

    it("mostra pagination quando showPagination é true", () => {
      const { container } = render(<DataTableSkeleton showPagination />);
      
      // Pagination tem múltiplos skeletons
      const skeletons = container.querySelectorAll('[class*="animate-pulse"]');
      const paginationSkeletons = Array.from(skeletons).filter(el =>
        el.className.includes('h-9')
      );
      expect(paginationSkeletons.length).toBeGreaterThan(5);
    });

    it("não mostra pagination por padrão", () => {
      const { container } = render(<DataTableSkeleton />);
      
      // Verifica que não há skeletons de pagination (h-9)
      const paginationElements = container.querySelectorAll('[class*="h-9"]');
      expect(paginationElements.length).toBe(0);
    });
  });

  describe("Customização de altura", () => {
    it("usa altura padrão h-12", () => {
      const { container } = render(<DataTableSkeleton rows={1} columns={2} />);
      
      const cells = container.querySelectorAll('[class*="h-12"]');
      expect(cells.length).toBeGreaterThan(0);
    });

    it("aceita rowHeight customizado", () => {
      const { container } = render(
        <DataTableSkeleton rows={1} columns={2} rowHeight="h-16" />
      );
      
      const cells = container.querySelectorAll('[class*="h-16"]');
      expect(cells.length).toBeGreaterThan(0);
    });
  });

  describe("Acessibilidade", () => {
    it("tem aria-busy true", () => {
      const { container } = render(<DataTableSkeleton />);
      
      const busyElement = container.querySelector('[aria-busy="true"]');
      expect(busyElement).toBeInTheDocument();
    });

    it("tem aria-live polite", () => {
      const { container } = render(<DataTableSkeleton />);
      
      const liveElement = container.querySelector('[aria-live="polite"]');
      expect(liveElement).toBeInTheDocument();
    });
  });

  describe("Estilo e classes", () => {
    it("aplica className customizado", () => {
      const { container } = render(
        <DataTableSkeleton className="custom-skeleton" />
      );
      
      const wrapper = container.querySelector('[aria-busy="true"]');
      expect(wrapper).toHaveClass("custom-skeleton");
    });

    it("mantém classes base", () => {
      const { container } = render(
        <DataTableSkeleton className="my-class" />
      );
      
      const wrapper = container.querySelector('[aria-busy="true"]');
      expect(wrapper).toHaveClass("space-y-4");
      expect(wrapper).toHaveClass("my-class");
    });
  });

  describe("Cenários completos", () => {
    it("renderiza skeleton completo com toolbar e pagination", () => {
      const { container } = render(
        <DataTableSkeleton
          rows={8}
          columns={6}
          showToolbar
          showPagination
        />
      );
      
      // Verifica presença de todas as seções
      expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument();
      
      // Conta total de skeletons (toolbar + header + rows + pagination)
      const allSkeletons = container.querySelectorAll('[class*="animate-pulse"]');
      expect(allSkeletons.length).toBeGreaterThan(50); // Muitos skeletons
    });

    it("renderiza skeleton mínimo sem header", () => {
      const { container } = render(
        <DataTableSkeleton
          rows={2}
          columns={2}
          showHeader={false}
        />
      );
      
      // Apenas rows, sem header
      const rows = container.querySelectorAll('[class*="divide-y"] > div');
      expect(rows).toHaveLength(2);
      
      // Não deve ter header com border-b bg-muted
      const header = container.querySelector('[class*="border-b"][class*="bg-muted"]');
      expect(header).not.toBeInTheDocument();
    });

    it("renderiza table skeleton grande", () => {
      const { container } = render(
        <DataTableSkeleton
          rows={20}
          columns={8}
        />
      );
      
      const rows = container.querySelectorAll('[class*="divide-y"] > div');
      expect(rows).toHaveLength(20);
    });
  });
});
