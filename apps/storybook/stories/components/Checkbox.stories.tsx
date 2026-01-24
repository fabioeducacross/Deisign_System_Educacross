import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "@fabioeducacross/ui";
import { useState } from "react";

const meta: Meta<typeof Checkbox> = {
    title: "Components/Checkbox",
    component: Checkbox,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Checkbox allows users to select one or more options from a list.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "default", "lg"],
            description: "The size of the checkbox",
        },
        variant: {
            control: "select",
            options: ["default", "error"],
            description: "The visual variant",
        },
        label: {
            control: "text",
            description: "Label text",
        },
        description: {
            control: "text",
            description: "Description text below the label",
        },
        error: {
            control: "text",
            description: "Error message",
        },
        disabled: {
            control: "boolean",
            description: "Whether the checkbox is disabled",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default checkbox with label.
 */
export const Default: Story = {
    args: {
        label: "Accept terms and conditions",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Checkbox } from "@fabioeducacross/ui";

<Checkbox label="Accept terms and conditions" />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="terms" />
    <label class="form-check-label" for="terms">
      Accept terms and conditions
    </label>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdCheckbox label="Accept terms and conditions" />
</template>

<script setup lang="ts">
import { EdCheckbox } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Checked checkbox state.
 */
export const Checked: Story = {
    args: {
        label: "I agree to the terms",
        defaultChecked: true,
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Checkbox } from "@fabioeducacross/ui";

<Checkbox label="I agree to the terms" defaultChecked={true} />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="agree" checked />
    <label class="form-check-label" for="agree">
      I agree to the terms
    </label>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdCheckbox label="I agree to the terms" :default-checked="true" />
</template>

<script setup lang="ts">
import { EdCheckbox } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Indeterminate checkbox state (partial selection).
 */
export const Indeterminate: Story = {
    render: () => {
        const [checked, setChecked] = useState<boolean | "indeterminate">("indeterminate");
        return (
            <Checkbox
                label="Select all items"
                checked={checked === true}
                indeterminate={checked === "indeterminate"}
                onChange={(e) => setChecked(e.target.checked)}
            />
        );
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Checkbox } from "@fabioeducacross/ui";
import { useState } from "react";

function IndeterminateExample() {
  const [checked, setChecked] = useState<boolean | "indeterminate">("indeterminate");
  
  return (
    <Checkbox
      label="Select all items"
      checked={checked === true}
      indeterminate={checked === "indeterminate"}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}`,
            vue2: `<!-- Exemplo conceitual com Bootstrap + JavaScript -->
<template>
  <div class="form-check">
    <input 
      class="form-check-input" 
      type="checkbox" 
      id="selectAll"
      ref="checkbox"
      @change="handleChange"
    />
    <label class="form-check-label" for="selectAll">
      Select all items
    </label>
  </div>
</template>

<script>
export default {
  mounted() {
    // Set indeterminate state via DOM
    this.$refs.checkbox.indeterminate = true;
  },
  methods: {
    handleChange(e) {
      e.target.indeterminate = false;
    }
  }
}
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdCheckbox
    label="Select all items"
    :checked="checked === true"
    :indeterminate="checked === 'indeterminate'"
    @change="(e) => checked = e.target.checked"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { EdCheckbox } from "@fabioeducacross/ui-vue3";

const checked = ref<boolean | 'indeterminate'>('indeterminate');
</script>`,
        },
    },
};

/**
 * Checkbox with description.
 */
export const WithDescription: Story = {
    args: {
        label: "Marketing emails",
        description: "Receive emails about new products and features.",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Checkbox } from "@fabioeducacross/ui";

<Checkbox 
  label="Marketing emails" 
  description="Receive emails about new products and features."
/>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="marketing" />
    <label class="form-check-label" for="marketing">
      Marketing emails
    </label>
    <div class="form-text">Receive emails about new products and features.</div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdCheckbox 
    label="Marketing emails" 
    description="Receive emails about new products and features."
  />
</template>

<script setup lang="ts">
import { EdCheckbox } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Controlled checkbox example.
 */
export const Controlled: Story = {
    render: () => {
        const [checked, setChecked] = useState(false);
        return (
            <div className="space-y-4">
                <Checkbox
                    label="Controlled checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                />
                <p className="text-sm text-muted-foreground">
                    Checked: {checked ? "Yes" : "No"}
                </p>
            </div>
        );
    },    parameters: {
        multiFrameworkCode: {
            react: `import { Checkbox } from "@fabioeducacross/ui";
import { useState } from "react";

function ControlledCheckboxExample() {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="space-y-4">
      <Checkbox
        label="Controlled checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <p className="text-sm text-muted-foreground">
        Checked: {checked ? "Yes" : "No"}
      </p>
    </div>
  );
}`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-3">
    <div class="form-check">
      <input 
        class="form-check-input" 
        type="checkbox" 
        id="controlled-check"
        v-model="checked"
      />
      <label class="form-check-label" for="controlled-check">
        Controlled checkbox
      </label>
    </div>
    <p class="text-muted small">
      Checked: {{ checked ? 'Yes' : 'No' }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false
    };
  }
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="space-y-4">
    <EdCheckbox
      label="Controlled checkbox"
      :checked="checked"
      @update:checked="checked = $event"
    />
    <p class="text-sm text-muted-foreground">
      Checked: {{ checked ? 'Yes' : 'No' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { EdCheckbox } from "@fabioeducacross/ui-vue3";

const checked = ref(false);
</script>`,
        },
    },};

/**
 * All checkbox sizes.
 */
export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Checkbox size="sm" label="Small checkbox" />
            <Checkbox size="default" label="Default checkbox" />
            <Checkbox size="lg" label="Large checkbox" />
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Checkbox } from "@fabioeducacross/ui";

