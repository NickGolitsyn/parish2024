import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Contact",
};

export default async function page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const apiKey = String(process.env.GOOGLE_MAPS_API_KEY);
  const location = "St Mary's Church, Church Road, Gillingham, Beccles NR34 0ND, United Kingdom";
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(location)}`;
  const { page } = await getDictionary(lang)
  return (
    <main className="pt-36 mb-10 px-5 max-w-screen-md mx-auto flex flex-col items-center">
      <div className='flex flex-col items-center w-full'>
        <div>
          <h1 className='text-2xl text-center font-bold mb-2'>{page.contact.contactTitle}</h1>
          <div className='flex flex-col gap-3'>
            <p className='text-sm sm:text-base max-w-lg text-center'>{page.contact.contactDesc}</p>
            <p className='text-sm sm:text-base max-w-lg text-center'>{page.contact.quote}</p>
          </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-10 mt-5'>
          <div className='flex flex-col items-center'>
            <p>email:</p> 
            <Link href={`mailto:${page.contact.email}`} className='underline text-amber-600'>{page.contact.email}</Link>
          </div>
          <div className='flex flex-col items-center'>
            <p>tel:</p>
            <Link href={`tel:${page.contact.tel}`} className='underline text-amber-600'>{page.contact.tel}</Link>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center mt-10 w-full justify-between' id="visit">
        <div>
          <h1 className='text-2xl font-bold mb-2 text-center'>{page.contact.visitTitle}</h1>
          <p 
            className='text-sm sm:text-base text-center max-w-lg' 
            dangerouslySetInnerHTML={{
              __html: page.contact.visitDesc.replace(/<Link/g, '<a').replace(/<\/Link>/g, '</a>'),
            }} 
          />
        </div>
        <iframe
          className='mt-10 min-h-80 w-screen'
          style={{ border: 0 }}
          referrerPolicy="no-referrer-when-downgrade"
          src={mapSrc}
        />
      </div>
    </main>
  )
}
