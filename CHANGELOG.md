# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Added
- Setup inicial do monorepo com pnpm + Turborepo
- Pacote `@educacross/ui` com tokens e Tailwind preset
- Componente `Button` com 6 variantes, 4 tamanhos e estados completos
- Componente `Input` com variantes default/error e 3 tamanhos
- Componente `Label` com variantes e indicador de obrigatório
- Storybook 8 com addons: Docs, Controls, Actions, Viewport, A11y, Interactions
- Stories para todos os componentes com interaction tests
- Documentação de Foundations: Colors, Typography, Spacing
- Guidelines: Acessibilidade, Estados
- Padrão Form Field demonstrando composição Label + Input
- Suporte completo a Light/Dark mode via CSS vars
- Scripts de qualidade: lint, typecheck, build

### Security
- Configuração para não permitir PII ou secrets no código

---

## Convenções de Versionamento

- **MAJOR** (1.0.0): Breaking changes na API pública
- **MINOR** (0.1.0): Novas features retrocompatíveis
- **PATCH** (0.0.1): Bug fixes retrocompatíveis

## Tipos de Mudança

- `Added` - Novas features
- `Changed` - Mudanças em features existentes
- `Deprecated` - Features que serão removidas
- `Removed` - Features removidas
- `Fixed` - Bug fixes
- `Security` - Correções de vulnerabilidades
