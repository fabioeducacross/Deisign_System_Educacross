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
    parameters: {
        multiFrameworkCode: {
            react: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Button } from "@fabioeducacross/ui";

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
      <DialogClose><Button variant="secondary">Close</Button></DialogClose>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Open Dialog
    </button>
    <div class="modal fade" id="exampleModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Dialog Title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">Content</div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDialog>
    <EdDialogTrigger as-child>
      <EdButton>Open Dialog</EdButton>
    </EdDialogTrigger>
    <EdDialogContent>
      <EdDialogHeader>
        <EdDialogTitle>Dialog Title</EdDialogTitle>
        <EdDialogDescription>Content</EdDialogDescription>
      </EdDialogHeader>
      <EdDialogFooter>
        <EdDialogClose><EdButton variant="secondary">Close</EdButton></EdDialogClose>
        <EdButton>Save changes</EdButton>
      </EdDialogFooter>
    </EdDialogContent>
  </EdDialog>
</template>

<script setup lang="ts">
import { EdDialog, EdDialogTrigger, EdDialogContent, EdDialogHeader, EdDialogTitle, EdDialogDescription, EdDialogFooter, EdDialogClose, EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { useState } from "react";
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@fabioeducacross/ui";

function ControlledDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled Dialog</DialogTitle>
            <DialogDescription>This dialog is controlled by state.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}`,
            vue2: `<!-- Exemplo conceitual com Bootstrap Modal -->
<template>
  <div>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#controlledModal">Open Dialog</button>

    <div class="modal fade" id="controlledModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Controlled Dialog</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body"><p>This dialog is controlled by state.</p></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div>
    <EdButton @click="open = true">Open Dialog</EdButton>
    <EdDialog :open="open" @update:open="open = $event">
      <EdDialogContent>
        <EdDialogHeader>
          <EdDialogTitle>Controlled Dialog</EdDialogTitle>
          <EdDialogDescription>This dialog is controlled by state.</EdDialogDescription>
        </EdDialogHeader>
        <EdDialogFooter>
          <EdButton @click="open = false">Close</EdButton>
        </EdDialogFooter>
      </EdDialogContent>
    </EdDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { EdButton, EdDialog, EdDialogContent, EdDialogHeader, EdDialogTitle, EdDialogDescription, EdDialogFooter } from "@fabioeducacross/ui-vue3";

const open = ref(false);
</script>`,
        },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Button, Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@fabioeducacross/ui";

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
      <Button variant="outline">Large</Button>
    </DialogTrigger>
    <DialogContent size="lg">
      <DialogHeader>
        <DialogTitle>Large Dialog</DialogTitle>
        <DialogDescription>This is a large dialog.</DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap Modal -->
<template>
  <div class="d-flex gap-2">
    <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#smallModal">Small</button>
    <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#largeModal">Large</button>

    <div class="modal fade" id="smallModal">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header"><h5>Small Dialog</h5></div>
          <div class="modal-body">This is a small dialog.</div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="largeModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header"><h5>Large Dialog</h5></div>
          <div class="modal-body">This is a large dialog.</div>
        </div>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex gap-4">
    <EdDialog>
      <EdDialogTrigger as-child>
        <EdButton variant="outline">Small</EdButton>
      </EdDialogTrigger>
      <EdDialogContent size="sm">
        <EdDialogHeader>
          <EdDialogTitle>Small Dialog</EdDialogTitle>
          <EdDialogDescription>This is a small dialog.</EdDialogDescription>
        </EdDialogHeader>
      </EdDialogContent>
    </EdDialog>

    <EdDialog>
      <EdDialogTrigger as-child>
        <EdButton variant="outline">Large</EdButton>
      </EdDialogTrigger>
      <EdDialogContent size="lg">
        <EdDialogHeader>
          <EdDialogTitle>Large Dialog</EdDialogTitle>
          <EdDialogDescription>This is a large dialog.</EdDialogDescription>
        </EdDialogHeader>
      </EdDialogContent>
    </EdDialog>
  </div>
</template>

<script setup lang="ts">
import { EdButton, EdDialog, EdDialogTrigger, EdDialogContent, EdDialogHeader, EdDialogTitle, EdDialogDescription } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Button, Input, Label } from "@fabioeducacross/ui";

<Dialog>
  <DialogTrigger asChild>
    <Button>Edit Profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>Make changes to your profile.</DialogDescription>
    </DialogHeader>
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue="John Doe" />
      </div>
    </div>
    <DialogFooter>
      <Button>Save Changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#formModal">
      Edit Profile
    </button>
    <div class="modal fade" id="formModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Profile</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="text" class="form-control" value="John Doe" />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" value="john@example.com" />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
            <button class="btn btn-primary">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDialog>
    <EdDialogTrigger as-child>
      <EdButton>Edit Profile</EdButton>
    </EdDialogTrigger>
    <EdDialogContent>
      <EdDialogHeader>
        <EdDialogTitle>Edit Profile</EdDialogTitle>
        <EdDialogDescription>Make changes to your profile.</EdDialogDescription>
      </EdDialogHeader>
      <div class="space-y-4">
        <div>
          <EdLabel for="name">Name</EdLabel>
          <EdInput id="name" default-value="John Doe" />
        </div>
      </div>
      <EdDialogFooter>
        <EdButton>Save Changes</EdButton>
      </EdDialogFooter>
    </EdDialogContent>
  </EdDialog>
</template>

<script setup lang="ts">
import { EdDialog, EdDialogTrigger, EdDialogContent, EdDialogHeader, EdDialogTitle, EdDialogDescription, EdDialogFooter, EdButton, EdInput, EdLabel } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Fullscreen dialog for mobile or immersive content.
 */
export const Fullscreen: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Open Fullscreen</Button>
            </DialogTrigger>
            <DialogContent size="full">
                <DialogHeader>
                    <DialogTitle>Fullscreen Dialog</DialogTitle>
                    <DialogDescription>
                        This dialog takes up the entire screen.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-1 p-6">
                    <p>Content here can scroll and fill the viewport.</p>
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Button } from "@fabioeducacross/ui";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Fullscreen</Button>
  </DialogTrigger>
  <DialogContent size="full">
    <DialogHeader>
      <DialogTitle>Fullscreen Dialog</DialogTitle>
      <DialogDescription>This dialog takes up the entire screen.</DialogDescription>
    </DialogHeader>
    <div className="flex-1 p-6">
      <p>Content here can scroll and fill the viewport.</p>
    </div>
    <DialogFooter>
      <DialogClose><Button variant="outline">Close</Button></DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#fullscreenModal">
      Open Fullscreen
    </button>
    <div class="modal fade" id="fullscreenModal" tabindex="-1">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Fullscreen Dialog</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <p>This dialog takes up the entire screen.</p>
            <p>Content here can scroll and fill the viewport.</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDialog>
    <EdDialogTrigger as-child>
      <EdButton>Open Fullscreen</EdButton>
    </EdDialogTrigger>
    <EdDialogContent size="full">
      <EdDialogHeader>
        <EdDialogTitle>Fullscreen Dialog</EdDialogTitle>
        <EdDialogDescription>This dialog takes up the entire screen.</EdDialogDescription>
      </EdDialogHeader>
      <div class="flex-1 p-6">
        <p>Content here can scroll and fill the viewport.</p>
      </div>
      <EdDialogFooter>
        <EdDialogClose><EdButton variant="outline">Close</EdButton></EdDialogClose>
      </EdDialogFooter>
    </EdDialogContent>
  </EdDialog>
</template>

<script setup lang="ts">
import { EdDialog, EdDialogTrigger, EdDialogContent, EdDialogHeader, EdDialogTitle, EdDialogDescription, EdDialogFooter, EdDialogClose, EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Button } from "@fabioeducacross/ui";

<Dialog>
  <DialogTrigger asChild><Button variant="destructive">Delete Account</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose><Button variant="outline">Cancel</Button></DialogClose>
      <Button variant="destructive">Delete Account</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmModal">Delete Account</button>
  <div class="modal fade" id="confirmModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Are you sure?</h5>
        </div>
        <div class="modal-body">This action cannot be undone.</div>
        <div class="modal-footer">
          <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
          <button class="btn btn-danger">Delete Account</button>
        </div>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDialog>
    <EdDialogTrigger as-child><EdButton variant="destructive">Delete Account</EdButton></EdDialogTrigger>
    <EdDialogContent>
      <EdDialogHeader>
        <EdDialogTitle>Are you sure?</EdDialogTitle>
        <EdDialogDescription>This action cannot be undone.</EdDialogDescription>
      </EdDialogHeader>
      <EdDialogFooter>
        <EdDialogClose><EdButton variant="outline">Cancel</EdButton></EdDialogClose>
        <EdButton variant="destructive">Delete Account</EdButton>
      </EdDialogFooter>
    </EdDialogContent>
  </EdDialog>
</template>

<script setup lang="ts">
import { EdDialog, EdDialogTrigger, EdDialogContent, EdDialogHeader, EdDialogTitle, EdDialogDescription, EdDialogFooter, EdDialogClose, EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Button, Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@fabioeducacross/ui";

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
</Dialog>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap Modal -->
<!-- Escape e overlay click são comportamentos padrão. -->
<template>
  <div>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#keyboardModal">Open Dialog</button>

    <div class="modal fade" id="keyboardModal" tabindex="-1" data-bs-backdrop="true" data-bs-keyboard="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Keyboard Test</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body"><p>Test closing with Escape key and clicking outside.</p></div>
          <div class="modal-footer"><button type="button" class="btn btn-primary">Action</button></div>
        </div>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDialog>
    <EdDialogTrigger as-child>
      <EdButton>Open Dialog</EdButton>
    </EdDialogTrigger>
    <EdDialogContent>
      <EdDialogHeader>
        <EdDialogTitle>Keyboard Test</EdDialogTitle>
      </EdDialogHeader>
      <EdDialogDescription>Test closing with Escape key and clicking outside.</EdDialogDescription>
      <EdDialogFooter>
        <EdButton>Action</EdButton>
      </EdDialogFooter>
    </EdDialogContent>
  </EdDialog>
</template>

<script setup lang="ts">
import { EdButton, EdDialog, EdDialogTrigger, EdDialogContent, EdDialogHeader, EdDialogTitle, EdDialogDescription, EdDialogFooter } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
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
    parameters: {
        multiFrameworkCode: {
            react: `import { Button, Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@fabioeducacross/ui";

<Dialog>
  <DialogTrigger asChild>
    <Button>Terms of Service</Button>
  </DialogTrigger>
  <DialogContent className="max-h-[80vh]">
    <DialogHeader>
      <DialogTitle>Terms of Service</DialogTitle>
      <DialogDescription>Please read our terms carefully.</DialogDescription>
    </DialogHeader>
    <div className="overflow-y-auto max-h-[50vh] space-y-4">
      <p>Lorem ipsum dolor sit amet...</p>
      <p>Consectetur adipiscing elit...</p>
    </div>
    <DialogFooter>
      <DialogClose>
        <Button variant="outline">Decline</Button>
      </DialogClose>
      <Button>Accept</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap Modal -->
<template>
  <div>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#scrollModal">Terms of Service</button>

    <div class="modal fade" id="scrollModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Terms of Service</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" style="max-height: 50vh; overflow-y: auto;">
            <p>Lorem ipsum dolor sit amet...</p>
            <p>Consectetur adipiscing elit...</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Decline</button>
            <button type="button" class="btn btn-primary">Accept</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdDialog>
    <EdDialogTrigger as-child>
      <EdButton>Terms of Service</EdButton>
    </EdDialogTrigger>
    <EdDialogContent class="max-h-[80vh]">
      <EdDialogHeader>
        <EdDialogTitle>Terms of Service</EdDialogTitle>
        <EdDialogDescription>Please read our terms carefully.</EdDialogDescription>
      </EdDialogHeader>
      <div class="overflow-y-auto max-h-[50vh] space-y-4">
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Consectetur adipiscing elit...</p>
      </div>
      <EdDialogFooter>
        <EdDialogClose>
          <EdButton variant="outline">Decline</EdButton>
        </EdDialogClose>
        <EdButton>Accept</EdButton>
      </EdDialogFooter>
    </EdDialogContent>
  </EdDialog>
</template>

<script setup lang="ts">
import { EdButton, EdDialog, EdDialogTrigger, EdDialogContent, EdDialogHeader, EdDialogTitle, EdDialogDescription, EdDialogFooter, EdDialogClose } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};
