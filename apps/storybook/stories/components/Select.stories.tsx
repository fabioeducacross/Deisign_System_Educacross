import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Select } from "@fabioeducacross/ui";
import { useState } from "react";

const meta: Meta<typeof Select> = {
    title: "Components/Select",
    component: Select,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Select allows users to choose one option from a dropdown list.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "error"],
            description: "The visual variant",
        },
        size: {
            control: "select",
            options: ["sm", "default", "lg"],
            description: "The size of the select",
        },
        placeholder: {
            control: "text",
            description: "Placeholder text",
        },
        disabled: {
            control: "boolean",
            description: "Whether the select is disabled",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

const fruitOptions = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "mango", label: "Mango" },
];

/**
 * Default select with placeholder.
 */
export const Default: Story = {
    args: {
        placeholder: "Select a fruit",
        options: fruitOptions,
        className: "w-[200px]",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Select } from "@fabioeducacross/ui";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

<Select 
  placeholder="Select a fruit" 
  options={options}
  className="w-[200px]"
/>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <select class="form-select" style="width: 200px">
    <option value="" disabled selected>Select a fruit</option>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="orange">Orange</option>
  </select>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdSelect 
    placeholder="Select a fruit" 
    :options="options"
    class="w-[200px]"
  />
</template>

<script setup lang="ts">
import { EdSelect } from "@fabioeducacross/ui-vue3";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];
</script>`,
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Verify select is visible with placeholder
        const select = canvas.getByRole("combobox");
        await expect(select).toBeVisible();

        // Click to open and select an option
        await userEvent.selectOptions(select, "apple");
        await expect(select).toHaveValue("apple");
    },
};

/**
 * Select with pre-selected value.
 */
export const WithValue: Story = {
    args: {
        options: fruitOptions,
        defaultValue: "banana",
        className: "w-[200px]",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Select } from "@fabioeducacross/ui";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

<Select 
  options={options}
  defaultValue="banana"
  className="w-[200px]"
/>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <select class="form-select" style="width: 200px">
    <option value="apple">Apple</option>
    <option value="banana" selected>Banana</option>
    <option value="orange">Orange</option>
  </select>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdSelect 
    :options="options"
    default-value="banana"
    class="w-[200px]"
  />
</template>

<script setup lang="ts">
import { EdSelect } from "@fabioeducacross/ui-vue3";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];
</script>`,
        },
    },
};

/**
 * Controlled select.
 */
export const Controlled: Story = {
    render: () => {
        const [value, setValue] = useState("");
        return (
            <div className="space-y-4">
                <Select
                    options={fruitOptions}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Select a fruit"
                    className="w-[200px]"
                />
                <p className="text-sm text-muted-foreground">
                    Selected: {value || "None"}
                </p>
            </div>
        );
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Select } from "@fabioeducacross/ui";
import { useState } from "react";

function ControlledSelectExample() {
  const [value, setValue] = useState("");
  
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
  ];
  
  return (
    <div className="space-y-4">
      <Select
        options={options}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Select a fruit"
        className="w-[200px]"
      />
      <p className="text-sm text-muted-foreground">
        Selected: {value || "None"}
      </p>
    </div>
  );
}`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-3">
    <select class="form-select" v-model="selected" style="width: 200px">
      <option value="" disabled>Select a fruit</option>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="orange">Orange</option>
    </select>
    <p class="text-muted small">
      Selected: {{ selected || 'None' }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: ''
    };
  }
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="space-y-4">
    <EdSelect
      :options="options"
      :value="value"
      @update:value="value = $event"
      placeholder="Select a fruit"
      class="w-[200px]"
    />
    <p class="text-sm text-muted-foreground">
      Selected: {{ value || 'None' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { EdSelect } from "@fabioeducacross/ui-vue3";

const value = ref("");
const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];
</script>`,
        },
    },
};

/**
 * All select sizes.
 */
