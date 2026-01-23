import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
    Button,
    Input,
    Label,
} from "@fabioeducacross/ui";
import { useState } from "react";

const meta: Meta<typeof Dialog> = {
    title: "Components/Dialog",
    component: Dialog,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Dialog (Modal) displays content in a layer above the main page, requiring user interaction.",
            },
        },
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default dialog with trigger button.
 */
export const Default: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Dialog Title</DialogTitle>
                    <DialogDescription>Content</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button variant="secondary">Close</Button>
                    </DialogClose>
                    <Button>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
};

/**
 * Controlled dialog with state management.
 */
export const Controlled: Story = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <div className="space-y-4">
                <Button onClick={() => setOpen(true)}>Open Controlled Dialog</Button>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Controlled Dialog</DialogTitle>
                            <DialogDescription>
                                This dialog is controlled by React state.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button onClick={() => setOpen(false)}>Close</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        );
    },
};

/**
 * Dialog sizes.
 */
export const Sizes: Story = {
    render: () => (
        <div className="flex gap-4">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Small</Button>
                </DialogTrigger>
                <DialogContent size="sm">
                    <DialogHeader>
                        <DialogTitle>Small Dialog</DialogTitle>
                        <DialogDescription>This is a small dialog.</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Default</Button>
                </DialogTrigger>
                <DialogContent size="default">
                    <DialogHeader>
                        <DialogTitle>Default Dialog</DialogTitle>
                        <DialogDescription>This is a default-sized dialog.</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Large</Button>
                </DialogTrigger>
                <DialogContent size="lg">
                    <DialogHeader>
                        <DialogTitle>Large Dialog</DialogTitle>
                        <DialogDescription>This is a large dialog with more space for content.</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    ),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const body = within(document.body);

        await step("Abrir dialog pequeno", async () => {
            const smallButton = canvas.getByRole("button", { name: /^small$/i });
            await userEvent.click(smallButton);
            await new Promise(resolve => setTimeout(resolve, 300));
        });

        await step("Verificar dialog pequeno", async () => {
            const dialog = await body.findByRole("dialog", {}, { timeout: 2000 });
            await expect(dialog).toBeVisible();
            await expect(body.getByText("Small Dialog")).toBeVisible();
        });

        await step("Fechar dialog pequeno", async () => {
            const dialog = body.getByRole("dialog");
            const closeButton = dialog.querySelector('button[aria-label="Close"]');
            await userEvent.click(closeButton as Element);
            await new Promise(resolve => setTimeout(resolve, 300));
        });

        await step("Verificar dialog fechado", async () => {
            const dialog = body.queryByRole("dialog");
            await expect(dialog).not.toBeInTheDocument();
        });
    },
};

/**
 * Dialog with form.
 */
export const WithForm: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 px-6 pb-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            defaultValue="john@example.com"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
};

/**
 * Confirmation dialog.
 */
export const Confirmation: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove all your data from our
                        servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive">Delete Account</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
};

/**
 * Test keyboard and overlay interactions.
 */
export const KeyboardAndOverlay: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Keyboard Test</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Test closing with Escape key and clicking outside.
                </DialogDescription>
                <DialogFooter>
                    <Button>Action</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const body = within(document.body);

        await step("Abrir dialog", async () => {
            const openButton = canvas.getByRole("button", { name: /open dialog/i });
            await userEvent.click(openButton);
            await new Promise(resolve => setTimeout(resolve, 300));
        });

        await step("Verificar dialog aberto", async () => {
            const dialog = await body.findByRole("dialog", {}, { timeout: 2000 });
            await expect(dialog).toBeVisible();
        });

        await step("Fechar com tecla Escape", async () => {
            await userEvent.keyboard("{Escape}");
            await new Promise(resolve => setTimeout(resolve, 300));
        });

        await step("Verificar dialog fechado", async () => {
            const dialog = body.queryByRole("dialog");
            await expect(dialog).not.toBeInTheDocument();
        });

        await step("Reabrir dialog", async () => {
            const openButton = canvas.getByRole("button", { name: /open dialog/i });
            await userEvent.click(openButton);
            await new Promise(resolve => setTimeout(resolve, 300));
        });

        await step("Verificar dialog reaberto", async () => {
            const dialog = await body.findByRole("dialog", {}, { timeout: 2000 });
            await expect(dialog).toBeVisible();
        });

        await step("Fechar com botão X", async () => {
            const dialog = body.getByRole("dialog");
            const closeButton = dialog.querySelector('button[aria-label="Close"]');
            await userEvent.click(closeButton as Element);
            await new Promise(resolve => setTimeout(resolve, 300));
        });

        await step("Verificar dialog fechado novamente", async () => {
            const dialog = body.queryByRole("dialog");
            await expect(dialog).not.toBeInTheDocument();
        });
    },
};

/**
 * Dialog with scrollable content.
 */
export const ScrollableContent: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Terms of Service</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Terms of Service</DialogTitle>
                    <DialogDescription>
                        Please read our terms of service carefully.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 px-6 pb-6 overflow-y-auto max-h-[50vh]">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <p key={i} className="text-sm text-muted-foreground">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                        </p>
                    ))}
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button variant="outline">Decline</Button>
                    </DialogClose>
                    <Button>Accept</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
};
