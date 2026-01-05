import type { Meta, StoryObj } from "@storybook/react";
import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
    Badge,
    Checkbox,
} from "@educacross/ui";

const meta: Meta<typeof Table> = {
    title: "Components/Table",
    component: Table,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Table displays data in a structured grid format with rows and columns.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Table>;

const invoices = [
    { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
    { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
    { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
    { invoice: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
    { invoice: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" },
];

/**
 * Default table with header and body.
 */
export const Default: Story = {
    render: () => (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                        <TableCell>{invoice.status}</TableCell>
                        <TableCell>{invoice.method}</TableCell>
                        <TableCell className="text-right">{invoice.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ),
};

/**
 * Table with footer.
 */
export const WithFooter: Story = {
    render: () => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                        <TableCell>{invoice.status}</TableCell>
                        <TableCell>{invoice.method}</TableCell>
                        <TableCell className="text-right">{invoice.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right font-bold">$1,750.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    ),
};

/**
 * Table with status badges.
 */
export const WithBadges: Story = {
    render: () => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                        <TableCell>
                            <Badge
                                variant={
                                    invoice.status === "Paid"
                                        ? "success"
                                        : invoice.status === "Pending"
                                            ? "warning"
                                            : "destructive"
                                }
                            >
                                {invoice.status}
                            </Badge>
                        </TableCell>
                        <TableCell>{invoice.method}</TableCell>
                        <TableCell className="text-right">{invoice.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ),
};

/**
 * Selectable table with checkboxes.
 */
export const Selectable: Story = {
    render: () => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">
                        <Checkbox />
                    </TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell>
                            <Checkbox />
                        </TableCell>
                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                        <TableCell>{invoice.status}</TableCell>
                        <TableCell>{invoice.method}</TableCell>
                        <TableCell className="text-right">{invoice.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ),
};

const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "Inactive" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Viewer", status: "Pending" },
];

/**
 * User management table.
 */
export const UserTable: Story = {
    render: () => (
        <Table>
            <TableCaption>Team members and their roles.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell>
                            <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                            <Badge
                                variant={
                                    user.status === "Active"
                                        ? "success"
                                        : user.status === "Pending"
                                            ? "warning"
                                            : "secondary"
                                }
                            >
                                {user.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <button className="text-sm text-primary hover:underline">
                                Edit
                            </button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ),
};

/**
 * Striped table variant.
 */
export const Striped: Story = {
    render: () => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[
                    { product: "Widget A", category: "Electronics", stock: 45, price: "$29.99" },
                    { product: "Widget B", category: "Electronics", stock: 12, price: "$49.99" },
                    { product: "Gadget X", category: "Accessories", stock: 78, price: "$19.99" },
                    { product: "Gadget Y", category: "Accessories", stock: 0, price: "$34.99" },
                    { product: "Tool Z", category: "Hardware", stock: 156, price: "$14.99" },
                ].map((item, index) => (
                    <TableRow
                        key={item.product}
                        className={index % 2 === 0 ? "bg-muted/50" : ""}
                    >
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                            <span
                                className={
                                    item.stock === 0
                                        ? "text-destructive"
                                        : item.stock < 20
                                            ? "text-warning"
                                            : ""
                                }
                            >
                                {item.stock === 0 ? "Out of stock" : item.stock}
                            </span>
                        </TableCell>
                        <TableCell className="text-right">{item.price}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ),
};
