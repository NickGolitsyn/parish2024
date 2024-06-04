import { Button } from '@/components/ui/button'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { Metadata } from 'next';
import photo from "@/public/donateImage.jpeg"
import Image from 'next/image';
import Link from 'next/link'
import React from 'react';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { lang } = params;
  const title = {
    en: 'Donate',
    ro: 'Donații'
  };

  return {
    title: lang === 'ro' ? title.ro : title.en,
    alternates: {
      canonical: 'https://www.parohianorwich.org/en/donate',
      languages: {
        'en': 'https://www.parohianorwich.org/en/donate',
        'ro': 'https://www.parohianorwich.org/ro/donate',
      },
    },
  };
}

export default async function page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { page } = await getDictionary(lang)
  return (
    <main className="text-sm sm:text-base pt-36 px-5 max-w-screen-md mx-auto flex flex-col items-center">
      <h1 className='text-2xl font-bold mb-2'>{page.donate.title}</h1>
      {/* <p className='text-center'>{page.donate.text}</p> */}
      <p className='text-center'>
        {page.donate.text.map((text, index) => (
          <React.Fragment key={index}>
            {text}
            {index !== page.donate.text.length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
      {/* <Button asChild className='mt-3'>
        <Link href="https://www.paypal.com/" target='_blank'>{page.donate.title}</Link>
      </Button> */}
      <Button disabled className='mt-3'>
        {page.donate.title}
      </Button>
      <Image 
        src={photo} 
        alt={'Photo of Icon and Candlestand'} 
        width={'100'}
        height={'100'}
        className="max-h-64 h-80 sm:max-h-full w-auto rounded-sm mt-5"
      />
    </main>
  )
}
