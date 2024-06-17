import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { Metadata } from 'next';
import PELayout from './(components)/PELayout';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { lang } = params;
  const title = {
    en: 'Past Events',
    ro: 'Activitatea parohiei'
  };

  return {
    title: lang === 'ro' ? title.ro : title.en,
    alternates: {
      canonical: 'https://www.parohianorwich.org/en/past-events',
      languages: {
        'en': 'https://www.parohianorwich.org/en/past-events',
        'ro': 'https://www.parohianorwich.org/ro/past-events',
      },
    },
  };
}

export default async function page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { page } = await getDictionary(lang)
  return (
    <main className="text-sm sm:text-base pt-36 px-5 max-w-screen-md mx-auto flex flex-col items-center">
      <h1 className='text-2xl font-bold mb-2'>{page.pastevents.title}</h1>
      {page.pastevents.desc && (
        <p className='text-center'>
          {page.pastevents.desc}
        </p>
      )}
      <PELayout lang={lang} />
      
    </main>
  )
}

export const revalidate = 5000;