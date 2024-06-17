export default async function sitemap() {
  const url = 'https://parohianorwich.org';
  const languages = ['en', 'ro'];
  const pages = ['', '/about', '/contact', '/services', '/past-events', '/donate', '/sunday-school'];

  const sitemapEntries = languages.flatMap((lang) =>
    pages.map((page) => ({
      url: `${url}/${lang}${page}`,
      lastModified: '2024-05-24',
    }))
  );

  return sitemapEntries;
}