<div className="flex flex-col gap-4">
  <Checkbox size="sm" label="Small checkbox" />
  <Checkbox size="default" label="Default checkbox" />
  <Checkbox size="lg" label="Large checkbox" />
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-3">
    <div class="form-check form-check-sm">
      <input class="form-check-input" type="checkbox" id="check-sm" />
      <label class="form-check-label small" for="check-sm">
        Small checkbox
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="check-default" />
      <label class="form-check-label" for="check-default">
        Default checkbox
      </label>
    </div>
    <div class="form-check form-check-lg">
      <input class="form-check-input" type="checkbox" id="check-lg" style="width: 1.5rem; height: 1.5rem;" />
      <label class="form-check-label" for="check-lg">
        Large checkbox
      </label>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex flex-col gap-4">
    <EdCheckbox size="sm" label="Small checkbox" />
    <EdCheckbox size="default" label="Default checkbox" />
    <EdCheckbox size="lg" label="Large checkbox" />
  </div>
</template>

<script setup lang="ts">
import { EdCheckbox } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Checkbox states.
 */
export const States: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Checkbox label="Unchecked" />
            <Checkbox label="Checked" defaultChecked />
            <Checkbox label="Disabled" disabled />
            <Checkbox label="Disabled & Checked" disabled defaultChecked />
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Checkbox } from "@fabioeducacross/ui";

<div className="flex flex-col gap-4">
  <Checkbox label="Unchecked" />
  <Checkbox label="Checked" defaultChecked />
  <Checkbox label="Disabled" disabled />
  <Checkbox label="Disabled & Checked" disabled defaultChecked />
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-3">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="unchecked" />
      <label class="form-check-label" for="unchecked">Unchecked</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="checked" checked />
      <label class="form-check-label" for="checked">Checked</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="disabled" disabled />
      <label class="form-check-label" for="disabled">Disabled</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="disabled-checked" disabled checked />
      <label class="form-check-label" for="disabled-checked">Disabled & Checked</label>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex flex-col gap-4">
    <EdCheckbox label="Unchecked" />
    <EdCheckbox label="Checked" :default-checked="true" />
    <EdCheckbox label="Disabled" :disabled="true" />
    <EdCheckbox label="Disabled & Checked" :disabled="true" :default-checked="true" />
  </div>
</template>

<script setup lang="ts">
import { EdCheckbox } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Checkbox with error.
 */
