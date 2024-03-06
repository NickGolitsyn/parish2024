import React from 'react';
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import GalleryGrid from '@/components/galleryGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Gallery",
};

export default async function page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { page } = await getDictionary(lang)
  return (
    <main className="pt-36 px-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        <GalleryGrid lang={lang} />
      </div>
    </main>
  )
}