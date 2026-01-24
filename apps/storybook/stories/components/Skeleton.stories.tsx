import type { Meta, StoryObj } from "@storybook/react-vite";
import {
    Skeleton,
    SkeletonText,
    SkeletonCircle,
    SkeletonCard,
    SkeletonAvatar,
    SkeletonTable,
} from "@fabioeducacross/ui";

const meta: Meta<typeof Skeleton> = {
    title: "Components/Skeleton",
    component: Skeleton,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Skeleton provides a placeholder preview while content is loading.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

/**
 * Basic skeleton shapes.
 */
export const Default: Story = {
    render: () => (
        <div className="space-y-4">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Skeleton } from "@fabioeducacross/ui";

<div className="space-y-4">
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
  <Skeleton className="h-4 w-[300px]" />
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div>
    <div class="placeholder-glow mb-3">
      <span class="placeholder col-6"></span>
    </div>
    <div class="placeholder-glow mb-3">
      <span class="placeholder col-4"></span>
    </div>
    <div class="placeholder-glow">
      <span class="placeholder col-8"></span>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="space-y-4">
    <EdSkeleton class="h-4 w-[250px]" />
    <EdSkeleton class="h-4 w-[200px]" />
    <EdSkeleton class="h-4 w-[300px]" />
  </div>
</template>

<script setup lang="ts">
import { EdSkeleton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Different shapes.
 */
export const Shapes: Story = {
    render: () => (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-3 w-[100px]" />
                </div>
            </div>
            <Skeleton className="h-[100px] w-full rounded-lg" />
            <div className="flex gap-4">
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
            </div>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Skeleton } from "@fabioeducacross/ui";

<div className="space-y-4">
  <div className="flex items-center gap-4">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[150px]" />
      <Skeleton className="h-3 w-[100px]" />
    </div>
  </div>
  <Skeleton className="h-[100px] w-full rounded-lg" />
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div>
    <div class="d-flex align-items-center gap-3 mb-3">
      <div class="placeholder-glow">
        <span class="placeholder rounded-circle" style="width:48px;height:48px"></span>
      </div>
      <div>
        <span class="placeholder col-8 mb-2"></span>
        <span class="placeholder col-6"></span>
      </div>
    </div>
    <div class="placeholder-glow">
      <span class="placeholder col-12" style="height:100px"></span>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="space-y-4">
    <div class="flex items-center gap-4">
      <EdSkeleton class="h-12 w-12 rounded-full" />
      <div class="space-y-2">
        <EdSkeleton class="h-4 w-[150px]" />
        <EdSkeleton class="h-3 w-[100px]" />
      </div>
    </div>
    <EdSkeleton class="h-[100px] w-full rounded-lg" />
  </div>
</template>

<script setup lang="ts">
import { EdSkeleton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * SkeletonText for paragraphs.
 */
export const Text: Story = {
    render: () => (
        <div className="space-y-8">
            <div>
                <p className="text-sm text-muted-foreground mb-2">3 lines (default)</p>
                <SkeletonText />
            </div>
            <div>
                <p className="text-sm text-muted-foreground mb-2">5 lines, 80% last line</p>
                <SkeletonText lines={5} lastLineWidth="80%" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground mb-2">2 lines, 40% last line</p>
                <SkeletonText lines={2} lastLineWidth="40%" />
            </div>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { SkeletonText } from "@fabioeducacross/ui";

<div className="space-y-4">
  <SkeletonText />
  <SkeletonText lines={5} lastLineWidth="80%" />
  <SkeletonText lines={2} lastLineWidth="40%" />
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div>
    <div class="placeholder-glow" v-for="i in 3" :key="i">
      <span class="placeholder col-12"></span>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="space-y-4">
    <EdSkeletonText />
    <EdSkeletonText :lines="5" last-line-width="80%" />
    <EdSkeletonText :lines="2" last-line-width="40%" />
  </div>
</template>

<script setup lang="ts">
import { EdSkeletonText } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * SkeletonCircle for avatars.
 */
export const Circles: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <SkeletonCircle size="sm" />
            <SkeletonCircle size="md" />
            <SkeletonCircle size="lg" />
            <SkeletonCircle size="xl" />
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { SkeletonCircle } from "@fabioeducacross/ui";

<div className="flex items-center gap-4">
  <SkeletonCircle size="sm" />
  <SkeletonCircle size="md" />
  <SkeletonCircle size="lg" />
  <SkeletonCircle size="xl" />
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex align-items-center gap-3">
    <span class="placeholder rounded-circle" style="width:24px;height:24px"></span>
    <span class="placeholder rounded-circle" style="width:32px;height:32px"></span>
    <span class="placeholder rounded-circle" style="width:40px;height:40px"></span>
    <span class="placeholder rounded-circle" style="width:48px;height:48px"></span>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="flex items-center gap-4">
    <EdSkeletonCircle size="sm" />
    <EdSkeletonCircle size="md" />
    <EdSkeletonCircle size="lg" />
    <EdSkeletonCircle size="xl" />
  </div>
</template>

<script setup lang="ts">
import { EdSkeletonCircle } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * SkeletonCard preset.
 */
export const Card: Story = {
    render: () => (
        <div className="grid grid-cols-3 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { SkeletonCard } from "@fabioeducacross/ui";

<div className="grid grid-cols-3 gap-4">
  <SkeletonCard />
  <SkeletonCard />
  <SkeletonCard />
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="row g-3">
    <div class="col-4" v-for="i in 3" :key="i">
      <div class="card">
        <div class="card-body">
          <div class="placeholder-glow">
            <span class="placeholder col-12 mb-2"></span>
            <span class="placeholder col-8"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="grid grid-cols-3 gap-4">
    <EdSkeletonCard v-for="i in 3" :key="i" />
  </div>
</template>

<script setup lang="ts">
import { EdSkeletonCard } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * SkeletonAvatar with text.
 */
export const Avatar: Story = {
    render: () => (
        <div className="space-y-4">
            <SkeletonAvatar />
            <SkeletonAvatar />
            <SkeletonAvatar />
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { SkeletonAvatar } from "@fabioeducacross/ui";

<div className="space-y-4">
  <SkeletonAvatar />
  <SkeletonAvatar />
  <SkeletonAvatar />
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-3">
    <div class="d-flex align-items-center gap-3" v-for="i in 3" :key="i">
      <div class="placeholder-glow">
        <span class="placeholder rounded-circle" style="width: 48px; height: 48px; display: inline-block;"></span>
      </div>
      <div class="flex-grow-1">
        <div class="placeholder-glow">
          <span class="placeholder col-6"></span>
          <span class="placeholder col-4"></span>
        </div>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="space-y-4">
    <EdSkeletonAvatar v-for="i in 3" :key="i" />
  </div>
</template>

<script setup lang="ts">
import { EdSkeletonAvatar } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * SkeletonTable for data tables.
 */
export const Table: Story = {
    render: () => <SkeletonTable rows={5} columns={4} />,
    parameters: {
        multiFrameworkCode: {
            react: `import { SkeletonTable } from "@fabioeducacross/ui";

<SkeletonTable rows={5} columns={4} />`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <table class="table">
    <tbody>
      <tr v-for="row in 5" :key="row">
        <td v-for="col in 4" :key="col">
          <div class="placeholder-glow">
            <span class="placeholder col-12"></span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdSkeletonTable :rows="5" :columns="4" />
</template>

<script setup lang="ts">
import { EdSkeletonTable } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Variants.
 */
export const Variants: Story = {
    render: () => (
        <div className="space-y-8">
            <div>
                <p className="text-sm text-muted-foreground mb-2">Default</p>
                <Skeleton className="h-8 w-full" variant="default" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground mb-2">Primary</p>
                <Skeleton className="h-8 w-full" variant="primary" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground mb-2">Card</p>
                <Skeleton className="h-8 w-full" variant="card" />
            </div>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Skeleton } from "@fabioeducacross/ui";

<div className="space-y-8">
  <div>
    <p className="text-sm text-muted-foreground mb-2">Default</p>
    <Skeleton className="h-8 w-full" variant="default" />
  </div>
  <div>
    <p className="text-sm text-muted-foreground mb-2">Primary</p>
    <Skeleton className="h-8 w-full" variant="primary" />
  </div>
  <div>
    <p className="text-sm text-muted-foreground mb-2">Card</p>
    <Skeleton className="h-8 w-full" variant="card" />
  </div>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="d-flex flex-column gap-4">
    <div>
      <p class="text-muted small mb-2">Default</p>
      <div class="placeholder-glow">
        <span class="placeholder col-12" style="height: 2rem;"></span>
      </div>
    </div>
    <div>
      <p class="text-muted small mb-2">Primary</p>
      <div class="placeholder-glow">
        <span class="placeholder col-12 bg-primary" style="height: 2rem;"></span>
      </div>
    </div>
    <div>
      <p class="text-muted small mb-2">Card</p>
      <div class="card">
        <div class="card-body">
          <div class="placeholder-glow">
            <span class="placeholder col-12"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="space-y-8">
    <div>
      <p class="text-sm text-muted-foreground mb-2">Default</p>
      <EdSkeleton class="h-8 w-full" variant="default" />
    </div>
    <div>
      <p class="text-sm text-muted-foreground mb-2">Primary</p>
      <EdSkeleton class="h-8 w-full" variant="primary" />
    </div>
    <div>
      <p class="text-sm text-muted-foreground mb-2">Card</p>
      <EdSkeleton class="h-8 w-full" variant="card" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { EdSkeleton } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Loading card example.
 */
export const LoadingCard: Story = {
    render: () => (
        <div className="border rounded-lg p-4 w-[350px]">
            <div className="flex items-center gap-4 mb-4">
                <SkeletonCircle size="lg" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
            </div>
            <SkeletonText lines={3} />
            <div className="flex gap-2 mt-4">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-24" />
            </div>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Skeleton, SkeletonCircle, SkeletonText } from "@fabioeducacross/ui";

<div className="border rounded-lg p-4 w-[350px]">
  <div className="flex items-center gap-4 mb-4">
    <SkeletonCircle size="lg" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  </div>
  <SkeletonText lines={3} />
  <div className="flex gap-2 mt-4">
    <Skeleton className="h-9 w-24" />
    <Skeleton className="h-9 w-24" />
  </div>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div class="card" style="width: 350px;">
    <div class="card-body">
      <div class="d-flex align-items-center gap-3 mb-3">
        <div class="placeholder-glow">
          <span class="placeholder rounded-circle" style="width: 56px; height: 56px; display: inline-block;"></span>
        </div>
        <div class="flex-grow-1">
          <div class="placeholder-glow">
            <span class="placeholder col-9 mb-2"></span>
            <span class="placeholder col-6"></span>
          </div>
        </div>
      </div>
      <div class="placeholder-glow mb-3">
        <span class="placeholder col-12 mb-1"></span>
        <span class="placeholder col-10 mb-1"></span>
        <span class="placeholder col-11"></span>
      </div>
      <div class="d-flex gap-2">
        <span class="placeholder" style="width: 96px; height: 36px;"></span>
        <span class="placeholder" style="width: 96px; height: 36px;"></span>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="border rounded-lg p-4 w-[350px]">
    <div class="flex items-center gap-4 mb-4">
      <EdSkeletonCircle size="lg" />
      <div class="flex-1 space-y-2">
        <EdSkeleton class="h-4 w-3/4" />
        <EdSkeleton class="h-3 w-1/2" />
      </div>
    </div>
    <EdSkeletonText :lines="3" />
    <div class="flex gap-2 mt-4">
      <EdSkeleton class="h-9 w-24" />
      <EdSkeleton class="h-9 w-24" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { EdSkeleton, EdSkeletonCircle, EdSkeletonText } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Loading profile page.
 */
export const ProfilePage: Story = {
    render: () => (
        <div className="space-y-6 max-w-2xl">
            {/* Header */}
            <div className="flex items-start gap-6">
                <SkeletonCircle size="xl" />
                <div className="flex-1 space-y-4">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                    <div className="flex gap-4">
                        <Skeleton className="h-9 w-28" />
                        <Skeleton className="h-9 w-28" />
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="border rounded-lg p-4 space-y-2">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="border rounded-lg p-4 space-y-4">
                <Skeleton className="h-6 w-32" />
                <SkeletonText lines={4} />
            </div>

            {/* Activity */}
            <div className="border rounded-lg p-4 space-y-4">
                <Skeleton className="h-6 w-40" />
                <SkeletonAvatar />
                <SkeletonAvatar />
                <SkeletonAvatar />
            </div>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Skeleton, SkeletonCircle, SkeletonText, SkeletonAvatar } from "@fabioeducacross/ui";

<div className="space-y-6 max-w-2xl">
  {/* Header */}
  <div className="flex items-start gap-6">
    <SkeletonCircle size="xl" />
    <div className="flex-1 space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-64" />
      <div className="flex gap-4">
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-28" />
      </div>
    </div>
  </div>

  {/* Stats */}
  <div className="grid grid-cols-3 gap-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="border rounded-lg p-4 space-y-2">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>
    ))}
  </div>

  {/* Content */}
  <div className="border rounded-lg p-4 space-y-4">
    <Skeleton className="h-6 w-32" />
    <SkeletonText lines={4} />
  </div>

  {/* Activity */}
  <div className="border rounded-lg p-4 space-y-4">
    <Skeleton className="h-6 w-40" />
    <SkeletonAvatar />
    <SkeletonAvatar />
    <SkeletonAvatar />
  </div>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div style="max-width: 42rem;">
    <!-- Header -->
    <div class="d-flex align-items-start gap-3 mb-4">
      <div class="placeholder-glow">
        <span class="placeholder rounded-circle" style="width: 96px; height: 96px; display: block;"></span>
      </div>
      <div class="flex-fill">
        <div class="placeholder-glow mb-3">
          <span class="placeholder col-6" style="height: 2rem;"></span>
        </div>
        <div class="placeholder-glow mb-3">
          <span class="placeholder col-8" style="height: 1rem;"></span>
        </div>
        <div class="d-flex gap-2">
          <span class="placeholder col-3" style="height: 2.25rem;"></span>
          <span class="placeholder col-3" style="height: 2.25rem;"></span>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="row g-3 mb-4">
      <div class="col-4" v-for="i in 3" :key="i">
        <div class="border rounded p-3">
          <div class="placeholder-glow mb-2">
            <span class="placeholder col-6" style="height: 2rem;"></span>
          </div>
          <div class="placeholder-glow">
            <span class="placeholder col-8" style="height: 1rem;"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="border rounded p-3 mb-4 placeholder-glow">
      <span class="placeholder col-4 mb-3" style="height: 1.5rem; display: block;"></span>
      <span class="placeholder col-12 mb-2" style="height: 1rem; display: block;"></span>
      <span class="placeholder col-12 mb-2" style="height: 1rem; display: block;"></span>
      <span class="placeholder col-12 mb-2" style="height: 1rem; display: block;"></span>
      <span class="placeholder col-10" style="height: 1rem; display: block;"></span>
    </div>

    <!-- Activity -->
    <div class="border rounded p-3 placeholder-glow">
      <span class="placeholder col-5 mb-3" style="height: 1.5rem; display: block;"></span>
      <div class="d-flex align-items-center gap-2 mb-2" v-for="i in 3" :key="i">
        <span class="placeholder rounded-circle" style="width: 40px; height: 40px;"></span>
        <div class="flex-fill">
          <span class="placeholder col-8" style="height: 1rem; display: block;"></span>
          <span class="placeholder col-6" style="height: 0.875rem; display: block;"></span>
        </div>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="space-y-6 max-w-2xl">
    <!-- Header -->
    <div class="flex items-start gap-6">
      <EdSkeletonCircle size="xl" />
      <div class="flex-1 space-y-4">
        <EdSkeleton class="h-8 w-48" />
        <EdSkeleton class="h-4 w-64" />
        <div class="flex gap-4">
          <EdSkeleton class="h-9 w-28" />
          <EdSkeleton class="h-9 w-28" />
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-4">
      <div v-for="i in 3" :key="i" class="border rounded-lg p-4 space-y-2">
        <EdSkeleton class="h-8 w-16" />
        <EdSkeleton class="h-4 w-20" />
      </div>
    </div>

    <!-- Content -->
    <div class="border rounded-lg p-4 space-y-4">
      <EdSkeleton class="h-6 w-32" />
      <EdSkeletonText :lines="4" />
    </div>

    <!-- Activity -->
    <div class="border rounded-lg p-4 space-y-4">
      <EdSkeleton class="h-6 w-40" />
      <EdSkeletonAvatar v-for="i in 3" :key="i" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { EdSkeleton, EdSkeletonCircle, EdSkeletonText, EdSkeletonAvatar } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Loading dashboard.
 */
export const Dashboard: Story = {
    render: () => (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-48" />
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-32" />
                    <Skeleton className="h-9 w-32" />
                </div>
            </div>

            {/* Cards row */}
            <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border rounded-lg p-4 space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-20" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                ))}
            </div>

            {/* Main content */}
            <div className="grid grid-cols-2 gap-6">
                <div className="border rounded-lg p-4 space-y-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-[200px] w-full" />
                </div>
                <div className="border rounded-lg p-4 space-y-4">
                    <Skeleton className="h-6 w-32" />
                    <SkeletonTable rows={4} columns={3} />
                </div>
            </div>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Skeleton, SkeletonTable } from "@fabioeducacross/ui";

<div className="space-y-6">
  {/* Header */}
  <div className="flex justify-between items-center">
    <Skeleton className="h-8 w-48" />
    <div className="flex gap-2">
      <Skeleton className="h-9 w-32" />
      <Skeleton className="h-9 w-32" />
    </div>
  </div>

  {/* Cards row */}
  <div className="grid grid-cols-4 gap-4">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="border rounded-lg p-4 space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-3 w-32" />
      </div>
    ))}
  </div>

  {/* Main content */}
  <div className="grid grid-cols-2 gap-6">
    <div className="border rounded-lg p-4 space-y-4">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-[200px] w-full" />
    </div>
    <div className="border rounded-lg p-4 space-y-4">
      <Skeleton className="h-6 w-32" />
      <SkeletonTable rows={4} columns={3} />
    </div>
  </div>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <div>
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4 placeholder-glow">
      <span class="placeholder col-3" style="height: 2rem;"></span>
      <div class="d-flex gap-2">
        <span class="placeholder" style="width: 8rem; height: 2.25rem;"></span>
        <span class="placeholder" style="width: 8rem; height: 2.25rem;"></span>
      </div>
    </div>

    <!-- Cards row -->
    <div class="row g-3 mb-4">
      <div class="col-3" v-for="i in 4" :key="i">
        <div class="border rounded p-3 placeholder-glow">
          <span class="placeholder col-8 mb-2" style="height: 1rem; display: block;"></span>
          <span class="placeholder col-6 mb-2" style="height: 2.5rem; display: block;"></span>
          <span class="placeholder col-10" style="height: 0.75rem; display: block;"></span>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="row g-4">
      <div class="col-6">
        <div class="border rounded p-3 placeholder-glow">
          <span class="placeholder col-4 mb-3" style="height: 1.5rem; display: block;"></span>
          <span class="placeholder col-12" style="height: 200px; display: block;"></span>
        </div>
      </div>
      <div class="col-6">
        <div class="border rounded p-3 placeholder-glow">
          <span class="placeholder col-4 mb-3" style="height: 1.5rem; display: block;"></span>
          <table class="table">
            <thead>
              <tr>
                <th><span class="placeholder col-12"></span></th>
                <th><span class="placeholder col-12"></span></th>
                <th><span class="placeholder col-12"></span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in 4" :key="i">
                <td><span class="placeholder col-12"></span></td>
                <td><span class="placeholder col-12"></span></td>
                <td><span class="placeholder col-12"></span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <EdSkeleton class="h-8 w-48" />
      <div class="flex gap-2">
        <EdSkeleton class="h-9 w-32" />
        <EdSkeleton class="h-9 w-32" />
      </div>
    </div>

    <!-- Cards row -->
    <div class="grid grid-cols-4 gap-4">
      <div v-for="i in 4" :key="i" class="border rounded-lg p-4 space-y-2">
        <EdSkeleton class="h-4 w-24" />
        <EdSkeleton class="h-10 w-20" />
        <EdSkeleton class="h-3 w-32" />
      </div>
    </div>

    <!-- Main content -->
    <div class="grid grid-cols-2 gap-6">
      <div class="border rounded-lg p-4 space-y-4">
        <EdSkeleton class="h-6 w-32" />
        <EdSkeleton class="h-[200px] w-full" />
      </div>
      <div class="border rounded-lg p-4 space-y-4">
        <EdSkeleton class="h-6 w-32" />
        <EdSkeletonTable :rows="4" :columns="3" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EdSkeleton, EdSkeletonTable } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};
