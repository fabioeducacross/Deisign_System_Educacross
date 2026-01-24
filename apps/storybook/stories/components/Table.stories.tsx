import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
    TableToolbar,
    TableSortHeader,
    TableActions,
    TableActionButton,
    TablePagination,
    Badge,
    Checkbox,
    Select,
    Input,
    Button,
    Avatar,
    AvatarFallback,
} from "@fabioeducacross/ui";
import {
    TrendingUp,
    PieChart,
    Users,
    MoreVertical,
    Download,
    Search,
} from "react-feather";

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
    parameters: {
        multiFrameworkCode: {
            react: `import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption } from "@fabioeducacross/ui";

<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell>$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <table class="table">
    <caption>A list of your recent invoices.</caption>
    <thead>
      <tr>
        <th>Invoice</th>
        <th>Status</th>
        <th>Method</th>
        <th class="text-end">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>INV001</td>
        <td>Paid</td>
        <td>Credit Card</td>
        <td class="text-end">$250.00</td>
      </tr>
    </tbody>
  </table>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdTable>
    <EdTableCaption>A list of your recent invoices.</EdTableCaption>
    <EdTableHeader>
      <EdTableRow>
        <EdTableHead>Invoice</EdTableHead>
        <EdTableHead>Status</EdTableHead>
        <EdTableHead>Method</EdTableHead>
        <EdTableHead>Amount</EdTableHead>
      </EdTableRow>
    </EdTableHeader>
    <EdTableBody>
      <EdTableRow>
        <EdTableCell>INV001</EdTableCell>
        <EdTableCell>Paid</EdTableCell>
        <EdTableCell>Credit Card</EdTableCell>
        <EdTableCell>$250.00</EdTableCell>
      </EdTableRow>
    </EdTableBody>
  </EdTable>
</template>

<script setup lang="ts">
import { EdTable, EdTableHeader, EdTableBody, EdTableHead, EdTableRow, EdTableCell, EdTableCaption } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell } from "@fabioeducacross/ui";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell>$250.00</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>Total</TableCell>
      <TableCell>$1,750.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <table class="table">
    <thead>
      <tr>
        <th>Invoice</th>
        <th>Status</th>
        <th>Method</th>
        <th class="text-end">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>INV001</td>
        <td>Paid</td>
        <td>Credit Card</td>
        <td class="text-end">$250.00</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3">Total</td>
        <td class="text-end fw-bold">$1,750.00</td>
      </tr>
    </tfoot>
  </table>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdTable>
    <EdTableHeader>
      <EdTableRow>
        <EdTableHead>Invoice</EdTableHead>
        <EdTableHead>Status</EdTableHead>
        <EdTableHead>Method</EdTableHead>
        <EdTableHead>Amount</EdTableHead>
      </EdTableRow>
    </EdTableHeader>
    <EdTableBody>
      <EdTableRow>
        <EdTableCell>INV001</EdTableCell>
        <EdTableCell>Paid</EdTableCell>
        <EdTableCell>Credit Card</EdTableCell>
        <EdTableCell>$250.00</EdTableCell>
      </EdTableRow>
    </EdTableBody>
    <EdTableFooter>
      <EdTableRow>
        <EdTableCell :col-span="3">Total</EdTableCell>
        <EdTableCell>$1,750.00</EdTableCell>
      </EdTableRow>
    </EdTableFooter>
  </EdTable>
</template>

<script setup lang="ts">
import { EdTable, EdTableHeader, EdTableBody, EdTableFooter, EdTableHead, EdTableRow, EdTableCell } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@fabioeducacross/ui";
import { Badge } from "@fabioeducacross/ui";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell><Badge variant="success">Paid</Badge></TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell>$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>INV002</TableCell>
      <TableCell><Badge variant="warning">Pending</Badge></TableCell>
      <TableCell>PayPal</TableCell>
      <TableCell>$150.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <table class="table">
    <thead>
      <tr>
        <th>Invoice</th>
        <th>Status</th>
        <th>Method</th>
        <th class="text-end">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>INV001</td>
        <td><span class="badge bg-success">Paid</span></td>
        <td>Credit Card</td>
        <td class="text-end">$250.00</td>
      </tr>
      <tr>
        <td>INV002</td>
        <td><span class="badge bg-warning">Pending</span></td>
        <td>PayPal</td>
        <td class="text-end">$150.00</td>
      </tr>
    </tbody>
  </table>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdTable>
    <EdTableHeader>
      <EdTableRow>
        <EdTableHead>Invoice</EdTableHead>
        <EdTableHead>Status</EdTableHead>
        <EdTableHead>Method</EdTableHead>
        <EdTableHead>Amount</EdTableHead>
      </EdTableRow>
    </EdTableHeader>
    <EdTableBody>
      <EdTableRow>
        <EdTableCell>INV001</EdTableCell>
        <EdTableCell><EdBadge variant="success">Paid</EdBadge></EdTableCell>
        <EdTableCell>Credit Card</EdTableCell>
        <EdTableCell>$250.00</EdTableCell>
      </EdTableRow>
      <EdTableRow>
        <EdTableCell>INV002</EdTableCell>
        <EdTableCell><EdBadge variant="warning">Pending</EdBadge></EdTableCell>
        <EdTableCell>PayPal</EdTableCell>
        <EdTableCell>$150.00</EdTableCell>
      </EdTableRow>
    </EdTableBody>
  </EdTable>
</template>

<script setup lang="ts">
import { EdTable, EdTableHeader, EdTableBody, EdTableHead, EdTableRow, EdTableCell } from "@fabioeducacross/ui-vue3";
import { EdBadge } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Checkbox } from "@fabioeducacross/ui";

const invoices = [
  { invoice: "INV-001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { invoice: "INV-002", status: "Pending", method: "PayPal", amount: "$150.00" },
];

<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[50px]"><Checkbox /></TableHead>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {invoices.map((invoice) => (
      <TableRow key={invoice.invoice}>
        <TableCell><Checkbox /></TableCell>
        <TableCell className="font-medium">{invoice.invoice}</TableCell>
        <TableCell>{invoice.status}</TableCell>
        <TableCell>{invoice.method}</TableCell>
        <TableCell className="text-right">{invoice.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap Table -->
<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th style="width: 50px">
          <input type="checkbox" class="form-check-input">
        </th>
        <th>Invoice</th>
        <th>Status</th>
        <th>Method</th>
        <th class="text-end">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="invoice in invoices" :key="invoice.invoice">
        <td><input type="checkbox" class="form-check-input"></td>
        <td class="fw-medium">{{ invoice.invoice }}</td>
        <td>{{ invoice.status }}</td>
        <td>{{ invoice.method }}</td>
        <td class="text-end">{{ invoice.amount }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      invoices: [
        { invoice: 'INV-001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
        { invoice: 'INV-002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
      ],
    };
  },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdTable>
    <EdTableHeader>
      <EdTableRow>
        <EdTableHead class="w-[50px]"><EdCheckbox /></EdTableHead>
        <EdTableHead>Invoice</EdTableHead>
        <EdTableHead>Status</EdTableHead>
        <EdTableHead>Method</EdTableHead>
        <EdTableHead class="text-right">Amount</EdTableHead>
      </EdTableRow>
    </EdTableHeader>
    <EdTableBody>
      <EdTableRow v-for="invoice in invoices" :key="invoice.invoice">
        <EdTableCell><EdCheckbox /></EdTableCell>
        <EdTableCell class="font-medium">{{ invoice.invoice }}</EdTableCell>
        <EdTableCell>{{ invoice.status }}</EdTableCell>
        <EdTableCell>{{ invoice.method }}</EdTableCell>
        <EdTableCell class="text-right">{{ invoice.amount }}</EdTableCell>
      </EdTableRow>
    </EdTableBody>
  </EdTable>
</template>

<script setup lang="ts">
import { EdTable, EdTableHeader, EdTableBody, EdTableRow, EdTableHead, EdTableCell, EdCheckbox } from "@fabioeducacross/ui-vue3";
import { ref } from "vue";

const invoices = ref([
  { invoice: 'INV-001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
  { invoice: 'INV-002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
]);
</script>`,
        },
    },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Table, TableCaption, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge } from "@fabioeducacross/ui";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Inactive" },
];

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
          <Badge variant={user.status === "Active" ? "success" : "secondary"}>
            {user.status}
          </Badge>
        </TableCell>
        <TableCell className="text-right">
          <button className="text-sm text-primary hover:underline">Edit</button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap Table -->
