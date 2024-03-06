'use client'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import { Home } from "@/typings";
import { urlForImage } from '@/sanity/lib/image';
import Image from "next/image";
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';

const query = groq`
*[_type == 'home']
`;

export default async function HomepageCarousel() {
  const autoplayPlugin = Autoplay({
    delay: 5000,
  });
  const home: Home[] = await client.fetch(query);
  return (
    <Carousel 
          plugins={[autoplayPlugin]}
          opts={{
            loop: true,
          }}
        >
      <CarouselContent>
        {home[0].slideshow.map((item: any) => ( 
          <CarouselItem key={item?._key}>
            <Image 
              src={urlForImage(item?.asset._ref)} 
              alt={"Cross"}
              width={'500'}
              height={'500'}
              className="aspect-video w-full object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='hidden sm:flex' />
      <CarouselNext className='hidden sm:flex' />
    </Carousel>
  )
}

export const revalidate = 500;