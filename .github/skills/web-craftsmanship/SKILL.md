---
name: web-craftsmanship
description: >-
  Design and build professional, human-quality websites — not generic
  "vibe-coded" output. Use this skill whenever creating, redesigning, or
  reviewing UI/pages/components for the northbound site: layout, visual
  hierarchy, typography, spacing, color, responsive behavior, accessibility,
  micro-interactions, and content/copy polish. Applies to Astro components,
  pages, and Tailwind styling in this project.
---

# Web Craftsmanship

Rules derived from the existing Flowzora codebase. When a rule and the code
disagree, the code is probably right and this file is stale — fix this file.

The site is a **workflow automation studio**. It sells invisible work, so the
governing principle is: **show the system, don't describe it.** A diagram that
runs beats a paragraph explaining that things run.

## Design principles

- Editorial, ink-on-paper. It should read like a well-set document, not a SaaS
  landing page.
- Show, don't tell. If a claim can be drawn, draw it and delete the paragraph.
- Every element earns its place. Nothing decorative, nothing that exists only to
  fill a column.
- Restraint is the brand. The site looks expensive because it does less, not
  because it does more.
- Honesty is a design constraint: label concept work as concept, never invent
  ratings or logos, never imply clients that don't exist.

## Typography

- Three families, no more, all self-hosted via `@fontsource` — never a font CDN.
    - `--font-display` — Fraunces. All `h1`–`h4`, metrics, prices, node labels.
    - `--font-sans` — IBM Plex Sans. Body copy. Set on `body`; don't restate it.
    - `--font-mono` — IBM Plex Mono. Eyebrows, labels, step numbers, captions,
      buttons, and anything that should read as a system readout.
- Headings are `font-weight: 460`, `line-height: 1.05`, `letter-spacing: -0.015em`,
  `text-wrap: balance`. This is set globally — don't re-declare per heading.
- Body is `1.0625rem` / `1.6`.
- Use the existing scale classes rather than inventing sizes:
    - `.display` — one oversized moment per page, maximum. Usually the closing CTA.
    - `.metric` — large proof figures, `tabular-nums` so counting doesn't jitter.
    - `.price` — deliberately smaller than `.metric` so ranges stay on one line.
    - `.eyebrow` — small uppercase mono section label.
- Constrain measure with `max-w-*` or `max-w-[34ch]`. Full-bleed paragraphs are a
  bug.
- Keep the metric-matched `@font-face` fallbacks in sync if a family changes —
  they exist to stop the font swap causing CLS on the LCP heading.

## Color & theming

- Use CSS custom properties only. **Never** hardcode a hex value in markup.
    - Surfaces: `--color-paper`, `--color-paper-2`, `--color-paper-3`
    - Text: `--color-ink`, `--color-ink-2`, `--color-ink-3`
    - Rules: `--color-line`, `--color-line-2`
    - Dark band: `--color-slate`, `--color-slate-2` with the `--color-inverse-*`
      ink scale and `--color-signal-bright`
- One accent: signal rust. `--color-signal` for shapes and strokes,
  `--color-signal-ink` for text on light (it is the contrast-safe variant).
  On the dark band use `--color-signal-bright`.
- No gradients, no glows, no glassmorphism, no drop shadows for depth. The one
  permitted shadow is the soft focus ring on an active workflow node.
- Dark mode is `prefers-color-scheme` only — no toggle. The palette is
  redefined, not filtered. Those overrides are deliberately **unlayered** so
  Tailwind's `theme` layer cannot beat them.
- Contrast: `--color-ink-3` is the floor and was darkened specifically to clear
  4.5:1 on `--color-paper-3`. Don't introduce a lighter muted tone.

## Layout & spacing

- `.wrap` is the container: `max-width: 76rem`, `1.5rem` inline padding, `2.5rem`
  at `768px+`. Every section uses it.
- Section rhythm — use these, don't improvise:
    - Standard section: `py-16 md:py-20`
    - Emphasis section: `py-20 md:py-24`
    - Closing statement: `py-24 md:py-28`
    - Page top: `pt-10 pb-14 md:pt-14`
- Vary the surface between adjacent sections. Two sections on the same
  background with no rule between them merge into one — that is what
  `--color-paper-3` exists to prevent.
- Prefer hairline structure over cards and boxes: `border-t`/`border-b`, and
  `gap-px` over a line-coloured background to draw grid rules in both axes.
- `--radius` is `3px`. Multiply it (`calc(var(--radius) * 3)`) for large panels
  such as diagram boards. Never use pill or fully-rounded shapes.

## Components & patterns

