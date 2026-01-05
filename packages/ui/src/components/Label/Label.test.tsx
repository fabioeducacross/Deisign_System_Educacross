import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Label } from "./Label";

describe("Label", () => {
    describe("Rendering", () => {
        it("should render with text content", () => {
            render(<Label>Username</Label>);
            const label = screen.getByText("Username");
            expect(label).toBeInTheDocument();
        });

        it("should render as label element", () => {
            render(<Label>Email</Label>);
            const label = screen.getByText("Email");
            expect(label.tagName).toBe("LABEL");
        });

        it("should have correct display name", () => {
            expect(Label.displayName).toBe("Label");
        });
    });

    describe("htmlFor attribute", () => {
        it("should support htmlFor prop", () => {
            render(<Label htmlFor="email-input">Email</Label>);
            const label = screen.getByText("Email");
            expect(label).toHaveAttribute("for", "email-input");
        });

        it("should associate with input by htmlFor", () => {
            render(
                <>
                    <Label htmlFor="test-input">Test Label</Label>
                    <input id="test-input" type="text" />
                </>
            );
            const input = screen.getByLabelText("Test Label");
            expect(input).toBeInTheDocument();
        });
    });

    describe("Variants", () => {
        it("should apply default variant classes", () => {
            render(<Label>Default</Label>);
            const label = screen.getByText("Default");
            expect(label).toHaveClass("text-foreground");
        });

        it("should apply error variant classes", () => {
            render(<Label variant="error">Error</Label>);
            const label = screen.getByText("Error");
            expect(label).toHaveClass("text-destructive");
        });

        it("should apply muted variant classes", () => {
            render(<Label variant="muted">Muted</Label>);
            const label = screen.getByText("Muted");
            expect(label).toHaveClass("text-muted-foreground");
        });
    });

    describe("Required indicator", () => {
        it("should show required indicator when required is true", () => {
            render(<Label required>Required Field</Label>);
            const asterisk = screen.getByText("*");
            expect(asterisk).toBeInTheDocument();
        });

        it("should have aria-hidden on asterisk for screen readers", () => {
            render(<Label required>Required Field</Label>);
            const asterisk = screen.getByText("*");
            expect(asterisk).toHaveAttribute("aria-hidden", "true");
        });

        it("should not show required indicator when required is false", () => {
            render(<Label required={false}>Optional Field</Label>);
            expect(screen.queryByText("*")).not.toBeInTheDocument();
        });

        it("should not show required indicator by default", () => {
            render(<Label>Default Field</Label>);
            expect(screen.queryByText("*")).not.toBeInTheDocument();
        });
    });

    describe("Custom className", () => {
        it("should merge custom className with variants", () => {
            render(<Label className="custom-class">Custom</Label>);
            const label = screen.getByText("Custom");
            expect(label).toHaveClass("custom-class");
            expect(label).toHaveClass("text-foreground"); // default variant should still apply
        });
    });

    describe("Styling", () => {
        it("should have base text styling", () => {
            render(<Label>Styled</Label>);
            const label = screen.getByText("Styled");
            expect(label).toHaveClass("text-sm");
            expect(label).toHaveClass("font-medium");
        });

        it("should have peer-disabled styling for associated inputs", () => {
            render(<Label>With Disabled Input</Label>);
            const label = screen.getByText("With Disabled Input");
            expect(label).toHaveClass("peer-disabled:opacity-70");
        });
    });

    describe("Children", () => {
        it("should render complex children", () => {
            render(
                <Label>
                    <span data-testid="icon">📧</span>
                    <span>Email Address</span>
                </Label>
            );
            expect(screen.getByTestId("icon")).toBeInTheDocument();
            expect(screen.getByText("Email Address")).toBeInTheDocument();
        });
    });

    describe("Accessibility", () => {
        it("should be accessible by role", () => {
            render(<Label htmlFor="input">Accessible Label</Label>);
            // Labels don't have a specific role, but we can check the element
            const label = screen.getByText("Accessible Label");
            expect(label.tagName).toBe("LABEL");
        });

        it("should support additional aria attributes", () => {
            render(
                <Label htmlFor="input" aria-describedby="help">
                    Help Label
                </Label>
            );
            const label = screen.getByText("Help Label");
            expect(label).toHaveAttribute("aria-describedby", "help");
        });
    });
});
