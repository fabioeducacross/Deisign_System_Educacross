import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "./DropdownMenu";

describe("DropdownMenu", () => {
    describe("Rendering", () => {
        it("renders the trigger", () => {
            render(
                <DropdownMenu>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            expect(screen.getByText("Open")).toBeInTheDocument();
        });

        it("menu is hidden by default", () => {
            render(
                <DropdownMenu>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
        });

        it("renders with defaultOpen=true", () => {
            render(
                <DropdownMenu defaultOpen>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            expect(screen.getByText("Item 1")).toBeInTheDocument();
        });
    });

    describe("Interaction", () => {
        it("opens menu on trigger click", async () => {
            const user = userEvent.setup();

            render(
                <DropdownMenu>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            await user.click(screen.getByText("Open"));

            expect(screen.getByText("Item 1")).toBeInTheDocument();
        });

        it("closes menu on trigger click when open", async () => {
            const user = userEvent.setup();

            render(
                <DropdownMenu>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            const trigger = screen.getByText("Open");
            await user.click(trigger);
            expect(screen.getByText("Item 1")).toBeInTheDocument();

            await user.click(trigger);
            expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
        });

        it("closes menu on Escape key", async () => {
            const user = userEvent.setup();

            render(
                <DropdownMenu>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            await user.click(screen.getByText("Open"));
            expect(screen.getByText("Item 1")).toBeInTheDocument();

            await user.keyboard("{Escape}");

            await waitFor(() => {
                expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
            });
        });
    });

    describe("Controlled Mode", () => {
        it("respects controlled open prop", () => {
            const { rerender } = render(
                <DropdownMenu open={false}>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            expect(screen.queryByText("Item 1")).not.toBeInTheDocument();

            rerender(
                <DropdownMenu open={true}>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            expect(screen.getByText("Item 1")).toBeInTheDocument();
        });

        it("calls onOpenChange callback", async () => {
            const user = userEvent.setup();
            const onOpenChange = vi.fn();

            render(
                <DropdownMenu onOpenChange={onOpenChange}>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            await user.click(screen.getByText("Open"));

            expect(onOpenChange).toHaveBeenCalledWith(true);
        });
    });

    describe("Accessibility", () => {
        it("trigger has aria-expanded attribute", async () => {
            const user = userEvent.setup();

            render(
                <DropdownMenu>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            const trigger = screen.getByText("Open");
            expect(trigger).toHaveAttribute("aria-expanded", "false");

            await user.click(trigger);
            expect(trigger).toHaveAttribute("aria-expanded", "true");
        });

        it("trigger has aria-haspopup=menu", () => {
            render(
                <DropdownMenu>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            expect(screen.getByText("Open")).toHaveAttribute(
                "aria-haspopup",
                "menu"
            );
        });

        it("menu content has role=menu", () => {
            render(
                <DropdownMenu open>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            expect(screen.getByRole("menu")).toBeInTheDocument();
        });

        it("menu items have role=menuitem", () => {
            render(
                <DropdownMenu open>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                        <DropdownMenuItem>Item 2</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            const items = screen.getAllByRole("menuitem");
            expect(items).toHaveLength(2);
        });
    });

    describe("Menu Components", () => {
        it("renders DropdownMenuLabel", () => {
            render(
                <DropdownMenu open>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            expect(screen.getByText("My Account")).toBeInTheDocument();
        });

        it("renders DropdownMenuSeparator", () => {
            render(
                <DropdownMenu open>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                        <DropdownMenuSeparator data-testid="separator" />
                        <DropdownMenuItem>Item 2</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            expect(screen.getByTestId("separator")).toBeInTheDocument();
            expect(screen.getByTestId("separator")).toHaveAttribute(
                "role",
                "separator"
            );
        });
    });

    describe("Side Variants", () => {
        it("renders with side=bottom by default", () => {
            render(
                <DropdownMenu open>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            const content = screen.getByRole("menu");
            expect(content).toHaveAttribute("data-side", "bottom");
        });

        it("renders with side=top", () => {
            render(
                <DropdownMenu open>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent side="top">
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            const content = screen.getByRole("menu");
            expect(content).toHaveAttribute("data-side", "top");
        });
    });

    describe("Custom className", () => {
        it("applies custom className to trigger", () => {
            render(
                <DropdownMenu>
                    <DropdownMenuTrigger className="custom-trigger">
                        Open
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            expect(screen.getByText("Open")).toHaveClass("custom-trigger");
        });

        it("applies custom className to content", () => {
            render(
                <DropdownMenu open>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent className="custom-content">
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            expect(screen.getByRole("menu")).toHaveClass("custom-content");
        });

        it("applies custom className to menu item", () => {
            render(
                <DropdownMenu open>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="custom-item">
                            Item 1
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            expect(screen.getByRole("menuitem")).toHaveClass("custom-item");
        });
    });

    describe("asChild", () => {
        it("renders trigger as child element", async () => {
            const user = userEvent.setup();

            render(
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button type="button">Custom button</button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            const button = screen.getByRole("button", { name: "Custom button" });
            expect(button).toBeInTheDocument();

            await user.click(button);
            expect(screen.getByText("Item 1")).toBeInTheDocument();
        });
    });

    describe("Disabled Items", () => {
        it("disabled item cannot be clicked", async () => {
            const user = userEvent.setup();
            const onClick = vi.fn();

            render(
                <DropdownMenu open>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem disabled onClick={onClick}>
                            Disabled Item
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            await user.click(screen.getByText("Disabled Item"));

            expect(onClick).not.toHaveBeenCalled();
        });
    });
});
