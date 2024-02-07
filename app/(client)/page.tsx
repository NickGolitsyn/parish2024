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
import { FoodItems } from "@/typings";
import { urlForImage } from "@/sanity/lib/image";

const query = groq`
*[_type == 'foodItems']
`;
export const revalidate = 60;

export default async function Home() {
  const foodItems: FoodItems[] = await client.fetch(query);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 mx-auto max-w-2xl">
      <div className="text-center py-10">
        <h1 className="font-semibold text-xl">
          <i>Welcome to</i><br/>the Romanian parish of<br/>Holy Martyr Philothea & Saint Bede the Venerable
        </h1>
        <h2 className="font-semibold pt-5">An Orthodox parish serving<br/>Norwich & East Anglia</h2>
      </div>
      <div className="max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <div>
          {foodItems.map((item: FoodItems) => (
            <div key={item.name}>
              <h1>{item.name}</h1>
              <p>{item.rating}</p>
              {item.tags.map((tag) => (
                <p key={tag}>{tag}</p>
              ))}
              <img src={urlForImage(item?.image)} alt={item.name} />
            </div>
          ))}
        </div>
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
            On this website you can find out <Link className="underline text-indigo-600" href='/about'>about us</Link>, <Link className="underline text-indigo-600" href='/'>where</Link> we worship, <Link className="underline text-indigo-600" href='/services'>when</Link> our services are, how to <Link className="underline text-indigo-600" href='/contact'>contact</Link> us and how to <Link className="underline text-indigo-600" href='/donate'>support</Link> us.
          </p>
        </div>
      </div>
    </main>
  );
}
