export default async function sitemap() {
  const url = 'https://parish2024.vercel.app';
  const languages = ['en', 'ro'];
  const pages = ['', '/about', '/contact', '/services', '/gallery', '/donate', '/sunday-school'];

  const sitemapEntries = languages.flatMap((lang) =>
    pages.map((page) => ({
      url: `${url}/${lang}${page}`,
      lastModified: '2024-04-25',
    }))
  );

  return sitemapEntries;
}
