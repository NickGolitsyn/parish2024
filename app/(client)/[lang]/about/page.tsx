import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { Metadata } from 'next';
import Image from 'next/image';
import philothea from '@/public/philothea.jpg'
import bede from '@/public/bede.jpg'
import Link from 'next/link';

export const metadata: Metadata = {
  title: "About",
};

export default async function page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { page } = await getDictionary(lang)
  return (
    <main className="pt-36 mb-20 px-5 max-w-screen-md mx-auto">
        <div className='flex flex-col items-center'>
          <h1 className='text-2xl font-bold mb-2'>{page.about.parish}</h1>
          <div className='space-y-2'>
            <p className='text-sm sm:text-base'>We belong to the Romanian Orthodox Metropolis of Western and Southern Europe (part of the Romanian Patriarchate) led by His Eminence Iosif, Archbishop and Metropolitan. Our parish was inaugurated on the 19th of December 2010.</p>
            <p className='text-sm sm:text-base'>“For the Romanians in the diaspora and all those in need, church is the first port of call. It provides spiritual, emotional and even material support. It is the place where we take in the comfort of the services and holy sacraments, even if for some people this happens only once a year, at Easter. Church is the ship that takes us to the safe shore, drifting free from danger over the troubled waters of nowaday’s chaotic world.” (Fr Liviu Barbu, the founder and our first parish priest).</p>
          </div>
        </div>
        <div className='flex flex-col items-center mt-10'>
          <h1 className='text-2xl font-bold mb-2'>{page.about.saints}</h1>
          <div className='mt-3'>
            <h2 className='text-xl font-bold mb-2 text-center'>{page.about.saintsName.philothea}</h2>
            <Image 
              src={philothea} 
              alt={`Icon of ${page.about.saintsName.philothea}`} className='sm:float-right sm:ml-3 mb-3 sm:mb-1 rounded-md mx-auto' 
            />
            <div className='space-y-2'>
              {page.about.philothea.map((p, index) => (
                <p key={`p-${index}`} className='text-sm sm:text-base'>{p}</p>
              ))}
              <Link 
                className='underline text-amber-600 text-sm sm:text-base'
                href={page.about.source.philothea}
              >
                {page.about.source.label}
              </Link>
            </div>
          </div>
          <div className='mt-3'>
            <h2 className='text-xl font-bold mb-2 text-center'>{page.about.saintsName.bede}</h2>
            <Image 
              src={bede} 
              alt={`Icon of ${page.about.saintsName.bede}`} 
              className='sm:float-left sm:mr-3 mb-3 sm:mb-1 rounded-md mx-auto' 
            />
            <div className='space-y-2'>
              {page.about.bede.map((p, index) => (
                <p key={`b-${index}`} className='text-sm sm:text-base'>{p}</p>
              ))}
              <Link 
                className='underline text-amber-600 text-sm sm:text-base'
                href={page.about.source.bede}
              >
                {page.about.source.label}
              </Link>
            </div>
          </div>
        </div>
    </main>
  )
}
