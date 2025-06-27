import type { APIRoute } from 'astro';
import { generateSiteOgpImage } from '../utils/ogp';

export const GET: APIRoute = async () => {
  const png = await generateSiteOgpImage();

  return new Response(png, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
    },
  });
};
