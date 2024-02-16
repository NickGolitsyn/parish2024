import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import Autoplay from "embla-carousel-autoplay"
import HomepageCarousel from "@/components/homepageCarousel";

export default async function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { page } = await getDictionary(lang);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 mx-auto max-w-2xl">
      <div className="text-center pb-10">
        <h1 className="font-semibold text-xl" dangerouslySetInnerHTML={{ __html: page.home.title }} />
        <h2 className="font-semibold pt-5" dangerouslySetInnerHTML={{ __html: page.home.subtitle }} />
      </div>
      <div className="max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <HomepageCarousel />
        {/* <Carousel 
          plugins={[autoplayPlugin]}
          // opts={{
          //   loop: true,
          // }}
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
        </Carousel> */}
      </div>

      <div className="mx-auto max-w-2xl py-4 sm:py-10 lg:py-14">
        <div className="text-center">
          {/* <p className="mt-6 text-lg leading-8 text-gray-600" dangerouslySetInnerHTML={{ __html: page.home.description}} /> */}
          <p
        className="mt-6 text-lg leading-8 text-gray-600"
        dangerouslySetInnerHTML={{
          __html: page.home.description.replace(/<Link/g, '<a').replace(/<\/Link>/g, '</a>'),
        }}
      />
          {/* <p className="mt-6 text-lg leading-8 text-gray-600">
            On this website you can find out <Link className="underline text-indigo-600" href='/about'>about us</Link>, <Link className="underline text-indigo-600" href='/'>where</Link> we worship, <Link className="underline text-indigo-600" href='/services'>when</Link> our services are, how to <Link className="underline text-indigo-600" href='/contact'>contact</Link> us and how to <Link className="underline text-indigo-600" href='/donate'>support</Link> us.
          </p> */}
        </div>
      </div>
    </main>
  );
}
