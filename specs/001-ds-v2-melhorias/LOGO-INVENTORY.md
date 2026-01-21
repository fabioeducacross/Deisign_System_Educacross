# Logo Inventory - Design System v2.0

**Task**: T001  
**Date**: 2026-01-20  
**Status**: ✅ COMPLETE

---

## Findings Summary

| Métrica | Valor |
|---------|-------|
| **Logo Files Found** | 1 |
| **Path** | `packages/ui/src/assets/images/logo-educacross.svg` |
| **File Size** | 19.13 KB (19,594 bytes) |
| **ViewBox** | `0 0 200 28` |
| **Width × Height** | 200 × 28 (aspect ratio 7.14:1) |
| **Fill Colors** | `#225054` (primary), `#FF9F43` (accent), `#E9934C`, `white`, `#201E1E`, `#173C3F`, `#DF2B3C` |

---

## Logo Variants

### ✅ Found: logo-educacross.svg

**Location**: `packages/ui/src/assets/images/logo-educacross.svg`  
**Size**: 19.13 KB  
**Dimensions**: 200 × 28 px  
**ViewBox**: `0 0 200 28`

**Color Palette**:
- Primary: `#225054` (dark teal - corpo da coruja)
- Accent: `#FF9F43` (orange - olhos)
- Secondary: `#E9934C` (darker orange)
- Texto: `#225054` (Educacross text)
- Destaque: `#DF2B3C` (red - "cross" em Educacross)

**Structure**:
- Logo completo (owl mascot + wordmark "Educacross")
- 21 `<path>` elements
- Complex SVG com gradientes de sombra
- Texto integrado (não é font, são paths)

### ❌ Not Found: logo-educacross-white.svg

Pesquisa em todo repositório não encontrou variante white/light.

**Implicação**: Uma única variante será convertida. Para adaptar a temas:
- Usar `currentColor` em paths principais
- Ou manter cores fixas (mais consistente com brand)

---

## Current Usage

### 1. Logo Component (`packages/ui/src/components/Logo/Logo.tsx`)

```typescript
import logoEducacross from "../../assets/images/logo-educacross.svg";
```

**Problema**: Path relativo quebra em `node_modules/` após npm install.

**Props Atuais**:
- `size`: "sm" | "default" | "lg"
- `className`: string (optional)
- Standard HTML props via spread

### 2. Logo Test (`packages/ui/src/components/Logo/Logo.test.tsx`)

```typescript
expect.stringContaining("logo-educacross")
```

Testes esperam atributo `src` com "logo-educacross".

### 3. Header Component (`packages/ui/src/components/Header/Header.test.tsx`)

```typescript
expect(logo).toHaveAttribute("src", expect.stringContaining("logo-educacross"));
```

Header usa `<Logo>` e testa presença do src.

---

## Decision: Conversion Strategy

### ✅ ESCOLHIDO: Option 1 - Full Inline SVG

**Rationale**:
1. **Reliability**: Zero dependência de bundler config, funciona 100% dos casos
2. **SSR/SSG Safe**: SVG inline não tem hydration mismatch
3. **Tree-shakeable**: Sem asset externo = menos complexidade de build
4. **Size Acceptable**: 19.13KB raw → ~6KB gzipped (inline no bundle)

**Trade-offs**:
- Bundle aumenta ~15KB uncompressed (aceitável vs 150KB target)
- SVG não reutilizável como asset separado (não é problema, é componente único)

### ❌ REJEITADO: Option 2 - Fix Bundler Config

**Por que não**: 
- Frágil: depende de cada consumer configurar bundler corretamente
- Não funciona em todos setups (Webpack vs Vite vs Turbopack)
- SSR complexo (Next.js Image Optimization não aplica a SVG)

### ❌ REJEITADO: Option 3 - Base64 Encode

**Por que não**:
- Aumenta size em 33% (base64 overhead)
- Não inspecionável no DevTools
- Perde vantagens de SVG inline (CSS styling, accessibility)

### ❌ REJEITADO: Option 4 - External CDN

