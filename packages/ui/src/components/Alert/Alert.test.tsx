import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Alert, AlertTitle, AlertDescription } from "./Alert";

describe("Alert", () => {
    describe("Rendering", () => {
        it("should render with children", () => {
            render(<Alert>Alert content</Alert>);
            const alert = screen.getByRole("alert");
            expect(alert).toBeInTheDocument();
            expect(alert).toHaveTextContent("Alert content");
        });

        it("should have correct display name", () => {
            expect(Alert.displayName).toBe("Alert");
        });

        it("should have role=alert", () => {
            render(<Alert>Test</Alert>);
            expect(screen.getByRole("alert")).toBeInTheDocument();
        });
    });

    describe("Variants", () => {
        it("should apply default variant classes", () => {
            render(<Alert>Default</Alert>);
            const alert = screen.getByRole("alert");
            expect(alert).toHaveClass("bg-background");
        });

        it("should apply destructive variant classes", () => {
            render(<Alert variant="destructive">Error</Alert>);
            const alert = screen.getByRole("alert");
            expect(alert).toHaveClass("border-destructive/50");
        });

        it("should apply success variant classes", () => {
            render(<Alert variant="success">Success</Alert>);
            const alert = screen.getByRole("alert");
            expect(alert).toHaveClass("border-green-500/50");
        });

        it("should apply warning variant classes", () => {
            render(<Alert variant="warning">Warning</Alert>);
            const alert = screen.getByRole("alert");
            expect(alert).toHaveClass("border-yellow-500/50");
        });

        it("should apply info variant classes", () => {
            render(<Alert variant="info">Info</Alert>);
            const alert = screen.getByRole("alert");
            expect(alert).toHaveClass("border-blue-500/50");
        });
    });

    describe("Custom className", () => {
        it("should merge custom className", () => {
            render(<Alert className="custom-class">Custom</Alert>);
            const alert = screen.getByRole("alert");
            expect(alert).toHaveClass("custom-class");
            expect(alert).toHaveClass("rounded-lg"); // base class should still apply
        });
    });

    describe("Styling", () => {
        it("should have base styling classes", () => {
            render(<Alert>Styled</Alert>);
            const alert = screen.getByRole("alert");
            expect(alert).toHaveClass("relative", "w-full", "rounded-lg", "border", "p-4");
        });
    });
});

describe("AlertTitle", () => {
    it("should render title text", () => {
        render(<AlertTitle>Alert Title</AlertTitle>);
        const title = screen.getByText("Alert Title");
        expect(title).toBeInTheDocument();
    });

    it("should have correct display name", () => {
        expect(AlertTitle.displayName).toBe("AlertTitle");
    });

    it("should render as h5 element", () => {
        render(<AlertTitle>Title</AlertTitle>);
        const title = screen.getByRole("heading", { level: 5 });
        expect(title).toBeInTheDocument();
    });

    it("should have font-medium class", () => {
        render(<AlertTitle>Styled Title</AlertTitle>);
        const title = screen.getByText("Styled Title");
        expect(title).toHaveClass("font-medium");
    });

    it("should merge custom className", () => {
        render(<AlertTitle className="custom-class">Custom</AlertTitle>);
        const title = screen.getByText("Custom");
        expect(title).toHaveClass("custom-class");
        expect(title).toHaveClass("font-medium");
    });
});

describe("AlertDescription", () => {
    it("should render description text", () => {
        render(<AlertDescription>Alert description text</AlertDescription>);
        const description = screen.getByText("Alert description text");
        expect(description).toBeInTheDocument();
    });

    it("should have correct display name", () => {
        expect(AlertDescription.displayName).toBe("AlertDescription");
    });

    it("should have text-sm class", () => {
        render(<AlertDescription>Description</AlertDescription>);
        const description = screen.getByText("Description");
        expect(description).toHaveClass("text-sm");
    });

    it("should merge custom className", () => {
        render(<AlertDescription className="custom-class">Custom</AlertDescription>);
        const description = screen.getByText("Custom");
        expect(description).toHaveClass("custom-class");
        expect(description).toHaveClass("text-sm");
    });
});

describe("Alert composition", () => {
    it("should render complete alert with title and description", () => {
        render(
            <Alert>
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    You can add components to your app using the cli.
                </AlertDescription>
            </Alert>
        );

        expect(screen.getByRole("alert")).toBeInTheDocument();
        expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent("Heads up!");
        expect(screen.getByText(/You can add components/)).toBeInTheDocument();
    });

    it("should render destructive alert with icon positioning classes", () => {
        render(
            <Alert variant="destructive">
                <svg data-testid="alert-icon" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong</AlertDescription>
            </Alert>
        );

        const alert = screen.getByRole("alert");
        expect(alert).toHaveClass("[&>svg]:absolute");
    });
});
