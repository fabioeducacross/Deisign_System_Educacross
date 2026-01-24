import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, expect, userEvent, within } from "storybook/test";
import { ThemeSwitcher, ThemeProvider } from "@fabioeducacross/ui";

const meta: Meta<typeof ThemeSwitcher> = {
    title: "Components/ThemeSwitcher",
    component: ThemeSwitcher,
    decorators: [
        (Story) => (
            <ThemeProvider defaultTheme="light" disableStorage>
                <div className="flex items-center justify-center p-8">
                    <Story />
                </div>
            </ThemeProvider>
        ),
    ],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: `
O **ThemeSwitcher** é um componente para alternar entre os modos Light e Dark do design system.

## Características
- ✅ 3 modos de exibição: icon, toggle, dropdown
- ✅ 3 tamanhos: sm, default, lg
- ✅ 3 variantes: icon, outline, filled
- ✅ Persiste preferência no localStorage
- ✅ Respeita preferência do sistema (prefers-color-scheme)
- ✅ Hook \`useTheme\` para acesso programático
- ✅ Tokens semânticos do Figma
- ✅ Totalmente acessível (ARIA)

## Uso

### ThemeProvider
Envolva sua aplicação com o \`ThemeProvider\`:

\`\`\`tsx
import { ThemeProvider } from "@fabioeducacross/ui";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <YourApp />
    </ThemeProvider>
  );
}
\`\`\`

### useTheme Hook
Acesse o tema programaticamente:

\`\`\`tsx
import { useTheme } from "@fabioeducacross/ui";

function MyComponent() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  // ...
}
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        mode: {
            control: "select",
            options: ["icon", "toggle", "dropdown"],
            description: "Modo de exibição do switcher",
        },
        variant: {
            control: "select",
            options: ["icon", "outline", "filled"],
            description: "Variante visual (apenas para modo icon)",
        },
        size: {
            control: "select",
            options: ["sm", "default", "lg"],
            description: "Tamanho do componente",
        },
        showLabel: {
            control: "boolean",
            description: "Mostrar label de texto",
        },
        disabled: {
            control: "boolean",
            description: "Desabilitar o componente",
        },
    },
    args: {
        onClick: fn(),
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
        mode: "icon",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { ThemeSwitcher, ThemeProvider } from "@fabioeducacross/ui";

<ThemeProvider>
  <ThemeSwitcher mode="icon" />
</ThemeProvider>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-link" @click="toggleTheme">
    <i :class="isDark ? 'bi bi-sun' : 'bi bi-moon'"></i>
  </button>
</template>

<script>
export default {
  data() {
    return { isDark: false };
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      document.documentElement.classList.toggle('dark');
    },
  },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdThemeProvider>
    <EdThemeSwitcher mode="icon" />
  </EdThemeProvider>
</template>

<script setup lang="ts">
import { EdThemeSwitcher, EdThemeProvider } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const Playground: Story = {
    args: {
        mode: "icon",
        variant: "icon",
        size: "default",
        showLabel: false,
        disabled: false,
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { ThemeSwitcher } from "@fabioeducacross/ui";

<ThemeSwitcher mode="icon" variant="icon" size="default" />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-icon btn-md" @click="toggleTheme">
    <i :class="isDark ? 'bi-moon' : 'bi-sun'"></i>
  </button>
</template>

<script>
export default {
  data() {
    return {
      isDark: false,
    };
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      document.documentElement.classList.toggle('dark');
    },
  },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdThemeSwitcher mode="icon" variant="icon" size="default" />
</template>

<script setup lang="ts">
import { EdThemeSwitcher } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

// =============================================================================
// MODE STORIES
// =============================================================================

export const ModeIcon: Story = {
    args: {
        mode: "icon",
    },
    parameters: {
        docs: {
            description: {
                story: "Modo padrão com ícone que alterna entre sol (claro) e lua (escuro).",
            },
        },
        multiFrameworkCode: {
            react: `import { ThemeSwitcher, ThemeProvider } from "@fabioeducacross/ui";

<ThemeProvider>
  <ThemeSwitcher mode="icon" />
</ThemeProvider>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-link" @click="toggleTheme">
    <i :class="isDark ? 'bi bi-sun' : 'bi bi-moon'"></i>
  </button>
</template>

<script>
export default {
  data() {
    return { isDark: false };
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      document.documentElement.classList.toggle('dark');
    },
  },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdThemeProvider>
    <EdThemeSwitcher mode="icon" />
  </EdThemeProvider>
</template>

<script setup lang="ts">
import { EdThemeSwitcher, EdThemeProvider } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const ModeToggle: Story = {
    args: {
        mode: "toggle",
    },
    parameters: {
        docs: {
            description: {
                story: "Modo toggle estilo switch com transição suave entre os temas.",
            },
        },
        multiFrameworkCode: {
            react: `import { ThemeSwitcher, ThemeProvider } from "@fabioeducacross/ui";

<ThemeProvider>
  <ThemeSwitcher mode="toggle" />
</ThemeProvider>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="form-check form-switch">
    <input 
      class="form-check-input" 
      type="checkbox" 
      :checked="isDark"
      @change="toggleTheme"
    />
  </div>
</template>

<script>
export default {
  data() {
    return { isDark: false };
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      document.documentElement.classList.toggle('dark');
    },
  },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdThemeProvider>
    <EdThemeSwitcher mode="toggle" />
  </EdThemeProvider>
</template>

<script setup lang="ts">
import { EdThemeSwitcher, EdThemeProvider } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const ModeDropdown: Story = {
    args: {
        mode: "dropdown",
    },
    parameters: {
        docs: {
            description: {
                story: "Modo dropdown com 3 opções: Claro, Escuro e Sistema.",
            },
        },
        multiFrameworkCode: {
            react: `import { ThemeSwitcher, ThemeProvider } from "@fabioeducacross/ui";

<ThemeProvider>
  <ThemeSwitcher mode="dropdown" />
</ThemeProvider>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
      {{ currentTheme }}
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" @click="setTheme('light')">Claro</a></li>
      <li><a class="dropdown-item" @click="setTheme('dark')">Escuro</a></li>
      <li><a class="dropdown-item" @click="setTheme('system')">Sistema</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return { currentTheme: 'Claro' };
  },
  methods: {
    setTheme(theme) {
      this.currentTheme = theme === 'light' ? 'Claro' : theme === 'dark' ? 'Escuro' : 'Sistema';
    },
  },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdThemeProvider>
    <EdThemeSwitcher mode="dropdown" />
  </EdThemeProvider>
</template>

<script setup lang="ts">
import { EdThemeSwitcher, EdThemeProvider } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

// =============================================================================
// VARIANT STORIES (modo icon)
// =============================================================================

export const VariantIcon: Story = {
    args: {
        mode: "icon",
        variant: "icon",
    },
    parameters: {
        docs: {
            description: {
                story: "Variante com apenas o ícone, sem borda ou background.",
            },
        },
        multiFrameworkCode: {
            react: `import { ThemeSwitcher, ThemeProvider } from "@fabioeducacross/ui";

<ThemeProvider>
  <ThemeSwitcher mode="icon" variant="icon" />
</ThemeProvider>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-link p-0" @click="toggleTheme">
    <i :class="isDark ? 'bi bi-sun' : 'bi bi-moon'"></i>
  </button>
</template>

<script>
export default {
  data() { return { isDark: false }; },
  methods: { toggleTheme() { this.isDark = !this.isDark; } },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdThemeProvider>
    <EdThemeSwitcher mode="icon" variant="icon" />
  </EdThemeProvider>
</template>

<script setup lang="ts">
import { EdThemeSwitcher, EdThemeProvider } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const VariantOutline: Story = {
    args: {
        mode: "icon",
        variant: "outline",
    },
    parameters: {
        docs: {
            description: {
                story: "Variante com borda sutil.",
            },
        },
        multiFrameworkCode: {
            react: `import { ThemeSwitcher, ThemeProvider } from "@fabioeducacross/ui";

<ThemeProvider>
  <ThemeSwitcher mode="icon" variant="outline" />
</ThemeProvider>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-outline-secondary" @click="toggleTheme">
    <i :class="isDark ? 'bi bi-sun' : 'bi bi-moon'"></i>
  </button>
</template>

<script>
export default {
  data() { return { isDark: false }; },
  methods: { toggleTheme() { this.isDark = !this.isDark; } },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdThemeProvider>
    <EdThemeSwitcher mode="icon" variant="outline" />
  </EdThemeProvider>
</template>

<script setup lang="ts">
import { EdThemeSwitcher, EdThemeProvider } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const VariantFilled: Story = {
    args: {
        mode: "icon",
        variant: "filled",
    },
    parameters: {
        docs: {
            description: {
                story: "Variante com background preenchido.",
            },
        },
        multiFrameworkCode: {
            react: `import { ThemeSwitcher, ThemeProvider } from "@fabioeducacross/ui";

<ThemeProvider>
  <ThemeSwitcher mode="icon" variant="filled" />
</ThemeProvider>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-secondary" @click="toggleTheme">
    <i :class="isDark ? 'bi bi-sun' : 'bi bi-moon'"></i>
  </button>
</template>

<script>
export default {
  data() { return { isDark: false }; },
  methods: { toggleTheme() { this.isDark = !this.isDark; } },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdThemeProvider>
    <EdThemeSwitcher mode="icon" variant="filled" />
  </EdThemeProvider>
</template>

<script setup lang="ts">
import { EdThemeSwitcher, EdThemeProvider } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

// =============================================================================
// SIZE STORIES
// =============================================================================

export const SizeSmall: Story = {
    args: {
        mode: "icon",
        size: "sm",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { ThemeSwitcher, ThemeProvider } from "@fabioeducacross/ui";

<ThemeProvider>
  <ThemeSwitcher mode="icon" size="sm" />
</ThemeProvider>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-link btn-sm" @click="toggleTheme">
    <i :class="isDark ? 'bi bi-sun' : 'bi bi-moon'"></i>
  </button>
</template>

<script>
export default {
  data() { return { isDark: false }; },
  methods: { toggleTheme() { this.isDark = !this.isDark; } },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdThemeProvider>
    <EdThemeSwitcher mode="icon" size="sm" />
  </EdThemeProvider>
</template>

<script setup lang="ts">
import { EdThemeSwitcher, EdThemeProvider } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const SizeDefault: Story = {
    args: {
        mode: "icon",
        size: "default",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { ThemeSwitcher, ThemeProvider } from "@fabioeducacross/ui";

<ThemeProvider>
  <ThemeSwitcher mode="icon" size="default" />
</ThemeProvider>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-link" @click="toggleTheme">
    <i :class="isDark ? 'bi bi-sun' : 'bi bi-moon'"></i>
  </button>
</template>

<script>
export default {
  data() { return { isDark: false }; },
  methods: { toggleTheme() { this.isDark = !this.isDark; } },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdThemeProvider>
    <EdThemeSwitcher mode="icon" size="default" />
  </EdThemeProvider>
</template>

<script setup lang="ts">
import { EdThemeSwitcher, EdThemeProvider } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const SizeLarge: Story = {
    args: {
        mode: "icon",
        size: "lg",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { ThemeSwitcher, ThemeProvider } from "@fabioeducacross/ui";

<ThemeProvider>
  <ThemeSwitcher mode="icon" size="lg" />
</ThemeProvider>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-link btn-lg" @click="toggleTheme">
    <i :class="isDark ? 'bi bi-sun' : 'bi bi-moon'"></i>
  </button>
</template>

<script>
export default {
  data() { return { isDark: false }; },
  methods: { toggleTheme() { this.isDark = !this.isDark; } },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdThemeProvider>
    <EdThemeSwitcher mode="icon" size="lg" />
  </EdThemeProvider>
</template>

<script setup lang="ts">
import { EdThemeSwitcher, EdThemeProvider } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const ToggleSizes: Story = {
    render: () => (
        <ThemeProvider defaultTheme="light" disableStorage>
            <div className="flex items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                    <ThemeSwitcher mode="toggle" size="sm" />
                    <span className="text-xs text-[var(--text-secondary)]">sm</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <ThemeSwitcher mode="toggle" size="default" />
                    <span className="text-xs text-[var(--text-secondary)]">default</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <ThemeSwitcher mode="toggle" size="lg" />
                    <span className="text-xs text-[var(--text-secondary)]">lg</span>
                </div>
            </div>
        </ThemeProvider>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comparação de tamanhos no modo toggle.",
            },
        },
        multiFrameworkCode: {
            react: `import { ThemeSwitcher, ThemeProvider } from "@fabioeducacross/ui";

<ThemeProvider>
  <div className="flex items-center gap-6">
    <ThemeSwitcher mode="toggle" size="sm" />
    <ThemeSwitcher mode="toggle" size="default" />
    <ThemeSwitcher mode="toggle" size="lg" />
  </div>
</ThemeProvider>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex align-items-center gap-3">
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" />
      <label class="form-check-label small">sm</label>
    </div>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" />
      <label class="form-check-label">default</label>
    </div>
    <div class="form-check form-switch">
      <input class="form-check-input form-check-input-lg" type="checkbox" />
      <label class="form-check-label">lg</label>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdThemeProvider>
    <div class="flex items-center gap-6">
      <EdThemeSwitcher mode="toggle" size="sm" />
      <EdThemeSwitcher mode="toggle" size="default" />
      <EdThemeSwitcher mode="toggle" size="lg" />
    </div>
  </EdThemeProvider>
</template>

<script setup lang="ts">
import { EdThemeSwitcher, EdThemeProvider } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

// =============================================================================
// STATE STORIES
// =============================================================================

export const WithLabel: Story = {
    args: {
        mode: "icon",
        showLabel: true,
    },
    parameters: {
        docs: {
            description: {
                story: "Exibe o label de texto ao lado do ícone.",
            },
        },
        multiFrameworkCode: {
            react: `import { ThemeSwitcher, ThemeProvider } from "@fabioeducacross/ui";

<ThemeProvider>
  <ThemeSwitcher mode="icon" showLabel={true} />
</ThemeProvider>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-link" @click="toggleTheme">
    <i :class="isDark ? 'bi bi-sun' : 'bi bi-moon'" class="me-2"></i>
    {{ isDark ? 'Modo Escuro' : 'Modo Claro' }}
  </button>
</template>

<script>
export default {
  data() { return { isDark: false }; },
  methods: { toggleTheme() { this.isDark = !this.isDark; } },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdThemeProvider>
    <EdThemeSwitcher mode="icon" :show-label="true" />
  </EdThemeProvider>
</template>

<script setup lang="ts">
import { EdThemeSwitcher, EdThemeProvider } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const DropdownWithLabel: Story = {
    args: {
        mode: "dropdown",
        showLabel: true,
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { ThemeSwitcher, ThemeProvider } from "@fabioeducacross/ui";

<ThemeProvider>
  <ThemeSwitcher mode="dropdown" showLabel={true} />
</ThemeProvider>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
      Tema: {{ currentTheme }}
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" @click="setTheme('light')">Claro</a></li>
      <li><a class="dropdown-item" @click="setTheme('dark')">Escuro</a></li>
      <li><a class="dropdown-item" @click="setTheme('system')">Sistema</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() { return { currentTheme: 'Claro' }; },
  methods: { setTheme(theme) { this.currentTheme = theme === 'light' ? 'Claro' : theme === 'dark' ? 'Escuro' : 'Sistema'; } },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdThemeProvider>
    <EdThemeSwitcher mode="dropdown" :show-label="true" />
  </EdThemeProvider>
</template>

<script setup lang="ts">
import { EdThemeSwitcher, EdThemeProvider } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { ThemeSwitcher, ThemeProvider } from "@fabioeducacross/ui";

<ThemeProvider>
  <ThemeSwitcher disabled />
</ThemeProvider>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <button class="btn btn-link" disabled>
    <i class="bi bi-moon"></i>
  </button>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdThemeProvider>
    <EdThemeSwitcher disabled />
  </EdThemeProvider>
</template>

<script setup lang="ts">
import { EdThemeSwitcher, EdThemeProvider } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

// =============================================================================
// SHOWCASE
// =============================================================================

export const AllModes: Story = {
    render: () => (
        <ThemeProvider defaultTheme="light" disableStorage>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-[var(--text-secondary)]">
                        Modo Icon (variantes)
                    </span>
                    <div className="flex items-center gap-4">
                        <ThemeSwitcher mode="icon" variant="icon" />
                        <ThemeSwitcher mode="icon" variant="outline" />
                        <ThemeSwitcher mode="icon" variant="filled" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-[var(--text-secondary)]">
                        Modo Toggle
                    </span>
                    <ThemeSwitcher mode="toggle" />
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-[var(--text-secondary)]">
                        Modo Dropdown
                    </span>
                    <ThemeSwitcher mode="dropdown" />
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-[var(--text-secondary)]">
                        Com Label
                    </span>
                    <div className="flex items-center gap-4">
                        <ThemeSwitcher mode="icon" showLabel variant="outline" />
                        <ThemeSwitcher mode="dropdown" showLabel />
                    </div>
                </div>
            </div>
        </ThemeProvider>
    ),
    parameters: {
        docs: {
            description: {
                story: "Showcase de todos os modos e variantes disponíveis.",
            },
        },
        multiFrameworkCode: {
            react: `import { ThemeSwitcher, ThemeProvider } from "@fabioeducacross/ui";

<ThemeProvider>
  <div className="flex flex-col gap-8">
    {/* Modo Icon (variantes) */}
    <div className="flex items-center gap-4">
      <ThemeSwitcher mode="icon" variant="icon" />
      <ThemeSwitcher mode="icon" variant="outline" />
      <ThemeSwitcher mode="icon" variant="filled" />
    </div>

    {/* Modo Toggle */}
    <ThemeSwitcher mode="toggle" />

    {/* Modo Dropdown */}
    <ThemeSwitcher mode="dropdown" />

    {/* Com Label */}
    <div className="flex items-center gap-4">
      <ThemeSwitcher mode="icon" showLabel variant="outline" />
      <ThemeSwitcher mode="dropdown" showLabel />
    </div>
  </div>
</ThemeProvider>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-4">
    <!-- Variantes Icon -->
    <div class="d-flex gap-3">
      <button class="btn btn-link"><i class="bi bi-moon"></i></button>
      <button class="btn btn-outline-secondary"><i class="bi bi-moon"></i></button>
      <button class="btn btn-secondary"><i class="bi bi-moon"></i></button>
    </div>
    
    <!-- Toggle -->
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" />
    </div>
    
    <!-- Dropdown -->
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">Tema</button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item">Claro</a></li>
        <li><a class="dropdown-item">Escuro</a></li>
        <li><a class="dropdown-item">Sistema</a></li>
      </ul>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdThemeProvider>
    <div class="flex flex-col gap-8">
      <div class="flex items-center gap-4">
        <EdThemeSwitcher mode="icon" variant="icon" />
        <EdThemeSwitcher mode="icon" variant="outline" />
        <EdThemeSwitcher mode="icon" variant="filled" />
      </div>
      <EdThemeSwitcher mode="toggle" />
      <EdThemeSwitcher mode="dropdown" />
      <div class="flex items-center gap-4">
        <EdThemeSwitcher mode="icon" :show-label="true" variant="outline" />
        <EdThemeSwitcher mode="dropdown" :show-label="true" />
      </div>
    </div>
  </EdThemeProvider>
</template>

<script setup lang="ts">
import { EdThemeSwitcher, EdThemeProvider } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

// =============================================================================
// INTERACTION TESTS
// =============================================================================

export const InteractionTest: Story = {
    args: {
        mode: "icon",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { ThemeSwitcher, ThemeProvider, useTheme } from "@fabioeducacross/ui";

function ThemeDemo() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      <ThemeSwitcher mode="icon" />
      <p>Tema atual: {theme}</p>
    </div>
  );
}

<ThemeProvider>
  <ThemeDemo />
</ThemeProvider>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div>
    <button class="btn btn-link" @click="toggleTheme">
      <i :class="isDark ? 'bi bi-sun' : 'bi bi-moon'"></i>
    </button>
    <p>Tema atual: {{ isDark ? 'Escuro' : 'Claro' }}</p>
  </div>
</template>

<script>
export default {
  data() { return { isDark: false }; },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      document.documentElement.classList.toggle('dark');
    },
  },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdThemeProvider>
    <div>
      <EdThemeSwitcher mode="icon" />
      <p>Tema atual: {{ theme }}</p>
    </div>
  </EdThemeProvider>
</template>

<script setup lang="ts">
import { EdThemeSwitcher, EdThemeProvider, useTheme } from "@fabioeducacross/ui-vue3";
const { theme } = useTheme();
</script>`,
        },
    },
};

export const ToggleInteractionTest: Story = {
    args: {
        mode: "toggle",
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { ThemeSwitcher, ThemeProvider } from "@fabioeducacross/ui";

<ThemeProvider>
  <ThemeSwitcher mode="toggle" />
</ThemeProvider>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="form-check form-switch">
    <input 
      class="form-check-input" 
      type="checkbox" 
      :checked="isDark"
      @change="toggleTheme"
    />
    <label class="form-check-label">
      {{ isDark ? 'Escuro' : 'Claro' }}
    </label>
  </div>
</template>

<script>
export default {
  data() { return { isDark: false }; },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      document.documentElement.classList.toggle('dark');
    },
  },
};
</script>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdThemeProvider>
    <EdThemeSwitcher mode="toggle" />
  </EdThemeProvider>
</template>

<script setup lang="ts">
import { EdThemeSwitcher, EdThemeProvider } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};
