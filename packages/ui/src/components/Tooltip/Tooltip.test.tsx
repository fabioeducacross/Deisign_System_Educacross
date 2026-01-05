import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
} from "./Tooltip";

describe("Tooltip", () => {
    describe("Rendering", () => {
        it("renders the trigger", () => {
            render(
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>Hover me</TooltipTrigger>
                        <TooltipContent>Tooltip text</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );

            expect(screen.getByText("Hover me")).toBeInTheDocument();
        });

        it("tooltip content is hidden by default", () => {
            render(
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>Hover me</TooltipTrigger>
                        <TooltipContent>Tooltip text</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );

            expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
        });

        it("renders with defaultOpen=true", () => {
            render(
                <TooltipProvider>
                    <Tooltip defaultOpen>
                        <TooltipTrigger>Hover me</TooltipTrigger>
                        <TooltipContent>Tooltip text</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );

            expect(screen.getByText("Tooltip text")).toBeInTheDocument();
        });
    });

    describe("Controlled Mode", () => {
        it("respects controlled open prop", () => {
            const { rerender } = render(
                <TooltipProvider>
                    <Tooltip open={false}>
                        <TooltipTrigger>Hover me</TooltipTrigger>
                        <TooltipContent>Tooltip text</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );

            expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();

            rerender(
                <TooltipProvider>
                    <Tooltip open={true}>
                        <TooltipTrigger>Hover me</TooltipTrigger>
                        <TooltipContent>Tooltip text</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );

            expect(screen.getByText("Tooltip text")).toBeInTheDocument();
        });
    });

    describe("Side Variants", () => {
        it("renders with side=top by default", () => {
            render(
                <TooltipProvider>
                    <Tooltip open>
                        <TooltipTrigger>Hover me</TooltipTrigger>
                        <TooltipContent>Tooltip text</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );

            const content = screen.getByText("Tooltip text");
            expect(content).toHaveAttribute("data-side", "top");
        });

        it("renders with side=bottom", () => {
            render(
                <TooltipProvider>
                    <Tooltip open side="bottom">
                        <TooltipTrigger>Hover me</TooltipTrigger>
                        <TooltipContent>Tooltip text</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );

            const content = screen.getByText("Tooltip text");
            expect(content).toHaveAttribute("data-side", "bottom");
        });

        it("renders with side=left", () => {
            render(
                <TooltipProvider>
                    <Tooltip open side="left">
                        <TooltipTrigger>Hover me</TooltipTrigger>
                        <TooltipContent>Tooltip text</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );

            const content = screen.getByText("Tooltip text");
            expect(content).toHaveAttribute("data-side", "left");
        });

        it("renders with side=right", () => {
            render(
                <TooltipProvider>
                    <Tooltip open side="right">
                        <TooltipTrigger>Hover me</TooltipTrigger>
                        <TooltipContent>Tooltip text</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );

            const content = screen.getByText("Tooltip text");
            expect(content).toHaveAttribute("data-side", "right");
        });
    });

    describe("Accessibility", () => {
        it("tooltip content has role=tooltip", () => {
            render(
                <TooltipProvider>
                    <Tooltip open>
                        <TooltipTrigger>Hover me</TooltipTrigger>
                        <TooltipContent>Tooltip text</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );

            expect(screen.getByRole("tooltip")).toBeInTheDocument();
        });
    });

    describe("Custom className", () => {
        it("applies custom className to trigger", () => {
            render(
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="custom-trigger">
                            Hover me
                        </TooltipTrigger>
                        <TooltipContent>Tooltip text</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );

            expect(screen.getByText("Hover me")).toHaveClass("custom-trigger");
        });

        it("applies custom className to content", () => {
            render(
                <TooltipProvider>
                    <Tooltip open>
                        <TooltipTrigger>Hover me</TooltipTrigger>
                        <TooltipContent className="custom-content">
                            Tooltip text
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );

            expect(screen.getByText("Tooltip text")).toHaveClass("custom-content");
        });
    });

    describe("TooltipProvider", () => {
        it("renders children", () => {
            render(
                <TooltipProvider>
                    <div>Provider child</div>
                </TooltipProvider>
            );

            expect(screen.getByText("Provider child")).toBeInTheDocument();
        });
    });

    describe("asChild", () => {
        it("renders trigger as child element", () => {
            render(
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button type="button">Custom button</button>
                        </TooltipTrigger>
                        <TooltipContent>Tooltip text</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );

            expect(
                screen.getByRole("button", { name: "Custom button" })
            ).toBeInTheDocument();
        });
    });
});
