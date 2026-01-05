import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    Toast,
    ToastTitle,
    ToastDescription,
    ToastAction,
    ToastViewport,
} from "./Toast";

describe("Toast", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    describe("Rendering", () => {
        it("should render when open is true", () => {
            render(<Toast open>Toast content</Toast>);
            const toast = screen.getByRole("alert");
            expect(toast).toBeInTheDocument();
            expect(toast).toHaveTextContent("Toast content");
        });

        it("should not render when open is false", () => {
            render(<Toast open={false}>Toast content</Toast>);
            expect(screen.queryByRole("alert")).not.toBeInTheDocument();
        });

        it("should render by default (open defaults to true)", () => {
            render(<Toast>Default open</Toast>);
            expect(screen.getByRole("alert")).toBeInTheDocument();
        });

        it("should have correct display name", () => {
            expect(Toast.displayName).toBe("Toast");
        });

        it("should have aria-live=assertive", () => {
            render(<Toast>Accessible</Toast>);
            const toast = screen.getByRole("alert");
            expect(toast).toHaveAttribute("aria-live", "assertive");
        });

        it("should have aria-atomic=true", () => {
            render(<Toast>Atomic</Toast>);
            const toast = screen.getByRole("alert");
            expect(toast).toHaveAttribute("aria-atomic", "true");
        });

        it("should have data-state=open when visible", () => {
            render(<Toast>State test</Toast>);
            const toast = screen.getByRole("alert");
            expect(toast).toHaveAttribute("data-state", "open");
        });
    });

    describe("Variants", () => {
        it("should apply default variant classes", () => {
            render(<Toast>Default</Toast>);
            const toast = screen.getByRole("alert");
            expect(toast).toHaveClass("bg-background");
        });

        it("should apply destructive variant classes", () => {
            render(<Toast variant="destructive">Error</Toast>);
            const toast = screen.getByRole("alert");
            expect(toast).toHaveClass("bg-destructive");
        });

        it("should apply success variant classes", () => {
            render(<Toast variant="success">Success</Toast>);
            const toast = screen.getByRole("alert");
            expect(toast).toHaveClass("bg-green-500");
        });

        it("should apply warning variant classes", () => {
            render(<Toast variant="warning">Warning</Toast>);
            const toast = screen.getByRole("alert");
            expect(toast).toHaveClass("bg-yellow-500");
        });

        it("should apply info variant classes", () => {
            render(<Toast variant="info">Info</Toast>);
            const toast = screen.getByRole("alert");
            expect(toast).toHaveClass("bg-blue-500");
        });
    });

    describe("Close button", () => {
        it("should render close button when onClose is provided", () => {
            render(<Toast onClose={() => { }}>With close</Toast>);
            const closeButton = screen.getByRole("button", { name: /close/i });
            expect(closeButton).toBeInTheDocument();
        });

        it("should not render close button when onClose is not provided", () => {
            render(<Toast>Without close</Toast>);
            expect(screen.queryByRole("button")).not.toBeInTheDocument();
        });

        it("should call onClose when close button is clicked", async () => {
            vi.useRealTimers();
            const user = userEvent.setup();
            const handleClose = vi.fn();
            render(<Toast onClose={handleClose} duration={0}>Closeable</Toast>);

            await user.click(screen.getByRole("button", { name: /close/i }));

            expect(handleClose).toHaveBeenCalledTimes(1);
            vi.useFakeTimers();
        });
    });

    describe("Auto-dismiss", () => {
        it("should auto-dismiss after default duration (5000ms)", () => {
            const handleClose = vi.fn();
            render(<Toast onClose={handleClose}>Auto dismiss</Toast>);

            expect(handleClose).not.toHaveBeenCalled();

            act(() => {
                vi.advanceTimersByTime(5000);
            });

            expect(handleClose).toHaveBeenCalledTimes(1);
        });

        it("should auto-dismiss after custom duration", () => {
            const handleClose = vi.fn();
            render(<Toast onClose={handleClose} duration={2000}>Custom duration</Toast>);

            act(() => {
                vi.advanceTimersByTime(1999);
            });
            expect(handleClose).not.toHaveBeenCalled();

            act(() => {
                vi.advanceTimersByTime(1);
            });
            expect(handleClose).toHaveBeenCalledTimes(1);
        });

        it("should not auto-dismiss when duration is 0", () => {
            const handleClose = vi.fn();
            render(<Toast onClose={handleClose} duration={0}>No auto dismiss</Toast>);

            act(() => {
                vi.advanceTimersByTime(10000);
            });

            expect(handleClose).not.toHaveBeenCalled();
        });

        it("should not auto-dismiss when closed", () => {
            const handleClose = vi.fn();
            render(<Toast open={false} onClose={handleClose}>Closed</Toast>);

            act(() => {
                vi.advanceTimersByTime(5000);
            });

            expect(handleClose).not.toHaveBeenCalled();
        });
    });

    describe("Custom className", () => {
        it("should merge custom className", () => {
            render(<Toast className="custom-class">Custom</Toast>);
            const toast = screen.getByRole("alert");
            expect(toast).toHaveClass("custom-class");
            expect(toast).toHaveClass("rounded-md"); // base class
        });
    });
});

