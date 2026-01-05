import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
    Skeleton,
    SkeletonText,
    SkeletonCircle,
    SkeletonCard,
    SkeletonAvatar,
    SkeletonTable,
    skeletonVariants,
} from "./Skeleton";

describe("Skeleton", () => {
    describe("Renderização", () => {
        it("deve renderizar elemento div", () => {
            render(<Skeleton data-testid="skeleton" />);
            expect(screen.getByTestId("skeleton")).toBeInTheDocument();
        });

        it("deve aplicar classes de animação", () => {
            render(<Skeleton data-testid="skeleton" />);
            expect(screen.getByTestId("skeleton")).toHaveClass("animate-pulse");
        });

        it("deve suportar ref", () => {
            const ref = { current: null as HTMLDivElement | null };
            render(<Skeleton ref={ref} />);
            expect(ref.current).toBeInstanceOf(HTMLDivElement);
        });

        it("deve suportar className customizado", () => {
            render(<Skeleton className="h-4 w-[200px]" data-testid="skeleton" />);
            const skeleton = screen.getByTestId("skeleton");
            expect(skeleton).toHaveClass("h-4", "w-[200px]");
        });
    });

    describe("Variantes", () => {
        it("deve renderizar variante default", () => {
            render(<Skeleton variant="default" data-testid="skeleton" />);
            expect(screen.getByTestId("skeleton")).toHaveClass("bg-muted");
        });

        it("deve renderizar variante primary", () => {
            render(<Skeleton variant="primary" data-testid="skeleton" />);
            expect(screen.getByTestId("skeleton")).toHaveClass("bg-primary/20");
        });

        it("deve renderizar variante card", () => {
            render(<Skeleton variant="card" data-testid="skeleton" />);
            expect(screen.getByTestId("skeleton")).toHaveClass("border");
        });
    });
});

describe("SkeletonText", () => {
    it("deve renderizar 3 linhas por padrão", () => {
        render(<SkeletonText data-testid="text" />);
        const container = screen.getByTestId("text");
        const lines = container.querySelectorAll(".animate-pulse");
        expect(lines).toHaveLength(3);
    });

    it("deve renderizar número customizado de linhas", () => {
        render(<SkeletonText lines={5} data-testid="text" />);
        const container = screen.getByTestId("text");
        const lines = container.querySelectorAll(".animate-pulse");
        expect(lines).toHaveLength(5);
    });

    it("deve aplicar lastLineWidth na última linha", () => {
        render(<SkeletonText lines={2} lastLineWidth="50%" data-testid="text" />);
        const container = screen.getByTestId("text");
        const lines = container.querySelectorAll(".animate-pulse");
        expect(lines[1]).toHaveStyle({ width: "50%" });
    });

    it("deve suportar ref", () => {
        const ref = { current: null as HTMLDivElement | null };
        render(<SkeletonText ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
});

describe("SkeletonCircle", () => {
    it("deve renderizar círculo", () => {
        render(<SkeletonCircle data-testid="circle" />);
        expect(screen.getByTestId("circle")).toHaveClass("rounded-full");
    });

    it("deve renderizar tamanho md por padrão", () => {
        render(<SkeletonCircle data-testid="circle" />);
        expect(screen.getByTestId("circle")).toHaveClass("h-12", "w-12");
    });

    it("deve renderizar tamanho sm", () => {
        render(<SkeletonCircle size="sm" data-testid="circle" />);
        expect(screen.getByTestId("circle")).toHaveClass("h-8", "w-8");
    });

    it("deve renderizar tamanho lg", () => {
        render(<SkeletonCircle size="lg" data-testid="circle" />);
        expect(screen.getByTestId("circle")).toHaveClass("h-16", "w-16");
    });

    it("deve renderizar tamanho xl", () => {
        render(<SkeletonCircle size="xl" data-testid="circle" />);
        expect(screen.getByTestId("circle")).toHaveClass("h-24", "w-24");
    });

    it("deve suportar ref", () => {
        const ref = { current: null as HTMLDivElement | null };
        render(<SkeletonCircle ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
});

describe("SkeletonCard", () => {
    it("deve renderizar estrutura de card", () => {
        render(<SkeletonCard data-testid="card" />);
        const card = screen.getByTestId("card");
        expect(card).toBeInTheDocument();
        expect(card).toHaveClass("space-y-3");
    });

    it("deve conter elementos skeleton internos", () => {
        render(<SkeletonCard data-testid="card" />);
        const card = screen.getByTestId("card");
        const skeletons = card.querySelectorAll(".animate-pulse");
        expect(skeletons.length).toBeGreaterThan(0);
    });

    it("deve suportar ref", () => {
        const ref = { current: null as HTMLDivElement | null };
        render(<SkeletonCard ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
});

describe("SkeletonAvatar", () => {
    it("deve renderizar estrutura de avatar", () => {
        render(<SkeletonAvatar data-testid="avatar" />);
        const avatar = screen.getByTestId("avatar");
        expect(avatar).toHaveClass("flex", "items-center");
    });

    it("deve conter círculo e linhas de texto", () => {
        render(<SkeletonAvatar data-testid="avatar" />);
        const avatar = screen.getByTestId("avatar");
        const circle = avatar.querySelector(".rounded-full");
        expect(circle).toBeInTheDocument();
    });

    it("deve suportar ref", () => {
        const ref = { current: null as HTMLDivElement | null };
        render(<SkeletonAvatar ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
});

describe("SkeletonTable", () => {
    it("deve renderizar estrutura de tabela", () => {
        render(<SkeletonTable data-testid="table" />);
        expect(screen.getByTestId("table")).toHaveClass("space-y-4");
    });

    it("deve renderizar 5 rows por padrão", () => {
        render(<SkeletonTable data-testid="table" />);
        const table = screen.getByTestId("table");
        // Header + 5 rows = 6 flex containers
        const rows = table.querySelectorAll(".flex.gap-4");
        expect(rows).toHaveLength(6);
    });

    it("deve renderizar número customizado de rows", () => {
        render(<SkeletonTable rows={3} data-testid="table" />);
        const table = screen.getByTestId("table");
        // Header + 3 rows = 4 flex containers
        const rows = table.querySelectorAll(".flex.gap-4");
        expect(rows).toHaveLength(4);
    });

    it("deve renderizar número customizado de colunas", () => {
        render(<SkeletonTable columns={2} rows={1} data-testid="table" />);
        const table = screen.getByTestId("table");
        const firstRow = table.querySelector(".flex.gap-4");
        const cells = firstRow?.querySelectorAll(".animate-pulse");
        expect(cells).toHaveLength(2);
    });

    it("deve suportar ref", () => {
        const ref = { current: null as HTMLDivElement | null };
        render(<SkeletonTable ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
});

describe("skeletonVariants", () => {
    it("deve exportar função skeletonVariants", () => {
        expect(typeof skeletonVariants).toBe("function");
    });

    it("deve gerar classes para variante primary", () => {
        const classes = skeletonVariants({ variant: "primary" });
        expect(classes).toContain("bg-primary/20");
    });
});
