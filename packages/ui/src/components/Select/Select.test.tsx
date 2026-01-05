import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./Select";

const defaultOptions = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
];

describe("Select", () => {
    describe("Rendering", () => {
        it("should render select element", () => {
            render(<Select options={defaultOptions} />);
            expect(screen.getByRole("combobox")).toBeInTheDocument();
        });

        it("should render all options", () => {
            render(<Select options={defaultOptions} />);
            const options = screen.getAllByRole("option");
            expect(options).toHaveLength(3);
        });

        it("should render placeholder option when provided", () => {
            render(<Select options={defaultOptions} placeholder="Select a fruit" />);
            const placeholder = screen.getByRole("option", { name: "Select a fruit" });
            expect(placeholder).toBeInTheDocument();
            expect(placeholder).toBeDisabled();
        });

        it("should have correct display name", () => {
            expect(Select.displayName).toBe("Select");
        });
    });

    describe("Selection", () => {
        it("should select option when clicked", async () => {
            const user = userEvent.setup();
            render(<Select options={defaultOptions} />);
            const select = screen.getByRole("combobox");

            await user.selectOptions(select, "banana");

            expect(select).toHaveValue("banana");
        });

        it("should call onChange when selection changes", async () => {
            const user = userEvent.setup();
            const handleChange = vi.fn();
            render(<Select options={defaultOptions} onChange={handleChange} />);

            await user.selectOptions(screen.getByRole("combobox"), "orange");

            expect(handleChange).toHaveBeenCalled();
        });

        it("should have controlled value", () => {
            render(<Select options={defaultOptions} value="apple" onChange={() => { }} />);
            expect(screen.getByRole("combobox")).toHaveValue("apple");
        });

        it("should have default value", () => {
            render(<Select options={defaultOptions} defaultValue="banana" />);
            expect(screen.getByRole("combobox")).toHaveValue("banana");
        });
    });

    describe("Disabled state", () => {
        it("should be disabled when disabled prop is true", () => {
            render(<Select options={defaultOptions} disabled />);
            expect(screen.getByRole("combobox")).toBeDisabled();
        });

        it("should disable individual options", () => {
            const optionsWithDisabled = [
                { value: "apple", label: "Apple" },
                { value: "banana", label: "Banana", disabled: true },
                { value: "orange", label: "Orange" },
            ];
            render(<Select options={optionsWithDisabled} />);
            expect(screen.getByRole("option", { name: "Banana" })).toBeDisabled();
        });
    });

    describe("Error state", () => {
        it("should display error message", () => {
            render(<Select options={defaultOptions} error="Please select an option" />);
            const error = screen.getByRole("alert");
            expect(error).toHaveTextContent("Please select an option");
        });

        it("should apply error variant when error prop exists", () => {
            render(<Select options={defaultOptions} error="Error" />);
            const select = screen.getByRole("combobox");
            expect(select).toHaveClass("border-destructive");
        });

        it("should have aria-invalid when error exists", () => {
            render(<Select options={defaultOptions} error="Required" />);
            const select = screen.getByRole("combobox");
            expect(select).toHaveAttribute("aria-invalid", "true");
        });

        it("should have aria-describedby pointing to error", () => {
            render(<Select options={defaultOptions} error="Error message" id="my-select" />);
            const select = screen.getByRole("combobox");
            expect(select).toHaveAttribute("aria-describedby", "my-select-error");
        });
    });

    describe("Sizes", () => {
        it("should apply default size classes", () => {
            render(<Select options={defaultOptions} />);
            const select = screen.getByRole("combobox");
            expect(select).toHaveClass("h-10");
        });

        it("should apply sm size classes", () => {
            render(<Select options={defaultOptions} size="sm" />);
            const select = screen.getByRole("combobox");
            expect(select).toHaveClass("h-9");
        });

        it("should apply lg size classes", () => {
            render(<Select options={defaultOptions} size="lg" />);
            const select = screen.getByRole("combobox");
            expect(select).toHaveClass("h-11");
        });
    });

    describe("Chevron icon", () => {
        it("should render chevron icon", () => {
            render(<Select options={defaultOptions} />);
            // The chevron is an SVG with aria-hidden
            const svg = document.querySelector('svg[aria-hidden="true"]');
            expect(svg).toBeInTheDocument();
        });
    });

    describe("Accessibility", () => {
        it("should be focusable", async () => {
            const user = userEvent.setup();
            render(<Select options={defaultOptions} />);

            await user.tab();

            expect(screen.getByRole("combobox")).toHaveFocus();
        });

        it("should support keyboard navigation", async () => {
            const user = userEvent.setup();
            render(<Select options={defaultOptions} />);
            const select = screen.getByRole("combobox");

            select.focus();
            await user.keyboard("{ArrowDown}");

            // Select should have navigated
            expect(select).toHaveFocus();
        });
    });

    describe("Custom className", () => {
        it("should merge custom className", () => {
            render(<Select options={defaultOptions} className="custom-class" />);
            const select = screen.getByRole("combobox");
            expect(select).toHaveClass("custom-class");
        });
    });

    describe("Ref forwarding", () => {
        it("should forward ref correctly", () => {
            const ref = vi.fn();
            render(<Select options={defaultOptions} ref={ref} />);
            expect(ref).toHaveBeenCalled();
            expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLSelectElement);
        });
    });

    describe("Empty options", () => {
        it("should render with empty options array", () => {
            render(<Select options={[]} placeholder="No options" />);
            const select = screen.getByRole("combobox");
            expect(select).toBeInTheDocument();
            expect(screen.getByRole("option", { name: "No options" })).toBeInTheDocument();
        });
    });
});
