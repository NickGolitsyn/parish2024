import { Locale } from '@/i18n.config';
import { Metadata } from 'next';

const BASE_URL = 'https://www.parohianorwich.org';

const normalizePath = (path: string): string => {
  if (!path || path === '/') {
    return '';
  }

  return path.startsWith('/') ? path : `/${path}`;
};

export const buildLocaleAlternates = (
  lang: Locale,
  path: string
): Metadata['alternates'] => {
  const normalizedPath = normalizePath(path);

  return {
    canonical: `${BASE_URL}/${lang}${normalizedPath}`,
    languages: {
      en: `${BASE_URL}/en${normalizedPath}`,
      ro: `${BASE_URL}/ro${normalizedPath}`,
      'x-default': BASE_URL,
    },
  };
};
