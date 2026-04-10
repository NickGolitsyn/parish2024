export default async function sitemap() {
  const url = 'https://www.parohianorwich.org';
  const languages = ['en', 'ro'];
  const pages = ['', '/about', '/contact', '/services', '/past-events', '/donate', '/sunday-school'];

  const sitemapEntries = languages.flatMap((lang) => {
    return pages.map((page) => ({
      url: `${url}/${lang}${page}`,
      lastModified: '2024-05-24',
      alternates: {
        languages: {
          en: `${url}/en${page}`,
          ro: `${url}/ro${page}`,
          'x-default': url,
        },
      },
    }));
  });

  return sitemapEntries;
}
