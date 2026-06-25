# Vanilla

**Vanilla** é o design system da Vanilla entregue como um conjunto de *skills*. Ative-o e as interfaces que você constrói pertencem à mesma família visual — reconhecidamente Vanilla — enquanto cada produto mantém o seu próprio layout e personalidade.

> **A pele é Vanilla; a alma é do produto.**

A *pele* (cores, tipografia, profundidade, ícones) é fixa e garante o reconhecimento; a *alma* (domínio, layout, hierarquia e o *signature* de cada produto) é livre. O Vanilla cuida do *craft* — hierarquia, primitivos acessíveis, polish, motion, estados — para que toda UI saia com qualidade de produto, sem parecer "gerada por IA".

São skills em `SKILL.md` puro, **portáteis entre Claude Code e OpenCode** (sem subagentes, plugins ou config específicos de um ambiente).

---

## Índice

- [Conceito](#conceito)
- [As 5 skills](#as-5-skills)
- [O fluxo](#o-fluxo)
- [A pele](#a-pele)
- [Stack padrão](#stack-padrão)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Instalação](#instalação)
- [Como usar](#como-usar)
- [Convenções](#convenções)
- [Desenvolvimento](#desenvolvimento)
- [Specs & planos](#specs--planos)

---

## Conceito

O que é **inegociável** (a pele — igual em todo projeto Vanilla):

- Paleta e cores · tipografia **Inter** · accent lavanda (usado com parcimônia)
- *Surface ladder* (canvas → surface-1..4) e *hairlines*
- Escalas de raio e espaçamento · ícones **Lucide**
- **Primitivos headless** para controles (Base UI no React, Reka UI no Vue) — nunca um UI kit estilizado

O que é **livre** (a alma — decidido por produto):

- Layout, composição, hierarquia e foco · densidade dentro da faixa
- Quais telas/componentes existem · conteúdo e voz
- O **signature** — o único elemento que só existiria *neste* produto

Regra prática: se a mudança altera *o que a marca Vanilla parece*, é pele (fixa). Se altera *o que este produto faz/prioriza*, é alma (livre).

---

## As 5 skills

| Skill | Papel | Quando usar |
|---|---|---|
| **`vanilla`** | Hub / orquestrador | Ponto de entrada para construir qualquer UI de produto Vanilla |
| **`vanilla-discovery`** | Entrevista da alma | No início de um projeto novo, antes de qualquer código |
| **`vanilla-build`** | Construção | Construir ou estender a UI a partir do brief |
| **`vanilla-review`** | Fiscalização | Revisar uma UI antes de mergear/entregar |
| **`vanilla-direction`** | Caráter extra | Quando o produto pede personalidade visual mais forte |

### `vanilla` — a hub

Ponto de entrada. Carrega a família (`design.md`, `tokens.css`, `theme.css`) e conduz o fluxo `descobrir → construir → revisar` (+ direção sob demanda), invocando os satélites na ordem certa. É leve: orquestra, não duplica.

### `vanilla-discovery` — a alma

Uma **entrevista curta** que captura o que torna o produto único: usuário real, tarefa, domínio, *feel*, **signature** e stack (framework, Tailwind, tema). Persiste tudo num **`vanilla-brief.md`** em `docs/vanilla/` do projeto. É o principal **antídoto contra a convergência** (o risco de todo produto Vanilla sair igual). Em projeto novo, oferece `git init` antes de gravar.

### `vanilla-build` — a construção

Constrói a UI **a partir do brief**, aplicando a pele (tokens) com *craft* real: hierarquia (peso + cor + ink ramp, não só tamanho), *surface ladder*, polish, motion < 300ms, estados completos. Usa **primitivos headless** (Base UI / Reka UI) e ícones **Lucide**. Aplica o **tema** (dark / light / both com toggle + script anti-FOUC) e o **brand override** se houver.

### `vanilla-review` — a fiscalização

Revisão **estrita**, contra três barras:

1. **Craft** — um líder de design assinaria embaixo? (hierarquia, restraint, polish)
2. **Família** — é inconfundivelmente Vanilla? (tokens, Inter, surface ladder, Lucide, primitivos)
3. **Alma** — carrega o *signature* do brief, ou poderia ser qualquer produto?

Julga por padrão (reporta achados + veredito, com severidade *Blocker / Should-fix / Note*); só reconstrói quando você pede.

### `vanilla-direction` — o caráter

Acionada **sob demanda**, quando o *feel* do brief pede mais personalidade. Decide **onde gastar a ousadia dentro da pele fixa** — amplifica o signature, o layout, o motion, a densidade e o uso expressivo da Inter — e gasta num lugar só. Nunca repinta a pele (cor/fonte/ícones novos = violação).

---

## O fluxo

```
        ┌─────────────────────────── vanilla (hub) ───────────────────────────┐
        │                                                                      │
   1. discover ──▶ vanilla-brief.md ──▶ 3. build ──▶ UI na pele ──▶ 4. review ──▶ veredito
  (vanilla-discovery)   (a alma)      (vanilla-build)            (vanilla-review)
        │                                                                      │
        └── 2. direction (opcional, quando o produto pede caráter) ───────────┘
```

1. **Descobrir** — a entrevista gera o `vanilla-brief.md`. *Aqui mora a alma.*
2. **Direção** *(opcional)* — amplifica o caráter dentro da pele.
3. **Construir** — a UI é montada sobre a pele, guiada pelo brief.
4. **Revisar** — o build é julgado contra craft + família + alma.

---

## A pele

A pele vive em `.claude/skills/vanilla/references/`:

- **`design.md`** — a fonte semântica (o "porquê" de cada decisão).
- **`tokens.css`** — a fonte técnica canônica: CSS custom properties (`--vanilla-*`).
- **`theme.css`** — preset **Tailwind v4** (`@theme`) que *referencia* `tokens.css` (nunca redeclara valores).

A cadeia `design.md → tokens.css → theme.css` faz o Tailwind **herdar a pele em runtime**: trocar um valor em `tokens.css` propaga para tudo, sem rebuild.

### Temas (dark / light)

Dark é o padrão e o rosto da família. Light é a **mesma pele invertida** (`:root[data-theme="light"]`): mesma Inter, mesma lavanda (com o valor ajustado para passar AA), surface ladder invertido + sombras para elevação. Escolha por projeto na descoberta: **dark / light / both**. "Both" gera um toggle (Lucide sol/lua) com persistência e script anti-FOUC (chave `vanilla-theme`).

### Brand override (leve)

Se o projeto fornece um `design.md` de referência (formato `@google/design.md`, ex.: a marca de um cliente), o `vanilla-build` aplica um **ajuste de marca leve**: extrai **apenas** a cor primária, as secundárias, a escala de espaçamento e a de raio, e sobrescreve os tokens correspondentes. Todo o resto permanece Vanilla. É um override revisável — não a adoção de outra pele.

---

## Stack padrão

| Camada | Escolha | Observação |
|---|---|---|
| Tipografia | **Inter** (+ JetBrains Mono) | Parte fixa da pele |
| CSS | **Tailwind v4** (preset `theme.css`) | Recomendado, não obrigatório — sem Tailwind, importe `tokens.css` |
| Primitivos | **Base UI** (React) · **Reka UI** (Vue) | Headless; nunca um UI kit estilizado (Material/Vuetify/Chakra/Ant) |
| Ícones | **Lucide** | `lucide-react` / `lucide-vue-next` — mesmos ícones nos dois frameworks |

---

## Estrutura do repositório

```
.claude/skills/
├── vanilla/                  hub
│   ├── SKILL.md
│   └── references/
│       ├── design.md         a pele (fonte semântica)
│       ├── tokens.css        a pele (fonte técnica canônica)
│       └── theme.css         preset Tailwind v4
├── vanilla-discovery/SKILL.md
├── vanilla-build/SKILL.md
├── vanilla-review/SKILL.md
└── vanilla-direction/SKILL.md

scripts/validate-skills.mjs   validador (portabilidade + cadeia de tokens + pele)
docs/superpowers/             specs e planos de design
```

---

## Instalação

As skills são lidas tanto pelo Claude Code quanto pelo OpenCode, de `.claude/skills/` ou `~/.claude/skills/`.

- **Por projeto:** copie a pasta `.claude/skills/` para a raiz do repositório-alvo.
- **Global (vale nos dois ambientes):** copie as pastas `vanilla*` para `~/.claude/skills/`.

> Este repositório inclui um `.gitignore` que sobrepõe o ignore global de `**/.claude/`, para que `.claude/skills/` seja versionado aqui (mantendo o resto de `.claude/`, como `settings.local.json`, ignorado).

---

## Como usar

Peça ao agente para usar a skill `vanilla` ao construir UI de produto. A hub carrega a família e conduz o fluxo descobrir → construir → revisar.

Exemplos de prompt:

```
/vanilla Quero construir um dashboard de monitoramento de status de usuários.
```
```
use a skill vanilla para criar a tela de configurações deste app
```

A partir daí, a hub entrevista o produto (discovery), constrói sobre a pele (build) e pode revisar (review). Para projeto novo, ela oferece inicializar o git e grava o brief em `docs/vanilla/`.

---

## Convenções

- **Artefatos gerados** pelas skills (o brief, planos de caráter, notas) ficam em **`docs/vanilla/`** do projeto-alvo — nunca soltos na raiz.
- **Projeto novo:** a descoberta **oferece `git init`** antes de gravar qualquer coisa.
- **`vanilla-brief.md`** é a âncora da alma: produzido pela `vanilla-discovery`, consumido por `vanilla-build` e usado pela `vanilla-review` como teste de unicidade.

---

## Desenvolvimento

Rode o validador depois de editar skills ou tokens:

```bash
node scripts/validate-skills.mjs
```

É um script Node **sem dependências**. Ele faz 7 verificações:

1. **Portabilidade** de cada skill — `name` em kebab-case, igual ao nome da pasta, sem `:` (compatível com OpenCode).
2. **Cadeia de tokens** — `theme.css` referencia `tokens.css` via `var()` e nunca redeclara hex no `@theme`.
3. **Template do brief** presente na `vanilla-discovery`.
4. **`vanilla-build`** referencia a pele e o brief (tokens, Base UI/Reka UI, Lucide).
5. **`vanilla-review`** referencia brief, pele e o teste de *signature*.
6. **`vanilla-direction`** mantém a pele fixa (Inter, surface ladder, Lucide).
7. **Light theme** — `tokens.css` traz o bloco `:root[data-theme="light"]` com os tokens core.

---

## Specs & planos

O desenho do sistema foi feito com brainstorming → spec → plano, com revisão a cada etapa. Tudo versionado em:

- **Specs:** `docs/superpowers/specs/`
  - `2026-06-25-vanilla-design-system-skill.md` — o sistema (hub + satélites)
  - `2026-06-25-vanilla-light-mode-design.md` — dark + light
- **Planos:** `docs/superpowers/plans/` — um plano de implementação por fase.
