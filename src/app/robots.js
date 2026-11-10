const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.k2solutionpro.com';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/account', '/cart', '/checkout', '/api'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
