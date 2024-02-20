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
    <main className="py-24 px-5 max-w-screen-md mx-auto flex flex-col items-center">
      <div className='flex flex-col items-center w-full'>
        <div>
          <h1 className='text-2xl text-center font-bold mb-2'>Contact us</h1>
          <p className='text-sm sm:text-base max-w-md text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div className='flex gap-10 mt-5'>
          <div className='flex flex-col items-center'>
            <p>email:</p> 
            <p className='underline text-amber-600'>email@gmail.com</p>
          </div>
          <div className='flex flex-col items-center'>
            <p>tel:</p>
            <p className='underline text-amber-600'>+447403525139</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center mt-10 w-full justify-between'>
        <div>
          <h1 className='text-2xl font-bold mb-2 text-center'>Visit us</h1>
          <p className='text-sm sm:text-base text-center max-w-md'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
