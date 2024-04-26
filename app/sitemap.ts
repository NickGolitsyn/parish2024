export default async function sitemap() {
  const url = 'https://parohianorwich.org';
  const languages = ['en', 'ro'];
  const pages = ['', '/about', '/contact', '/services', '/gallery', '/donate', '/sunday-school'];

  const sitemapEntries = languages.flatMap((lang) =>
    pages.map((page) => ({
      url: `${url}/${lang}${page}`,
      lastModified: '2024-04-26',
    }))
  );

  return sitemapEntries;
}
