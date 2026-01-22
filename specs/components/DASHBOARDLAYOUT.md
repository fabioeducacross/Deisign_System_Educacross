# DashboardLayout — Template (Estrutura de Dashboard)

## 1. Resumo

**O que é:** Template de layout para páginas administrativas e dashboards, com sidebar navegável, header fixo e área de conteúdo responsiva.

**Quando usar:**
- ✅ Área administrativa (professores, coordenadores, admins)
- ✅ Dashboards com múltiplas seções
- ✅ Aplicações com navegação lateral persistente
- ✅ Plataformas com múltiplos perfis de usuário

**Quando NÃO usar:**
- ❌ Landing pages públicas
- ❌ Área do aluno (considere layout mais lúdico)
- ❌ Páginas de autenticação (login/registro)
- ❌ Mobile-first sem navegação complexa

---

## 2. Anatomia

```tsx
<DashboardLayout>
  <Sidebar>              {/* Navegação lateral */}
    <SidebarHeader>
      <Logo />
      <UserProfile />
    </SidebarHeader>
    <SidebarNav>
      <SidebarItem />
      <SidebarSubItem />
    </SidebarNav>
    <SidebarFooter>
      <ThemeSwitcher />
      <LogoutButton />
    </SidebarFooter>
  </Sidebar>
  
  <MainContent>
    <Header>             {/* Barra superior */}
      <Breadcrumbs />
      <HeaderActions>
        <Notifications />
        <UserMenu />
      </HeaderActions>
    </Header>
    
    <ContentArea>        {/* Área de conteúdo */}
      {children}
    </ContentArea>
    
    <Footer />           {/* Rodapé (opcional) */}
  </MainContent>
</DashboardLayout>
```

**Estrutura visual (Desktop):**

```
┌─────────────────────────────────────────────────────────────┐
│┌──────────┬─────────────────────────────────────────────────┐│
││          │ Dashboard > Alunos              🔔 👤 Menu     ││ ← Header (60px)
│├──────────┼─────────────────────────────────────────────────┤│
││  Logo    │                                                 ││
││          │                                                 ││
││  [📊]    │                                                 ││
││  [👥]    │          Conteúdo da Página                     ││
││  [📝]    │                                                 ││
││  [⚙️]    │                                                 ││
││          │                                                 ││
│├──────────┤                                                 ││
││  [🌙]    │                                                 ││
││  [🚪]    │                                                 ││
│└──────────┴─────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
 ↑ Sidebar (240px)      ↑ MainContent (flex-1)
```

**Estrutura visual (Mobile):**

```
┌───────────────────────────────┐
│ ☰ Dashboard > Alunos    🔔 👤│ ← Header (56px)
├───────────────────────────────┤
│                               │
│                               │
│     Conteúdo da Página        │
│                               │
│                               │
└───────────────────────────────┘

[Sidebar em drawer/overlay quando clica ☰]
```

---

## 3. Estados & Variações

### **Estados da Sidebar**

| Estado | Desktop | Mobile | Comportamento |
|--------|---------|--------|---------------|
| **Expanded** | 240px largura | Overlay full | Padrão desktop, mostra labels |
| **Collapsed** | 60px largura | Oculta | Apenas ícones, hover mostra tooltip |
| **Hidden** | Oculta completamente | Oculta | Máximo espaço para conteúdo |
| **Floating** | Overlay sobre conteúdo | Overlay | Temporária, fecha ao clicar fora |

### **Variações de Layout**

```tsx
sidebarPosition: "left" | "right"
sidebarBehavior: "persistent" | "temporary" | "permanent"
headerHeight: "compact" (56px) | "comfortable" (60px) | "spacious" (72px)
```

### **Variações de Perfil**

