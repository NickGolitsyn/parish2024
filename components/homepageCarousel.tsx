'use client'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import Autoplay from "embla-carousel-autoplay"

export default function HomepageCarousel() {
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
            <CarouselItem>
              <img 
                src="https://placehold.co/600x400"
                alt="placeholder"
              />
            </CarouselItem>
            <CarouselItem>
              <img 
                src="https://placehold.co/600x400"
                alt="placeholder"
              />
            </CarouselItem>
            <CarouselItem>
              <img 
                src="https://placehold.co/600x400"
                alt="placeholder"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
  )
}
