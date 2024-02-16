import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'

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
    <main className="py-24 max-w-screen-md mx-auto flex flex-col items-center">
      <div className='flex justify-between w-full'>
        <div className='mr-3'>
          <h1 className='text-2xl font-bold mb-2'>Contact us</h1>
          <p className='max-w-md'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div>
          <p>email: email@gmail.com</p>
          <p>tel: +447403525139</p>
        </div>
      </div>
      <div className='flex items-center mt-10 w-full justify-between'>
        <iframe
          className='min-h-52'
          style={{ border: 0 }}
          referrerPolicy="no-referrer-when-downgrade"
          src={mapSrc}
        />
        <div className='ml-3'>
          <h1 className='text-2xl font-bold mb-2 text-right'>Visit us</h1>
          <p className='text-right max-w-md'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
    </main>
  )
}