| Perfil | Sidebar Items | Cores | Ênfase |
|--------|---------------|-------|--------|
| **Professor** | Turmas, Missões, Relatórios | Verde educacional | Gestão de conteúdo |
| **Coordenador** | Escolas, Professores, Análises | Azul analítico | Visão geral |
| **Admin** | Configurações, Usuários, Logs | Cinza neutro | Controle técnico |
| **Aluno** | (Não usa este layout) | — | Usa layout gamificado |

---

## 4. API de Props

### **DashboardLayout**

| Prop | Tipo | Default | Obrigatório | Descrição |
|------|------|---------|-------------|-----------|
| `children` | `React.ReactNode` | — | ✅ | Conteúdo da página |
| `sidebar` | `SidebarConfig` | — | ✅ | Configuração da sidebar |
| `header` | `HeaderConfig` | — | ❌ | Configuração do header |
| `sidebarPosition` | `"left" \| "right"` | `"left"` | ❌ | Posição da sidebar |
| `sidebarBehavior` | `"persistent" \| "temporary"` | `"persistent"` | ❌ | Comportamento mobile |
| `defaultSidebarOpen` | `boolean` | `true` | ❌ | Estado inicial da sidebar |
| `onSidebarToggle` | `(open: boolean) => void` | — | ❌ | Callback ao alternar |
| `breadcrumbs` | `Breadcrumb[]` | `[]` | ❌ | Navegação hierárquica |
| `footer` | `React.ReactNode` | `null` | ❌ | Rodapé customizado |
| `className` | `string` | `""` | ❌ | Classes adicionais |

### **SidebarConfig**

```tsx
interface SidebarConfig {
  logo?: React.ReactNode;
  user?: {
    name: string;
    avatar?: string;
    role: string;
  };
  items: SidebarItem[];
  footer?: React.ReactNode;
  collapsible?: boolean;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
  active?: boolean;
  children?: SidebarSubItem[];
}

interface SidebarSubItem {
  id: string;
  label: string;
  href: string;
  badge?: string | number;
  active?: boolean;
}
```

### **HeaderConfig**

```tsx
interface HeaderConfig {
  height?: "compact" | "comfortable" | "spacious";
  showBreadcrumbs?: boolean;
  actions?: React.ReactNode;
  notifications?: {
    count: number;
    onClick: () => void;
  };
  userMenu?: {
    name: string;
    avatar?: string;
    items: MenuItem[];
  };
}
```

---

## 5. Acessibilidade

### **Estrutura Semântica**

```tsx
<div className="dashboard-layout">
  {/* Skip Links */}
  <a href="#main-content" className="sr-only focus:not-sr-only">
    Pular para conteúdo principal
  </a>
  
  {/* Sidebar */}
  <aside
    className="sidebar"
    aria-label="Navegação principal"
    aria-hidden={!sidebarOpen}
  >
    <nav role="navigation">
      <ul role="menu">
        <li role="menuitem">
          <a href="/dashboard" aria-current={isActive ? "page" : undefined}>
            Dashboard
          </a>
        </li>
      </ul>
    </nav>
  </aside>
  
  {/* Main Content */}
  <div className="main-content">
    <header role="banner">
      <nav aria-label="Breadcrumb">
        <ol>
          <li><a href="/">Início</a></li>
          <li aria-current="page">Dashboard</li>
        </ol>
      </nav>
    </header>
    
    <main id="main-content" role="main" tabIndex={-1}>
      {children}
    </main>
  </div>
</div>
```

### **Regras Obrigatórias**

- ✅ **Skip link** para pular navegação e ir direto ao conteúdo
- ✅ **Landmark roles** (banner, navigation, main, contentinfo)
- ✅ **aria-label** na sidebar e navegações
- ✅ **aria-current="page"** no item ativo
- ✅ **aria-expanded** em itens com submenu
- ✅ **Foco gerenciável** ao abrir/fechar sidebar
- ✅ **Foco trap** em sidebar mobile (overlay)
- ✅ **Anúncio de mudanças** via `aria-live` quando necessário

### **Navegação por Teclado**