export const WithError: Story = {
    args: {
        label: "Accept terms",
        error: "You must accept the terms to continue.",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Checkbox } from "@fabioeducacross/ui";

<Checkbox 
  label="Accept terms" 
  error="You must accept the terms to continue." 
/>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="form-check">
    <input class="form-check-input is-invalid" type="checkbox" id="error-check" />
    <label class="form-check-label" for="error-check">
      Accept terms
    </label>
    <div class="invalid-feedback d-block">
      You must accept the terms to continue.
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdCheckbox 
    label="Accept terms" 
    error="You must accept the terms to continue." 
  />
</template>

<script setup lang="ts">
import { EdCheckbox } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Checkbox group for multiple selections.
 */
export const CheckboxGroup: Story = {
    render: () => (
        <div className="space-y-4">
            <p className="font-medium">Select your interests:</p>
            <div className="space-y-2">
                <Checkbox label="Technology" />
                <Checkbox label="Design" />
                <Checkbox label="Business" />
                <Checkbox label="Marketing" />
            </div>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Checkbox } from "@fabioeducacross/ui";

<div className="space-y-4">
  <p className="font-medium">Select your interests:</p>
  <div className="space-y-2">
    <Checkbox label="Technology" />
    <Checkbox label="Design" />
    <Checkbox label="Business" />
    <Checkbox label="Marketing" />
  </div>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-3">
    <p class="fw-medium">Select your interests:</p>
    <div class="d-flex flex-column gap-2">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="tech" />
        <label class="form-check-label" for="tech">Technology</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="design" />
        <label class="form-check-label" for="design">Design</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="business" />
        <label class="form-check-label" for="business">Business</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="marketing" />
        <label class="form-check-label" for="marketing">Marketing</label>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="space-y-4">
    <p class="font-medium">Select your interests:</p>
    <div class="space-y-2">
      <EdCheckbox label="Technology" />
      <EdCheckbox label="Design" />
      <EdCheckbox label="Business" />
      <EdCheckbox label="Marketing" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { EdCheckbox } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Checkbox in a form with complex layout.
 */
export const InForm: Story = {
    render: () => (
        <div className="w-[400px] space-y-4">
            <div className="rounded-lg border p-4">
                <Checkbox
                    label="Enable notifications"
                    description="Get notified when someone mentions you."
                />
            </div>
            <div className="rounded-lg border p-4">
                <Checkbox
                    label="Enable analytics"
                    description="Help us improve by sending anonymous usage data."
                />
            </div>
            <div className="rounded-lg border p-4">
                <Checkbox
                    label="Enable two-factor authentication"
                    description="Add an extra layer of security to your account."
                />
            </div>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Checkbox } from "@fabioeducacross/ui";

<div className="w-[400px] space-y-4">
  <div className="rounded-lg border p-4">
    <Checkbox
      label="Enable notifications"
      description="Get notified when someone mentions you."
    />
  </div>
  <div className="rounded-lg border p-4">
    <Checkbox
      label="Enable analytics"
      description="Help us improve by sending anonymous usage data."
    />
  </div>
  <div className="rounded-lg border p-4">
    <Checkbox
      label="Enable two-factor authentication"
      description="Add an extra layer of security to your account."
    />
  </div>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div style="width: 400px;">
    <div class="border rounded p-3 mb-3">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="notif">
        <label class="form-check-label" for="notif">
          <div class="fw-medium">Enable notifications</div>
          <small class="text-muted">Get notified when someone mentions you.</small>
        </label>
      </div>
    </div>
    
    <div class="border rounded p-3 mb-3">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="analytics">
        <label class="form-check-label" for="analytics">
          <div class="fw-medium">Enable analytics</div>
          <small class="text-muted">Help us improve by sending anonymous usage data.</small>
        </label>
      </div>
    </div>
    
    <div class="border rounded p-3">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="2fa">
        <label class="form-check-label" for="2fa">
          <div class="fw-medium">Enable two-factor authentication</div>
          <small class="text-muted">Add an extra layer of security to your account.</small>
        </label>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="w-[400px] space-y-4">
    <div class="rounded-lg border p-4">
      <EdCheckbox
        label="Enable notifications"
        description="Get notified when someone mentions you."
      />
    </div>
    <div class="rounded-lg border p-4">
      <EdCheckbox
        label="Enable analytics"
        description="Help us improve by sending anonymous usage data."
      />
    </div>
    <div class="rounded-lg border p-4">
      <EdCheckbox
        label="Enable two-factor authentication"
        description="Add an extra layer of security to your account."
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { EdCheckbox } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};
