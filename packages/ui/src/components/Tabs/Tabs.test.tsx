import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

describe("Tabs", () => {
    describe("Rendering", () => {
        it("should render tabs with default props", () => {
            render(
                <Tabs defaultValue="tab1">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Content 1</TabsContent>
                    <TabsContent value="tab2">Content 2</TabsContent>
                </Tabs>
            );
            expect(screen.getByRole("tablist")).toBeInTheDocument();
            expect(screen.getAllByRole("tab")).toHaveLength(2);
        });

        it("should render active tab content by default", () => {
            render(
                <Tabs defaultValue="tab1">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Content 1</TabsContent>
                    <TabsContent value="tab2">Content 2</TabsContent>
                </Tabs>
            );
            expect(screen.getByText("Content 1")).toBeInTheDocument();
        });

        it("should have correct display names", () => {
            expect(Tabs.displayName).toBe("Tabs");
            expect(TabsList.displayName).toBe("TabsList");
            expect(TabsTrigger.displayName).toBe("TabsTrigger");
            expect(TabsContent.displayName).toBe("TabsContent");
        });
    });

    describe("Variants", () => {
        it("should apply default variant classes to list", () => {
            render(
                <Tabs defaultValue="tab1">
                    <TabsList data-testid="tabs-list">
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Content</TabsContent>
                </Tabs>
            );
            expect(screen.getByTestId("tabs-list")).toHaveClass("bg-muted");
        });

        it("should apply outline variant classes", () => {
            render(
                <Tabs defaultValue="tab1">
                    <TabsList variant="outline" data-testid="tabs-list">
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Content</TabsContent>
                </Tabs>
            );
            expect(screen.getByTestId("tabs-list")).toHaveClass("border");
        });

        it("should apply pills variant classes", () => {
            render(
                <Tabs defaultValue="tab1">
                    <TabsList variant="pills" data-testid="tabs-list">
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Content</TabsContent>
                </Tabs>
            );
            expect(screen.getByTestId("tabs-list")).toHaveClass("gap-1");
        });
    });

    describe("Interaction", () => {
        it("should switch tabs on click", async () => {
            const user = userEvent.setup();
            render(
                <Tabs defaultValue="tab1">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Content 1</TabsContent>
                    <TabsContent value="tab2">Content 2</TabsContent>
                </Tabs>
            );

            expect(screen.getByText("Content 1")).toBeInTheDocument();
            
            await user.click(screen.getByRole("tab", { name: /tab 2/i }));
            
            expect(screen.getByText("Content 2")).toBeInTheDocument();
        });

        it("should call onValueChange when tab changes", async () => {
            const user = userEvent.setup();
            const onValueChange = vi.fn();
            
            render(
                <Tabs defaultValue="tab1" onValueChange={onValueChange}>
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Content 1</TabsContent>
                    <TabsContent value="tab2">Content 2</TabsContent>
                </Tabs>
            );

            await user.click(screen.getByRole("tab", { name: /tab 2/i }));
            
            expect(onValueChange).toHaveBeenCalledWith("tab2");
        });

        it("should support controlled value", async () => {
            const user = userEvent.setup();
            const onValueChange = vi.fn();
            
            const { rerender } = render(
                <Tabs value="tab1" onValueChange={onValueChange}>
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Content 1</TabsContent>
                    <TabsContent value="tab2">Content 2</TabsContent>
                </Tabs>
            );

            await user.click(screen.getByRole("tab", { name: /tab 2/i }));
            expect(onValueChange).toHaveBeenCalledWith("tab2");

            // Controlled: content should not change until value prop changes
            rerender(
                <Tabs value="tab2" onValueChange={onValueChange}>
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Content 1</TabsContent>
                    <TabsContent value="tab2">Content 2</TabsContent>
                </Tabs>
            );

            expect(screen.getByText("Content 2")).toBeInTheDocument();
        });
    });

    describe("Accessibility", () => {
        it("should have correct ARIA attributes", () => {
            render(
                <Tabs defaultValue="tab1">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Content 1</TabsContent>
                    <TabsContent value="tab2">Content 2</TabsContent>
                </Tabs>
            );

            const tabs = screen.getAllByRole("tab");
            expect(tabs[0]).toHaveAttribute("aria-selected", "true");
            expect(tabs[1]).toHaveAttribute("aria-selected", "false");
        });

        it("should support disabled tabs", () => {
            render(
                <Tabs defaultValue="tab1">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2" disabled>Tab 2</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Content 1</TabsContent>
                    <TabsContent value="tab2">Content 2</TabsContent>
                </Tabs>
            );

            const disabledTab = screen.getByRole("tab", { name: /tab 2/i });
            expect(disabledTab).toBeDisabled();
        });
    });

    describe("Custom className", () => {
        it("should merge custom className with default classes", () => {
            render(
                <Tabs defaultValue="tab1" className="custom-tabs">
                    <TabsList className="custom-list" data-testid="tabs-list">
                        <TabsTrigger value="tab1" className="custom-trigger">Tab 1</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" className="custom-content" data-testid="tabs-content">
                        Content
                    </TabsContent>
                </Tabs>
            );

            expect(screen.getByTestId("tabs-list")).toHaveClass("custom-list");
            expect(screen.getByRole("tab")).toHaveClass("custom-trigger");
            expect(screen.getByTestId("tabs-content")).toHaveClass("custom-content");
        });
    });
});