<template>
  <table class="table">
    <caption>Team members and their roles.</caption>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Status</th>
        <th class="text-end">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td class="fw-medium">{{ user.name }}</td>
        <td class="text-muted">{{ user.email }}</td>
        <td><span class="badge border">{{ user.role }}</span></td>
        <td>
          <span :class="['badge', user.status === 'Active' ? 'bg-success' : 'bg-secondary']">
            {{ user.status }}
          </span>
        </td>
        <td class="text-end">
          <button class="btn btn-link btn-sm text-primary">Edit</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Inactive' },
      ],
    };
  },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdTable>
    <EdTableCaption>Team members and their roles.</EdTableCaption>
    <EdTableHeader>
      <EdTableRow>
        <EdTableHead>Name</EdTableHead>
        <EdTableHead>Email</EdTableHead>
        <EdTableHead>Role</EdTableHead>
        <EdTableHead>Status</EdTableHead>
        <EdTableHead class="text-right">Actions</EdTableHead>
      </EdTableRow>
    </EdTableHeader>
    <EdTableBody>
      <EdTableRow v-for="user in users" :key="user.id">
        <EdTableCell class="font-medium">{{ user.name }}</EdTableCell>
        <EdTableCell class="text-muted-foreground">{{ user.email }}</EdTableCell>
        <EdTableCell>
          <EdBadge variant="outline">{{ user.role }}</EdBadge>
        </EdTableCell>
        <EdTableCell>
          <EdBadge :variant="user.status === 'Active' ? 'success' : 'secondary'">
            {{ user.status }}
          </EdBadge>
        </EdTableCell>
        <EdTableCell class="text-right">
          <button class="text-sm text-primary hover:underline">Edit</button>
        </EdTableCell>
      </EdTableRow>
    </EdTableBody>
  </EdTable>