describe("ToastTitle", () => {
    it("should render title text", () => {
        render(<ToastTitle>Toast Title</ToastTitle>);
        expect(screen.getByText("Toast Title")).toBeInTheDocument();
    });

    it("should have correct display name", () => {
        expect(ToastTitle.displayName).toBe("ToastTitle");
    });

    it("should have font-semibold class", () => {
        render(<ToastTitle>Styled</ToastTitle>);
        expect(screen.getByText("Styled")).toHaveClass("font-semibold");
    });
});

describe("ToastDescription", () => {
    it("should render description text", () => {
        render(<ToastDescription>Toast description</ToastDescription>);
        expect(screen.getByText("Toast description")).toBeInTheDocument();
    });

    it("should have correct display name", () => {
        expect(ToastDescription.displayName).toBe("ToastDescription");
    });

    it("should have text-sm and opacity-90 classes", () => {
        render(<ToastDescription>Styled</ToastDescription>);
        const description = screen.getByText("Styled");
        expect(description).toHaveClass("text-sm", "opacity-90");
    });
});

describe("ToastAction", () => {
    it("should render action button", () => {
        render(<ToastAction>Undo</ToastAction>);
        const button = screen.getByRole("button", { name: "Undo" });
        expect(button).toBeInTheDocument();
    });

    it("should have correct display name", () => {
        expect(ToastAction.displayName).toBe("ToastAction");
    });

    it("should be clickable", async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();
        render(<ToastAction onClick={handleClick}>Click me</ToastAction>);

        await user.click(screen.getByRole("button"));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});

describe("ToastViewport", () => {
    it("should render container", () => {
        render(<ToastViewport data-testid="viewport" />);
        expect(screen.getByTestId("viewport")).toBeInTheDocument();
    });

    it("should have correct display name", () => {
        expect(ToastViewport.displayName).toBe("ToastViewport");
    });

    it("should have fixed positioning", () => {
        render(<ToastViewport data-testid="viewport" />);
        expect(screen.getByTestId("viewport")).toHaveClass("fixed");
    });

    it("should have high z-index", () => {
        render(<ToastViewport data-testid="viewport" />);
        expect(screen.getByTestId("viewport")).toHaveClass("z-[100]");
    });
});

describe("Toast composition", () => {
    it("should render complete toast with title, description and action", () => {
        vi.useRealTimers();
        render(
            <Toast>
                <ToastTitle>Success!</ToastTitle>
                <ToastDescription>Your changes have been saved.</ToastDescription>
                <ToastAction>Undo</ToastAction>
            </Toast>
        );

        expect(screen.getByRole("alert")).toBeInTheDocument();
        expect(screen.getByText("Success!")).toBeInTheDocument();
        expect(screen.getByText("Your changes have been saved.")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument();
    });
});
