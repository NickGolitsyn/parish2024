import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { Metadata } from 'next';
import { getClient } from '@/sanity/lib/server-client';
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '@/components/portableTextComponents';
import { ParishHistory } from '@/typings';
import { buildLocaleAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { lang } = await params;
  const title = {
    en: 'History of our Parish',
    ro: 'Istoricul parohiei noastre'
  };

  return {
    title: lang === 'ro' ? title.ro : title.en,
    alternates: buildLocaleAlternates(lang === 'ro' ? 'ro' : 'en', '/parish-history'),
  };
}

export default async function page({
  params
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params;
  // Fetch singleton by its fixed ID (singletons always have _id matching the schema name)
  // Use getClient() to support draft mode for Visual Editing
  const client = await getClient();
  const query = groq`*[_id == "parishhistory"][0]`;
  const parishHistory: ParishHistory | null = await client.fetch(query);
  const { page } = await getDictionary(lang)
  
  return (
    <main className="pt-36 mb-20 px-5 max-w-screen-md mx-auto">
      <h1 className='text-2xl font-bold mb-6'>{page.history.title}</h1>
      <div className="prose lg:prose-xl max-w-none">
        {parishHistory?.content?.[lang] ? (
          <PortableText 
            value={parishHistory.content[lang]} 
            components={portableTextComponents}
          />
        ) : (
          <p>Content coming soon...</p>
        )}
      </div>
    </main>
  )
}
