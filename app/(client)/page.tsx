import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Carousel>
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
      </div>

      <div className="mx-auto max-w-2xl py-4 sm:py-10 lg:py-14">
        <div className="text-center">
          <p className="mt-6 text-lg leading-8 text-gray-600">
            On this website you can find out about us, where we worship, when our services are, how to contact us and how to support us.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