| Tecla | Ação |
|-------|------|
| **Tab** | Navega entre controles (sidebar → header → conteúdo) |
| **Shift+Tab** | Navega para trás |
| **Enter** | Ativa link ou botão |
| **Espaço** | Ativa botão |
| **Esc** | Fecha sidebar mobile |
| **Ctrl+B** | Toggle sidebar (atalho opcional) |
| **↑/↓** | Navega entre itens da sidebar (opcional, modo menu) |

---

## 6. Práticas Recomendadas

### **✅ DO (Faça)**

1. **Hierarquia visual clara** — Itens ativos destacados, submenu indentado
2. **Tooltips em sidebar colapsada** — Mostrar label ao hover nos ícones
3. **Badges informativos** — Notificações não lidas, novos conteúdos
4. **Breadcrumbs úteis** — Navegação hierárquica em páginas profundas
5. **Transições suaves** — Animação ao expandir/colapsar sidebar (200-300ms)
6. **Persistência de estado** — Salvar sidebar collapsed/expanded no localStorage
7. **Indicador de carregamento** — Skeleton ou spinner ao trocar de página
8. **Scroll independente** — Sidebar e conteúdo com scroll separados

### **❌ DON'T (Evite)**

1. ❌ **Sidebar muito larga** — Máximo 280px, ideal 240px
2. ❌ **Muitos níveis de menu** — Máximo 2 níveis (item + subitem)
3. ❌ **Ícones sem significado** — Use ícones reconhecíveis ou apenas labels
4. ❌ **Header fixo muito alto** — Consome espaço vertical precioso
5. ❌ **Overlay sem fechar ao clicar fora** — Frustração em mobile
6. ❌ **Animações lentas** — >500ms é perceptível como lentidão
7. ❌ **Breadcrumbs em todas as páginas** — Só quando houver hierarquia real
8. ❌ **Footer fixo** — Rouba espaço, deixe natural no final do conteúdo

---

## 7. Exemplos de Uso

### **Exemplo 1: Dashboard do Professor**

```tsx
import { DashboardLayout } from "@fabioeducacross/ui";
import { Home, Users, BookOpen, BarChart2, Settings } from "react-feather";

function ProfessorDashboard({ children }) {
  const sidebarConfig: SidebarConfig = {
    logo: <Logo variant="horizontal" />,
    user: {
      name: "Prof. João Silva",
      avatar: "/avatars/joao.jpg",
      role: "Professor",
    },
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: <Home size={20} />,
        href: "/professor/dashboard",
      },
      {
        id: "students",
        label: "Alunos",
        icon: <Users size={20} />,
        href: "/professor/students",
        badge: 3, // 3 alunos pendentes
      },
      {
        id: "missions",
        label: "Missões",
        icon: <BookOpen size={20} />,
        children: [
          { id: "active", label: "Ativas", href: "/professor/missions/active" },
          { id: "draft", label: "Rascunhos", href: "/professor/missions/draft", badge: 2 },
          { id: "archived", label: "Arquivadas", href: "/professor/missions/archived" },
        ],
      },
      {
        id: "reports",
        label: "Relatórios",
        icon: <BarChart2 size={20} />,
        href: "/professor/reports",
      },
      {
        id: "settings",
        label: "Configurações",
        icon: <Settings size={20} />,
        href: "/professor/settings",
      },
    ],
    footer: (
      <div className="flex items-center gap-2 p-4">
        <ThemeSwitcher />
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut size={16} />
        </Button>
      </div>
    ),
  };
  
  const headerConfig: HeaderConfig = {
    showBreadcrumbs: true,
    notifications: {
      count: 5,
      onClick: () => setNotificationsOpen(true),
    },
    userMenu: {
      name: "Prof. João Silva",
      avatar: "/avatars/joao.jpg",
      items: [
        { label: "Meu perfil", href: "/professor/profile", icon: <User size={16} /> },
        { label: "Configurações", href: "/professor/settings", icon: <Settings size={16} /> },
        { label: "Ajuda", href: "/help", icon: <HelpCircle size={16} /> },
        { label: "Sair", onClick: handleLogout, icon: <LogOut size={16} />, variant: "destructive" },
      ],
    },
  };
  
  return (
    <DashboardLayout
      sidebar={sidebarConfig}
      header={headerConfig}
      breadcrumbs={[
        { label: "Dashboard", href: "/professor/dashboard" },
        { label: "Alunos", href: "/professor/students" },
        { label: "Turma 5A" }, // atual
      ]}
    >
      {children}
    </DashboardLayout>
  );
}
```

