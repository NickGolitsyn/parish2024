'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config';
import Image from 'next/image';
import enIcon from '@/public/en.svg';
import roIcon from '@/public/ro.svg';

const localeIcons = {
  en: enIcon,
  ro: roIcon,
};

export default function LocaleSwitcher() {
  const pathName = usePathname()

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <div className='flex gap-x-3'>
      {i18n.locales.map(locale => {
        const isActive = pathName.startsWith(`/${locale}`)
        const linkClassName = `rounded-md size-10 flex justify-center items-center border border-gray-500/10 ${isActive ? 'bg-amber-100 text-black font-semibold' : 'bg-white text-black'}`
        return (
          <Link key={locale} className={linkClassName} href={redirectedPathName(locale)}>
            {/* {locale} */}
            <Image
              src={localeIcons[locale]}
              width={20}
              height={20}
              alt="Picture of the author"
            />
          </Link>
        )
      })}
    </div>
  )
}
