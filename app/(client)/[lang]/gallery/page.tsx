'use client'
import React from 'react';
import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { groq } from 'next-sanity';
import { SanityGallery } from '@/typings';
import { client } from '@/sanity/lib/client';
import Image from "next/image";
import { urlForImage } from '@/sanity/lib/image';

const query = groq`
*[_type == 'gallery']
`;
export const revalidate = 500;

export default async function page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { page } = await getDictionary(lang)
  const gallery: SanityGallery[] = await client.fetch(query);
  return (
    <main className="py-24 px-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center [&>img]:h-32">
        <Gallery>
          {gallery.map((item: any) => (
            <Item
              key={item?._id}
              original={urlForImage(item?.image.asset._ref)}
              thumbnail="https://placehold.co/80x60"
              width="1024"
              height="768"
            >
              {({ ref, open }) => (
                <Image 
                  src={urlForImage(item?.image.asset._ref)} 
                  alt={item?.alt[lang]}
                  width={'500'}
                  height={'500'}
                  className="aspect-video w-full object-cover"
                  ref={ref} 
                  onClick={open}
                />
                // <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" alt="Kitten 1" />
              )}
            </Item>
          ))}
        </Gallery>
      </div>
    </main>
  )
}