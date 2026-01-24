import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sidebar, SidebarItem, SidebarSubItem } from "@fabioeducacross/ui";
import { useState } from "react";

const meta: Meta<typeof Sidebar> = {
    title: "Components/Sidebar",
    component: Sidebar,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Menu lateral de navegação do perfil professor com itens expansíveis e estados interativos.",
            },
        },
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

/**
 * Sidebar padrão com todos os itens do menu professor.
 */
export const Default: Story = {
    render: () => {
        const [expanded, setExpanded] = useState<Record<string, boolean>>({
            missions: true,
            reports: true,
            games: true,
            teachingSystem: true,
        });

        const toggleExpanded = (key: string) => {
            setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
        };

        return (
            <div className="h-screen bg-gray-100">
                <Sidebar>
                    <SidebarItem icon="Grid" label="Painel" variant="default" />
                    
                    <SidebarItem
                        icon="Flag"
                        label="Missões da escola"
                        variant="selected"
                        expandable
                        expanded={expanded.missions}
                        onClick={() => toggleExpanded("missions")}
                    />
                    
                    <SidebarItem icon="PlusCircle" label="Criar missão" variant="active" />
                    
                    <SidebarSubItem label="Missões" />
                    <SidebarSubItem label="Missões arquivadas" />
                    <SidebarSubItem label="Ranking de conquistas" />

                    <SidebarItem
                        icon="Activity"
                        label="Relatórios"
                        variant="default"
                        expandable
                        expanded={expanded.reports}
                        onClick={() => toggleExpanded("reports")}
                    />
                    <SidebarSubItem label="Relatório de evidências" />
                    <SidebarSubItem label="Relatório de habilidades" />
                    <SidebarSubItem label="Acesso dos alunos" />

                    <SidebarItem
                        icon="Layers"
                        label="Explorar jogos"
                        variant="default"
                        expandable
                        expanded={expanded.games}
                        onClick={() => toggleExpanded("games")}
                    />
                    <SidebarSubItem label="Configurações da ilha" />
                    <SidebarSubItem label="Ranking de conquistas" />

                    <SidebarItem icon="Users" label="Turmas" variant="default" />
                    <SidebarItem icon="Share2" label="Grupos" variant="default" />
                    <SidebarItem icon="User" label="Alunos" variant="default" />

                    <SidebarItem
                        icon="BookOpen"
                        label="Sistema de ensino"
                        variant="default"
                        expandable
                        expanded={expanded.teachingSystem}
                        onClick={() => toggleExpanded("teachingSystem")}
                    />
                    <SidebarSubItem label="Livros e missões" />
                    <SidebarSubItem label="Relatórios" />
                    <SidebarSubItem label="Ranking de conquistas" />

                    <SidebarItem icon="Calendar" label="Eventos" variant="default" />
                    <SidebarItem icon="FileText" label="Avaliação Diagnóstica" variant="default" />
                    <SidebarItem icon="Award" label="Highfive" variant="default" />
                    <SidebarItem icon="Download" label="Ajudas e materiais" variant="default" />
                    <SidebarItem icon="Search" label="Conhecer jogos" variant="default" />
                </Sidebar>
            </div>
        );
    },
    parameters: {
        multiFrameworkCode: {
            react: `import { Sidebar, SidebarItem, SidebarSubItem } from "@fabioeducacross/ui";

<Sidebar>
  <SidebarItem icon="Grid" label="Painel" variant="default" />
  <SidebarItem icon="Flag" label="Missões" variant="selected" expandable />
  <SidebarSubItem label="Missões" />
  <SidebarSubItem label="Missões arquivadas" />
  <SidebarItem icon="Activity" label="Relatórios" variant="default" />
</Sidebar>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap -->
<template>
  <nav class="bg-white border-end" style="width: 250px; height: 100vh;">
    <ul class="nav flex-column p-2">
      <li class="nav-item">
        <a class="nav-link" href="#"><i class="bi bi-grid"></i> Painel</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="#"><i class="bi bi-flag"></i> Missões</a>
        <ul class="nav flex-column ps-4">
          <li><a class="nav-link small">Missões</a></li>
          <li><a class="nav-link small">Missões arquivadas</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <EdSidebar>
    <EdSidebarItem icon="Grid" label="Painel" variant="default" />
    <EdSidebarItem icon="Flag" label="Missões" variant="selected" :expandable="true" />
    <EdSidebarSubItem label="Missões" />
    <EdSidebarSubItem label="Missões arquivadas" />
  </EdSidebar>
</template>

<script setup lang="ts">
import { EdSidebar, EdSidebarItem, EdSidebarSubItem } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Sidebar colapsado mostrando apenas ícones.
 */
export const Collapsed: Story = {
    render: () => (
        <div className="h-screen bg-gray-100">
            <Sidebar collapsed>
                <SidebarItem icon="Grid" label="Painel" variant="default" />
                <SidebarItem icon="Flag" label="Missões" variant="selected" />
                <SidebarItem icon="PlusCircle" label="Criar" variant="active" />
                <SidebarItem icon="Activity" label="Relatórios" variant="default" />
                <SidebarItem icon="Users" label="Turmas" variant="default" />
            </Sidebar>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Sidebar, SidebarItem } from "@fabioeducacross/ui";

<div className="h-screen bg-gray-100">
  <Sidebar collapsed>
    <SidebarItem icon="Grid" label="Painel" variant="default" />
    <SidebarItem icon="Flag" label="Missões" variant="selected" />
    <SidebarItem icon="PlusCircle" label="Criar" variant="active" />
    <SidebarItem icon="Activity" label="Relatórios" variant="default" />
    <SidebarItem icon="Users" label="Turmas" variant="default" />
  </Sidebar>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap Offcanvas colapsado -->
<template>
  <div class="vh-100 bg-light">
    <div class="offcanvas offcanvas-start show" style="width: 80px;" data-bs-scroll="true" data-bs-backdrop="false">
      <div class="offcanvas-body p-2">
        <nav class="nav flex-column">
          <a class="nav-link text-center" href="#" title="Painel"><i class="bi bi-grid"></i></a>
          <a class="nav-link text-center active" href="#" title="Missões"><i class="bi bi-flag"></i></a>
          <a class="nav-link text-center" href="#" title="Criar"><i class="bi bi-plus-circle"></i></a>
          <a class="nav-link text-center" href="#" title="Relatórios"><i class="bi bi-activity"></i></a>
          <a class="nav-link text-center" href="#" title="Turmas"><i class="bi bi-people"></i></a>
        </nav>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="h-screen bg-gray-100">
    <EdSidebar collapsed>
      <EdSidebarItem icon="Grid" label="Painel" variant="default" />
      <EdSidebarItem icon="Flag" label="Missões" variant="selected" />
      <EdSidebarItem icon="PlusCircle" label="Criar" variant="active" />
      <EdSidebarItem icon="Activity" label="Relatórios" variant="default" />
      <EdSidebarItem icon="Users" label="Turmas" variant="default" />
    </EdSidebar>
  </div>
</template>

<script setup lang="ts">
import { EdSidebar, EdSidebarItem } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Estados dos itens do menu.
 */
export const ItemStates: Story = {
    render: () => (
        <div className="h-screen bg-gray-100">
            <Sidebar>
                <SidebarItem icon="Grid" label="Item padrão" variant="default" />
                <SidebarItem icon="Flag" label="Item ativo" variant="active" />
                <SidebarItem icon="PlusCircle" label="Item selecionado" variant="selected" />
                <SidebarItem
                    icon="Activity"
                    label="Item expansível"
                    variant="default"
                    expandable
                />
                <SidebarItem
                    icon="Users"
                    label="Item expandido"
                    variant="default"
                    expandable
                    expanded
                />
                <SidebarSubItem label="Subitem 1" />
                <SidebarSubItem label="Subitem 2" active />
            </Sidebar>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Sidebar, SidebarItem, SidebarSubItem } from "@fabioeducacross/ui";

<div className="h-screen bg-gray-100">
  <Sidebar>
    <SidebarItem icon="Grid" label="Item padrão" variant="default" />
    <SidebarItem icon="Flag" label="Item ativo" variant="active" />
    <SidebarItem icon="PlusCircle" label="Item selecionado" variant="selected" />
    <SidebarItem icon="Activity" label="Item expansível" variant="default" expandable />
    <SidebarItem icon="Users" label="Item expandido" variant="default" expandable expanded />
    <SidebarSubItem label="Subitem 1" />
    <SidebarSubItem label="Subitem 2" active />
  </Sidebar>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap Offcanvas -->
<template>
  <div class="vh-100 bg-light">
    <div class="offcanvas offcanvas-start show" data-bs-scroll="true" data-bs-backdrop="false">
      <div class="offcanvas-body p-0">
        <nav class="nav flex-column">
          <a class="nav-link" href="#"><i class="bi bi-grid me-2"></i>Item padrão</a>
          <a class="nav-link active" href="#"><i class="bi bi-flag me-2"></i>Item ativo</a>
          <a class="nav-link" href="#"><i class="bi bi-plus-circle me-2"></i>Item selecionado</a>
          <a class="nav-link" data-bs-toggle="collapse" href="#collapse1"><i class="bi bi-activity me-2"></i>Item expansível</a>
          <a class="nav-link" data-bs-toggle="collapse" href="#collapse2" aria-expanded="true"><i class="bi bi-people me-2"></i>Item expandido</a>
          <div class="collapse show" id="collapse2">
            <a class="nav-link ps-5" href="#">Subitem 1</a>
            <a class="nav-link ps-5 active" href="#">Subitem 2</a>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="h-screen bg-gray-100">
    <EdSidebar>
      <EdSidebarItem icon="Grid" label="Item padrão" variant="default" />
      <EdSidebarItem icon="Flag" label="Item ativo" variant="active" />
      <EdSidebarItem icon="PlusCircle" label="Item selecionado" variant="selected" />
      <EdSidebarItem icon="Activity" label="Item expansível" variant="default" :expandable="true" />
      <EdSidebarItem icon="Users" label="Item expandido" variant="default" :expandable="true" :expanded="true" />
      <EdSidebarSubItem label="Subitem 1" />
      <EdSidebarSubItem label="Subitem 2" :active="true" />
    </EdSidebar>
  </div>
</template>

<script setup lang="ts">
import { EdSidebar, EdSidebarItem, EdSidebarSubItem } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Sidebar com botão de ação secundária.
 */
export const WithButton: Story = {
    render: () => (
        <div className="h-screen bg-gray-100">
            <Sidebar>
                <SidebarItem icon="Grid" label="Painel" variant="active" />
                <SidebarItem icon="Flag" label="Missões" variant="default" />
                <SidebarItem icon="Users" label="Turmas" variant="default" />
            </Sidebar>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Sidebar, SidebarItem } from "@fabioeducacross/ui";

<div className="h-screen bg-gray-100">
  <Sidebar>
    <SidebarItem icon="Grid" label="Painel" variant="active" />
    <SidebarItem icon="Flag" label="Missões" variant="default" />
    <SidebarItem icon="Users" label="Turmas" variant="default" />
  </Sidebar>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap Offcanvas -->
<template>
  <div class="vh-100 bg-light">
    <div class="offcanvas offcanvas-start show" data-bs-scroll="true" data-bs-backdrop="false">
      <div class="offcanvas-body p-0">
        <nav class="nav flex-column">
          <a class="nav-link active" href="#"><i class="bi bi-grid me-2"></i>Painel</a>
          <a class="nav-link" href="#"><i class="bi bi-flag me-2"></i>Missões</a>
          <a class="nav-link" href="#"><i class="bi bi-people me-2"></i>Turmas</a>
        </nav>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="h-screen bg-gray-100">
    <EdSidebar>
      <EdSidebarItem icon="Grid" label="Painel" variant="active" />
      <EdSidebarItem icon="Flag" label="Missões" variant="default" />
      <EdSidebarItem icon="Users" label="Turmas" variant="default" />
    </EdSidebar>
  </div>
</template>

<script setup lang="ts">
import { EdSidebar, EdSidebarItem } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};

/**
 * Sidebar no tema branco.
 */
export const WhiteTheme: Story = {
    render: () => (
        <div className="h-screen bg-gray-100">
            <Sidebar theme="white">
                <SidebarItem icon="Grid" label="Painel" variant="active" theme="white" />
                <SidebarItem icon="Flag" label="Missões" variant="default" theme="white" />
                <SidebarItem icon="Users" label="Turmas" variant="default" theme="white" />
            </Sidebar>
        </div>
    ),
    parameters: {
        multiFrameworkCode: {
            react: `import { Sidebar, SidebarItem } from "@fabioeducacross/ui";

<div className="h-screen bg-gray-100">
  <Sidebar theme="white">
    <SidebarItem icon="Grid" label="Painel" variant="active" theme="white" />
    <SidebarItem icon="Flag" label="Missões" variant="default" theme="white" />
    <SidebarItem icon="Users" label="Turmas" variant="default" theme="white" />
  </Sidebar>
</div>`,
            vue2: `<!-- Exemplo conceitual com Bootstrap Offcanvas tema branco -->
<template>
  <div class="vh-100 bg-light">
    <div class="offcanvas offcanvas-start show bg-white" data-bs-scroll="true" data-bs-backdrop="false">
      <div class="offcanvas-body p-0">
        <nav class="nav flex-column">
          <a class="nav-link active text-dark" href="#"><i class="bi bi-grid me-2"></i>Painel</a>
          <a class="nav-link text-dark" href="#"><i class="bi bi-flag me-2"></i>Missões</a>
          <a class="nav-link text-dark" href="#"><i class="bi bi-people me-2"></i>Turmas</a>
        </nav>
      </div>
    </div>
  </div>
</template>`,
            vue3: `<!-- Exemplo conceitual - pacote em desenvolvimento -->
<template>
  <div class="h-screen bg-gray-100">
    <EdSidebar theme="white">
      <EdSidebarItem icon="Grid" label="Painel" variant="active" theme="white" />
      <EdSidebarItem icon="Flag" label="Missões" variant="default" theme="white" />
      <EdSidebarItem icon="Users" label="Turmas" variant="default" theme="white" />
    </EdSidebar>
  </div>
</template>

<script setup lang="ts">
import { EdSidebar, EdSidebarItem } from "@fabioeducacross/ui-vue3";
</script>`,
        },
    },
};