</template>

<script setup lang="ts">
import { EdTable, EdTableCaption, EdTableHeader, EdTableBody, EdTableRow, EdTableHead, EdTableCell, EdBadge } from "@fabioeducacross/ui-vue3";
import { ref } from "vue";

const users = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Inactive' },
]);
</script>`,
        },
    },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@fabioeducacross/ui";

const products = [
  { product: "Widget A", category: "Electronics", stock: 45, price: "$29.99" },
  { product: "Gadget X", category: "Accessories", stock: 0, price: "$19.99" },
];

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
    {products.map((item, index) => (
      <TableRow
        key={item.product}
        className={index % 2 === 0 ? "bg-muted/50" : ""}
      >
        <TableCell className="font-medium">{item.product}</TableCell>
        <TableCell>{item.category}</TableCell>
        <TableCell>
          <span className={item.stock === 0 ? "text-destructive" : item.stock < 20 ? "text-warning" : ""}>
            {item.stock === 0 ? "Out of stock" : item.stock}
          </span>
        </TableCell>
        <TableCell className="text-right">{item.price}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap Table striped -->
<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Product</th>
        <th>Category</th>
        <th>Stock</th>
        <th class="text-end">Price</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in products" :key="item.product">
        <td class="fw-medium">{{ item.product }}</td>
        <td>{{ item.category }}</td>
        <td>
          <span :class="{
            'text-danger': item.stock === 0,
            'text-warning': item.stock > 0 && item.stock < 20
          }">
            {{ item.stock === 0 ? 'Out of stock' : item.stock }}
          </span>
        </td>
        <td class="text-end">{{ item.price }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      products: [
        { product: 'Widget A', category: 'Electronics', stock: 45, price: '$29.99' },
        { product: 'Gadget X', category: 'Accessories', stock: 0, price: '$19.99' },
      ],
    };
  },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdTable>
    <EdTableHeader>
      <EdTableRow>
        <EdTableHead>Product</EdTableHead>
        <EdTableHead>Category</EdTableHead>
        <EdTableHead>Stock</EdTableHead>
        <EdTableHead class="text-right">Price</EdTableHead>
      </EdTableRow>
    </EdTableHeader>
    <EdTableBody>
      <EdTableRow
        v-for="(item, index) in products"
        :key="item.product"
        :class="index % 2 === 0 ? 'bg-muted/50' : ''"
      >
        <EdTableCell class="font-medium">{{ item.product }}</EdTableCell>
        <EdTableCell>{{ item.category }}</EdTableCell>
        <EdTableCell>
          <span :class="{
            'text-destructive': item.stock === 0,
            'text-warning': item.stock > 0 && item.stock < 20
          }">
            {{ item.stock === 0 ? 'Out of stock' : item.stock }}
          </span>
        </EdTableCell>
        <EdTableCell class="text-right">{{ item.price }}</EdTableCell>
      </EdTableRow>
    </EdTableBody>
  </EdTable>
</template>

<script setup lang="ts">
import { EdTable, EdTableHeader, EdTableBody, EdTableRow, EdTableHead, EdTableCell } from "@fabioeducacross/ui-vue3";
import { ref } from "vue";

const products = ref([
  { product: 'Widget A', category: 'Electronics', stock: 45, price: '$29.99' },
  { product: 'Gadget X', category: 'Accessories', stock: 0, price: '$19.99' },
]);
</script>`,
        },
    },
};

