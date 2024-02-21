'use client'
import { client } from "@/sanity/lib/client";
import { SanityGallery } from "@/typings";
import { groq } from "next-sanity";
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import Image from "next/image";
import { urlForImage } from '@/sanity/lib/image';
import React from "react";

const query = groq`
*[_type == 'gallery']
`;
export const revalidate = 500;

export default function GalleryGrid({ lang }: { lang: any }) {
  // const gallery: SanityGallery[] = await client.fetch(query);

  const [gallery, setGallery] = React.useState<SanityGallery[]>([]);

  React.useEffect(() => {
    const fetchGallery = async () => {
      const data: SanityGallery[] = await client.fetch(query);
      setGallery(data);
    };

    fetchGallery();
  }, []);
  return (
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
          )}
        </Item>
      ))}
    </Gallery>
  )
}
