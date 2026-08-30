import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('writing', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: `${site.name} — Writing`,
    description:
      'Notes on operations, automation, integrations and where AI genuinely earns its place.',
    site: context.site ?? site.domain,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,

      categories: post.data.tags,
      link: `/writing/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}