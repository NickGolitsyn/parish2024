import SundaySchoolFeed from '@/components/sundaySchoolFeed';
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { Metadata } from 'next';
import Image from 'next/image';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { lang } = params;
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
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { page } = await getDictionary(lang)
  return (
    <main className="pt-36 mb-20 px-5 max-w-screen-md mx-auto">
      <h1 className='text-2xl font-bold mb-2'>{page.sundaySchool.title}</h1>
      <p>{page.sundaySchool.text}</p>
      <div className='mt-5'>
        <SundaySchoolFeed lang={lang} words={page.news} />
      </div>
      <div className='flex justify-center'>
        <Image 
          src={'https://utfs.io/f/08848e9e-2d90-4870-945c-4bc24eb15f14-wkc33w.jpg'} 
          alt={'Sunday School'} 
          width={'100'}
          height={'100'}
          className="max-h-64 h-80 sm:max-h-full w-auto rounded-sm mt-5"
        />
      </div>
    </main>
  )
}
