import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Donate",
};

export default async function page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { page } = await getDictionary(lang)
  return (
    <main className="py-24 px-5 max-w-screen-md mx-auto">
        <div className='flex flex-col items-center'>
          <h1 className='text-2xl font-bold mb-2'>{page.about.parish}</h1>
          <p className='text-sm sm:text-base text-center'>We belong to the Romanian Orthodox Metropolis of Western and Southern Europe (part of the Romanian Patriarchate) led by His Eminence Iosif, Archbishop and Metropolitan. Our parish was inaugurated on the 19th of December 2010.</p>
        </div>
        <div className='flex flex-col items-center mt-10'>
          <h1 className='text-2xl font-bold mb-2'>{page.about.saints}</h1>
          <p className='text-sm sm:text-base text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    </main>
  )
}
