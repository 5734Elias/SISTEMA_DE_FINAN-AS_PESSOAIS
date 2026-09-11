# Design System - Sistema de Finanças Pessoais

## 1. Princípios Visuais
- **Clareza Financeira:** Dados monetários são a prioridade do layout.
- **Redução de Ruído:** Evitar elementos puramente decorativos.
- **Feedback Constante:** Todo botão e input tem estados reativos (`:hover`, `:focus`, `:disabled`).

## 2. Tipografia
- **Font-family Principal:** `Inter, system-ui, sans-serif`
- **Escala:**
  - `xs (0.75rem)`: Helper texts, labels secundárias
  - `sm (0.875rem)`: Subtítulos de cards, badges
  - `md (1rem)`: Texto base (body), inputs, botões
  - `lg (1.125rem)`: Títulos de seções, destaque de valor pequeno
  - `xl (1.25rem)`: Títulos de página, modais
  - `2xl (1.5rem)`: Destaques de saldo (Dashboards)
  - `3xl (1.875rem)`: Valores macro (Saldo Total)

## 3. Cores e Semântica
As cores foram criadas evitando o verde neon e o vermelho berrante para não causar ansiedade financeira.

- **Primary (`#2563eb`):** Azul moderno. Ações principais (Salvar, Adicionar).
- **Secondary (`#475569`):** Cinza azulado (Slate). Ações de cancelamento ou leitura.
- **Success (`#10b981`):** Verde Esmeralda. Valores de entrada, confirmações positivas.
- **Warning (`#f59e0b`):** Âmbar. Alertas não destrutivos, metas próximas do limite.
- **Danger (`#ef4444`):** Vermelho (Red-500). Despesas, apagar registros.

## 4. Estrutura de Espaçamento e Layout
Utilizamos múltiplos de 4 (ex: 4px = `0.25rem`).
- `xs` (4px), `sm` (8px), `md` (16px), `lg` (24px), `xl` (32px), `2xl` (48px)
- **Border-radius:** `md` para inputs/botões (8px) e `lg` para Cards (16px).
- **Shadows:** Sutis para simular elevação e foco, priorizando interface flat.

## 5. Componentes Base Criados (Fase 2)
- **Button (`<Button />`):** Com variantes (`primary`, `secondary`, `danger`, `ghost`) e tamanhos (`sm`, `md`, `lg`). Contempla `fullWidth`.
- **Input (`<Input />`):** Input textual padronizado com suporte a `label`, `helperText` e tratamento de erros (`error`).
- **Card (`<Card />`):** Contêiner composicional contendo `<Card.Header>`, `<Card.Body>` e `<Card.Footer>`, com suporte flexível via `children`.

