import { Locale } from "@/i18n.config"
import { getDictionary } from "@/lib/dictionary"
import Image from "next/image"

export default async function Footer({ lang }: { lang: Locale }) {
  const { footer } = await getDictionary(lang)
  return (
    <footer className="bg-yellow-50 py-5 px-5">
      <div className=" max-w-screen-lg flex flex-col sm:flex-row mx-auto justify-between items-center">
        <p className="sm:text-sm text-xs text-center sm:text-left" dangerouslySetInnerHTML={{ __html: footer.title }} />
        <a 
          className={'mt-3 sm:mt-0 rounded-md size-10 flex justify-center items-center border border-gray-500/10 bg-white text-black'} 
          href={'https://www.facebook.com/B.O.R.N.E.A.CO.UK/'}
          target='_blank'
          rel="noopener noreferrer"
        >
          <Image
            src={'https://utfs.io/f/fc88e55e-1e76-480f-a56e-748c84373a28-87z83q.png'}
            width={20}
            height={20}
            alt="Picture of the author"
          />
        </a>
      </div>
    </footer>
  )
}
