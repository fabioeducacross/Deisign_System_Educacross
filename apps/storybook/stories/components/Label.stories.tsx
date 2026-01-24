import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Label, Input } from "@fabioeducacross/ui";

const meta: Meta<typeof Label> = {
    title: "Components/Label",
    component: Label,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: `
O **Label** é o componente para rotular campos de formulário.

## Características
- ✅ 3 variantes visuais
- ✅ Indicador de campo obrigatório
- ✅ Integração com inputs via \`htmlFor\`
- ✅ Acessível: associação correta com campos
        `,
            },
        },
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "error", "muted"],
            description: "Visual variant of the label",
        },
        required: {
            control: "boolean",
            description: "Shows required indicator (*)",
        },
        htmlFor: {
            control: "text",
            description: "ID of the associated input element",
        },
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// DEFAULT STORIES
// =============================================================================

export const Default: Story = {
    args: {
        children: "Label",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Label } from "@fabioeducacross/ui";

<Label>Label</Label>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <label class="form-label">Label</label>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdLabel>Label</EdLabel>
</template>

<script setup lang="ts">
import { EdLabel } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const Playground: Story = {
    args: {
        children: "Playground Label",
        variant: "default",
        required: false,
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Label } from "@fabioeducacross/ui";

<Label variant="default">Playground Label</Label>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <label class="form-label">Playground Label</label>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdLabel variant="default">Playground Label</EdLabel>
</template>

<script setup lang="ts">
import { EdLabel } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

// =============================================================================
// VARIANT STORIES
// =============================================================================

export const ErrorVariant: Story = {
    args: {
        children: "Campo inválido",
        variant: "error",
    },
    parameters: {
        docs: {
            description: {
                story: "Use a variante `error` para indicar campos com erro de validação.",
            },
        },
        multiFrameworkCode: {
            react: `import { Label } from "@fabioeducacross/ui";

<Label variant="error">Campo inválido</Label>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <label class="form-label text-danger">Campo inválido</label>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdLabel variant="error">Campo inválido</EdLabel>
</template>

<script setup lang="ts">
import { EdLabel } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const MutedVariant: Story = {
    args: {
        children: "Campo opcional",
        variant: "muted",
    },
    parameters: {
        docs: {
            description: {
                story: "Use a variante `muted` para labels de campos opcionais ou menos importantes.",
            },
        },
        multiFrameworkCode: {
            react: `import { Label } from "@fabioeducacross/ui";

<Label variant="muted">Campo opcional</Label>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <label class="form-label text-muted">Campo opcional</label>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdLabel variant="muted">Campo opcional</EdLabel>
</template>

<script setup lang="ts">
import { EdLabel } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

// =============================================================================
// STATE STORIES
// =============================================================================

export const Required: Story = {
    args: {
        children: "Campo obrigatório",
        required: true,
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Label } from "@fabioeducacross/ui";

<Label required={true}>Campo obrigatório</Label>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <label class="form-label">
    Campo obrigatório
    <span class="text-danger ms-1">*</span>
  </label>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdLabel :required="true">Campo obrigatório</EdLabel>
</template>

<script setup lang="ts">
import { EdLabel } from "@fabioeducacross/ui-vue3";
</script>`,
        },
        docs: {
            description: {
                story: "Use `required={true}` para mostrar o indicador (*) em campos obrigatórios.",
            },
        },
    },
};

// =============================================================================
// ALL SHOWCASE
// =============================================================================

export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Label variant="default">Default Label</Label>
            <Label variant="error">Error Label</Label>
            <Label variant="muted">Muted Label</Label>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Label } from "@fabioeducacross/ui";

<div className="flex flex-col gap-4">
  <Label variant="default">Default Label</Label>
  <Label variant="error">Error Label</Label>
  <Label variant="muted">Muted Label</Label>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-3">
    <label class="form-label">Default Label</label>
    <label class="form-label text-danger">Error Label</label>
    <label class="form-label text-muted">Muted Label</label>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex flex-col gap-4">
    <EdLabel variant="default">Default Label</EdLabel>
    <EdLabel variant="error">Error Label</EdLabel>
    <EdLabel variant="muted">Muted Label</EdLabel>
  </div>
</template>

<script setup lang="ts">
import { EdLabel } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const WithInput: Story = {
    render: () => (
        <div className="flex flex-col gap-2 w-80">
            <Label htmlFor="email-example">Email</Label>
            <Input id="email-example" type="email" placeholder="seu@email.com" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Sempre associe o Label ao Input usando `htmlFor` e `id` correspondentes.",
            },
        },
        multiFrameworkCode: {
            react: `import { Label, Input } from "@fabioeducacross/ui";

<div className="flex flex-col gap-2">
  <Label htmlFor="email-example">Email</Label>
  <Input id="email-example" type="email" placeholder="seu@email.com" />
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-2">
    <label for="email-example" class="form-label">Email</label>
    <input 
      id="email-example" 
      type="email" 
      class="form-control" 
      placeholder="seu@email.com"
    />
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex flex-col gap-2">
    <EdLabel html-for="email-example">Email</EdLabel>
    <EdInput id="email-example" type="email" placeholder="seu@email.com" />
  </div>
</template>

<script setup lang="ts">
import { EdLabel, EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const RequiredWithInput: Story = {
    render: () => (
        <div className="flex flex-col gap-2 w-80">
            <Label htmlFor="password-example" required>
                Senha
            </Label>
            <Input id="password-example" type="password" placeholder="••••••••" />
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Label, Input } from "@fabioeducacross/ui";

<div className="flex flex-col gap-2">
  <Label htmlFor="password-example" required>
    Senha
  </Label>
  <Input id="password-example" type="password" placeholder="••••••••" />
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-2">
    <label for="password-example" class="form-label">
      Senha
      <span class="text-danger ms-1">*</span>
    </label>
    <input 
      id="password-example" 
      type="password" 
      class="form-control" 
      placeholder="••••••••"
    />
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex flex-col gap-2">
    <EdLabel html-for="password-example" :required="true">
      Senha
    </EdLabel>
    <EdInput id="password-example" type="password" placeholder="••••••••" />
  </div>
</template>

<script setup lang="ts">
import { EdLabel, EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const ErrorWithInput: Story = {
    render: () => (
        <div className="flex flex-col gap-2 w-80">
            <Label htmlFor="error-example" variant="error">
                Email inválido
            </Label>
            <Input id="error-example" type="email" error defaultValue="invalido" />
            <span className="text-sm text-destructive">Por favor, insira um email válido.</span>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Combine `Label variant='error'` com `Input error={true}` para estados de erro.",
            },
        },
        multiFrameworkCode: {
            react: `import { Label, Input } from "@fabioeducacross/ui";

<div className="flex flex-col gap-2">
  <Label htmlFor="error-example" variant="error">
    Email inválido
  </Label>
  <Input id="error-example" type="email" error defaultValue="invalido" />
  <span className="text-sm text-destructive">
    Por favor, insira um email válido.
  </span>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-2">
    <label for="error-example" class="form-label text-danger">
      Email inválido
    </label>
    <input 
      id="error-example" 
      type="email" 
      class="form-control is-invalid" 
      value="invalido"
    />
    <span class="text-danger small">
      Por favor, insira um email válido.
    </span>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex flex-col gap-2">
    <EdLabel html-for="error-example" variant="error">
      Email inválido
    </EdLabel>
    <EdInput id="error-example" type="email" :error="true" model-value="invalido" />
    <span class="text-sm text-destructive">
      Por favor, insira um email válido.
    </span>
  </div>
</template>

<script setup lang="ts">
import { EdLabel, EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

// =============================================================================
// PATTERNS
// =============================================================================

export const FormFieldPattern: Story = {
    render: () => (
        <div className="flex flex-col gap-6 w-80">
            <div className="flex flex-col gap-2">
                <Label htmlFor="name" required>
                    Nome completo
                </Label>
                <Input id="name" placeholder="Jane Doe" />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="email" required>
                    Email
                </Label>
                <Input id="email" type="email" placeholder="jane@exemplo.com" />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="bio" variant="muted">
                    Bio (opcional)
                </Label>
                <Input id="bio" placeholder="Conte um pouco sobre você" />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Padrão recomendado para campos de formulário: Label + Input com associação via htmlFor/id.",
            },
        },
        multiFrameworkCode: {
            react: `import { Label, Input } from "@fabioeducacross/ui";

<div className="flex flex-col gap-6">
  <div className="flex flex-col gap-2">
    <Label htmlFor="name" required>Nome completo</Label>
    <Input id="name" placeholder="Jane Doe" />
  </div>
  
  <div className="flex flex-col gap-2">
    <Label htmlFor="email" required>Email</Label>
    <Input id="email" type="email" placeholder="jane@exemplo.com" />
  </div>
  
  <div className="flex flex-col gap-2">
    <Label htmlFor="bio" variant="muted">Bio (opcional)</Label>
    <Input id="bio" placeholder="Conte um pouco sobre você" />
  </div>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-4">
    <div class="d-flex flex-column gap-2">
      <label for="name" class="form-label">
        Nome completo <span class="text-danger">*</span>
      </label>
      <input id="name" class="form-control" placeholder="Jane Doe" />
    </div>
    
    <div class="d-flex flex-column gap-2">
      <label for="email" class="form-label">
        Email <span class="text-danger">*</span>
      </label>
      <input id="email" type="email" class="form-control" placeholder="jane@exemplo.com" />
    </div>
    
    <div class="d-flex flex-column gap-2">
      <label for="bio" class="form-label text-muted">Bio (opcional)</label>
      <input id="bio" class="form-control" placeholder="Conte um pouco sobre você" />
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <EdLabel html-for="name" :required="true">Nome completo</EdLabel>
      <EdInput id="name" placeholder="Jane Doe" />
    </div>
    
    <div class="flex flex-col gap-2">
      <EdLabel html-for="email" :required="true">Email</EdLabel>
      <EdInput id="email" type="email" placeholder="jane@exemplo.com" />
    </div>
    
    <div class="flex flex-col gap-2">
      <EdLabel html-for="bio" variant="muted">Bio (opcional)</EdLabel>
      <EdInput id="bio" placeholder="Conte um pouco sobre você" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { EdLabel, EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

// =============================================================================
// INTERACTION TESTS
// =============================================================================

export const LabelClickInteraction: Story = {
    render: () => (
        <div className="flex flex-col gap-2 w-80">
            <Label htmlFor="click-test">Click this label</Label>
            <Input id="click-test" placeholder="Input will focus" />
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Label, Input } from "@fabioeducacross/ui";

<div className="flex flex-col gap-2">
  <Label htmlFor="click-test">Click this label</Label>
  <Input id="click-test" placeholder="Input will focus" />
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-2">
    <label for="click-test" class="form-label">Click this label</label>
    <input id="click-test" class="form-control" placeholder="Input will focus" />
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex flex-col gap-2">
    <EdLabel html-for="click-test">Click this label</EdLabel>
    <EdInput id="click-test" placeholder="Input will focus" />
  </div>
</template>

<script setup lang="ts">
import { EdLabel, EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const label = canvas.getByText("Click this label");
        const input = canvas.getByPlaceholderText("Input will focus");

        // Verify label has correct htmlFor
        await expect(label).toHaveAttribute("for", "click-test");

        // Click the label
        await label.click();

        // Verify input is focused
        await expect(input).toHaveFocus();
    },
};

export const RequiredIndicatorInteraction: Story = {
    args: {
        children: "Required field",
        required: true,
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Label } from "@fabioeducacross/ui";

<Label required>Required field</Label>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <label class="form-label">
    Required field
    <span class="text-danger ms-1" aria-hidden="true">*</span>
  </label>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdLabel :required="true">Required field</EdLabel>
</template>

<script setup lang="ts">
import { EdLabel } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const asterisk = canvas.getByText("*");

        // Verify asterisk is present and hidden from screen readers
        await expect(asterisk).toBeVisible();
        await expect(asterisk).toHaveAttribute("aria-hidden", "true");
    },
};

export const AccessibilityTest: Story = {
    render: () => (
        <div className="flex flex-col gap-2 w-80">
            <Label htmlFor="a11y-test" required>
                Accessible Label
            </Label>
            <Input id="a11y-test" placeholder="Accessible input" />
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Label, Input } from "@fabioeducacross/ui";

<div className="flex flex-col gap-2">
  <Label htmlFor="a11y-test" required>
    Accessible Label
  </Label>
  <Input id="a11y-test" placeholder="Accessible input" />
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-2">
    <label for="a11y-test" class="form-label">
      Accessible Label
      <span class="text-danger ms-1" aria-hidden="true">*</span>
    </label>
    <input 
      id="a11y-test" 
      class="form-control" 
      placeholder="Accessible input"
    />
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex flex-col gap-2">
    <EdLabel html-for="a11y-test" :required="true">
      Accessible Label
    </EdLabel>
    <EdInput id="a11y-test" placeholder="Accessible input" />
  </div>
</template>

<script setup lang="ts">
import { EdLabel, EdInput } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByPlaceholderText("Accessible input");
        const label = canvas.getByText("Accessible Label");

        // Verify proper association
        await expect(label).toHaveAttribute("for", "a11y-test");
        await expect(input).toHaveAttribute("id", "a11y-test");
    },
};