### **Exemplo 2: Dashboard do Coordenador**

```tsx
function CoordinatorDashboard() {
  const sidebarConfig: SidebarConfig = {
    items: [
      {
        id: "overview",
        label: "Visão Geral",
        icon: <PieChart size={20} />,
        href: "/coordinator/overview",
      },
      {
        id: "schools",
        label: "Escolas",
        icon: <Building size={20} />,
        href: "/coordinator/schools",
        badge: 12,
      },
      {
        id: "teachers",
        label: "Professores",
        icon: <Users size={20} />,
        href: "/coordinator/teachers",
      },
      {
        id: "analytics",
        label: "Análises",
        icon: <TrendingUp size={20} />,
        children: [
          { label: "Performance", href: "/coordinator/analytics/performance" },
          { label: "Engajamento", href: "/coordinator/analytics/engagement" },
          { label: "Relatórios", href: "/coordinator/analytics/reports" },
        ],
      },
    ],
  };
  
  return (
    <DashboardLayout
      sidebar={sidebarConfig}
      header={{ height: "comfortable" }}
    >
      {/* Conteúdo do coordenador */}
    </DashboardLayout>
  );
}
```

### **Exemplo 3: Layout com Sidebar Colapsável**

```tsx
function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebarCollapsed") === "true";
  });
  
  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
    localStorage.setItem("sidebarCollapsed", String(collapsed));
  };
  
  return (
    <DashboardLayout
      sidebar={{ ...config, collapsible: true }}
      defaultSidebarOpen={!sidebarCollapsed}
      onSidebarToggle={handleSidebarToggle}
    >
      <YourPage />
    </DashboardLayout>
  );
}
```

---

## 8. Responsividade

### **Mobile (<640px)**

```tsx
- Sidebar: Overlay drawer (full width - 280px)
- Header: 56px altura, ícones reduzidos
- Hamburguer menu sempre visível
- Sidebar fecha ao clicar em item
- Breadcrumbs ocultados ou simplificados (apenas último item)
- Footer opcional (pode ocultar)
```

### **Tablet (640-1024px)**

```tsx
- Sidebar: 200px largura ou colapsada em 60px
- Header: 60px altura
- Pode alternar entre expanded/collapsed com botão
- Breadcrumbs completos
- Submenu pode abrir em popover em vez de inline
```

### **Desktop (>1024px)**

```tsx
- Sidebar: 240px largura padrão
- Header: 60-72px altura
- Hover states em itens de menu
- Tooltips em sidebar colapsada
- Submenu inline expandido
- Pode ter sidebar direita adicional (ex: chat, ajuda)
```

---

## 9. Conteúdo & Microcopy

### **Labels de Navegação**

| Ruim ❌ | Bom ✅ |
|---------|--------|
| Home | Dashboard |
| Users | Alunos / Professores (específico) |
| Data | Relatórios de Desempenho |
| Config | Configurações |

### **Badges & Notificações**

| Contexto | Badge | Tooltip |
|----------|-------|---------|
| Novos | "3" | "3 novos alunos" |
| Pendentes | "!" | "Ações pendentes" |
| Rascunhos | "2" | "2 missões em rascunho" |
| Atualização | "•" | "Nova atualização disponível" |

