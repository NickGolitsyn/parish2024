'use client'
import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import Image from 'next/image';
import { PastEvents } from '@/typings';
import Autoplay from 'embla-carousel-autoplay';
import { urlForImage } from '@/sanity/lib/image';

export default function Slideshow({ imageData }: { imageData: [] }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (imageData) {
      setLoading(false);
    }
  }, [imageData]);
  const autoplayPlugin = Autoplay({ delay: 5000 });
  
  const renderSkeleton = () => (
    <div className="aspect-[16/12] rounded-md h-64 animate-pulse bg-gray-300"></div>
  );

  return (
    <Carousel 
      plugins={[autoplayPlugin]}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {loading ? renderSkeleton() : imageData.map((item: any) => (
          <CarouselItem key={item?._key}>
            <Image 
              src={urlForImage(item?.asset._ref)} 
              alt={"Cross"}
              width={'500'}
              height={'500'}
              className="aspect-[16/12] rounded-md w-full object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='hidden sm:flex' />
      <CarouselNext className='hidden sm:flex' />
    </Carousel>
  )
}
