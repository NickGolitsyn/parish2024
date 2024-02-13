"use client"
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Locale } from '@/i18n.config'
import LocaleSwitcher from './localeSwitcher'
import { getDictionary } from '@/lib/dictionary'

export default async function Navbar({ lang }: { lang: Locale }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { nav } = await getDictionary(lang)
  const navigation = [
    { name: nav.home, href: '/' },
    { name: nav.about, href: '/about' },
    { name: nav.contact, href: '/contact' },
    { name: nav.services, href: '/services' },
    { name: nav.gallery, href: '/gallery' },
    { name: nav.donate, href: '/donate' },
  ]
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href={`/${lang}`} className="-m-1.5 p-1.5">
            <span className="sr-only">Holy Martyr Philothea & Saint Bede the Venerable Romanian Parish</span>
            <img
              className="h-14 w-auto"
              src="https://parish-nextjs-sanity-g65r92i5z-nickgolitsyn.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fque4q559%2Fproduction%2Fb460bdc5012b74569b8010dc8a22c083330a5c24-1024x1013.jpg%3Fw%3D1024%26auto%3Dformat&w=256&q=75"
              alt=""
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a key={item.name} href={`/${lang}/${item.href}`} className="text-sm font-semibold leading-6 text-gray-900">
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        {/* <a href={`/${lang}`} className="-m-1.5 p-1.5">
            <span className="sr-only">Holy Martyr Philothea & Saint Bede the Venerable Romanian Parish</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a> */}
          <LocaleSwitcher />
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href={`/${lang}`} className="-m-1.5 p-1.5">
              <span className="sr-only">Holy Martyr Philothea & Saint Bede the Venerable Romanian Parish</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={`/${lang}/${item.href}`}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
