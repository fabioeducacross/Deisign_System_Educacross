# 🐛 Bug: Componente `<Logo>` não carrega imagem quando importado via node_modules

## 📋 Descrição do Problema

O componente `<Logo>` do Design System não renderiza a imagem quando o pacote `@fabioeducacross/ui` é instalado via npm/pnpm e importado em projetos externos.

## 🔍 Comportamento Atual

- O logo não aparece na tela (imagem quebrada ou vazia)
- Console do navegador mostra erro 404 para o arquivo SVG
- Caminho do asset não é resolvido corretamente: `./logo-educacross-QX63FFDZ.svg`

## ✅ Comportamento Esperado

O logo deve aparecer corretamente quando o componente é usado em qualquer projeto que consome o DS.

## 🔧 Causa Raiz

No arquivo `dist/index.js` do pacote publicado, o logo usa um caminho relativo:

```javascript
var logo_educacross_default = "./logo-educacross-QX63FFDZ.svg";
```

Quando o pacote é consumido via `node_modules/@fabioeducacross/ui/dist/`, esse caminho relativo não resolve corretamente no contexto do projeto consumidor.

## 💡 Soluções Propostas

### Opção 1: Inline SVG (Recomendada) ⭐

Converter o logo para um componente React com SVG inline:

```tsx
// src/components/Logo/Logo.tsx
export const Logo = ({ size = "default", className, ...props }) => {
  const sizes = {
    sm: "h-6",
    default: "h-8",
    lg: "h-10"
  };
  
  return (
    <svg 
      className={cn(sizes[size], "w-auto", className)}
      viewBox="0 0 200 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Conteúdo SVG do logo aqui */}
    </svg>
  );
};
```

**Vantagens**:
- ✅ Funciona em qualquer ambiente
- ✅ Sem dependências externas
- ✅ Sem problemas de bundling
- ✅ Pode receber props de cor/className diretamente

### Opção 2: Base64 Data URL

Converter o SVG para base64 e usar como data URL:

```tsx
const logoBase64 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMj...";

export const Logo = ({ size, className, ...props }) => (
  <img src={logoBase64} alt="Educacross" className={cn(logoSizes[size], className)} {...props} />
);
```

**Vantagens**:
- ✅ Funciona em qualquer ambiente
- ❌ Aumenta o tamanho do bundle

### Opção 3: Vite/Rollup Config

Configurar o bundler para embutir assets como inline/base64:

```ts
// vite.config.ts
export default defineConfig({
  build: {
    assetsInlineLimit: 10000, // 10kb
  }
})
```

**Vantagens**:
- ✅ Mínima mudança no código
- ❌ Pode não funcionar se asset > limite

### Opção 4: Documentação (Workaround)

Documentar que usuários devem copiar o SVG manualmente:

```bash
cp node_modules/@fabioeducacross/ui/dist/logo-*.svg public/
```

**Vantagens**:
- ✅ Rápido de implementar
- ❌ Experiência ruim para desenvolvedores
- ❌ Prone a erros

## 🎯 Recomendação

**Opção 1 (Inline SVG)** é a solução mais robusta e profissional. Permite:
- Customização via props (cor, tamanho)
- Zero dependências externas
- Funciona em qualquer bundler/framework
- Melhor performance (sem request HTTP adicional)

## 📝 Reprodução

1. Instalar `@fabioeducacross/ui` em um projeto React
2. Importar e usar `<Logo />`:
```tsx
import { Logo } from '@fabioeducacross/ui';

export default function App() {
  return <Logo />;
}
```
3. Verificar que a imagem não aparece

## 🌐 Ambiente

- Pacote: `@fabioeducacross/ui@0.1.1`
- Bundler: Vite 5.4.21
- Framework: React 18.3.1

## 📎 Contexto Adicional

O mesmo problema afeta o `<Header>` component que internamente usa `<Logo>`, tornando o header incompleto quando usado em projetos externos.

---

**Priority**: 🔴 High (afeta componente core do DS - Header)  
**Component**: Logo, Header  
**Type**: Bug / Asset Loading
