import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationButton,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "./Pagination";

describe("Pagination", () => {
    describe("Rendering", () => {
        it("should render pagination container", () => {
            render(
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            );

            expect(screen.getByRole("navigation")).toBeInTheDocument();
            expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "pagination");
        });

        it("should render pagination links", () => {
            render(
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            );

            expect(screen.getByText("1")).toBeInTheDocument();
            expect(screen.getByText("2")).toBeInTheDocument();
            expect(screen.getByText("3")).toBeInTheDocument();
        });

        it("should have correct display names", () => {
            expect(Pagination.displayName).toBe("Pagination");
            expect(PaginationContent.displayName).toBe("PaginationContent");
            expect(PaginationItem.displayName).toBe("PaginationItem");
            expect(PaginationLink.displayName).toBe("PaginationLink");
            expect(PaginationButton.displayName).toBe("PaginationButton");
            expect(PaginationPrevious.displayName).toBe("PaginationPrevious");
            expect(PaginationNext.displayName).toBe("PaginationNext");
            expect(PaginationEllipsis.displayName).toBe("PaginationEllipsis");
        });
    });

    describe("Navigation Links", () => {
        it("should render previous link with correct label", () => {
            render(
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            );

            expect(screen.getByText("Previous")).toBeInTheDocument();
            expect(screen.getByLabelText("Go to previous page")).toBeInTheDocument();
        });

        it("should render next link with correct label", () => {
            render(
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            );

            expect(screen.getByText("Next")).toBeInTheDocument();
            expect(screen.getByLabelText("Go to next page")).toBeInTheDocument();
        });
    });

    describe("Active State", () => {
        it("should mark active page with aria-current", () => {
            render(
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            );

            const activeLink = screen.getByText("1").closest("a");
            expect(activeLink).toHaveAttribute("aria-current", "page");

            const inactiveLink = screen.getByText("2").closest("a");
            expect(inactiveLink).not.toHaveAttribute("aria-current");
        });

        it("should apply active styles", () => {
            render(
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>1</PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            );

            const activeLink = screen.getByText("1").closest("a");
            expect(activeLink).toHaveClass("bg-primary");
        });
    });

    describe("Ellipsis", () => {
        it("should render ellipsis", () => {
            render(
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">10</PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            );

            expect(screen.getByText("More pages")).toBeInTheDocument();
        });
    });

    describe("Button Variant", () => {
        it("should render pagination button", () => {
            render(
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationButton>1</PaginationButton>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            );

            expect(screen.getByRole("button")).toBeInTheDocument();
            expect(screen.getByRole("button")).toHaveAttribute("type", "button");
        });

        it("should support active state on button", () => {
            render(
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationButton isActive>1</PaginationButton>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            );

            const button = screen.getByRole("button");
            expect(button).toHaveAttribute("aria-current", "page");
            expect(button).toHaveClass("bg-primary");
        });
    });

    describe("Variants", () => {
        it("should apply default variant classes", () => {
            render(
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationLink href="#" data-testid="pagination-link">1</PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            );

            expect(screen.getByTestId("pagination-link")).toHaveClass("bg-background");
        });

        it("should apply outline variant classes", () => {
            render(
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationLink href="#" variant="outline" data-testid="pagination-link">
                                1
                            </PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            );

            expect(screen.getByTestId("pagination-link")).toHaveClass("border");
        });

        it("should apply ghost variant classes", () => {
            render(
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationLink href="#" variant="ghost" data-testid="pagination-link">
                                1
                            </PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            );

            expect(screen.getByTestId("pagination-link")).toHaveClass("hover:bg-accent");
        });
    });

    describe("Sizes", () => {
        it("should apply default size classes", () => {
            render(
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationLink href="#" size="default" data-testid="pagination-link">
                                1
                            </PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            );

            expect(screen.getByTestId("pagination-link")).toHaveClass("h-10");
        });

        it("should apply sm size classes", () => {
            render(
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationLink href="#" size="sm" data-testid="pagination-link">
                                1
                            </PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            );

            expect(screen.getByTestId("pagination-link")).toHaveClass("h-9");
        });
    });

    describe("Custom className", () => {
        it("should merge custom className with default classes", () => {
            render(
                <Pagination className="custom-pagination" data-testid="pagination">
                    <PaginationContent className="custom-content" data-testid="pagination-content">
                        <PaginationItem className="custom-item" data-testid="pagination-item">
                            <PaginationLink href="#" className="custom-link">1</PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            );

            expect(screen.getByTestId("pagination")).toHaveClass("custom-pagination");
            expect(screen.getByTestId("pagination-content")).toHaveClass("custom-content");
            expect(screen.getByTestId("pagination-item")).toHaveClass("custom-item");
        });
    });

    describe("Full Example", () => {
        it("should render a complete pagination component", () => {
            render(
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">10</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            );

            expect(screen.getByRole("navigation")).toBeInTheDocument();
            expect(screen.getByText("Previous")).toBeInTheDocument();
            expect(screen.getByText("Next")).toBeInTheDocument();
            expect(screen.getByText("1")).toBeInTheDocument();
            expect(screen.getByText("2")).toBeInTheDocument();
            expect(screen.getByText("3")).toBeInTheDocument();
            expect(screen.getByText("10")).toBeInTheDocument();
            expect(screen.getByText("More pages")).toBeInTheDocument();
        });
    });
});
