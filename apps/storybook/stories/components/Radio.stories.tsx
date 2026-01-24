import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, Radio } from "@fabioeducacross/ui";
import { useState } from "react";

const meta: Meta<typeof RadioGroup> = {
    title: "Components/Radio",
    component: RadioGroup,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Radio allows users to select one option from a list of mutually exclusive choices.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        disabled: {
            control: "boolean",
            description: "Whether the radio group is disabled",
        },
        error: {
            control: "boolean",
            description: "Whether the radio group has an error",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default radio group.
 */
export const Default: Story = {
    render: () => (
        <RadioGroup name="plan" defaultValue="basic">
            <Radio value="basic" label="Basic" />
            <Radio value="pro" label="Pro" />
            <Radio value="enterprise" label="Enterprise" />
        </RadioGroup>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { RadioGroup, Radio } from "@fabioeducacross/ui";

<RadioGroup name="plan" defaultValue="basic">
  <Radio value="basic" label="Basic" />
  <Radio value="pro" label="Pro" />
  <Radio value="enterprise" label="Enterprise" />
</RadioGroup>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="plan" id="basic" value="basic" checked />
      <label class="form-check-label" for="basic">
        Basic
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="plan" id="pro" value="pro" />
      <label class="form-check-label" for="pro">
        Pro
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="plan" id="enterprise" value="enterprise" />
      <label class="form-check-label" for="enterprise">
        Enterprise
      </label>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdRadioGroup name="plan" default-value="basic">
    <EdRadio value="basic" label="Basic" />
    <EdRadio value="pro" label="Pro" />
    <EdRadio value="enterprise" label="Enterprise" />
  </EdRadioGroup>
</template>

<script setup lang="ts">
import { EdRadioGroup, EdRadio } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Checked radio state example.
 */
export const Checked: Story = {
    render: () => (
        <RadioGroup name="plan-checked" defaultValue="pro">
            <Radio value="basic" label="Basic" />
            <Radio value="pro" label="Pro" />
            <Radio value="enterprise" label="Enterprise" />
        </RadioGroup>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { RadioGroup, Radio } from "@fabioeducacross/ui";

<RadioGroup name="plan-checked" defaultValue="pro">
  <Radio value="basic" label="Basic" />
  <Radio value="pro" label="Pro" />
  <Radio value="enterprise" label="Enterprise" />
</RadioGroup>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="plan-checked" id="basic2" value="basic" />
      <label class="form-check-label" for="basic2">
        Basic
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="plan-checked" id="pro2" value="pro" checked />
      <label class="form-check-label" for="pro2">
        Pro
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="plan-checked" id="enterprise2" value="enterprise" />
      <label class="form-check-label" for="enterprise2">
        Enterprise
      </label>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdRadioGroup name="plan-checked" default-value="pro">
    <EdRadio value="basic" label="Basic" />
    <EdRadio value="pro" label="Pro" />
    <EdRadio value="enterprise" label="Enterprise" />
  </EdRadioGroup>
</template>

<script setup lang="ts">
import { EdRadioGroup, EdRadio } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Radio with descriptions.
 */
export const WithDescriptions: Story = {
    render: () => (
        <RadioGroup name="plan-desc" defaultValue="basic">
            <Radio
                value="basic"
                label="Basic"
                description="Perfect for getting started"
            />
            <Radio
                value="pro"
                label="Pro"
                description="Best for growing teams"
            />
            <Radio
                value="enterprise"
                label="Enterprise"
                description="For large organizations"
            />
        </RadioGroup>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { RadioGroup, Radio } from "@fabioeducacross/ui";

<RadioGroup name="plan-desc" defaultValue="basic">
  <Radio
    value="basic"
    label="Basic"
    description="Perfect for getting started"
  />
  <Radio
    value="pro"
    label="Pro"
    description="Best for growing teams"
  />
  <Radio
    value="enterprise"
    label="Enterprise"
    description="For large organizations"
  />
</RadioGroup>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div>
    <div class="form-check mb-3">
      <input class="form-check-input" type="radio" name="plan-desc" id="basic-desc" value="basic" checked />
      <label class="form-check-label" for="basic-desc">
        Basic
      </label>
      <div class="form-text">Perfect for getting started</div>
    </div>
    <div class="form-check mb-3">
      <input class="form-check-input" type="radio" name="plan-desc" id="pro-desc" value="pro" />
      <label class="form-check-label" for="pro-desc">
        Pro
      </label>
      <div class="form-text">Best for growing teams</div>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="plan-desc" id="enterprise-desc" value="enterprise" />
      <label class="form-check-label" for="enterprise-desc">
        Enterprise
      </label>
      <div class="form-text">For large organizations</div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdRadioGroup name="plan-desc" default-value="basic">
    <EdRadio
      value="basic"
      label="Basic"
      description="Perfect for getting started"
    />
    <EdRadio
      value="pro"
      label="Pro"
      description="Best for growing teams"
    />
    <EdRadio
      value="enterprise"
      label="Enterprise"
      description="For large organizations"
    />
  </EdRadioGroup>
</template>

<script setup lang="ts">
import { EdRadioGroup, EdRadio } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Controlled radio group.
 */
export const Controlled: Story = {
    render: () => {
        const [value, setValue] = useState("option1");
        return (
            <div className="space-y-4">
                <RadioGroup
                    name="controlled"
                    value={value}
                    onValueChange={setValue}
                >
                    <Radio value="option1" label="Option 1" />
                    <Radio value="option2" label="Option 2" />
                    <Radio value="option3" label="Option 3" />
                </RadioGroup>
                <p className="text-sm text-muted-foreground">
                    Selected: {value}
                </p>
            </div>
        );
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { RadioGroup, Radio } from "@fabioeducacross/ui";
import { useState } from "react";

function ControlledRadioExample() {
  const [value, setValue] = useState("option1");
  
  return (
    <div className="space-y-4">
      <RadioGroup
        name="controlled"
        value={value}
        onValueChange={setValue}
      >
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
      <p className="text-sm text-muted-foreground">
        Selected: {value}
      </p>
    </div>
  );
}`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-3">
    <div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="controlled" id="opt1" value="option1" v-model="selected" />
        <label class="form-check-label" for="opt1">Option 1</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="controlled" id="opt2" value="option2" v-model="selected" />
        <label class="form-check-label" for="opt2">Option 2</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="controlled" id="opt3" value="option3" v-model="selected" />
        <label class="form-check-label" for="opt3">Option 3</label>
      </div>
    </div>
    <p class="text-muted small">
      Selected: {{ selected }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: 'option1'
    };
  }
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="space-y-4">
    <EdRadioGroup
      name="controlled"
      :value="value"
      @update:value="value = $event"
    >
      <EdRadio value="option1" label="Option 1" />
      <EdRadio value="option2" label="Option 2" />
      <EdRadio value="option3" label="Option 3" />
    </EdRadioGroup>
    <p class="text-sm text-muted-foreground">
      Selected: {{ value }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { EdRadioGroup, EdRadio } from "@fabioeducacross/ui-vue3";

const value = ref("option1");
</script>`,
        },
    },
};

/**
 * Radio sizes.
 */
export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <RadioGroup name="size-sm" defaultValue="a">
                <Radio value="a" label="Small radio" size="sm" />
            </RadioGroup>
            <RadioGroup name="size-default" defaultValue="b">
                <Radio value="b" label="Default radio" size="default" />
            </RadioGroup>
            <RadioGroup name="size-lg" defaultValue="c">
                <Radio value="c" label="Large radio" size="lg" />
            </RadioGroup>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { RadioGroup, Radio } from "@fabioeducacross/ui";

<div className="flex flex-col gap-6">
  <RadioGroup name="size-sm" defaultValue="a">
    <Radio value="a" label="Small radio" size="sm" />
  </RadioGroup>
  <RadioGroup name="size-default" defaultValue="b">
    <Radio value="b" label="Default radio" size="default" />
  </RadioGroup>
  <RadioGroup name="size-lg" defaultValue="c">
    <Radio value="c" label="Large radio" size="lg" />
  </RadioGroup>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-4">
    <div class="form-check form-check-sm">
      <input class="form-check-input" type="radio" name="size-sm" id="sm" checked />
      <label class="form-check-label small" for="sm">Small radio</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="size-default" id="default" checked />
      <label class="form-check-label" for="default">Default radio</label>
    </div>
    <div class="form-check form-check-lg">
      <input class="form-check-input" type="radio" name="size-lg" id="lg" checked style="width: 1.5rem; height: 1.5rem;" />
      <label class="form-check-label" for="lg">Large radio</label>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex flex-col gap-6">
    <EdRadioGroup name="size-sm" default-value="a">
      <EdRadio value="a" label="Small radio" size="sm" />
    </EdRadioGroup>
    <EdRadioGroup name="size-default" default-value="b">
      <EdRadio value="b" label="Default radio" size="default" />
    </EdRadioGroup>
    <EdRadioGroup name="size-lg" default-value="c">
      <EdRadio value="c" label="Large radio" size="lg" />
    </EdRadioGroup>
  </div>
</template>

<script setup lang="ts">
import { EdRadioGroup, EdRadio } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Disabled radio group.
 */
export const Disabled: Story = {
    render: () => (
        <RadioGroup name="disabled-group" defaultValue="option1" disabled>
            <Radio value="option1" label="Option 1" />
            <Radio value="option2" label="Option 2" />
            <Radio value="option3" label="Option 3" />
        </RadioGroup>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { RadioGroup, Radio } from "@fabioeducacross/ui";

<RadioGroup name="disabled-group" defaultValue="option1" disabled>
  <Radio value="option1" label="Option 1" />
  <Radio value="option2" label="Option 2" />
  <Radio value="option3" label="Option 3" />
</RadioGroup>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="disabled-group" 
             id="option1" value="option1" checked disabled>
      <label class="form-check-label" for="option1">Option 1</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="disabled-group" 
             id="option2" value="option2" disabled>
      <label class="form-check-label" for="option2">Option 2</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="disabled-group" 
             id="option3" value="option3" disabled>
      <label class="form-check-label" for="option3">Option 3</label>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdRadioGroup name="disabled-group" default-value="option1" disabled>
    <EdRadio value="option1" label="Option 1" />
    <EdRadio value="option2" label="Option 2" />
    <EdRadio value="option3" label="Option 3" />
  </EdRadioGroup>
</template>

<script setup lang="ts">
import { EdRadioGroup, EdRadio } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Radio group with error state.
 */
export const WithError: Story = {
    render: () => (
        <div className="space-y-2">
            <RadioGroup name="error-group" error>
                <Radio value="option1" label="Option 1" />
                <Radio value="option2" label="Option 2" />
                <Radio value="option3" label="Option 3" />
            </RadioGroup>
            <p className="text-sm text-destructive">
                Please select an option.
            </p>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { RadioGroup, Radio } from "@fabioeducacross/ui";

<div className="space-y-2">
  <RadioGroup name="error-group" error>
    <Radio value="option1" label="Option 1" />
    <Radio value="option2" label="Option 2" />
    <Radio value="option3" label="Option 3" />
  </RadioGroup>
  <p className="text-sm text-destructive">
    Please select an option.
  </p>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div>
    <div>
      <div class="form-check">
        <input class="form-check-input is-invalid" type="radio" 
               name="error-group" id="err-opt1" value="option1">
        <label class="form-check-label" for="err-opt1">Option 1</label>
      </div>
      <div class="form-check">
        <input class="form-check-input is-invalid" type="radio" 
               name="error-group" id="err-opt2" value="option2">
        <label class="form-check-label" for="err-opt2">Option 2</label>
      </div>
      <div class="form-check">
        <input class="form-check-input is-invalid" type="radio" 
               name="error-group" id="err-opt3" value="option3">
        <label class="form-check-label" for="err-opt3">Option 3</label>
      </div>
    </div>
    <small class="text-danger">Please select an option.</small>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="space-y-2">
    <EdRadioGroup name="error-group" error>
      <EdRadio value="option1" label="Option 1" />
      <EdRadio value="option2" label="Option 2" />
      <EdRadio value="option3" label="Option 3" />
    </EdRadioGroup>
    <p class="text-sm text-destructive">
      Please select an option.
    </p>
  </div>
</template>

<script setup lang="ts">
import { EdRadioGroup, EdRadio } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Radio group in a card layout.
 */
export const CardLayout: Story = {
    render: () => (
        <RadioGroup name="card-layout" defaultValue="starter" className="gap-4">
            <label className="flex cursor-pointer items-start gap-4 rounded-lg border p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                <Radio value="starter" className="mt-1" />
                <div>
                    <p className="font-medium">Starter</p>
                    <p className="text-sm text-muted-foreground">
                        Up to 5 users, 10GB storage
                    </p>
                    <p className="mt-2 font-semibold">$9/month</p>
                </div>
            </label>
            <label className="flex cursor-pointer items-start gap-4 rounded-lg border p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                <Radio value="professional" className="mt-1" />
                <div>
                    <p className="font-medium">Professional</p>
                    <p className="text-sm text-muted-foreground">
                        Up to 20 users, 50GB storage
                    </p>
                    <p className="mt-2 font-semibold">$29/month</p>
                </div>
            </label>
            <label className="flex cursor-pointer items-start gap-4 rounded-lg border p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                <Radio value="enterprise" className="mt-1" />
                <div>
                    <p className="font-medium">Enterprise</p>
                    <p className="text-sm text-muted-foreground">
                        Unlimited users, unlimited storage
                    </p>
                    <p className="mt-2 font-semibold">Contact us</p>
                </div>
            </label>
        </RadioGroup>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { RadioGroup, Radio } from "@fabioeducacross/ui";

<RadioGroup name="card-layout" defaultValue="starter" className="gap-4">
  <label className="flex cursor-pointer items-start gap-4 rounded-lg border p-4 
                    has-[:checked]:border-primary has-[:checked]:bg-primary/5">
    <Radio value="starter" className="mt-1" />
    <div>
      <p className="font-medium">Starter</p>
      <p className="text-sm text-muted-foreground">
        Up to 5 users, 10GB storage
      </p>
      <p className="mt-2 font-semibold">$9/month</p>
    </div>
  </label>
  <label className="flex cursor-pointer items-start gap-4 rounded-lg border p-4 
                    has-[:checked]:border-primary has-[:checked]:bg-primary/5">
    <Radio value="professional" className="mt-1" />
    <div>
      <p className="font-medium">Professional</p>
      <p className="text-sm text-muted-foreground">
        Up to 20 users, 50GB storage
      </p>
      <p className="mt-2 font-semibold">$29/month</p>
    </div>
  </label>
  <label className="flex cursor-pointer items-start gap-4 rounded-lg border p-4 
                    has-[:checked]:border-primary has-[:checked]:bg-primary/5">
    <Radio value="enterprise" className="mt-1" />
    <div>
      <p className="font-medium">Enterprise</p>
      <p className="text-sm text-muted-foreground">
        Unlimited users, unlimited storage
      </p>
      <p className="mt-2 font-semibold">Contact us</p>
    </div>
  </label>
</RadioGroup>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div>
    <label class="d-flex align-items-start gap-3 rounded border p-3 cursor-pointer" 
           :class="{ 'border-primary bg-primary bg-opacity-10': selectedPlan === 'starter' }">
      <input type="radio" class="form-check-input mt-1" name="card-layout" 
             value="starter" v-model="selectedPlan">
      <div>
        <p class="fw-medium mb-0">Starter</p>
        <p class="text-muted small mb-2">Up to 5 users, 10GB storage</p>
        <p class="fw-semibold mb-0">$9/month</p>
      </div>
    </label>
    
    <label class="d-flex align-items-start gap-3 rounded border p-3 mt-3 cursor-pointer" 
           :class="{ 'border-primary bg-primary bg-opacity-10': selectedPlan === 'professional' }">
      <input type="radio" class="form-check-input mt-1" name="card-layout" 
             value="professional" v-model="selectedPlan">
      <div>
        <p class="fw-medium mb-0">Professional</p>
        <p class="text-muted small mb-2">Up to 20 users, 50GB storage</p>
        <p class="fw-semibold mb-0">$29/month</p>
      </div>
    </label>
    
    <label class="d-flex align-items-start gap-3 rounded border p-3 mt-3 cursor-pointer" 
           :class="{ 'border-primary bg-primary bg-opacity-10': selectedPlan === 'enterprise' }">
      <input type="radio" class="form-check-input mt-1" name="card-layout" 
             value="enterprise" v-model="selectedPlan">
      <div>
        <p class="fw-medium mb-0">Enterprise</p>
        <p class="text-muted small mb-2">Unlimited users, unlimited storage</p>
        <p class="fw-semibold mb-0">Contact us</p>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedPlan: 'starter',
    };
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdRadioGroup name="card-layout" default-value="starter" class="gap-4">
    <label class="flex cursor-pointer items-start gap-4 rounded-lg border p-4"
           :class="{ 'border-primary bg-primary/5': selectedValue === 'starter' }">
      <EdRadio value="starter" class="mt-1" @update:checked="updateValue" />
      <div>
        <p class="font-medium">Starter</p>
        <p class="text-sm text-muted-foreground">
          Up to 5 users, 10GB storage
        </p>
        <p class="mt-2 font-semibold">$9/month</p>
      </div>
    </label>
    
    <label class="flex cursor-pointer items-start gap-4 rounded-lg border p-4"
           :class="{ 'border-primary bg-primary/5': selectedValue === 'professional' }">
      <EdRadio value="professional" class="mt-1" @update:checked="updateValue" />
      <div>
        <p class="font-medium">Professional</p>
        <p class="text-sm text-muted-foreground">
          Up to 20 users, 50GB storage
        </p>
        <p class="mt-2 font-semibold">$29/month</p>
      </div>
    </label>
    
    <label class="flex cursor-pointer items-start gap-4 rounded-lg border p-4"
           :class="{ 'border-primary bg-primary/5': selectedValue === 'enterprise' }">
      <EdRadio value="enterprise" class="mt-1" @update:checked="updateValue" />
      <div>
        <p class="font-medium">Enterprise</p>
        <p class="text-sm text-muted-foreground">
          Unlimited users, unlimited storage
        </p>
        <p class="mt-2 font-semibold">Contact us</p>
      </div>
    </label>
  </EdRadioGroup>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { EdRadioGroup, EdRadio } from "@fabioeducacross/ui-vue3";

const selectedValue = ref("starter");
const updateValue = (value: string) => {
  selectedValue.value = value;
};
</script>`,
        },
    },
};
