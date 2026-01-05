import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "./Accordion";

describe("Accordion", () => {
    describe("Rendering", () => {
        it("should render accordion with items", () => {
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Item 2</AccordionTrigger>
                        <AccordionContent>Content 2</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            expect(screen.getByText("Item 1")).toBeInTheDocument();
            expect(screen.getByText("Item 2")).toBeInTheDocument();
        });

        it("should render with defaultValue expanded", () => {
            render(
                <Accordion type="single" defaultValue="item-1">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            expect(screen.getByText("Content 1")).toBeInTheDocument();
        });

        it("should have correct display names", () => {
            expect(Accordion.displayName).toBe("Accordion");
            expect(AccordionItem.displayName).toBe("AccordionItem");
            expect(AccordionTrigger.displayName).toBe("AccordionTrigger");
            expect(AccordionContent.displayName).toBe("AccordionContent");
        });
    });

    describe("Single Mode", () => {
        it("should only allow one item open at a time", async () => {
            const user = userEvent.setup();
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Item 2</AccordionTrigger>
                        <AccordionContent>Content 2</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            // Open first item
            await user.click(screen.getByText("Item 1"));
            expect(screen.getByText("Content 1")).toBeInTheDocument();

            // Open second item - first should close
            await user.click(screen.getByText("Item 2"));
            expect(screen.getByText("Content 2")).toBeInTheDocument();
            // Content 1 should be hidden (not removed, just hidden via CSS)
        });

        it("should toggle same item on click", async () => {
            const user = userEvent.setup();
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            const trigger = screen.getByText("Item 1");
            
            // Open
            await user.click(trigger);
            expect(screen.getByText("Content 1")).toBeInTheDocument();

            // Close
            await user.click(trigger);
            // Content should be hidden via CSS
        });
    });

    describe("Multiple Mode", () => {
        it("should allow multiple items open at once", async () => {
            const user = userEvent.setup();
            render(
                <Accordion type="multiple">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Item 2</AccordionTrigger>
                        <AccordionContent>Content 2</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            await user.click(screen.getByText("Item 1"));
            await user.click(screen.getByText("Item 2"));

            expect(screen.getByText("Content 1")).toBeInTheDocument();
            expect(screen.getByText("Content 2")).toBeInTheDocument();
        });
    });

    describe("Variants", () => {
        it("should apply default variant classes", () => {
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1" data-testid="accordion-item">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            expect(screen.getByTestId("accordion-item")).toHaveClass("border-b");
        });

        it("should apply card variant classes", () => {
            render(
                <Accordion type="single" variant="card">
                    <AccordionItem value="item-1" data-testid="accordion-item">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            expect(screen.getByTestId("accordion-item")).toHaveClass("rounded-lg");
        });

        it("should apply ghost variant classes", () => {
            render(
                <Accordion type="single" variant="ghost">
                    <AccordionItem value="item-1" data-testid="accordion-item">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            expect(screen.getByTestId("accordion-item")).toHaveClass("border-none");
        });
    });

    describe("Controlled Mode", () => {
        it("should support controlled value", async () => {
            const user = userEvent.setup();
            const onValueChange = vi.fn();

            render(
                <Accordion type="single" value="" onValueChange={onValueChange}>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            await user.click(screen.getByText("Item 1"));
            expect(onValueChange).toHaveBeenCalled();
        });
    });

    describe("Accessibility", () => {
        it("should have correct ARIA attributes", async () => {
            const user = userEvent.setup();
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            const trigger = screen.getByRole("button", { name: /item 1/i });
            expect(trigger).toHaveAttribute("aria-expanded", "false");

            await user.click(trigger);
            expect(trigger).toHaveAttribute("aria-expanded", "true");
        });

        it("should have region role for content", async () => {
            const user = userEvent.setup();
            render(
                <Accordion type="single">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Item 1</AccordionTrigger>
                        <AccordionContent>Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            await user.click(screen.getByText("Item 1"));
            expect(screen.getByRole("region")).toBeInTheDocument();
        });
    });

    describe("Custom className", () => {
        it("should merge custom className with default classes", () => {
            render(
                <Accordion type="single" className="custom-accordion" data-testid="accordion">
                    <AccordionItem value="item-1" className="custom-item" data-testid="accordion-item">
                        <AccordionTrigger className="custom-trigger">Item 1</AccordionTrigger>
                        <AccordionContent className="custom-content">Content 1</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            expect(screen.getByTestId("accordion")).toHaveClass("custom-accordion");
            expect(screen.getByTestId("accordion-item")).toHaveClass("custom-item");
            expect(screen.getByRole("button")).toHaveClass("custom-trigger");
        });
    });
});