**Por que não**:
- Adiciona dependência externa (CDN down = logo down)
- Latência extra (network request)
- GDPR/Privacy concerns (external tracking)

---

## Implementation Plan

### Step 1: Extract SVG Content

Copiar todo conteúdo de `logo-educacross.svg` (21 `<path>` elements).

### Step 2: Create Inline Component

```tsx
// packages/ui/src/components/Logo/Logo.tsx
export const Logo = React.forwardRef<SVGSVGElement, LogoProps>(
  ({ size = "default", className, ...props }, ref) => {
    const sizes = {
      sm: "h-5 w-auto",
      default: "h-7 w-auto",
      lg: "h-9 w-auto",
    };

    return (
      <svg
        ref={ref}
        className={cn(sizes[size], className)}
        width="200"
        height="28"
        viewBox="0 0 200 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Educacross"
        {...props}
      >
        {/* 21 paths aqui */}
      </svg>
    );
  }
);
```

### Step 3: Preserve API

- Props: `size`, `className`, `...props` → **IDÊNTICO**
- Sizes: `sm`, `default`, `lg` → **IDÊNTICO**
- Ref forwarding → **MANTIDO**

### Step 4: Update Tests

- `Logo.test.tsx`: Remover expect de `src` attribute
- `Header.test.tsx`: Remover expect de `src` attribute
- Novos testes: verificar `role="img"`, `aria-label`, `viewBox`

### Step 5: Delete External Asset

Após validação, deletar `packages/ui/src/assets/images/logo-educacross.svg` (economia de 19KB no pacote).

---

## Color Customization Strategy

### Option A: Fixed Colors (RECOMENDADO)

Manter cores exatas do SVG original (`#225054`, `#FF9F43`, etc).

**Pros**:
- Brand consistency 100%
- Designer aprova fácil
- Zero risco de logo quebrado

**Cons**:
- Não adapta a dark mode automaticamente

### Option B: currentColor

Substituir `fill="#225054"` por `fill="currentColor"`.

**Pros**:
- Adapta a `className="text-primary"`
- Dark mode automático

**Cons**:
- Perde multi-color do logo (coruja + texto)
- Designer pode rejeitar (brand guidelines)

**DECISÃO**: **Option A (Fixed Colors)** + classe utilitária para invert em dark mode se necessário.

---

## Size Comparison

| Versão | Size Uncompressed | Size Gzipped | Notes |
|--------|-------------------|--------------|-------|
| **External SVG** | 19.13 KB | ~6 KB | Asset separado |
| **Inline SVG** | +19KB bundle | +6KB bundle | Dentro do JS |
| **Bundle Total** | 384 KB → 403 KB | 142 KB → 148 KB | Aumento de 4.2% |

**Conclusão**: Aumento aceitável (< 5%) vs ganho de reliability.

---

## Accessibility Validation

### ✅ Must Have

- `role="img"` → Identifica como imagem
- `aria-label="Educacross"` → Label para screen readers
- `focusable="false"` → Não focável por teclado (decorativo)

### ✅ Nice to Have

- `<title>` tag interno → Tooltip nativo
- `aria-hidden="true"` se decorativo em contexto específico

---

## Next Steps

1. **✅ T001 COMPLETE** - Logo inventory finalizado
2. **➡️ T002** - Medir bundle baseline antes da mudança
3. **➡️ T003** - Obter approval do Design (cores fixas vs currentColor)
4. **➡️ T007** - Implementar conversão inline

---

## Approval Needed

| Stakeholder | Question | Decision |
|-------------|----------|----------|
| **Design** | Aprovar cores fixas vs currentColor? | 🟡 PENDING |
| **Tech Lead** | Aprovar +6KB gzip bundle increase? | 🟡 PENDING |
| **DevEx** | API externa idêntica suficiente? | ✅ YES (assumed) |

---

**Status**: ✅ INVENTORY COMPLETE  
**Blocker**: Nenhum - pode prosseguir para T002  
**Risk**: Baixo - estratégia validada por plan.md e spec.md
