'use client'
import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { HomePage } from "@/typings";
import { urlForImage } from '@/sanity/lib/image';
import Image from "next/image";
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';

const query = groq`*[_type == 'home']`;

export default function HomepageCarousel() {
  const [home, setHome] = useState<HomePage[]>([]);
  const [loading, setLoading] = useState(true);
  const autoplayPlugin = Autoplay({ delay: 5000 });

  useEffect(() => {
    const fetchData = async () => {
      const data: HomePage[] = await client.fetch(query);
      setHome(data);
      setLoading(false); // Set loading to false once the data is fetched
    };

    fetchData();
  }, []);

  // Skeleton loader to display before the content is loaded
  const renderSkeleton = () => (
    <div className="aspect-[16/12] rounded-md w-full animate-pulse bg-gray-300"></div>
  );

  return (
    <Carousel 
      plugins={[autoplayPlugin]}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {loading ? renderSkeleton() : home[0].slideshow.map((item: any) => (
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
  );
}

export const revalidate = 500;

// Note: Since you're using Next.js, if you intended to use ISR (Incremental Static Regeneration),
// you would define `getStaticProps` or `getServerSideProps` instead of using `revalidate` here.
