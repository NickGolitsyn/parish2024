import React from 'react';
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import GalleryGrid from '@/components/galleryGrid';
import { Metadata } from 'next';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { lang } = params;
  const title = {
    en: 'Past events',
    ro: 'Activitatea parohiei'
  };

  return {
    title: lang === 'ro' ? title.ro : title.en
  };
}

export default async function page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { page } = await getDictionary(lang)
  return (
    <main className="pt-36 px-5">
      <GalleryGrid lang={lang} />
    </main>
  )
}