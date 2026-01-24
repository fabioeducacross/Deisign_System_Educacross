import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverClose,
    Button,
    Input,
    Label,
} from "@fabioeducacross/ui";

const meta: Meta<typeof Popover> = {
    title: "Components/Popover",
    component: Popover,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Popover displays rich content in a floating panel triggered by user interaction.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Popover>;

/**
 * Default popover with simple content.
 */
export const Default: Story = {
    render: () => (
        <div className="flex justify-center p-20">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="space-y-2">
                        <h4 className="font-medium">Popover Title</h4>
                        <p className="text-sm text-muted-foreground">
                            This is the popover content. It can contain any elements.
                        </p>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Popover, PopoverTrigger, PopoverContent, Button } from "@fabioeducacross/ui";

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <h4>Popover Title</h4>
    <p>This is the popover content.</p>
  </PopoverContent>
</Popover>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button 
    class="btn btn-outline-secondary" 
    type="button" 
    data-bs-toggle="popover" 
    title="Popover Title" 
    data-bs-content="This is the popover content."
  >
    Open Popover
  </button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdPopover>
    <EdPopoverTrigger as-child>
      <EdButton variant="outline">Open Popover</EdButton>
    </EdPopoverTrigger>
    <EdPopoverContent>
      <h4>Popover Title</h4>
      <p>This is the popover content.</p>
    </EdPopoverContent>
  </EdPopover>
</template>

<script setup lang="ts">
import { EdPopover, EdPopoverTrigger, EdPopoverContent, EdButton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Popover with form content.
 */
export const WithForm: Story = {
    render: () => (
        <div className="flex justify-center p-20">
            <Popover>
                <PopoverTrigger asChild>
                    <Button>Edit Dimensions</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Dimensions</h4>
                            <p className="text-sm text-muted-foreground">
                                Set the dimensions for the layer.
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="width">Width</Label>
                                <Input
                                    id="width"
                                    defaultValue="100%"
                                    className="col-span-2 h-8"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="height">Height</Label>
                                <Input
                                    id="height"
                                    defaultValue="25px"
                                    className="col-span-2 h-8"
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="maxWidth">Max. Width</Label>
                                <Input
                                    id="maxWidth"
                                    defaultValue="300px"
                                    className="col-span-2 h-8"
                                />
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Popover, PopoverTrigger, PopoverContent, Button, Input, Label } from "@fabioeducacross/ui";

<Popover>
  <PopoverTrigger asChild><Button>Edit Dimensions</Button></PopoverTrigger>
  <PopoverContent className="w-80">
    <h4>Dimensions</h4>
    <div>
      <Label htmlFor="width">Width</Label>
      <Input id="width" defaultValue="100%" />
    </div>
  </PopoverContent>
</Popover>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div>
    <button class="btn btn-primary" data-bs-toggle="popover" data-bs-html="true" data-bs-content="<input class='form-control' placeholder='Width' />">Edit Dimensions</button>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdPopover>
    <EdPopoverTrigger as-child><EdButton>Edit Dimensions</EdButton></EdPopoverTrigger>
    <EdPopoverContent class="w-80">
      <h4>Dimensions</h4>
      <div><EdLabel for="width">Width</EdLabel><EdInput id="width" default-value="100%" /></div>
    </EdPopoverContent>
  </EdPopover>
</template>

<script setup lang="ts">
import { EdPopover, EdPopoverTrigger, EdPopoverContent, EdButton, EdInput, EdLabel } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Controlled popover.
 */
export const Controlled: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <div className="flex justify-center gap-4 p-20">
                <Button variant="outline" onClick={() => setOpen(!open)}>
                    {open ? "Close" : "Open"} Externally
                </Button>

                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button>Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <p className="text-sm">This popover is controlled externally.</p>
                        <PopoverClose>
                            <Button size="sm" className="mt-2">
                                Close
                            </Button>
                        </PopoverClose>
                    </PopoverContent>
                </Popover>
            </div>
        );
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Popover, PopoverTrigger, PopoverContent, PopoverClose, Button } from "@fabioeducacross/ui";
import { useState } from "react";

function ControlledPopover() {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild><Button>Popover</Button></PopoverTrigger>
      <PopoverContent>
        <p>Controlled externally.</p>
        <PopoverClose><Button>Close</Button></PopoverClose>
      </PopoverContent>
    </Popover>
  );
}`,
            vue2: `<!-- Exemplo conceitual com Bootstrap + JavaScript -->
<template>
  <button class="btn btn-primary" @click="togglePopover">Toggle Popover</button>
</template>
<script>
export default {
  methods: {
    togglePopover() {
      // Bootstrap popover toggle via JS
      const popover = new bootstrap.Popover(this.$el);
      popover.toggle();
    }
  }
}
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdPopover :open="open" @open-change="open = $event">
    <EdPopoverTrigger as-child><EdButton>Popover</EdButton></EdPopoverTrigger>
    <EdPopoverContent>
      <p>Controlled externally.</p>
      <EdPopoverClose><EdButton>Close</EdButton></EdPopoverClose>
    </EdPopoverContent>
  </EdPopover>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { EdPopover, EdPopoverTrigger, EdPopoverContent, EdPopoverClose, EdButton } from "@fabioeducacross/ui-vue3";
const open = ref(false);
</script>`,
        },
    },
};

/**
 * Different alignments.
 */
export const Alignment: Story = {
    render: () => (
        <div className="flex justify-center gap-8 p-20">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Align Start</Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                    <p className="text-sm">Aligned to start</p>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Align Center</Button>
                </PopoverTrigger>
                <PopoverContent align="center">
                    <p className="text-sm">Aligned to center</p>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Align End</Button>
                </PopoverTrigger>
                <PopoverContent align="end">
                    <p className="text-sm">Aligned to end</p>
                </PopoverContent>
            </Popover>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Button, Popover, PopoverTrigger, PopoverContent } from "@fabioeducacross/ui";

<div className="flex gap-8">
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline">Align Start</Button>
    </PopoverTrigger>
    <PopoverContent align="start">
      <p className="text-sm">Aligned to start</p>
    </PopoverContent>
  </Popover>

  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline">Align End</Button>
    </PopoverTrigger>
    <PopoverContent align="end">
      <p className="text-sm">Aligned to end</p>
    </PopoverContent>
  </Popover>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap Popover -->
<!-- Bootstrap usa data-bs-placement. -->
<template>
  <div class="d-flex gap-3">
    <button class="btn btn-outline-secondary" data-bs-toggle="popover" data-bs-placement="start" title="Aligned to start">Align Start</button>
    <button class="btn btn-outline-secondary" data-bs-toggle="popover" data-bs-placement="end" title="Aligned to end">Align End</button>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex gap-8">
    <EdPopover>
      <EdPopoverTrigger as-child>
        <EdButton variant="outline">Align Start</EdButton>
      </EdPopoverTrigger>
      <EdPopoverContent align="start">
        <p class="text-sm">Aligned to start</p>
      </EdPopoverContent>
    </EdPopover>

    <EdPopover>
      <EdPopoverTrigger as-child>
        <EdButton variant="outline">Align End</EdButton>
      </EdPopoverTrigger>
      <EdPopoverContent align="end">
        <p class="text-sm">Aligned to end</p>
      </EdPopoverContent>
    </EdPopover>
  </div>
</template>

<script setup lang="ts">
import { EdButton, EdPopover, EdPopoverTrigger, EdPopoverContent } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Different sides.
 */
export const Sides: Story = {
    render: () => (
        <div className="flex justify-center items-center gap-8 p-32">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">Top</Button>
                </PopoverTrigger>
                <PopoverContent side="top">
                    <p className="text-sm">Popover on top</p>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">Bottom</Button>
                </PopoverTrigger>
                <PopoverContent side="bottom">
                    <p className="text-sm">Popover on bottom</p>
                </PopoverContent>
            </Popover>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Button, Popover, PopoverTrigger, PopoverContent } from "@fabioeducacross/ui";

<div className="flex gap-8">
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" size="sm">Top</Button>
    </PopoverTrigger>
    <PopoverContent side="top">
      <p className="text-sm">Popover on top</p>
    </PopoverContent>
  </Popover>

  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" size="sm">Bottom</Button>
    </PopoverTrigger>
    <PopoverContent side="bottom">
      <p className="text-sm">Popover on bottom</p>
    </PopoverContent>
  </Popover>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap Popover -->
<template>
  <div class="d-flex gap-3">
    <button class="btn btn-outline-secondary btn-sm" data-bs-toggle="popover" data-bs-placement="top" title="Popover on top">Top</button>
    <button class="btn btn-outline-secondary btn-sm" data-bs-toggle="popover" data-bs-placement="bottom" title="Popover on bottom">Bottom</button>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex gap-8">
    <EdPopover>
      <EdPopoverTrigger as-child>
        <EdButton variant="outline" size="sm">Top</EdButton>
      </EdPopoverTrigger>
      <EdPopoverContent side="top">
        <p class="text-sm">Popover on top</p>
      </EdPopoverContent>
    </EdPopover>

    <EdPopover>
      <EdPopoverTrigger as-child>
        <EdButton variant="outline" size="sm">Bottom</EdButton>
      </EdPopoverTrigger>
      <EdPopoverContent side="bottom">
        <p class="text-sm">Popover on bottom</p>
      </EdPopoverContent>
    </EdPopover>
  </div>
</template>

<script setup lang="ts">
import { EdButton, EdPopover, EdPopoverTrigger, EdPopoverContent } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Confirmation popover.
 */
export const Confirmation: Story = {
    render: () => {
        const [open, setOpen] = useState(false);

        return (
            <div className="flex justify-center p-20">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="destructive">Delete Item</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h4 className="font-medium">Are you sure?</h4>
                                <p className="text-sm text-muted-foreground">
                                    This action cannot be undone. This will permanently delete the item.
                                </p>
                            </div>
                            <div className="flex gap-2 justify-end">
                                <PopoverClose>
                                    <Button variant="outline" size="sm">
                                        Cancel
                                    </Button>
                                </PopoverClose>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => {
                                        console.log("Deleted!");
                                        setOpen(false);
                                    }}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        );
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { useState } from "react";
import { Button, Popover, PopoverTrigger, PopoverContent, PopoverClose } from "@fabioeducacross/ui";

function ConfirmationPopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Are you sure?</h4>
            <p className="text-sm text-muted-foreground">
              This action cannot be undone.
            </p>
          </div>
          <div className="flex gap-2 justify-end">
            <PopoverClose>
              <Button variant="outline" size="sm">Cancel</Button>
            </PopoverClose>
            <Button variant="destructive" size="sm" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}`,
            vue2: `<!-- Exemplo conceitual com Bootstrap Popover + Modal -->
<template>
  <div>
    <button class="btn btn-danger" @click="showConfirm = true">Delete Item</button>
    <div v-if="showConfirm" class="popover show position-fixed" style="width: 16rem;">
      <div class="popover-body">
        <h5 class="fw-bold">Are you sure?</h5>
        <p class="small text-muted">This action cannot be undone.</p>
        <div class="d-flex gap-2 justify-content-end">
          <button class="btn btn-outline-secondary btn-sm" @click="showConfirm = false">Cancel</button>
          <button class="btn btn-danger btn-sm" @click="deleteItem">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() { return { showConfirm: false }; },
  methods: {
    deleteItem() {
      console.log('Deleted!');
      this.showConfirm = false;
    },
  },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdPopover :open="open" @update:open="open = $event">
    <EdPopoverTrigger as-child>
      <EdButton variant="destructive">Delete Item</EdButton>
    </EdPopoverTrigger>
    <EdPopoverContent class="w-64">
      <div class="space-y-4">
        <div class="space-y-2">
          <h4 class="font-medium">Are you sure?</h4>
          <p class="text-sm text-muted-foreground">This action cannot be undone.</p>
        </div>
        <div class="flex gap-2 justify-end">
          <EdPopoverClose>
            <EdButton variant="outline" size="sm">Cancel</EdButton>
          </EdPopoverClose>
          <EdButton variant="destructive" size="sm" @click="open = false">Delete</EdButton>
        </div>
      </div>
    </EdPopoverContent>
  </EdPopover>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { EdButton, EdPopover, EdPopoverTrigger, EdPopoverContent, EdPopoverClose } from "@fabioeducacross/ui-vue3";

const open = ref(false);
</script>`,
        },
    },
};

