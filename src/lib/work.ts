import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Work entries, with the two visibility rules applied in one place.
 *
 * - `draft` hides an entry everywhere, as usual.
 * - `pendingApproval` marks a client write-up that the client has not yet
 *   signed off. Those render in local preview so the page can be reviewed,
 *   but are stripped from production builds.
 *
 * Naming a company and describing their internal process is the client's call
 * to make. Gating here means an unapproved write-up cannot reach production by
 * being forgotten — it has to be deliberately cleared.
 *
 * Gate on MODE, not DEV. In this project `astro build` reports
 * `DEV=true PROD=false MODE=production`, so `import.meta.env.DEV` silently
 * fails to exclude anything at build time. MODE is the only flag that
 * distinguishes a real build here.
 */
export async function getWork(): Promise<CollectionEntry<'work'>[]> {
  const entries = await getCollection('work', ({ data }) => !data.draft);
  const isProduction = import.meta.env.MODE === 'production';
  const visible = isProduction
    ? entries.filter(({ data }) => !data.pendingApproval)
    : entries;
  return visible.sort((a, b) => a.data.order - b.data.order);
}