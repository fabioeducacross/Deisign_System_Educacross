import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    cardVariants,
} from "./Card";

describe("Card", () => {
    describe("Renderização", () => {
        it("deve renderizar com conteúdo", () => {
            render(<Card>Card content</Card>);
            expect(screen.getByText("Card content")).toBeInTheDocument();
        });

        it("deve aplicar classes base", () => {
            render(<Card data-testid="card">Content</Card>);
            const card = screen.getByTestId("card");
            expect(card).toHaveClass("rounded-lg", "border", "bg-card");
        });

        it("deve suportar ref", () => {
            const ref = { current: null as HTMLDivElement | null };
            render(<Card ref={ref}>Content</Card>);
            expect(ref.current).toBeInstanceOf(HTMLDivElement);
        });

        it("deve suportar className customizado", () => {
            render(<Card className="custom-class" data-testid="card">Content</Card>);
            expect(screen.getByTestId("card")).toHaveClass("custom-class");
        });
    });

    describe("Variantes", () => {
        it("deve renderizar variante default com shadow-sm", () => {
            render(<Card variant="default" data-testid="card">Content</Card>);
            expect(screen.getByTestId("card")).toHaveClass("shadow-sm");
        });

        it("deve renderizar variante elevated", () => {
            render(<Card variant="elevated" data-testid="card">Content</Card>);
            expect(screen.getByTestId("card")).toHaveClass("shadow-md");
        });

        it("deve renderizar variante outline", () => {
            render(<Card variant="outline" data-testid="card">Content</Card>);
            expect(screen.getByTestId("card")).toHaveClass("shadow-none");
        });

        it("deve renderizar variante interactive", () => {
            render(<Card variant="interactive" data-testid="card">Content</Card>);
            expect(screen.getByTestId("card")).toHaveClass("cursor-pointer");
        });
    });

    describe("Padding", () => {
        it("deve renderizar padding default (p-6)", () => {
            render(<Card padding="default" data-testid="card">Content</Card>);
            expect(screen.getByTestId("card")).toHaveClass("p-6");
        });

        it("deve renderizar padding sm (p-4)", () => {
            render(<Card padding="sm" data-testid="card">Content</Card>);
            expect(screen.getByTestId("card")).toHaveClass("p-4");
        });

        it("deve renderizar padding lg (p-8)", () => {
            render(<Card padding="lg" data-testid="card">Content</Card>);
            expect(screen.getByTestId("card")).toHaveClass("p-8");
        });

        it("deve renderizar sem padding quando none", () => {
            render(<Card padding="none" data-testid="card">Content</Card>);
            const card = screen.getByTestId("card");
            expect(card).not.toHaveClass("p-4", "p-6", "p-8");
        });
    });
});

describe("CardHeader", () => {
    it("deve renderizar corretamente", () => {
        render(<CardHeader data-testid="header">Header content</CardHeader>);
        const header = screen.getByTestId("header");
        expect(header).toBeInTheDocument();
        expect(header).toHaveClass("flex", "flex-col");
    });

    it("deve suportar ref", () => {
        const ref = { current: null as HTMLDivElement | null };
        render(<CardHeader ref={ref}>Header</CardHeader>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
});

describe("CardTitle", () => {
    it("deve renderizar como h3", () => {
        render(<CardTitle>Title</CardTitle>);
        const title = screen.getByRole("heading", { level: 3 });
        expect(title).toHaveTextContent("Title");
    });

    it("deve aplicar classes de tipografia", () => {
        render(<CardTitle data-testid="title">Title</CardTitle>);
        const title = screen.getByTestId("title");
        expect(title).toHaveClass("text-2xl", "font-semibold");
    });

    it("deve suportar ref", () => {
        const ref = { current: null as HTMLHeadingElement | null };
        render(<CardTitle ref={ref}>Title</CardTitle>);
        expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });
});

describe("CardDescription", () => {
    it("deve renderizar como parágrafo", () => {
        render(<CardDescription>Description text</CardDescription>);
        expect(screen.getByText("Description text")).toBeInTheDocument();
    });

    it("deve aplicar classes de texto muted", () => {
        render(<CardDescription data-testid="desc">Description</CardDescription>);
        expect(screen.getByTestId("desc")).toHaveClass("text-muted-foreground");
    });

    it("deve suportar ref", () => {
        const ref = { current: null as HTMLParagraphElement | null };
        render(<CardDescription ref={ref}>Description</CardDescription>);
        expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });
});

describe("CardContent", () => {
    it("deve renderizar conteúdo", () => {
        render(<CardContent>Main content</CardContent>);
        expect(screen.getByText("Main content")).toBeInTheDocument();
    });

    it("deve aplicar padding", () => {
        render(<CardContent data-testid="content">Content</CardContent>);
        expect(screen.getByTestId("content")).toHaveClass("p-6", "pt-0");
    });

    it("deve suportar ref", () => {
        const ref = { current: null as HTMLDivElement | null };
        render(<CardContent ref={ref}>Content</CardContent>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
});

describe("CardFooter", () => {
    it("deve renderizar conteúdo", () => {
        render(<CardFooter>Footer actions</CardFooter>);
        expect(screen.getByText("Footer actions")).toBeInTheDocument();
    });

    it("deve aplicar flex para alinhamento", () => {
        render(<CardFooter data-testid="footer">Footer</CardFooter>);
        const footer = screen.getByTestId("footer");
        expect(footer).toHaveClass("flex", "items-center");
    });

    it("deve suportar ref", () => {
        const ref = { current: null as HTMLDivElement | null };
        render(<CardFooter ref={ref}>Footer</CardFooter>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
});

describe("Composição completa", () => {
    it("deve renderizar Card completo com todos os sub-componentes", () => {
        render(
            <Card data-testid="full-card">
                <CardHeader>
                    <CardTitle>Test Card</CardTitle>
                    <CardDescription>This is a description</CardDescription>
                </CardHeader>
                <CardContent>Main content here</CardContent>
                <CardFooter>Action buttons</CardFooter>
            </Card>
        );

        expect(screen.getByTestId("full-card")).toBeInTheDocument();
        expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Test Card");
        expect(screen.getByText("This is a description")).toBeInTheDocument();
        expect(screen.getByText("Main content here")).toBeInTheDocument();
        expect(screen.getByText("Action buttons")).toBeInTheDocument();
    });
});

describe("cardVariants", () => {
    it("deve exportar função cardVariants", () => {
        expect(typeof cardVariants).toBe("function");
    });

    it("deve gerar classes para variante elevated", () => {
        const classes = cardVariants({ variant: "elevated" });
        expect(classes).toContain("shadow-md");
    });
});