/**
 * Tabela completa de gestão de turmas com toolbar, ordenação, ações e paginação.
 * Exemplo baseado no design Educacross.
 */
export const StudentManagement: Story = {
    render: () => {
        const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
        const [selectAll, setSelectAll] = useState(false);
        const [currentPage, setCurrentPage] = useState(1);
        const [sortColumn, setSortColumn] = useState<string | null>(null);
        const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);

        const studentData = [
            {
                id: 1,
                turma: "1º ano tarde",
                ano: "1º Ano",
                professores: [
                    { initials: "AS", color: "bg-green-500" },
                    { initials: "JL", color: "bg-cyan-500" },
                    { initials: "ME", color: "bg-purple-500" },
                ],
                progresso: { jogos: 10, total: 100, percentual: 10 },
                desempenho: { emoji: "😊", percentual: 50 },
            },
            {
                id: 2,
                turma: "1º ano tarde",
                ano: "1º Ano",
                professores: [
                    { initials: "AS", color: "bg-green-500" },
                    { initials: "JL", color: "bg-cyan-500" },
                    { initials: "ME", color: "bg-purple-500" },
                ],
                progresso: { jogos: 10, total: 100, percentual: 10 },
                desempenho: { emoji: "😊", percentual: 50 },
            },
            {
                id: 3,
                turma: "1º ano tarde",
                ano: "1º Ano",
                professores: [
                    { initials: "AS", color: "bg-green-500" },
                    { initials: "JL", color: "bg-cyan-500" },
                    { initials: "ME", color: "bg-purple-500" },
                ],
                progresso: { jogos: 10, total: 100, percentual: 10 },
                desempenho: { emoji: "😊", percentual: 50 },
            },
            {
                id: 4,
                turma: "1º ano tarde",
                ano: "1º Ano",
                professores: [
                    { initials: "AS", color: "bg-green-500" },
                    { initials: "JL", color: "bg-cyan-500" },
                    { initials: "ME", color: "bg-purple-500" },
                ],
                progresso: { jogos: 10, total: 100, percentual: 10 },
                desempenho: { emoji: "😊", percentual: 50 },
            },
            {
                id: 5,
                turma: "1º ano tarde",
                ano: "1º Ano",
                professores: [
                    { initials: "AS", color: "bg-green-500" },
                    { initials: "JL", color: "bg-cyan-500" },
                    { initials: "ME", color: "bg-purple-500" },
                ],
                progresso: { jogos: 10, total: 100, percentual: 10 },
                desempenho: { emoji: "😊", percentual: 50 },
            },
            {
                id: 6,
                turma: "1º ano tarde",
                ano: "1º Ano",
                professores: [
                    { initials: "AS", color: "bg-green-500" },
                    { initials: "JL", color: "bg-cyan-500" },
                    { initials: "ME", color: "bg-purple-500" },
                ],
                progresso: { jogos: 10, total: 100, percentual: 10 },
                desempenho: { emoji: "😊", percentual: 50 },
            },
            {
                id: 7,
                turma: "1º ano tarde",
                ano: "1º Ano",
                professores: [
                    { initials: "AS", color: "bg-green-500" },
                    { initials: "JL", color: "bg-cyan-500" },
                    { initials: "ME", color: "bg-purple-500" },
                ],
                progresso: { jogos: 10, total: 100, percentual: 10 },
                desempenho: { emoji: "😊", percentual: 50 },
            },
            {
                id: 8,
                turma: "1º ano tarde",
                ano: "1º Ano",
                professores: [
                    { initials: "AS", color: "bg-green-500" },
                    { initials: "JL", color: "bg-cyan-500" },
                    { initials: "ME", color: "bg-purple-500" },
                ],
                progresso: { jogos: 10, total: 100, percentual: 10 },
                desempenho: { emoji: "😊", percentual: 50 },
            },
            {
                id: 9,
                turma: "1º ano tarde",
                ano: "1º Ano",
                professores: [
                    { initials: "AS", color: "bg-green-500" },
                    { initials: "JL", color: "bg-cyan-500" },
                    { initials: "ME", color: "bg-purple-500" },
                ],
                progresso: { jogos: 10, total: 100, percentual: 10 },
                desempenho: { emoji: "😊", percentual: 50 },
            },
            {
                id: 10,
                turma: "1º ano tarde",
                ano: "1º Ano",
                professores: [
                    { initials: "AS", color: "bg-green-500" },
                    { initials: "JL", color: "bg-cyan-500" },
                    { initials: "ME", color: "bg-purple-500" },
                ],
                progresso: { jogos: 10, total: 100, percentual: 10 },
                desempenho: { emoji: "😊", percentual: 50 },
            },
        ];

        const totalItems = 20;
        const itemsPerPage = 10;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        const handleSelectAll = () => {
            if (selectAll) {
                setSelectedRows(new Set());
                setSelectAll(false);
            } else {
                setSelectedRows(new Set(studentData.map((s) => s.id)));
                setSelectAll(true);
            }
        };

        const handleRowSelect = (id: number) => {
            const newSelected = new Set(selectedRows);
            if (newSelected.has(id)) {
                newSelected.delete(id);
            } else {
                newSelected.add(id);
            }
            setSelectedRows(newSelected);
            setSelectAll(newSelected.size === studentData.length);
        };

        const handleSort = (column: string) => {
            if (sortColumn === column) {
                setSortDirection(sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc");
                if (sortDirection === "desc") setSortColumn(null);
            } else {
                setSortColumn(column);
                setSortDirection("asc");
            }
        };

        return (
            <div className="space-y-4">
                {/* Filtros superiores */}
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium mb-2 text-muted-foreground">
                            Filtro 1
                        </label>
                        <Select
                            value="todos"
                            options={[
                                { value: "todos", label: "Todos" },
                                { value: "ativo", label: "Ativo" },
                                { value: "inativo", label: "Inativo" },
                            ]}
                            onChange={() => {}}
                        />
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium mb-2 text-muted-foreground">
                            Filtro 2
                        </label>
                        <Select
                            value="todos"
                            options={[
                                { value: "todos", label: "Todos" },
                                { value: "opcao1", label: "Opção 1" },
                                { value: "opcao2", label: "Opção 2" },
                            ]}
                            onChange={() => {}}
                        />
                    </div>

                    <div className="flex-1 min-w-[250px]">
                        <label className="block text-sm font-medium mb-2 text-muted-foreground">
                            Filtro de Período
                        </label>
                        <Select
                            value="periodo"
                            options={[
                                { value: "periodo", label: "09/08/2023 a 22/08/2023" },
                                { value: "outro", label: "Outro período" },
                            ]}
                            onChange={() => {}}
                        />
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium mb-2 text-muted-foreground">
                            &nbsp;
                        </label>
                        <Select
                            value="acoes"
                            options={[
                                { value: "acoes", label: "Ações em lote" },
                                { value: "exportar", label: "Exportar selecionados" },
                                { value: "deletar", label: "Deletar selecionados" },
                            ]}
                            onChange={() => {}}
                            variant="primary"
                        />
                    </div>
                </div>

                {/* Toolbar */}
                <TableToolbar
                    selectedCount={selectedRows.size}
                    onClearSelection={() => {
                        setSelectedRows(new Set());
                        setSelectAll(false);
                    }}
                    showClearSelection={selectedRows.size > 0}
                >
                    <div className="flex items-center gap-4 w-full">
                        {/* Mostrar */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground whitespace-nowrap">Mostrar</span>
                            <Select
                                value="10"
                                options={[
                                    { value: "10", label: "10" },
                                    { value: "25", label: "25" },
                                    { value: "50", label: "50" },
                                    { value: "100", label: "100" },
                                ]}
                                onChange={() => {}}
                                className="w-20"
                            />
                        </div>

                        {/* Pesquisar - preenche todo espaço disponível */}
                        <div className="flex-1 relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Pesquisar"
                                className="pl-10 w-full"
                            />
                        </div>

                        {/* Exportar */}
                        <Button variant="default" size="default" className="whitespace-nowrap">
                            <Download size={18} />
                            Exportar em excel
                        </Button>
                    </div>
                </TableToolbar>

                {/* Tabela */}
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px] pl-6">
                                    <Checkbox checked={selectAll} onChange={handleSelectAll} />
                                </TableHead>
                                <TableSortHeader
                                    sortDirection={sortColumn === "turma" ? sortDirection : null}
                                    onSort={() => handleSort("turma")}
                                >
                                    Turma
                                </TableSortHeader>
                                <TableSortHeader
                                    sortDirection={sortColumn === "ano" ? sortDirection : null}
                                    onSort={() => handleSort("ano")}
                                >
                                    Ano Escolar
                                </TableSortHeader>
                                <TableSortHeader
                                    sortDirection={sortColumn === "professor" ? sortDirection : null}
                                    onSort={() => handleSort("professor")}
                                >
                                    Professor(es)
                                </TableSortHeader>
                                <TableSortHeader
                                    sortDirection={sortColumn === "progresso" ? sortDirection : null}
                                    onSort={() => handleSort("progresso")}
                                    icon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="12" cy="12" r="10" />
                                            <circle cx="12" cy="12" r="1" />
                                        </svg>
                                    }
                                >
                                    Progresso na Missão
                                </TableSortHeader>
                                <TableSortHeader
                                    sortDirection={sortColumn === "desempenho" ? sortDirection : null}
                                    onSort={() => handleSort("desempenho")}
                                    icon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                            <line x1="9" x2="9.01" y1="9" y2="9" />
                                            <line x1="15" x2="15.01" y1="9" y2="9" />
                                        </svg>
                                    }
                                >
                                    Desempenho na Missão
                                </TableSortHeader>
                                <TableHead className="text-center">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {studentData.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedRows.has(student.id)}
                                            onChange={() => handleRowSelect(student.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="font-normal text-foreground">{student.turma}</TableCell>
                                    <TableCell>
                                        <Badge variant="softPrimary">{student.ano}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex -space-x-2">
                                            {student.professores.map((prof, idx) => (
                                                <Avatar key={idx} className="w-8 h-8 border-2 border-background">
                                                    <AvatarFallback className={prof.color}>
                                                        {prof.initials}
                                                    </AvatarFallback>
                                                </Avatar>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="text-sm text-muted-foreground">
                                                {student.progresso.jogos}/{student.progresso.total} jogos
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-red-500"
                                                        style={{ width: `${student.progresso.percentual}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-semibold text-red-500 min-w-[35px]">
                                                    {student.progresso.percentual}%
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl leading-none">{student.desempenho.emoji}</span>
                                            <span className="text-sm font-semibold text-foreground">
                                                {student.desempenho.percentual}%
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <TableActions>
                                            <TableActionButton icon={<TrendingUp size={18} />} variant="primary" />
                                            <TableActionButton icon={<PieChart size={18} />} variant="primary" />
                                            <TableActionButton icon={<Users size={18} />} variant="primary" />
                                            <TableActionButton icon={<MoreVertical size={18} />} />
                                        </TableActions>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Paginação */}
                    <div className="px-6 py-4 border-t">
                        <TablePagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            startIndex={(currentPage - 1) * itemsPerPage + 1}
                            endIndex={Math.min(currentPage * itemsPerPage, totalItems)}
                            totalItems={totalItems}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        );
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Checkbox, Badge, Select } from "@fabioeducacross/ui";
import { useState } from "react";

const StudentManagementTable = () => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const students = [
    {
      id: 1,
      turma: "1º ano tarde",
      ano: "1º Ano",
      professores: [{ initials: "AS", color: "bg-green-500" }, { initials: "JL", color: "bg-cyan-500" }],
      progresso: { jogos: 10, total: 100, percentual: 10 },
      desempenho: { emoji: "😊", percentual: 50 },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex items-center gap-4">
        <Select value="todos" options={[{ value: "todos", label: "Todos" }]} onChange={() => {}} />
      </div>

      {/* Toolbar com ações */}
      <div className="flex items-center justify-between p-4 bg-muted/50">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{selectedRows.size} selecionados</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-sm text-primary hover:underline">Exportar</button>
        </div>
      </div>

      {/* Tabela */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"><Checkbox /></TableHead>
            <TableHead>Turma</TableHead>
            <TableHead>Ano</TableHead>
            <TableHead>Professores</TableHead>
            <TableHead>Progresso</TableHead>
            <TableHead>Desempenho</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell><Checkbox /></TableCell>
              <TableCell className="font-medium">{student.turma}</TableCell>
              <TableCell>{student.ano}</TableCell>
              <TableCell>
                <div className="flex -space-x-2">
                  {student.professores.map((prof, idx) => (
                    <div key={idx} className={\`h-8 w-8 rounded-full \${prof.color} flex items-center justify-center text-xs text-white\`}>
                      {prof.initials}
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">{student.progresso.jogos}/{student.progresso.total} jogos</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: \`\${student.progresso.percentual}%\` }} />
                    </div>
                    <span className="text-xs font-semibold text-red-500">{student.progresso.percentual}%</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{student.desempenho.emoji}</span>
                  <span className="text-sm font-semibold">{student.desempenho.percentual}%</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <button className="text-sm text-primary hover:underline">Ações</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Paginação */}
      <div className="px-6 py-4 border-t">
        <span className="text-sm">Página {currentPage} de 2</span>
      </div>
    </div>
  );
};`,
            vue2: `<!-- Exemplo conceitual com Bootstrap - tabela de gestão complexa -->
<template>
  <div>
    <!-- Filtros -->
    <div class="d-flex gap-3 mb-3">
      <select class="form-select">
        <option>Todos</option>
      </select>
    </div>

    <!-- Toolbar -->
    <div class="d-flex justify-content-between align-items-center p-3 bg-light mb-3">
      <span class="text-muted">{{ selectedRows.size }} selecionados</span>
      <button class="btn btn-link">Exportar</button>
    </div>

    <!-- Tabela -->
    <table class="table table-hover">
      <thead>
        <tr>
          <th style="width: 50px"><input type="checkbox" class="form-check-input"></th>
          <th>Turma</th>
          <th>Ano</th>
          <th>Professores</th>
          <th>Progresso</th>
          <th>Desempenho</th>
          <th class="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td><input type="checkbox" class="form-check-input"></td>
          <td class="fw-medium">{{ student.turma }}</td>
          <td>{{ student.ano }}</td>
          <td>
            <div class="d-flex">
              <span v-for="(prof, idx) in student.professores" :key="idx"
                class="badge rounded-circle me-1" :class="prof.color">
                {{ prof.initials }}
              </span>
            </div>
          </td>
          <td>
            <small class="text-muted">{{ student.progresso.jogos }}/{{ student.progresso.total }} jogos</small>
            <div class="progress">
              <div class="progress-bar bg-danger" :style="{ width: student.progresso.percentual + '%' }"></div>
            </div>
          </td>
          <td>
            <span class="fs-4">{{ student.desempenho.emoji }}</span>
            {{ student.desempenho.percentual }}%
          </td>
          <td class="text-center">
            <button class="btn btn-sm btn-link">Ações</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Paginação -->
    <nav>
      <ul class="pagination">
        <li class="page-item active"><a class="page-link">1</a></li>
        <li class="page-item"><a class="page-link">2</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedRows: new Set(),
      students: [
        {
          id: 1,
          turma: '1º ano tarde',
          ano: '1º Ano',
          professores: [{ initials: 'AS', color: 'bg-success' }, { initials: 'JL', color: 'bg-info' }],
          progresso: { jogos: 10, total: 100, percentual: 10 },
          desempenho: { emoji: '😊', percentual: 50 },
        },
      ],
    };
  },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="space-y-4">
    <!-- Filtros -->
    <div class="flex items-center gap-4">
      <EdSelect v-model="filtro" :options="[{ value: 'todos', label: 'Todos' }]" />
    </div>

    <!-- Toolbar -->
    <div class="flex items-center justify-between p-4 bg-muted/50">
      <span class="text-sm text-muted-foreground">{{ selectedRows.size }} selecionados</span>
      <button class="text-sm text-primary hover:underline">Exportar</button>
    </div>

    <!-- Tabela -->
    <EdTable>
      <EdTableHeader>
        <EdTableRow>
          <EdTableHead class="w-[50px]"><EdCheckbox /></EdTableHead>
          <EdTableHead>Turma</EdTableHead>
          <EdTableHead>Ano</EdTableHead>
          <EdTableHead>Professores</EdTableHead>
          <EdTableHead>Progresso</EdTableHead>
          <EdTableHead>Desempenho</EdTableHead>
          <EdTableHead class="text-center">Ações</EdTableHead>
        </EdTableRow>
      </EdTableHeader>
      <EdTableBody>
        <EdTableRow v-for="student in students" :key="student.id">
          <EdTableCell><EdCheckbox /></EdTableCell>
          <EdTableCell class="font-medium">{{ student.turma }}</EdTableCell>
          <EdTableCell>{{ student.ano }}</EdTableCell>
          <EdTableCell>
            <div class="flex -space-x-2">
              <div v-for="(prof, idx) in student.professores" :key="idx"
                :class="['h-8 w-8 rounded-full flex items-center justify-center text-xs text-white', prof.color]">
                {{ prof.initials }}
              </div>
            </div>
          </EdTableCell>
          <EdTableCell>
            <div class="space-y-1">
              <div class="text-sm text-muted-foreground">{{ student.progresso.jogos }}/{{ student.progresso.total }} jogos</div>
              <div class="flex items-center gap-2">
                <div class="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div class="h-full bg-red-500" :style="{ width: student.progresso.percentual + '%' }"></div>
                </div>
                <span class="text-xs font-semibold text-red-500">{{ student.progresso.percentual }}%</span>
              </div>
            </div>
          </EdTableCell>
          <EdTableCell>
            <div class="flex items-center gap-2">
              <span class="text-2xl">{{ student.desempenho.emoji }}</span>
              <span class="text-sm font-semibold">{{ student.desempenho.percentual }}%</span>
            </div>
          </EdTableCell>
          <EdTableCell class="text-center">
            <button class="text-sm text-primary hover:underline">Ações</button>
          </EdTableCell>
        </EdTableRow>
      </EdTableBody>
    </EdTable>

    <!-- Paginação -->
    <div class="px-6 py-4 border-t">
      <span class="text-sm">Página {{ currentPage }} de 2</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EdTable, EdTableHeader, EdTableBody, EdTableRow, EdTableHead, EdTableCell, EdCheckbox, EdSelect } from "@fabioeducacross/ui-vue3";
import { ref } from "vue";

const selectedRows = ref(new Set());
const currentPage = ref(1);
const filtro = ref('todos');

const students = ref([
  {
    id: 1,
    turma: '1º ano tarde',
    ano: '1º Ano',
    professores: [{ initials: 'AS', color: 'bg-green-500' }, { initials: 'JL', color: 'bg-cyan-500' }],
    progresso: { jogos: 10, total: 100, percentual: 10 },
    desempenho: { emoji: '😊', percentual: 50 },
  },
]);
</script>`,
        },
    },
};
