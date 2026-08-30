import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';
import { getWork } from '../../lib/work';

/**
 * Programmatic share cards.
 *
 * Every page gets a correct, on-brand OG image without anyone exporting a PNG by
 * hand — which is the only way share cards stay right as the site grows. The
 * design deliberately mirrors the site: paper background, ink type, one rust rule.
 */

const work = await getWork();
const writing = await getCollection('writing', ({ data }) => !data.draft);

const pages: Record<string, { title: string; description: string }> = {

  default: {
    title: 'Grow the business. Not the overhead.',
    description: 'Workflow automation you own outright.',
  },
  services: {
    title: 'Workflow automation services',
    description: 'Where we usually remove manual work.',
  },
  pricing: {
    title: 'What automation costs',
    description: 'Published rates. Fixed scope, fixed price.',
  },
  work: {
    title: 'Selected work',
    description: 'Systems we have built, honestly labeled.',
  },
  approach: {
    title: 'Map, build, hand over',
    description: 'How an engagement actually runs.',
  },
  about: {
    title: 'About Flowzora',
    description: 'A workflow automation studio under oneProductLab.',
  },
  writing: {
    title: 'Writing',
    description: 'Notes on operations, automation and where AI earns its place.',
  },
  contact: {
    title: 'Tell us what is still done by hand',
    description: 'One workflow, honestly described.',
  },

};

for (const entry of work) {
  pages[`work/${entry.id}`] = {
    title: entry.data.title,
    description: entry.data.summary,
  };
}
for (const entry of writing) {
  pages[`writing/${entry.id}`] = {
    title: entry.data.title,
    description: entry.data.description,
  };
}

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getImageOptions: (_path, page: { title: string; description: string }) => ({
    title: page.title,
    description: page.description,
    bgGradient: [
      [244, 241, 234],
      [236, 231, 220],
    ],
    border: { color: [182, 67, 31], width: 14, side: 'inline-start' },
    padding: 80,
    // Vendored locally so builds are deterministic and do not depend on a
    // third-party font CDN being reachable at build time.
    fonts: ['./src/assets/fonts/fraunces.ttf', './src/assets/fonts/plex-sans.ttf'],
    font: {
      title: {
        color: [23, 21, 15],

        size: 66,
        lineHeight: 1.1,
        weight: 'SemiBold',
        families: ['Fraunces'],
      },
      description: {
        color: [61, 58, 49],
        size: 30,
        lineHeight: 1.4,
        weight: 'Normal',
        families: ['IBM Plex Sans'],
      },
    },
    format: 'PNG',
  }),
});

export const prerender = true;