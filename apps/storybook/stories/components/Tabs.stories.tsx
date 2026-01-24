import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@fabioeducacross/ui";

const meta: Meta<typeof Tabs> = {
    title: "Components/Tabs",
    component: Tabs,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Tabs organize content into separate views where only one view can be visible at a time.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

/**
 * Default tabs with uncontrolled state.
 */
export const Default: Story = {
    render: () => (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <div className="p-4 border rounded-md mt-2">
                    <h3 className="font-semibold">Account Settings</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        Manage your account preferences and personal information.
                    </p>
                </div>
            </TabsContent>
            <TabsContent value="password">
                <div className="p-4 border rounded-md mt-2">
                    <h3 className="font-semibold">Password</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        Change your password and security settings.
                    </p>
                </div>
            </TabsContent>
            <TabsContent value="settings">
                <div className="p-4 border rounded-md mt-2">
                    <h3 className="font-semibold">General Settings</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        Configure application preferences.
                    </p>
                </div>
            </TabsContent>
        </Tabs>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@fabioeducacross/ui";

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account content</TabsContent>
  <TabsContent value="password">Password content</TabsContent>
</Tabs>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#account">Account</a></li>
    <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#password">Password</a></li>
  </ul>
  <div class="tab-content">
    <div class="tab-pane fade show active" id="account">Account content</div>
    <div class="tab-pane fade" id="password">Password content</div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdTabs default-value="account">
    <EdTabsList>
      <EdTabsTrigger value="account">Account</EdTabsTrigger>
      <EdTabsTrigger value="password">Password</EdTabsTrigger>
    </EdTabsList>
    <EdTabsContent value="account">Account content</EdTabsContent>
    <EdTabsContent value="password">Password content</EdTabsContent>
  </EdTabs>
</template>

<script setup lang="ts">
import { EdTabs, EdTabsList, EdTabsTrigger, EdTabsContent } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Verify default tab content is visible
        await expect(canvas.getByText("Account Settings")).toBeVisible();

        // Click on Password tab
        const passwordTab = canvas.getByRole("tab", { name: /password/i });
        await userEvent.click(passwordTab);

        // Verify Password content is now visible
        await expect(canvas.getByText(/change your password/i)).toBeVisible();

        // Click on Settings tab
        const settingsTab = canvas.getByRole("tab", { name: /settings/i });
        await userEvent.click(settingsTab);

        // Verify Settings content is now visible
        await expect(canvas.getByText(/configure application/i)).toBeVisible();
    },
};

/**
 * Controlled tabs with external state.
 */
export const Controlled: Story = {
    render: () => {
        const [value, setValue] = useState("tab1");

        return (
            <div className="space-y-4">
                <div className="flex gap-2">
                    <button
                        className="px-3 py-1 border rounded text-sm"
                        onClick={() => setValue("tab1")}
                    >
                        Go to Tab 1
                    </button>
                    <button
                        className="px-3 py-1 border rounded text-sm"
                        onClick={() => setValue("tab2")}
                    >
                        Go to Tab 2
                    </button>
                </div>
                <p className="text-sm text-muted-foreground">Active: {value}</p>

                <Tabs value={value} onValueChange={setValue} className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="tab1">First Tab</TabsTrigger>
                        <TabsTrigger value="tab2">Second Tab</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">
                        <div className="p-4 border rounded-md">Content for first tab</div>
                    </TabsContent>
                    <TabsContent value="tab2">
                        <div className="p-4 border rounded-md">Content for second tab</div>
                    </TabsContent>
                </Tabs>
            </div>
        );
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@fabioeducacross/ui";

const [value, setValue] = useState("tab1");

<Tabs value={value} onValueChange={setValue}>
  <TabsList>
    <TabsTrigger value="tab1">First Tab</TabsTrigger>
    <TabsTrigger value="tab2">Second Tab</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link" :class="{ active: activeTab === 'tab1' }" @click="activeTab = 'tab1'">First Tab</a></li>
    <li class="nav-item"><a class="nav-link" :class="{ active: activeTab === 'tab2' }" @click="activeTab = 'tab2'">Second Tab</a></li>
  </ul>
  <div class="tab-content">
    <div v-if="activeTab === 'tab1'" class="tab-pane">Content 1</div>
    <div v-if="activeTab === 'tab2'" class="tab-pane">Content 2</div>
  </div>
</template>

<script>
export default {
  data() {
    return { activeTab: 'tab1' };
  },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdTabs :value="activeTab" @value-change="activeTab = $event">
    <EdTabsList>
      <EdTabsTrigger value="tab1">First Tab</EdTabsTrigger>
      <EdTabsTrigger value="tab2">Second Tab</EdTabsTrigger>
    </EdTabsList>
    <EdTabsContent value="tab1">Content 1</EdTabsContent>
    <EdTabsContent value="tab2">Content 2</EdTabsContent>
  </EdTabs>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { EdTabs, EdTabsList, EdTabsTrigger, EdTabsContent } from "@fabioeducacross/ui-vue3";

const activeTab = ref("tab1");
</script>`,
        },
    },
};

/**
 * Outline variant tabs.
 */
export const OutlineVariant: Story = {
    render: () => (
        <Tabs defaultValue="overview" variant="outline" className="w-[400px]">
            <TabsList variant="outline">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
                <div className="p-4 border-x border-b rounded-b-md">
                    Overview content with outline variant.
                </div>
            </TabsContent>
            <TabsContent value="analytics">
                <div className="p-4 border-x border-b rounded-b-md">
                    Analytics data and charts.
                </div>
            </TabsContent>
            <TabsContent value="reports">
                <div className="p-4 border-x border-b rounded-b-md">
                    Generated reports.
                </div>
            </TabsContent>
        </Tabs>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@fabioeducacross/ui";

<Tabs defaultValue="overview" variant="outline">
  <TabsList variant="outline">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="analytics">Analytics content</TabsContent>
</Tabs>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <ul class="nav nav-pills" role="tablist">
    <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#overview">Overview</a></li>
    <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#analytics">Analytics</a></li>
  </ul>
  <div class="tab-content border rounded p-3 mt-2">
    <div class="tab-pane fade show active" id="overview">Overview content</div>
    <div class="tab-pane fade" id="analytics">Analytics content</div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdTabs default-value="overview" variant="outline">
    <EdTabsList variant="outline">
      <EdTabsTrigger value="overview">Overview</EdTabsTrigger>
      <EdTabsTrigger value="analytics">Analytics</EdTabsTrigger>
    </EdTabsList>
    <EdTabsContent value="overview">Overview content</EdTabsContent>
    <EdTabsContent value="analytics">Analytics content</EdTabsContent>
  </EdTabs>
</template>

<script setup lang="ts">
import { EdTabs, EdTabsList, EdTabsTrigger, EdTabsContent } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Pills variant tabs.
 */
export const PillsVariant: Story = {
    render: () => (
        <Tabs defaultValue="all" variant="pills" className="w-[400px]">
            <TabsList variant="pills">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
                <div className="p-4 mt-2">Showing all items</div>
            </TabsContent>
            <TabsContent value="active">
                <div className="p-4 mt-2">Showing active items only</div>
            </TabsContent>
            <TabsContent value="completed">
                <div className="p-4 mt-2">Showing completed items</div>
            </TabsContent>
            <TabsContent value="archived">
                <div className="p-4 mt-2">Showing archived items</div>
            </TabsContent>
        </Tabs>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@fabioeducacross/ui";

<Tabs defaultValue="all" variant="pills">
  <TabsList variant="pills">
    <TabsTrigger value="all">All</TabsTrigger>
    <TabsTrigger value="active">Active</TabsTrigger>
    <TabsTrigger value="completed">Completed</TabsTrigger>
  </TabsList>
  <TabsContent value="all">Showing all items</TabsContent>
  <TabsContent value="active">Showing active items only</TabsContent>
  <TabsContent value="completed">Showing completed items</TabsContent>
</Tabs>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap Pills -->
<template>
  <ul class="nav nav-pills mb-3" role="tablist">
    <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#all">All</a></li>
    <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#active">Active</a></li>
    <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#completed">Completed</a></li>
  </ul>
  <div class="tab-content">
    <div class="tab-pane fade show active" id="all">Showing all items</div>
    <div class="tab-pane fade" id="active">Showing active items only</div>
    <div class="tab-pane fade" id="completed">Showing completed items</div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdTabs default-value="all" variant="pills">
    <EdTabsList variant="pills">
      <EdTabsTrigger value="all">All</EdTabsTrigger>
      <EdTabsTrigger value="active">Active</EdTabsTrigger>
      <EdTabsTrigger value="completed">Completed</EdTabsTrigger>
    </EdTabsList>
    <EdTabsContent value="all">Showing all items</EdTabsContent>
    <EdTabsContent value="active">Showing active items only</EdTabsContent>
    <EdTabsContent value="completed">Showing completed items</EdTabsContent>
  </EdTabs>
</template>

<script setup lang="ts">
import { EdTabs, EdTabsList, EdTabsTrigger, EdTabsContent } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Disabled tab trigger.
 */
export const WithDisabled: Story = {
    render: () => (
        <Tabs defaultValue="enabled" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="enabled">Enabled</TabsTrigger>
                <TabsTrigger value="premium" disabled>
                    Premium (Locked)
                </TabsTrigger>
                <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>
            <TabsContent value="enabled">
                <div className="p-4 border rounded-md">Available content</div>
            </TabsContent>
            <TabsContent value="other">
                <div className="p-4 border rounded-md">Other content</div>
            </TabsContent>
        </Tabs>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@fabioeducacross/ui";

<Tabs defaultValue="enabled">
  <TabsList>
    <TabsTrigger value="enabled">Enabled</TabsTrigger>
    <TabsTrigger value="premium" disabled>
      Premium (Locked)
    </TabsTrigger>
    <TabsTrigger value="other">Other</TabsTrigger>
  </TabsList>
  <TabsContent value="enabled">Available content</TabsContent>
  <TabsContent value="other">Other content</TabsContent>
</Tabs>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <ul class="nav nav-tabs" role="tablist">
    <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#enabled">Enabled</a></li>
    <li class="nav-item"><a class="nav-link disabled" tabindex="-1" aria-disabled="true">Premium (Locked)</a></li>
    <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#other">Other</a></li>
  </ul>
  <div class="tab-content border rounded p-3 mt-2">
    <div class="tab-pane fade show active" id="enabled">Available content</div>
    <div class="tab-pane fade" id="other">Other content</div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdTabs default-value="enabled">
    <EdTabsList>
      <EdTabsTrigger value="enabled">Enabled</EdTabsTrigger>
      <EdTabsTrigger value="premium" :disabled="true">
        Premium (Locked)
      </EdTabsTrigger>
      <EdTabsTrigger value="other">Other</EdTabsTrigger>
    </EdTabsList>
    <EdTabsContent value="enabled">Available content</EdTabsContent>
    <EdTabsContent value="other">Other content</EdTabsContent>
  </EdTabs>
</template>

<script setup lang="ts">
import { EdTabs, EdTabsList, EdTabsTrigger, EdTabsContent } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Tabs in a card context.
 */
export const InCard: Story = {
    render: () => (
        <div className="border rounded-lg shadow-sm overflow-hidden w-[450px]">
            <div className="p-4 border-b bg-muted/50">
                <h3 className="font-semibold">User Profile</h3>
            </div>
            <Tabs defaultValue="profile" className="w-full">
                <div className="border-b">
                    <TabsList className="w-full justify-start rounded-none bg-transparent h-auto p-0">
                        <TabsTrigger
                            value="profile"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                        >
                            Profile
                        </TabsTrigger>
                        <TabsTrigger
                            value="activity"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                        >
                            Activity
                        </TabsTrigger>
                        <TabsTrigger
                            value="notifications"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                        >
                            Notifications
                        </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="profile" className="p-4 m-0">
                    <div className="space-y-2">
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-muted-foreground">john@example.com</p>
                    </div>
                </TabsContent>
                <TabsContent value="activity" className="p-4 m-0">
                    <p className="text-sm text-muted-foreground">Recent activity will appear here.</p>
                </TabsContent>
                <TabsContent value="notifications" className="p-4 m-0">
                    <p className="text-sm text-muted-foreground">Notification preferences.</p>
                </TabsContent>
            </Tabs>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@fabioeducacross/ui";

<div className="border rounded-lg shadow-sm overflow-hidden">
  <div className="p-4 border-b bg-muted/50">
    <h3 className="font-semibold">User Profile</h3>
  </div>
  <Tabs defaultValue="profile">
    <div className="border-b">
      <TabsList className="w-full justify-start rounded-none bg-transparent">
        <TabsTrigger value="profile" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
          Profile
        </TabsTrigger>
        <TabsTrigger value="activity" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
          Activity
        </TabsTrigger>
      </TabsList>
    </div>
    <TabsContent value="profile" className="p-4">
      <div className="space-y-2">
        <p className="font-medium">John Doe</p>
        <p className="text-sm text-muted-foreground">john@example.com</p>
      </div>
    </TabsContent>
    <TabsContent value="activity" className="p-4">
      <p className="text-sm text-muted-foreground">Recent activity will appear here.</p>
    </TabsContent>
  </Tabs>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap Card -->
<template>
  <div class="card">
    <div class="card-header bg-light">
      <h5 class="card-title mb-0">User Profile</h5>
    </div>
    <ul class="nav nav-tabs card-header-tabs" role="tablist">
      <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#profile">Profile</a></li>
      <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#activity">Activity</a></li>
    </ul>
    <div class="card-body">
      <div class="tab-content">
        <div class="tab-pane fade show active" id="profile">
          <p class="fw-medium">John Doe</p>
          <p class="text-muted small">john@example.com</p>
        </div>
        <div class="tab-pane fade" id="activity">
          <p class="text-muted small">Recent activity will appear here.</p>
        </div>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="border rounded-lg shadow-sm overflow-hidden">
    <div class="p-4 border-b bg-muted/50">
      <h3 class="font-semibold">User Profile</h3>
    </div>
    <EdTabs default-value="profile">
      <div class="border-b">
        <EdTabsList class="w-full justify-start rounded-none bg-transparent">
          <EdTabsTrigger value="profile" class="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
            Profile
          </EdTabsTrigger>
          <EdTabsTrigger value="activity" class="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
            Activity
          </EdTabsTrigger>
        </EdTabsList>
      </div>
      <EdTabsContent value="profile" class="p-4">
        <div class="space-y-2">
          <p class="font-medium">John Doe</p>
          <p class="text-sm text-muted-foreground">john@example.com</p>
        </div>
      </EdTabsContent>
      <EdTabsContent value="activity" class="p-4">
        <p class="text-sm text-muted-foreground">Recent activity will appear here.</p>
      </EdTabsContent>
    </EdTabs>
  </div>
</template>

<script setup lang="ts">
import { EdTabs, EdTabsList, EdTabsTrigger, EdTabsContent } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Tabs com estilo arredondado (Educacross).
 */
export const Rounded: Story = {
    render: () => (
        <div className="w-full">
            <div className="relative bg-white">
                {/* Container principal */}
                <div className="flex items-end justify-between">
                    {/* Tabs - totalmente à esquerda */}
                    <Tabs defaultValue="redes" variant="rounded">
                        <TabsList variant="rounded" className="gap-0 flex">
                            <TabsTrigger value="redes" variant="rounded">
                                Redes
                            </TabsTrigger>
                            <TabsTrigger value="escolas" variant="rounded">
                                Escolas
                            </TabsTrigger>
                            <TabsTrigger value="professores" variant="rounded">
                                Professores
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    
                    {/* Nome da escola */}
                    <div className="flex items-center gap-[5px] pb-3 pr-6 text-[#6E63E8] whitespace-nowrap">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6"
                        >
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                        </svg>
                        <span className="text-sm font-bold uppercase leading-[20.3px] tracking-[0.14px]">COLÉGIO FLORESTA ENCANTADA</span>
                    </div>
                </div>
                
                {/* Linha inferior roxa */}
                <div className="w-full h-[2px] bg-[#6E63E8]" />
            </div>
        </div>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        
        // Verificar que a tab "Redes" está visível e ativa
        const redesTab = canvas.getByRole("tab", { name: /redes/i });
        await expect(redesTab).toBeVisible();
        await expect(redesTab).toHaveAttribute("data-state", "active");
        
        // Clicar na tab "Escolas"
        const escolasTab = canvas.getByRole("tab", { name: /escolas/i });
        await userEvent.click(escolasTab);
        await expect(escolasTab).toHaveAttribute("data-state", "active");
        
        // Clicar na tab "Professores"
        const professoresTab = canvas.getByRole("tab", { name: /professores/i });
        await userEvent.click(professoresTab);
        await expect(professoresTab).toHaveAttribute("data-state", "active");
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Tabs, TabsList, TabsTrigger } from "@fabioeducacross/ui";

<div className="w-full">
  <div className="relative bg-white">
    <div className="flex items-end justify-between">
      {/* Tabs arredondadas */}
      <Tabs defaultValue="redes" variant="rounded">
        <TabsList variant="rounded" className="gap-0 flex">
          <TabsTrigger value="redes" variant="rounded">Redes</TabsTrigger>
          <TabsTrigger value="escolas" variant="rounded">Escolas</TabsTrigger>
          <TabsTrigger value="professores" variant="rounded">Professores</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Nome da escola */}
      <div className="flex items-center gap-[5px] pb-3 pr-6 text-[#6E63E8]">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
        <span className="text-sm font-bold uppercase tracking-[0.14px]">COLÉGIO FLORESTA ENCANTADA</span>
      </div>
    </div>
    
    {/* Linha inferior roxa */}
    <div className="w-full h-[2px] bg-[#6E63E8]" />
  </div>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap - estilo Educacross -->
<template>
  <div class="bg-white">
    <div class="d-flex justify-content-between align-items-end">
      <!-- Tabs arredondadas -->
      <ul class="nav" role="tablist">
        <li class="nav-item">
          <a class="nav-link active rounded-top border-0 px-4" data-bs-toggle="tab" href="#redes">Redes</a>
        </li>
        <li class="nav-item">
          <a class="nav-link rounded-top border-0 px-4" data-bs-toggle="tab" href="#escolas">Escolas</a>
        </li>
        <li class="nav-item">
          <a class="nav-link rounded-top border-0 px-4" data-bs-toggle="tab" href="#professores">Professores</a>
        </li>
      </ul>
      
      <!-- Nome da escola -->
      <div class="d-flex align-items-center gap-2 pb-3 pe-3 text-primary">
        <svg class="bi" width="24" height="24"><use xlink:href="#building"></use></svg>
        <span class="small fw-bold text-uppercase">COLÉGIO FLORESTA ENCANTADA</span>
      </div>
    </div>
    
    <!-- Linha inferior roxa -->
    <div class="border-bottom border-primary border-2"></div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="w-full">
    <div class="relative bg-white">
      <div class="flex items-end justify-between">
        <!-- Tabs arredondadas -->
        <EdTabs default-value="redes" variant="rounded">
          <EdTabsList variant="rounded" class="gap-0 flex">
            <EdTabsTrigger value="redes" variant="rounded">Redes</EdTabsTrigger>
            <EdTabsTrigger value="escolas" variant="rounded">Escolas</EdTabsTrigger>
            <EdTabsTrigger value="professores" variant="rounded">Professores</EdTabsTrigger>
          </EdTabsList>
        </EdTabs>
        
        <!-- Nome da escola -->
        <div class="flex items-center gap-[5px] pb-3 pr-6 text-[#6E63E8]">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
          <span class="text-sm font-bold uppercase tracking-[0.14px]">COLÉGIO FLORESTA ENCANTADA</span>
        </div>
      </div>
      
      <!-- Linha inferior roxa -->
      <div class="w-full h-[2px] bg-[#6E63E8]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { EdTabs, EdTabsList, EdTabsTrigger } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Tabs arredondadas apenas (sem contexto adicional).
 */
export const RoundedSimple: Story = {
    render: () => (
        <div className="w-full max-w-3xl">
            <div className="relative bg-white rounded-md shadow-sm">
                <Tabs defaultValue="tab1" variant="rounded">
                    {/* Tabs container */}
                    <TabsList variant="rounded" className="gap-0 flex px-6">
                        <TabsTrigger value="tab1" variant="rounded">
                            Primeira Tab
                        </TabsTrigger>
                        <TabsTrigger value="tab2" variant="rounded">
                            Segunda Tab
                        </TabsTrigger>
                        <TabsTrigger value="tab3" variant="rounded">
                            Terceira Tab
                        </TabsTrigger>
                    </TabsList>
                    
                    {/* Linha inferior roxa */}
                    <div className="w-full h-[2px] bg-[#6E63E8]" />
                    
                    <TabsContent value="tab1" className="p-6">
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg">Conteúdo da Primeira Tab</h3>
                            <p className="text-muted-foreground">
                                Este é o conteúdo da primeira aba com o novo estilo arredondado.
                            </p>
                        </div>
                    </TabsContent>
                    <TabsContent value="tab2" className="p-6">
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg">Conteúdo da Segunda Tab</h3>
                            <p className="text-muted-foreground">
                                Aqui está o conteúdo da segunda aba.
                            </p>
                        </div>
                    </TabsContent>
                    <TabsContent value="tab3" className="p-6">
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg">Conteúdo da Terceira Tab</h3>
                            <p className="text-muted-foreground">
                                E este é o conteúdo da terceira aba.
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@fabioeducacross/ui";

<div className="w-full max-w-3xl">
  <div className="bg-white rounded-md shadow-sm">
    <Tabs defaultValue="tab1" variant="rounded">
      <TabsList variant="rounded" className="gap-0 flex px-6">
        <TabsTrigger value="tab1" variant="rounded">Primeira Tab</TabsTrigger>
        <TabsTrigger value="tab2" variant="rounded">Segunda Tab</TabsTrigger>
        <TabsTrigger value="tab3" variant="rounded">Terceira Tab</TabsTrigger>
      </TabsList>
      
      {/* Linha inferior roxa */}
      <div className="w-full h-[2px] bg-[#6E63E8]" />
      
      <TabsContent value="tab1" className="p-6">
        <h3 className="font-semibold text-lg">Conteúdo da Primeira Tab</h3>
        <p className="text-muted-foreground">Este é o conteúdo da primeira aba.</p>
      </TabsContent>
      <TabsContent value="tab2" className="p-6">
        <h3 className="font-semibold text-lg">Conteúdo da Segunda Tab</h3>
        <p className="text-muted-foreground">Aqui está o conteúdo da segunda aba.</p>
      </TabsContent>
      <TabsContent value="tab3" className="p-6">
        <h3 className="font-semibold text-lg">Conteúdo da Terceira Tab</h3>
        <p className="text-muted-foreground">E este é o conteúdo da terceira aba.</p>
      </TabsContent>
    </Tabs>
  </div>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap - estilo arredondado simples -->
<template>
  <div class="bg-white rounded shadow-sm">
    <div class="px-4">
      <ul class="nav" role="tablist">
        <li class="nav-item">
          <a class="nav-link active rounded-top border-0 px-4" data-bs-toggle="tab" href="#tab1">Primeira Tab</a>
        </li>
        <li class="nav-item">
          <a class="nav-link rounded-top border-0 px-4" data-bs-toggle="tab" href="#tab2">Segunda Tab</a>
        </li>
        <li class="nav-item">
          <a class="nav-link rounded-top border-0 px-4" data-bs-toggle="tab" href="#tab3">Terceira Tab</a>
        </li>
      </ul>
    </div>
    
    <!-- Linha inferior roxa -->
    <div class="border-bottom border-primary border-2"></div>
    
    <div class="tab-content p-4">
      <div class="tab-pane fade show active" id="tab1">
        <h5>Conteúdo da Primeira Tab</h5>
        <p class="text-muted">Este é o conteúdo da primeira aba.</p>
      </div>
      <div class="tab-pane fade" id="tab2">
        <h5>Conteúdo da Segunda Tab</h5>
        <p class="text-muted">Aqui está o conteúdo da segunda aba.</p>
      </div>
      <div class="tab-pane fade" id="tab3">
        <h5>Conteúdo da Terceira Tab</h5>
        <p class="text-muted">E este é o conteúdo da terceira aba.</p>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="w-full max-w-3xl">
    <div class="bg-white rounded-md shadow-sm">
      <EdTabs default-value="tab1" variant="rounded">
        <EdTabsList variant="rounded" class="gap-0 flex px-6">
          <EdTabsTrigger value="tab1" variant="rounded">Primeira Tab</EdTabsTrigger>
          <EdTabsTrigger value="tab2" variant="rounded">Segunda Tab</EdTabsTrigger>
          <EdTabsTrigger value="tab3" variant="rounded">Terceira Tab</EdTabsTrigger>
        </EdTabsList>
        
        <!-- Linha inferior roxa -->
        <div class="w-full h-[2px] bg-[#6E63E8]" />
        
        <EdTabsContent value="tab1" class="p-6">
          <h3 class="font-semibold text-lg">Conteúdo da Primeira Tab</h3>
          <p class="text-muted-foreground">Este é o conteúdo da primeira aba.</p>
        </EdTabsContent>
        <EdTabsContent value="tab2" class="p-6">
          <h3 class="font-semibold text-lg">Conteúdo da Segunda Tab</h3>
          <p class="text-muted-foreground">Aqui está o conteúdo da segunda aba.</p>
        </EdTabsContent>
        <EdTabsContent value="tab3" class="p-6">
          <h3 class="font-semibold text-lg">Conteúdo da Terceira Tab</h3>
          <p class="text-muted-foreground">E este é o conteúdo da terceira aba.</p>
        </EdTabsContent>
      </EdTabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EdTabs, EdTabsList, EdTabsTrigger, EdTabsContent } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};