export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Select
                size="sm"
                options={fruitOptions}
                placeholder="Small"
                className="w-[200px]"
            />
            <Select
                size="default"
                options={fruitOptions}
                placeholder="Default"
                className="w-[200px]"
            />
            <Select
                size="lg"
                options={fruitOptions}
                placeholder="Large"
                className="w-[200px]"
            />
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Select } from "@fabioeducacross/ui";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
];

<div className="flex flex-col gap-4">
  <Select
    size="sm"
    options={options}
    placeholder="Small"
    className="w-[200px]"
  />
  <Select
    size="default"
    options={options}
    placeholder="Default"
    className="w-[200px]"
  />
  <Select
    size="lg"
    options={options}
    placeholder="Large"
    className="w-[200px]"
  />
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-3">
    <select class="form-select form-select-sm" style="width: 200px">
      <option value="" disabled selected>Small</option>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
    </select>
    <select class="form-select" style="width: 200px">
      <option value="" disabled selected>Default</option>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
    </select>
    <select class="form-select form-select-lg" style="width: 200px">
      <option value="" disabled selected>Large</option>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
    </select>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex flex-col gap-4">
    <EdSelect
      size="sm"
      :options="options"
      placeholder="Small"
      class="w-[200px]"
    />
    <EdSelect
      size="default"
      :options="options"
      placeholder="Default"
      class="w-[200px]"
    />
    <EdSelect
      size="lg"
      :options="options"
      placeholder="Large"
      class="w-[200px]"
    />
  </div>
</template>

<script setup lang="ts">
import { EdSelect } from "@fabioeducacross/ui-vue3";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
];
</script>`,
        },
    },
};

/**
 * Disabled select.
 */
export const Disabled: Story = {
    args: {
        options: fruitOptions,
        placeholder: "Select a fruit",
        disabled: true,
        className: "w-[200px]",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Select } from "@fabioeducacross/ui";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
];

<Select 
  placeholder="Select a fruit" 
  options={options}
  disabled={true}
  className="w-[200px]"
/>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <select class="form-select" disabled style="width: 200px">
    <option value="" disabled selected>Select a fruit</option>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
  </select>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdSelect 
    placeholder="Select a fruit" 
    :options="options"
    :disabled="true"
    class="w-[200px]"
  />
</template>

<script setup lang="ts">
import { EdSelect } from "@fabioeducacross/ui-vue3";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
];
</script>`,
        },
    },
};

/**
 * Select with error.
 */
export const WithError: Story = {
    args: {
        options: fruitOptions,
        placeholder: "Select a fruit",
        error: "Please select a fruit.",
        className: "w-[200px]",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Select } from "@fabioeducacross/ui";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
];

<Select 
  options={options}
  placeholder="Select a fruit"
  error="Please select a fruit."
  className="w-[200px]"
/>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div>
    <select class="form-select is-invalid" style="width: 200px">
      <option value="" disabled selected>Select a fruit</option>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
    </select>
    <div class="invalid-feedback d-block">
      Please select a fruit.
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdSelect 
    :options="options"
    placeholder="Select a fruit"
    error="Please select a fruit."
    class="w-[200px]"
  />
</template>

