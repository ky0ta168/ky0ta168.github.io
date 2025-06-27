import type { APIRoute } from 'astro';
import { getCollection } from "astro:content";
import { generateBlogPostOgpImage, generateSiteOgpImage } from '../../../utils/ogp';

export const GET: APIRoute = async ({params, request}) => {
  const slug = params.slug;
  const posts = await getCollection("posts");
  const post = posts.find((p) => p.slug === slug);
  const png = post ? await generateBlogPostOgpImage(post.data.title) : await generateSiteOgpImage();

  return new Response(png, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
    },
  });
};

export async function getStaticPaths() {
  const posts = await getCollection("posts");
  return posts.map((post) => {
    return {
      params: { slug: post.slug },
    }
  })
}