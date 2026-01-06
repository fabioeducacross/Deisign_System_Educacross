import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AvatarIcon } from "./AvatarIcon";

describe("AvatarIcon", () => {
    describe("Renderização", () => {
        it("deve renderizar corretamente", () => {
            render(<AvatarIcon />);
            const img = screen.getByAltText("Avatar Educacross");
            expect(img).toBeInTheDocument();
        });

        it("deve renderizar como img", () => {
            render(<AvatarIcon />);
            const img = screen.getByAltText("Avatar Educacross");
            expect(img.tagName).toBe("IMG");
        });

        it("deve ter src como data URL", () => {
            render(<AvatarIcon />);
            const img = screen.getByAltText("Avatar Educacross");
            expect(img).toHaveAttribute("src");
            expect(img.getAttribute("src")).toContain("data:image/svg+xml;base64,");
        });
    });

    describe("Variantes de tamanho", () => {
        it("deve aplicar tamanho sm", () => {
            render(<AvatarIcon size="sm" />);
            const img = screen.getByAltText("Avatar Educacross");
            expect(img).toHaveClass("h-8");
            expect(img).toHaveClass("w-8");
        });

        it("deve aplicar tamanho default", () => {
            render(<AvatarIcon size="default" />);
            const img = screen.getByAltText("Avatar Educacross");
            expect(img).toHaveClass("h-10");
            expect(img).toHaveClass("w-10");
        });

        it("deve aplicar tamanho lg", () => {
            render(<AvatarIcon size="lg" />);
            const img = screen.getByAltText("Avatar Educacross");
            expect(img).toHaveClass("h-12");
            expect(img).toHaveClass("w-12");
        });

        it("deve usar tamanho default quando nenhum especificado", () => {
            render(<AvatarIcon />);
            const img = screen.getByAltText("Avatar Educacross");
            expect(img).toHaveClass("h-10");
            expect(img).toHaveClass("w-10");
        });
    });

    describe("Customização", () => {
        it("deve suportar className customizado", () => {
            render(<AvatarIcon className="custom-class" />);
            const img = screen.getByAltText("Avatar Educacross");
            expect(img).toHaveClass("custom-class");
            expect(img).toHaveClass("h-10");
        });

        it("deve combinar className customizado com tamanho", () => {
            render(<AvatarIcon size="lg" className="custom-class" />);
            const img = screen.getByAltText("Avatar Educacross");
            expect(img).toHaveClass("custom-class");
            expect(img).toHaveClass("h-12");
        });

        it("deve ter object-contain para manter proporções", () => {
            render(<AvatarIcon />);
            const img = screen.getByAltText("Avatar Educacross");
            expect(img).toHaveClass("object-contain");
        });
    });

    describe("Ref", () => {
        it("deve suportar ref", () => {
            const ref = { current: null };
            render(<AvatarIcon ref={ref} />);
            expect(ref.current).toBeInstanceOf(HTMLImageElement);
        });
    });
});
