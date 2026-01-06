import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AvatarIcon } from "./AvatarIcon";

describe("AvatarIcon", () => {
    describe("Renderização", () => {
        it("deve renderizar corretamente", () => {
            const { container } = render(<AvatarIcon />);
            const svg = container.querySelector("svg");
            expect(svg).toBeInTheDocument();
        });

        it("deve ter o círculo ciano", () => {
            const { container } = render(<AvatarIcon />);
            const circle = container.querySelector('circle[fill="#00CFE8"]');
            expect(circle).toBeInTheDocument();
        });

        it("deve ter o atributo role group", () => {
            const { container } = render(<AvatarIcon />);
            expect(container.firstChild).toBeInTheDocument();
        });
    });

    describe("Variantes de tamanho", () => {
        it("deve aplicar tamanho sm", () => {
            const { container } = render(<AvatarIcon size="sm" />);
            const icon = container.firstChild as HTMLElement;
            expect(icon).toHaveClass("h-8");
            expect(icon).toHaveClass("w-8");
        });

        it("deve aplicar tamanho default", () => {
            const { container } = render(<AvatarIcon size="default" />);
            const icon = container.firstChild as HTMLElement;
            expect(icon).toHaveClass("h-10");
            expect(icon).toHaveClass("w-10");
        });

        it("deve aplicar tamanho lg", () => {
            const { container } = render(<AvatarIcon size="lg" />);
            const icon = container.firstChild as HTMLElement;
            expect(icon).toHaveClass("h-12");
            expect(icon).toHaveClass("w-12");
        });

        it("deve usar tamanho default quando nenhum especificado", () => {
            const { container } = render(<AvatarIcon />);
            const icon = container.firstChild as HTMLElement;
            expect(icon).toHaveClass("h-10");
            expect(icon).toHaveClass("w-10");
        });

        it("deve ter flex items-center justify-center em todos os tamanhos", () => {
            const { container, rerender } = render(<AvatarIcon size="sm" />);
            expect(container.firstChild).toHaveClass("flex", "items-center", "justify-center");

            rerender(<AvatarIcon size="default" />);
            expect(container.firstChild).toHaveClass("flex", "items-center", "justify-center");

            rerender(<AvatarIcon size="lg" />);
            expect(container.firstChild).toHaveClass("flex", "items-center", "justify-center");
        });
    });

    describe("Customização", () => {
        it("deve suportar className customizado", () => {
            const { container } = render(<AvatarIcon className="custom-class" />);
            const icon = container.firstChild as HTMLElement;
            expect(icon).toHaveClass("custom-class");
            expect(icon).toHaveClass("h-10"); // mantém classe de tamanho
        });

        it("deve combinar className customizado com tamanho", () => {
            const { container } = render(<AvatarIcon size="lg" className="custom-class" />);
            const icon = container.firstChild as HTMLElement;
            expect(icon).toHaveClass("custom-class");
            expect(icon).toHaveClass("h-12");
        });
    });

    describe("Ref", () => {
        it("deve suportar ref", () => {
            const ref = { current: null };
            render(<AvatarIcon ref={ref} />);
            expect(ref.current).toBeInstanceOf(HTMLDivElement);
        });
    });
});
