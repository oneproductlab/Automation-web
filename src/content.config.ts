import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
   /*
      Honest labelling is a core brand rule. Every entry is marked in the UI
      and in structured data, so nothing can read as a paid client engagement
      that was not one.

      "concept" is retained for schema compatibility but is no longer used:
      published builds are either client work or systems we built and ran
      ourselves. Prefer "internal-build" — and if you reach for "concept",
      the honest question is whether the thing exists at all.
    */
    kind: z.enum(['client', 'internal-build', 'concept']).default('internal-build'),
    client: z.string().optional(),
    sector: z.string(),
    summary: z.string(),
    // Problem → Before → Intervention → System → Result structure.
    problem: z.string(),
    before: z.array(z.string()),
    intervention: z.string(),
    /*
      `source` is required, not optional.

      Unsourced numbers are the single most common tell of a fabricated agency
      case study, and sourced ones are what answer and generative engines
      actually quote. Making the field mandatory means a metric physically
      cannot ship without stating where it came from — the honesty policy is
      enforced by the schema rather than by remembering.
    */
    result: z.array(
      z.object({
        metric: z.string(),
        label: z.string(),
        source: z.string(),

      })
    ),
    stack: z.array(z.string()),
    humanImpact: z.string(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
    /*
      Client write-ups that have not yet been approved by the client.

      Naming a company and describing their internal process is theirs to
      consent to, not ours to assume. Entries flagged here render in local
      preview so the page can be reviewed, and are excluded from production
      builds until the flag is cleared. `draft` would hide them everywhere,
      which defeats the point of reviewing them.
    */
    pendingApproval: z.boolean().default(false),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, writing };