- Astro components, scoped `<style>` blocks, `fz-` prefix for component classes.
- Content lives in `src/data/site.ts`; components render it. Don't hardcode
  marketing copy in a page when it belongs in the data file.
- Don't put counts in headings ("Six services") — they go stale the moment the
  array changes.
- Diagram components must expose a real `aria-label` describing the flow in
  words, since the visual carries the meaning.
- Drive animation choreography from `data-` attributes in the markup, not from a
  list duplicated in the script. The animation must not be able to desync from
  the diagram.

## Responsive behavior

- Mobile-first. Breakpoints in use: `640px`, `760px`, `768px`, `900px`,
  `1024px` (`lg`). Don't add new ones casually.
- **SVG text does not scale safely.** A landscape diagram squeezed onto a phone
  renders labels at ~7px. Provide a portrait variant below `640px` rather than
  letting type shrink. Verify effective rendered font size; don't eyeball it.
- Complex diagrams: absolutely positioned board with connector curves on wide
  screens; stacked sequence with curves hidden on narrow ones.
- Always verify no horizontal overflow at `390px` and `1512px`.

## Accessibility

- Semantic HTML first. Real `<ol>` for sequences, real `<button>` for controls,
  headings in outline order.
- `:focus-visible` is a 2px signal outline with 3px offset — global, don't
  override it away.
- Decorative SVG gets `aria-hidden="true"` and `focusable="false"`; meaningful
  diagrams get `role="img"` and a full `aria-label`.
- Anything revealed on hover must also reveal on `:focus-visible`/`:focus-within`,
  and must be shown unconditionally where there is no hover.
- Content hidden for visual density stays in the DOM. Never remove text from the
  document to reduce clutter — collapse it.
- Live-updating labels get `aria-live="polite"`.

## Motion & micro-interactions

- **Motion must carry information.** Something moves because state changed, not
  because movement is nice. Reject ambient float, parallax, scroll-jacking and
  animated type.
- Animate `transform` and `opacity` only. Never animate `top`/`left`/`height` in
  a loop — use `grid-template-rows: 0fr → 1fr` for collapsible height and
  `stroke-dashoffset` for drawing lines.
- Standard easing `cubic-bezier(0.22, 1, 0.36, 1)`. Hovers ~180–280ms, reveals
  ~550ms, run-loop beats ~900ms.
- Existing primitives — reuse instead of reinventing:
    - `.reveal` + `data-stagger` with `--i` for staggered scroll-in
    - `.disclose` + `.disclose-host` for progressive disclosure
    - `.link-underline` for the drawing underline
- Looping animations must pause when off-screen (`IntersectionObserver`).
- `prefers-reduced-motion: reduce` must resolve to the **finished** state, not a
  blank one. There is a global backstop, but components with a distinct static
  state still opt out explicitly.

## Content & copy

- Lead with the reader's problem, not the studio's capabilities.
- Short declaratives. Cut adverbs and qualifiers.
- Never insult the reader's current setup — they usually built it.
- One caveat per page, maximum. Stacked hedges read as anxiety and undercut the
  confident claims elsewhere.
- Every metric needs a `source`. No unsourced numbers, ever.
- CTA labels vary by context and describe the outcome ("Let's talk growth",
  "Map my workflow"), never "Learn more" or "Submit".
- Prices are stated publicly and in full.

## Anti-patterns (avoid these)

- The template trap: eyebrow → h2 → paragraph → label+description list, repeated
  down the whole page. Break the rhythm at least twice per page.
- Doubling every list item with both a title *and* a sentence, all visible at
  rest.
- Explaining a diagram in prose immediately above the diagram.
- A hero that is only text. The first screen should contain evidence.
- Generic AI-site tells: gradient mesh backgrounds, glassmorphic cards, floating
  blobs, emoji bullets, three-icon feature triptychs, "Empower your business
  with…", fake testimonials, invented logo walls, `aggregateRating` schema built
  from things that carry no rating.
- Adding a section instead of fixing the one that isn't working.

## Reference examples

- The bar for a running-system canvas: node-graph editors like n8n, Make and
  Decisional — dotted board, connector curves, node cards, status chips.
- In-repo references, in priority order:
    - `src/components/WorkflowCanvas.astro` — the hero board and run loop
    - `src/components/BeforeAfter.astro` — an argument made as a diagram, with a
      responsive variant
    - `src/styles/global.css` — tokens and every shared primitive

## Verify before calling it done

```bash
npm run build      # must succeed
npx astro check    # 0 errors, 0 warnings
npx vitest run     # all passing
```

Then check in a browser at `390px` and `1512px`: no horizontal overflow,
disclosures open on hover *and* focus, diagrams legible (measure the rendered
font size), and reduced-motion resolves to the completed state.
