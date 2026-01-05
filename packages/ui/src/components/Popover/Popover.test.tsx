import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverClose,
} from "./Popover";

describe("Popover", () => {
    describe("Rendering", () => {
        it("renders the trigger", () => {
            render(
                <Popover>
                    <PopoverTrigger>Open</PopoverTrigger>
                    <PopoverContent>Content</PopoverContent>
                </Popover>
            );

            expect(screen.getByText("Open")).toBeInTheDocument();
        });

        it("content is hidden by default", () => {
            render(
                <Popover>
                    <PopoverTrigger>Open</PopoverTrigger>
                    <PopoverContent>Content</PopoverContent>
                </Popover>
            );

            expect(screen.queryByText("Content")).not.toBeInTheDocument();
        });

        it("renders with defaultOpen=true", () => {
            render(
                <Popover defaultOpen>
                    <PopoverTrigger>Open</PopoverTrigger>
                    <PopoverContent>Content</PopoverContent>
                </Popover>
            );

            expect(screen.getByText("Content")).toBeInTheDocument();
        });
    });

    describe("Interaction", () => {
        it("opens popover on trigger click", async () => {
            const user = userEvent.setup();

            render(
                <Popover>
                    <PopoverTrigger>Open</PopoverTrigger>
                    <PopoverContent>Content</PopoverContent>
                </Popover>
            );

            await user.click(screen.getByText("Open"));

            expect(screen.getByText("Content")).toBeInTheDocument();
        });

        it("closes popover on trigger click when open", async () => {
            const user = userEvent.setup();

            render(
                <Popover>
                    <PopoverTrigger>Open</PopoverTrigger>
                    <PopoverContent>Content</PopoverContent>
                </Popover>
            );

            const trigger = screen.getByText("Open");
            await user.click(trigger);
            expect(screen.getByText("Content")).toBeInTheDocument();

            await user.click(trigger);
            expect(screen.queryByText("Content")).not.toBeInTheDocument();
        });

        it("closes popover on Escape key", async () => {
            const user = userEvent.setup();

            render(
                <Popover>
                    <PopoverTrigger>Open</PopoverTrigger>
                    <PopoverContent>Content</PopoverContent>
                </Popover>
            );

            await user.click(screen.getByText("Open"));
            expect(screen.getByText("Content")).toBeInTheDocument();

            await user.keyboard("{Escape}");

            await waitFor(() => {
                expect(screen.queryByText("Content")).not.toBeInTheDocument();
            });
        });

        it("closes popover when clicking PopoverClose", async () => {
            const user = userEvent.setup();

            render(
                <Popover>
                    <PopoverTrigger>Open</PopoverTrigger>
                    <PopoverContent>
                        <p>Content</p>
                        <PopoverClose>Close</PopoverClose>
                    </PopoverContent>
                </Popover>
            );

            await user.click(screen.getByText("Open"));
            expect(screen.getByText("Content")).toBeInTheDocument();

            await user.click(screen.getByText("Close"));

            await waitFor(() => {
                expect(screen.queryByText("Content")).not.toBeInTheDocument();
            });
        });
    });

    describe("Controlled Mode", () => {
        it("respects controlled open prop", () => {
            const { rerender } = render(
                <Popover open={false}>
                    <PopoverTrigger>Open</PopoverTrigger>
                    <PopoverContent>Content</PopoverContent>
                </Popover>
            );

            expect(screen.queryByText("Content")).not.toBeInTheDocument();

            rerender(
                <Popover open={true}>
                    <PopoverTrigger>Open</PopoverTrigger>
                    <PopoverContent>Content</PopoverContent>
                </Popover>
            );

            expect(screen.getByText("Content")).toBeInTheDocument();
        });

        it("calls onOpenChange callback", async () => {
            const user = userEvent.setup();
            const onOpenChange = vi.fn();

            render(
                <Popover onOpenChange={onOpenChange}>
                    <PopoverTrigger>Open</PopoverTrigger>
                    <PopoverContent>Content</PopoverContent>
                </Popover>
            );

            await user.click(screen.getByText("Open"));

            expect(onOpenChange).toHaveBeenCalledWith(true);
        });
    });

    describe("Accessibility", () => {
        it("trigger has aria-expanded attribute", async () => {
            const user = userEvent.setup();

            render(
                <Popover>
                    <PopoverTrigger>Open</PopoverTrigger>
                    <PopoverContent>Content</PopoverContent>
                </Popover>
            );

            const trigger = screen.getByText("Open");
            expect(trigger).toHaveAttribute("aria-expanded", "false");

            await user.click(trigger);
            expect(trigger).toHaveAttribute("aria-expanded", "true");
        });

        it("trigger has aria-haspopup attribute", () => {
            render(
                <Popover>
                    <PopoverTrigger>Open</PopoverTrigger>
                    <PopoverContent>Content</PopoverContent>
                </Popover>
            );

            expect(screen.getByText("Open")).toHaveAttribute(
                "aria-haspopup",
                "dialog"
            );
        });

        it("trigger has type=button", () => {
            render(
                <Popover>
                    <PopoverTrigger>Open</PopoverTrigger>
                    <PopoverContent>Content</PopoverContent>
                </Popover>
            );

            expect(screen.getByText("Open")).toHaveAttribute("type", "button");
        });
    });

    describe("Custom className", () => {
        it("applies custom className to trigger", () => {
            render(
                <Popover>
                    <PopoverTrigger className="custom-trigger">Open</PopoverTrigger>
                    <PopoverContent>Content</PopoverContent>
                </Popover>
            );

            expect(screen.getByText("Open")).toHaveClass("custom-trigger");
        });

        it("applies custom className to content container", () => {
            render(
                <Popover open>
                    <PopoverTrigger>Open</PopoverTrigger>
                    <PopoverContent className="custom-content">
                        Content
                    </PopoverContent>
                </Popover>
            );

            // The PopoverContent renders the className on the outer div
            const content = screen.getByText("Content").closest(".custom-content");
            expect(content).toBeInTheDocument();
        });
    });

    describe("asChild", () => {
        it("renders trigger as child element", async () => {
            const user = userEvent.setup();

            render(
                <Popover>
                    <PopoverTrigger asChild>
                        <button type="button">Custom button</button>
                    </PopoverTrigger>
                    <PopoverContent>Content</PopoverContent>
                </Popover>
            );

            const button = screen.getByRole("button", { name: "Custom button" });
            expect(button).toBeInTheDocument();

            await user.click(button);
            expect(screen.getByText("Content")).toBeInTheDocument();
        });
    });
});
