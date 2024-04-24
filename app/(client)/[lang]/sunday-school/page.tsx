import SundaySchoolFeed from '@/components/sundaySchoolFeed';
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sunday School",
};

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
    </main>
  )
}
