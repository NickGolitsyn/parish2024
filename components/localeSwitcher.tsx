'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { i18n } from '@/i18n.config'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export default function LocaleSwitcher() {
  const pathName = usePathname()

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <ul className='flex gap-x-3'>
      {i18n.locales.map(locale => {
        const isActive = pathName.startsWith(`/${locale}`)
        const linkClassName = `rounded-md border capitalize border-gray-500/10 ${isActive ? 'bg-amber-100 text-black font-semibold' : 'bg-white text-black'} px-3 py-2`
        return (
          <li key={locale}>
            <Link className={linkClassName} href={redirectedPathName(locale)}>
                {locale}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
