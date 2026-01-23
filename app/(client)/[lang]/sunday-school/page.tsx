import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { Metadata } from 'next';
import { getClient } from '@/sanity/lib/server-client';
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '@/components/portableTextComponents';
import { SundaySchool } from '@/typings';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { lang } = await params;
  const title = {
    en: 'Sunday school',
    ro: 'Școala de duminică'
  };

  return {
    title: lang === 'ro' ? title.ro : title.en,
    alternates: {
      canonical: 'https://www.parohianorwich.org/en/sunday-school',
      languages: {
        'en': 'https://www.parohianorwich.org/en/sunday-school',
        'ro': 'https://www.parohianorwich.org/ro/sunday-school',
      },
    },
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
  const query = groq`*[_id == "sundayschool"][0]`;
  const sundaySchool: SundaySchool | null = await client.fetch(query);
  const { page } = await getDictionary(lang)
  
  return (
    <main className="pt-36 mb-20 px-5 max-w-screen-md mx-auto">
      <h1 className='text-2xl font-bold mb-6'>{page.sundaySchool.title}</h1>
      <div className="prose lg:prose-xl max-w-none">
        {sundaySchool?.content?.[lang] ? (
          <PortableText 
            value={sundaySchool.content[lang]} 
            components={portableTextComponents}
          />
        ) : (
          <p>Content coming soon...</p>
        )}
      </div>
    </main>
  )
}
