import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarImage, AvatarFallback } from "./Avatar";

describe("Avatar", () => {
    describe("Rendering", () => {
        it("should render avatar container", () => {
            render(
                <Avatar data-testid="avatar">
                    <AvatarFallback>AB</AvatarFallback>
                </Avatar>
            );

            expect(screen.getByTestId("avatar")).toBeInTheDocument();
        });

        it("should render fallback when no image", () => {
            render(
                <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
            );

            expect(screen.getByText("JD")).toBeInTheDocument();
        });

        it("should have correct display names", () => {
            expect(Avatar.displayName).toBe("Avatar");
            expect(AvatarImage.displayName).toBe("AvatarImage");
            expect(AvatarFallback.displayName).toBe("AvatarFallback");
        });
    });

    describe("Sizes", () => {
        it("should apply default size classes", () => {
            render(
                <Avatar data-testid="avatar">
                    <AvatarFallback>AB</AvatarFallback>
                </Avatar>
            );

            expect(screen.getByTestId("avatar")).toHaveClass("h-10", "w-10");
        });

        it("should apply sm size classes", () => {
            render(
                <Avatar size="sm" data-testid="avatar">
                    <AvatarFallback>AB</AvatarFallback>
                </Avatar>
            );

            expect(screen.getByTestId("avatar")).toHaveClass("h-8", "w-8");
        });

        it("should apply lg size classes", () => {
            render(
                <Avatar size="lg" data-testid="avatar">
                    <AvatarFallback>AB</AvatarFallback>
                </Avatar>
            );

            expect(screen.getByTestId("avatar")).toHaveClass("h-12", "w-12");
        });

        it("should apply xl size classes", () => {
            render(
                <Avatar size="xl" data-testid="avatar">
                    <AvatarFallback>AB</AvatarFallback>
                </Avatar>
            );

            expect(screen.getByTestId("avatar")).toHaveClass("h-16", "w-16");
        });
    });

    describe("Image", () => {
        it("should render image with correct attributes", () => {
            render(
                <Avatar>
                    <AvatarImage src="https://example.com/avatar.jpg" alt="User avatar" />
                    <AvatarFallback>AB</AvatarFallback>
                </Avatar>
            );

            const image = screen.getByRole("img");
            expect(image).toHaveAttribute("src", "https://example.com/avatar.jpg");
            expect(image).toHaveAttribute("alt", "User avatar");
        });

        it("should apply correct image classes", () => {
            render(
                <Avatar>
                    <AvatarImage 
                        src="https://example.com/avatar.jpg" 
                        alt="User avatar"
                        data-testid="avatar-image" 
                    />
                    <AvatarFallback>AB</AvatarFallback>
                </Avatar>
            );

            expect(screen.getByTestId("avatar-image")).toHaveClass("aspect-square", "object-cover");
        });
    });

    describe("Fallback", () => {
        it("should render fallback text", () => {
            render(
                <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
            );

            expect(screen.getByText("JD")).toBeInTheDocument();
        });

        it("should apply fallback classes", () => {
            render(
                <Avatar>
                    <AvatarFallback data-testid="fallback">JD</AvatarFallback>
                </Avatar>
            );

            expect(screen.getByTestId("fallback")).toHaveClass("bg-muted", "rounded-full");
        });

        it("should render icon as fallback", () => {
            render(
                <Avatar>
                    <AvatarFallback>
                        <svg data-testid="icon" />
                    </AvatarFallback>
                </Avatar>
            );

            expect(screen.getByTestId("icon")).toBeInTheDocument();
        });
    });

    describe("Styling", () => {
        it("should have rounded-full class by default", () => {
            render(
                <Avatar data-testid="avatar">
                    <AvatarFallback>AB</AvatarFallback>
                </Avatar>
            );

            expect(screen.getByTestId("avatar")).toHaveClass("rounded-full");
        });

        it("should have relative positioning and overflow hidden", () => {
            render(
                <Avatar data-testid="avatar">
                    <AvatarFallback>AB</AvatarFallback>
                </Avatar>
            );

            expect(screen.getByTestId("avatar")).toHaveClass("relative", "overflow-hidden");
        });
    });

    describe("Custom className", () => {
        it("should merge custom className with default classes", () => {
            render(
                <Avatar className="custom-avatar" data-testid="avatar">
                    <AvatarImage 
                        src="https://example.com/avatar.jpg" 
                        alt="User" 
                        className="custom-image"
                        data-testid="avatar-image"
                    />
                    <AvatarFallback className="custom-fallback" data-testid="fallback">
                        AB
                    </AvatarFallback>
                </Avatar>
            );

            expect(screen.getByTestId("avatar")).toHaveClass("custom-avatar");
            expect(screen.getByTestId("avatar-image")).toHaveClass("custom-image");
            expect(screen.getByTestId("fallback")).toHaveClass("custom-fallback");
        });
    });

    describe("Composition", () => {
        it("should work with both image and fallback", () => {
            render(
                <Avatar>
                    <AvatarImage src="https://example.com/avatar.jpg" alt="User avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
            );

            // Image should be rendered when src is valid
            expect(screen.getByRole("img")).toBeInTheDocument();
        });

        it("should render fallback when image is not provided", () => {
            render(
                <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
            );

            expect(screen.getByText("JD")).toBeInTheDocument();
        });
    });
});
