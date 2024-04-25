'use client'
import { client } from "@/sanity/lib/client";
import { SanityGallery } from "@/typings";
import { groq } from "next-sanity";
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import Image from "next/image";
import { urlForImage } from '@/sanity/lib/image';
import React, { useState, useEffect } from "react";

const query = groq`
*[_type == 'gallery']
`;
export const revalidate = 500;

export default function GalleryGrid({ lang }: { lang: any }) {
  const [gallery, setGallery] = useState<SanityGallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data: SanityGallery[] = await client.fetch(query);
        setGallery(data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-screen w-screen">
          <div className="w-8 h-8 border-4 border-t-transparent border-yellow-200 rounded-full animate-spin"></div>
        </div>
      )}
      {!isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          <Gallery>
            {gallery.map((item: any) => (
              <Item
                key={item?._id}
                original={urlForImage(item?.image.asset._ref)}
                thumbnail={urlForImage(item?.image.asset._ref)}
                // width={`${String(item?.image.width)}px`}
                // height={`${String(item?.image.height)}px`}
                width={item?.width}
                height={item?.height}
              >
                {({ ref, open }) => (
                  <Image 
                    src={urlForImage(item?.image.asset._ref)} 
                    alt={item?.alt[lang]}
                    width={'500'}
                    height={'500'}
                    className="aspect-[16/12] w-full object-cover rounded-sm"
                    ref={ref} 
                    onClick={open}
                  />
                )}
              </Item>
            ))}
          </Gallery>
        </div>
      )}
    </>
  )
}