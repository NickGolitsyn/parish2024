'use client'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import { Image } from 'sanity';
import { Home } from "@/typings";
import { urlForImage } from '@/sanity/lib/image';

export default function HomepageCarousel({ home }: { home: Home[] }) {
  const autoplayPlugin = Autoplay({
    delay: 5000,
  });

  return (
    <Carousel 
          plugins={[autoplayPlugin]}
          opts={{
            loop: true,
          }}
        >
      <CarouselContent>
        {home[0].slideshow.map((item: any) => ( 
          <CarouselItem>
            <img 
              src={urlForImage(item?.asset._ref)}
              className='w-full aspect-video object-cover'
              alt="placeholder"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='hidden sm:flex' />
      <CarouselNext className='hidden sm:flex' />
    </Carousel>
  )
}