/**
 * Settings popover.
 */
export const Settings: Story = {
    render: () => (
        <div className="flex justify-center p-20">
            <Popover>
                <PopoverTrigger asChild>
                    <button className="p-2 rounded hover:bg-accent">
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-56" align="end">
                    <div className="space-y-3">
                        <h4 className="font-medium">Quick Settings</h4>
                        <div className="space-y-2">
                            <label className="flex items-center justify-between">
                                <span className="text-sm">Dark mode</span>
                                <input type="checkbox" className="rounded" />
                            </label>
                            <label className="flex items-center justify-between">
                                <span className="text-sm">Notifications</span>
                                <input type="checkbox" className="rounded" defaultChecked />
                            </label>
                            <label className="flex items-center justify-between">
                                <span className="text-sm">Sound effects</span>
                                <input type="checkbox" className="rounded" />
                            </label>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Popover, PopoverTrigger, PopoverContent } from "@fabioeducacross/ui";

<Popover>
  <PopoverTrigger asChild>
    <button className="p-2 rounded hover:bg-accent">
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0..." />
      </svg>
    </button>
  </PopoverTrigger>
  <PopoverContent className="w-56" align="end">
    <div className="space-y-3">
      <h4 className="font-medium">Quick Settings</h4>
      <div className="space-y-2">
        <label className="flex items-center justify-between">
          <span className="text-sm">Dark mode</span>
          <input type="checkbox" className="rounded" />
        </label>
        <label className="flex items-center justify-between">
          <span className="text-sm">Notifications</span>
          <input type="checkbox" className="rounded" defaultChecked />
        </label>
      </div>
    </div>
  </PopoverContent>
</Popover>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap Popover -->
<template>
  <button class="btn btn-link p-2 rounded" data-bs-toggle="popover" data-bs-html="true" data-bs-content="<div><strong>Quick Settings</strong><div class='form-check'><input class='form-check-input' type='checkbox' id='dark'><label class='form-check-label' for='dark'>Dark mode</label></div></div>">
    <svg class="bi bi-gear" width="20" height="20" fill="currentColor"><use xlink:href="#gear"></use></svg>
  </button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdPopover>
    <EdPopoverTrigger as-child>
      <button class="p-2 rounded hover:bg-accent">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0..." />
        </svg>
      </button>
    </EdPopoverTrigger>
    <EdPopoverContent class="w-56" align="end">
      <div class="space-y-3">
        <h4 class="font-medium">Quick Settings</h4>
        <div class="space-y-2">
          <label class="flex items-center justify-between">
            <span class="text-sm">Dark mode</span>
            <input type="checkbox" class="rounded" />
          </label>
          <label class="flex items-center justify-between">
            <span class="text-sm">Notifications</span>
            <input type="checkbox" class="rounded" :checked="true" />
          </label>
        </div>
      </div>
    </EdPopoverContent>
  </EdPopover>
</template>

<script setup lang="ts">
import { EdPopover, EdPopoverTrigger, EdPopoverContent } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};