### **UserMenu**

| Item | Quando usar |
|------|-------------|
| Meu perfil | Link para edição de perfil |
| Configurações | Preferências pessoais |
| Ajuda | Central de ajuda / FAQ |
| Notificações | Acessar todas notificações |
| Trocar conta | Multi-perfil (professor + coordenador) |
| Sair | Logout |

---

## 10. Relação no Atomic Design

```
DashboardLayout (TEMPLATE)
├── Sidebar (ORGANISMO)
│   ├── Logo (ÁTOMO)
│   ├── UserProfile (MOLÉCULA)
│   │   ├── Avatar (ÁTOMO)
│   │   └── UserInfo (ÁTOMO)
│   ├── SidebarNav (MOLÉCULA)
│   │   ├── SidebarItem (MOLÉCULA)
│   │   │   ├── Icon (ÁTOMO)
│   │   │   ├── Label (ÁTOMO)
│   │   │   └── Badge (ÁTOMO)
│   │   └── SidebarSubItem (MOLÉCULA)
│   └── SidebarFooter (MOLÉCULA)
│       ├── ThemeSwitcher (MOLÉCULA)
│       └── Button (ÁTOMO)
├── Header (ORGANISMO)
│   ├── Breadcrumbs (MOLÉCULA)
│   ├── NotificationBell (MOLÉCULA)
│   │   ├── Icon (ÁTOMO)
│   │   └── Badge (ÁTOMO)
│   └── UserMenu (MOLÉCULA)
│       ├── Avatar (ÁTOMO)
│       └── DropdownMenu (MOLÉCULA)
└── MainContent (MOLÉCULA)
    ├── ContentArea (ÁTOMO)
    └── Footer (MOLÉCULA)

Instanciado em:
├── ProfessorDashboard (PÁGINA)
├── CoordinatorDashboard (PÁGINA)
└── AdminPanel (PÁGINA)
```

---

## 11. Checklist de Validação

### **Acessibilidade**

- [x] Skip link para conteúdo principal
- [x] Landmark roles (banner, navigation, main)
- [x] aria-label em navegações
- [x] aria-current="page" no item ativo
- [x] aria-expanded em submenu
- [x] Foco gerenciável (trap em sidebar mobile)
- [x] Navegação completa por teclado
- [x] Atalhos documentados (ex: Ctrl+B)

### **Consistência Visual**

- [x] Usa tokens de cor e espaçamento
- [x] Transições suaves (<300ms)
- [x] Hover states em itens clicáveis
- [x] Indicador visual de página ativa
- [x] Badges consistentes

### **Conteúdo & UX**

- [x] Labels de navegação claros
- [x] Breadcrumbs úteis (apenas quando há hierarquia)
- [x] Notificações com contador visível
- [x] Logout acessível e confirmado
- [x] Loading states durante navegação

### **Performance**

- [x] Sidebar renderiza apenas quando visível
- [x] Lazy load de conteúdo ao trocar página
- [x] Persistência de estado (collapsed/expanded)
- [x] Transições com CSS (não JS)

### **Responsividade**

- [x] Mobile: Sidebar em drawer overlay
- [x] Tablet: Sidebar colapsável
- [x] Desktop: Sidebar persistente
- [x] Touch targets adequados (≥44px)

---

## 12. Próximos Passos

1. ⏳ Implementar DashboardLayout base (Sidebar + Header + Main)
2. ⏳ Adicionar comportamento collapsible
3. ⏳ Implementar modo mobile (drawer)
4. ⏳ Criar variantes por perfil (Professor, Coordenador, Admin)
5. ⏳ Adicionar suporte a submenu
6. ⏳ Integrar com roteamento (Next.js / React Router)
7. ⏳ Implementar persistência de estado
8. ⏳ Adicionar keyboard shortcuts
9. ⏳ Documentar no Storybook
10. ⏳ Criar testes de responsividade