<script setup lang="ts">
import { EdSelect } from "@fabioeducacross/ui-vue3";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
];
</script>`,
        },
    },
};

/**
 * Select with disabled options.
 */
export const DisabledOptions: Story = {
    args: {
        placeholder: "Select a plan",
        options: [
            { value: "free", label: "Free" },
            { value: "basic", label: "Basic" },
            { value: "pro", label: "Pro (Coming Soon)", disabled: true },
            {
                value: "enterprise",
                label: "Enterprise (Coming Soon)",
                disabled: true,
            },
        ],
        className: "w-[250px]",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Select } from "@fabioeducacross/ui";

const options = [
  { value: "free", label: "Free" },
  { value: "basic", label: "Basic" },
  { value: "pro", label: "Pro (Coming Soon)", disabled: true },
  { value: "enterprise", label: "Enterprise (Coming Soon)", disabled: true },
];

<Select 
  placeholder="Select a plan"
  options={options}
  className="w-[250px]"
/>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <select class="form-select" style="width: 250px">
    <option value="" disabled selected>Select a plan</option>
    <option value="free">Free</option>
    <option value="basic">Basic</option>
    <option value="pro" disabled>Pro (Coming Soon)</option>
    <option value="enterprise" disabled>Enterprise (Coming Soon)</option>
  </select>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdSelect 
    placeholder="Select a plan"
    :options="options"
    class="w-[250px]"
  />
</template>

<script setup lang="ts">
import { EdSelect } from "@fabioeducacross/ui-vue3";

const options = [
  { value: "free", label: "Free" },
  { value: "basic", label: "Basic" },
  { value: "pro", label: "Pro (Coming Soon)", disabled: true },
  { value: "enterprise", label: "Enterprise (Coming Soon)", disabled: true },
];
</script>`,
        },
    },
};

/**
 * Select in a form layout.
 */
export const InForm: Story = {
    render: () => (
        <div className="w-[300px] space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="country">
                    Country
                </label>
                <Select
                    id="country"
                    placeholder="Select your country"
                    options={[
                        { value: "br", label: "Brazil" },
                        { value: "us", label: "United States" },
                        { value: "uk", label: "United Kingdom" },
                        { value: "de", label: "Germany" },
                        { value: "fr", label: "France" },
                    ]}
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="language">
                    Language
                </label>
                <Select
                    id="language"
                    placeholder="Select language"
                    options={[
                        { value: "pt", label: "Portuguese" },
                        { value: "en", label: "English" },
                        { value: "es", label: "Spanish" },
                        { value: "de", label: "German" },
                    ]}
                />
            </div>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Select } from "@fabioeducacross/ui";

<div className="w-[300px] space-y-4">
  <div className="space-y-2">
    <label className="text-sm font-medium" htmlFor="country">
      Country
    </label>
    <Select
      id="country"
      placeholder="Select your country"
      options={[
        { value: "br", label: "Brazil" },
        { value: "us", label: "United States" },
        { value: "uk", label: "United Kingdom" },
        { value: "de", label: "Germany" },
        { value: "fr", label: "France" },
      ]}
    />
  </div>
  <div className="space-y-2">
    <label className="text-sm font-medium" htmlFor="language">
      Language
    </label>
    <Select
      id="language"
      placeholder="Select language"
      options={[
        { value: "pt", label: "Portuguese" },
        { value: "en", label: "English" },
        { value: "es", label: "Spanish" },
        { value: "de", label: "German" },
      ]}
    />
  </div>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div style="width: 300px;">
    <div class="mb-3">
      <label for="country" class="form-label small fw-medium">Country</label>
      <select class="form-select" id="country">
        <option value="" disabled selected>Select your country</option>
        <option value="br">Brazil</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="de">Germany</option>
        <option value="fr">France</option>
      </select>
    </div>
    <div>
      <label for="language" class="form-label small fw-medium">Language</label>
      <select class="form-select" id="language">
        <option value="" disabled selected>Select language</option>
        <option value="pt">Portuguese</option>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="de">German</option>
      </select>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="w-[300px] space-y-4">
    <div class="space-y-2">
      <label class="text-sm font-medium" for="country">
        Country
      </label>
      <EdSelect
        id="country"
        placeholder="Select your country"
        :options="countryOptions"
      />
    </div>
    <div class="space-y-2">
      <label class="text-sm font-medium" for="language">
        Language
      </label>
      <EdSelect
        id="language"
        placeholder="Select language"
        :options="languageOptions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { EdSelect } from "@fabioeducacross/ui-vue3";

const countryOptions = [
  { value: "br", label: "Brazil" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
];

const languageOptions = [
  { value: "pt", label: "Portuguese" },
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "de", label: "German" },
];
</script>`,
        },
    },
};
