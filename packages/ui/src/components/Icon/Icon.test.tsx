import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Icon, iconNames, iconCategories, type IconName } from "./Icon";

// Mock console.warn for testing invalid icon name
const originalWarn = console.warn;
beforeEach(() => {
    console.warn = vi.fn();
});
afterEach(() => {
    console.warn = originalWarn;
});

describe("Icon", () => {
    describe("Rendering", () => {
        it("renders an icon by name", () => {
            render(<Icon name="Check" data-testid="icon" />);
            const icon = screen.getByTestId("icon");
            expect(icon).toBeInTheDocument();
            expect(icon.tagName.toLowerCase()).toBe("svg");
        });

        it("renders with aria-label for accessibility", () => {
            render(<Icon name="Heart" aria-label="Favorito" />);
            expect(screen.getByLabelText("Favorito")).toBeInTheDocument();
        });

        it("returns null and warns for invalid icon name", () => {
            const { container } = render(
                <Icon name={"InvalidIcon" as IconName} data-testid="icon" />
            );
            expect(container.firstChild).toBeNull();
            expect(console.warn).toHaveBeenCalledWith(
                'Icon "InvalidIcon" not found in Feather Icons'
            );
        });
    });

    describe("Size Variants", () => {
        it("renders with xs size", () => {
            render(<Icon name="Star" size="xs" data-testid="icon" />);
            const icon = screen.getByTestId("icon");
            expect(icon).toHaveClass("h-3", "w-3");
        });

        it("renders with sm size", () => {
            render(<Icon name="Star" size="sm" data-testid="icon" />);
            const icon = screen.getByTestId("icon");
            expect(icon).toHaveClass("h-4", "w-4");
        });

        it("renders with default size", () => {
            render(<Icon name="Star" data-testid="icon" />);
            const icon = screen.getByTestId("icon");
            expect(icon).toHaveClass("h-5", "w-5");
        });

        it("renders with md size", () => {
            render(<Icon name="Star" size="md" data-testid="icon" />);
            const icon = screen.getByTestId("icon");
            expect(icon).toHaveClass("h-6", "w-6");
        });

        it("renders with lg size", () => {
            render(<Icon name="Star" size="lg" data-testid="icon" />);
            const icon = screen.getByTestId("icon");
            expect(icon).toHaveClass("h-8", "w-8");
        });

        it("renders with xl size", () => {
            render(<Icon name="Star" size="xl" data-testid="icon" />);
            const icon = screen.getByTestId("icon");
            expect(icon).toHaveClass("h-10", "w-10");
        });

        it("renders with 2xl size", () => {
            render(<Icon name="Star" size="2xl" data-testid="icon" />);
            const icon = screen.getByTestId("icon");
            expect(icon).toHaveClass("h-12", "w-12");
        });
    });

    describe("Color Variants", () => {
        it("renders with default variant (text-current)", () => {
            render(<Icon name="Heart" data-testid="icon" />);
            const icon = screen.getByTestId("icon");
            expect(icon).toHaveClass("text-current");
        });

        it("renders with muted variant", () => {
            render(<Icon name="Heart" variant="muted" data-testid="icon" />);
            const icon = screen.getByTestId("icon");
            expect(icon).toHaveClass("text-muted-foreground");
        });

        it("renders with primary variant", () => {
            render(<Icon name="Heart" variant="primary" data-testid="icon" />);
            const icon = screen.getByTestId("icon");
            expect(icon).toHaveClass("text-primary");
        });

        it("renders with secondary variant", () => {
            render(<Icon name="Heart" variant="secondary" data-testid="icon" />);
            const icon = screen.getByTestId("icon");
            expect(icon).toHaveClass("text-secondary");
        });

        it("renders with destructive variant", () => {
            render(<Icon name="Heart" variant="destructive" data-testid="icon" />);
            const icon = screen.getByTestId("icon");
            expect(icon).toHaveClass("text-destructive");
        });

        it("renders with success variant", () => {
            render(<Icon name="Check" variant="success" data-testid="icon" />);
            const icon = screen.getByTestId("icon");
            expect(icon).toHaveClass("text-success");
        });

        it("renders with warning variant", () => {
            render(<Icon name="AlertTriangle" variant="warning" data-testid="icon" />);
            const icon = screen.getByTestId("icon");
            expect(icon).toHaveClass("text-warning");
        });
    });

    describe("Custom Props", () => {
        it("renders with custom pixelSize", () => {
            render(<Icon name="Star" pixelSize={32} data-testid="icon" />);
            const icon = screen.getByTestId("icon");
            expect(icon).toHaveAttribute("width", "32");
            expect(icon).toHaveAttribute("height", "32");
        });

        it("renders with custom strokeWidth", () => {
            render(<Icon name="Star" strokeWidth={1.5} data-testid="icon" />);
            const icon = screen.getByTestId("icon");
            expect(icon).toHaveAttribute("stroke-width", "1.5");
        });

        it("renders with default strokeWidth of 2", () => {
            render(<Icon name="Star" data-testid="icon" />);
            const icon = screen.getByTestId("icon");
            expect(icon).toHaveAttribute("stroke-width", "2");
        });

        it("applies custom className", () => {
            render(<Icon name="Star" className="custom-class" data-testid="icon" />);
            const icon = screen.getByTestId("icon");
            expect(icon).toHaveClass("custom-class");
        });

        it("passes through additional SVG props", () => {
            render(
                <Icon
                    name="Star"
                    data-testid="icon"
                    role="img"
                    aria-hidden="true"
                />
            );
            const icon = screen.getByTestId("icon");
            expect(icon).toHaveAttribute("role", "img");
            expect(icon).toHaveAttribute("aria-hidden", "true");
        });
    });

    describe("Icon Names Export", () => {
        it("exports iconNames array", () => {
            expect(Array.isArray(iconNames)).toBe(true);
            expect(iconNames.length).toBeGreaterThan(0);
        });

        it("iconNames does not include 'default'", () => {
            expect(iconNames).not.toContain("default");
        });

        it("iconNames contains common icons", () => {
            expect(iconNames).toContain("Check");
            expect(iconNames).toContain("X");
            expect(iconNames).toContain("Heart");
            expect(iconNames).toContain("Star");
        });
    });

    describe("Icon Categories Export", () => {
        it("exports iconCategories object", () => {
            expect(typeof iconCategories).toBe("object");
        });

        it("has arrows category", () => {
            expect(iconCategories.arrows).toBeDefined();
            expect(Array.isArray(iconCategories.arrows)).toBe(true);
            expect(iconCategories.arrows).toContain("ArrowDown");
            expect(iconCategories.arrows).toContain("ChevronRight");
        });
    });

    describe("DisplayName", () => {
        it("has correct displayName", () => {
            expect(Icon.displayName).toBe("Icon");
        });
    });

    describe("Base Classes", () => {
        it("has inline-block and flex-shrink-0 classes", () => {
            render(<Icon name="Check" data-testid="icon" />);
            const icon = screen.getByTestId("icon");
            expect(icon).toHaveClass("inline-block", "flex-shrink-0");
        });
    });
});
