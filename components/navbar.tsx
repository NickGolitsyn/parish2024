'use client'
import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Locale } from '@/i18n.config';
import LocaleSwitcher from './localeSwitcher';
import { getDictionary } from '@/lib/dictionary';
import Image from 'next/image';
import logo from '@/public/logo.jpg';

interface NavigationItem {
  name: string;
  href: string;
}

export default function Navbar({ lang }: { lang: Locale }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);

  useEffect(() => {
    const fetchNavigation = async () => {
      const { nav } = await getDictionary(lang);
      const navItems: NavigationItem[] = [
        { name: nav.home, href: '' },
        { name: nav.about, href: 'about' },
        { name: nav.contact, href: 'contact' },
        { name: nav.services, href: 'services' },
        { name: nav.gallery, href: 'gallery' },
        { name: nav.donate, href: 'donate' },
        { name: nav.sundaySchool, href: 'sunday-school' },
      ];
      setNavigation(navItems);
    };

    fetchNavigation();
  }, [lang]);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href={`/${lang}`} className="-m-1.5 p-1.5">
            <span className="sr-only">Holy Martyr Philothea & Saint Bede the Venerable Romanian Parish</span>
            <Image 
              src={logo} 
              alt={'logo'}
              width={80}
              height={80}
              className='rounded-md'
            />
          </a>
        </div>
        <div className="flex lg:hidden gap-5">
          <div>
            <LocaleSwitcher />
          </div>
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="size-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <a key={item.name} href={`/${lang}/${item.href}`} className="text-sm font-semibold leading-6 text-gray-900">
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <LocaleSwitcher />
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
          <a href={`/${lang}`} className="-m-1.5 p-1.5">
            <span className="sr-only">Holy Martyr Philothea & Saint Bede the Venerable Romanian Parish</span>
            <Image 
              src={logo} 
              alt={'logo'}
              width={80}
              height={80}
              className='rounded-md'
            />
          </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="size-6" aria-hidden="true" />
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
              <div className="py-6">
                <LocaleSwitcher />
                <a 
                  className={'mt-3 rounded-md size-10 flex justify-center items-center border border-gray-500/10 bg-transparent text-black'} 
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
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}