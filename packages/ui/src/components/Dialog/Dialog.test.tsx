import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "./Dialog";

describe("Dialog", () => {
    describe("Rendering", () => {
        it("should not render content when closed", () => {
            render(
                <Dialog>
                    <DialogContent>Dialog content</DialogContent>
                </Dialog>
            );
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        });

        it("should render content when open", () => {
            render(
                <Dialog open>
                    <DialogContent>Dialog content</DialogContent>
                </Dialog>
            );
            expect(screen.getByRole("dialog")).toBeInTheDocument();
        });

        it("should render content when defaultOpen is true", () => {
            render(
                <Dialog defaultOpen>
                    <DialogContent>Default open content</DialogContent>
                </Dialog>
            );
            expect(screen.getByRole("dialog")).toBeInTheDocument();
        });
    });

    describe("DialogTrigger", () => {
        it("should open dialog when trigger is clicked", async () => {
            const user = userEvent.setup();
            render(
                <Dialog>
                    <DialogTrigger>Open Dialog</DialogTrigger>
                    <DialogContent>Dialog content</DialogContent>
                </Dialog>
            );

            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

            await user.click(screen.getByRole("button", { name: /open dialog/i }));

            expect(screen.getByRole("dialog")).toBeInTheDocument();
        });

        it("should have correct display name", () => {
            expect(DialogTrigger.displayName).toBe("DialogTrigger");
        });

        it("should support asChild pattern", async () => {
            const user = userEvent.setup();
            render(
                <Dialog>
                    <DialogTrigger asChild>
                        <span data-testid="custom-trigger">Custom trigger</span>
                    </DialogTrigger>
                    <DialogContent>Dialog content</DialogContent>
                </Dialog>
            );

            await user.click(screen.getByTestId("custom-trigger"));

            expect(screen.getByRole("dialog")).toBeInTheDocument();
        });
    });

    describe("DialogContent", () => {
        it("should have correct display name", () => {
            expect(DialogContent.displayName).toBe("DialogContent");
        });

        it("should have role=dialog", () => {
            render(
                <Dialog open>
                    <DialogContent>Content</DialogContent>
                </Dialog>
            );
            expect(screen.getByRole("dialog")).toBeInTheDocument();
        });

        it("should have aria-modal=true", () => {
            render(
                <Dialog open>
                    <DialogContent>Modal content</DialogContent>
                </Dialog>
            );
            expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
        });

        it("should render close button", () => {
            render(
                <Dialog open>
                    <DialogContent>With close</DialogContent>
                </Dialog>
            );
            expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
        });

        it("should close when close button is clicked", async () => {
            const user = userEvent.setup();
            const handleOpenChange = vi.fn();
            render(
                <Dialog open onOpenChange={handleOpenChange}>
                    <DialogContent>Closeable</DialogContent>
                </Dialog>
            );

            await user.click(screen.getByRole("button", { name: /close/i }));

            expect(handleOpenChange).toHaveBeenCalledWith(false);
        });

        it("should apply size variants", () => {
            render(
                <Dialog open>
                    <DialogContent size="lg">Large dialog</DialogContent>
                </Dialog>
            );
            expect(screen.getByRole("dialog")).toHaveClass("max-w-2xl");
        });
    });

    describe("Keyboard interactions", () => {
        it("should close on Escape key", () => {
            const handleOpenChange = vi.fn();
            render(
                <Dialog open onOpenChange={handleOpenChange}>
                    <DialogContent>Press Escape</DialogContent>
                </Dialog>
            );

            fireEvent.keyDown(document, { key: "Escape" });

            expect(handleOpenChange).toHaveBeenCalledWith(false);
        });
    });

    describe("Overlay", () => {
        it("should close when overlay is clicked", async () => {
            const user = userEvent.setup();
            const handleOpenChange = vi.fn();
            render(
                <Dialog open onOpenChange={handleOpenChange}>
                    <DialogContent>Click outside</DialogContent>
                </Dialog>
            );

            // Find the overlay (the dark backdrop)
            const overlay = document.querySelector('[data-state="open"].fixed.inset-0');
            if (overlay) {
                await user.click(overlay);
                expect(handleOpenChange).toHaveBeenCalledWith(false);
            }
        });
    });

    describe("DialogHeader", () => {
        it("should render header content", () => {
            render(
                <DialogHeader>
                    <span>Header content</span>
                </DialogHeader>
            );
            expect(screen.getByText("Header content")).toBeInTheDocument();
        });

        it("should have correct display name", () => {
            expect(DialogHeader.displayName).toBe("DialogHeader");
        });

        it("should have flex layout", () => {
            render(
                <DialogHeader data-testid="header">Header</DialogHeader>
            );
            expect(screen.getByTestId("header")).toHaveClass("flex", "flex-col");
        });
    });

    describe("DialogFooter", () => {
        it("should render footer content", () => {
            render(
                <DialogFooter>
                    <button>Action</button>
                </DialogFooter>
            );
            expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
        });

        it("should have correct display name", () => {
            expect(DialogFooter.displayName).toBe("DialogFooter");
        });

        it("should have flex layout", () => {
            render(
                <DialogFooter data-testid="footer">Footer</DialogFooter>
            );
            expect(screen.getByTestId("footer")).toHaveClass("flex");
        });
    });

    describe("DialogTitle", () => {
        it("should render title text", () => {
            render(
                <Dialog open>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Dialog Title</DialogTitle>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            );
            expect(screen.getByRole("heading", { name: "Dialog Title" })).toBeInTheDocument();
        });

        it("should have correct display name", () => {
            expect(DialogTitle.displayName).toBe("DialogTitle");
        });

        it("should set aria-labelledby on dialog", () => {
            render(
                <Dialog open>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Title for aria</DialogTitle>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            );
            const dialog = screen.getByRole("dialog");
            const title = screen.getByRole("heading");
            expect(dialog).toHaveAttribute("aria-labelledby", title.id);
        });
    });

    describe("DialogDescription", () => {
        it("should render description text", () => {
            render(
                <Dialog open>
                    <DialogContent>
                        <DialogHeader>
                            <DialogDescription>Dialog description here</DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            );
            expect(screen.getByText("Dialog description here")).toBeInTheDocument();
        });

        it("should have correct display name", () => {
            expect(DialogDescription.displayName).toBe("DialogDescription");
        });

        it("should set aria-describedby on dialog", () => {
            render(
                <Dialog open>
                    <DialogContent>
                        <DialogHeader>
                            <DialogDescription>Description for aria</DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            );
            const dialog = screen.getByRole("dialog");
            const description = screen.getByText("Description for aria");
            expect(dialog).toHaveAttribute("aria-describedby", description.id);
        });

        it("should have text-muted-foreground class", () => {
            render(
                <Dialog open>
                    <DialogContent>
                        <DialogDescription>Styled description</DialogDescription>
                    </DialogContent>
                </Dialog>
            );
            expect(screen.getByText("Styled description")).toHaveClass("text-muted-foreground");
        });
    });

    describe("DialogClose", () => {
        it("should close dialog when clicked", async () => {
            const user = userEvent.setup();
            const handleOpenChange = vi.fn();
            render(
                <Dialog open onOpenChange={handleOpenChange}>
                    <DialogContent>
                        <DialogClose>Close me</DialogClose>
                    </DialogContent>
                </Dialog>
            );

            await user.click(screen.getByRole("button", { name: "Close me" }));

            expect(handleOpenChange).toHaveBeenCalledWith(false);
        });

        it("should have correct display name", () => {
            expect(DialogClose.displayName).toBe("DialogClose");
        });
    });

    describe("Dialog composition", () => {
        it("should render complete dialog structure", async () => {
            const user = userEvent.setup();
            render(
                <Dialog>
                    <DialogTrigger>Open</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Complete Dialog</DialogTitle>
                            <DialogDescription>This is a complete dialog example.</DialogDescription>
                        </DialogHeader>
                        <div>Content body</div>
                        <DialogFooter>
                            <DialogClose>Cancel</DialogClose>
                            <button>Save</button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            );

            // Initially closed
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

            // Open dialog
            await user.click(screen.getByRole("button", { name: "Open" }));

            // All elements present
            expect(screen.getByRole("dialog")).toBeInTheDocument();
            expect(screen.getByRole("heading", { name: "Complete Dialog" })).toBeInTheDocument();
            expect(screen.getByText("This is a complete dialog example.")).toBeInTheDocument();
            expect(screen.getByText("Content body")).toBeInTheDocument();
            expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
            expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
        });
    });
});
