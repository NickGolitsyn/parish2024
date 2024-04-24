import Image from "next/image";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import HomepageCarousel from "@/components/homepageCarousel";
import cross from "@/public/cross.png"
import NewsFeed from "@/components/newsFeed";
import Card from "@/components/card";
import React from "react";

export default async function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { page } = await getDictionary(lang);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-36 mx-auto max-w-2xl">
      <section className="text-center pb-10">
        <div className="font-semibold sm:text-xl flex flex-col text-base px-5 text-nowrap">
          <span className="italic text-sm sm:text-base">{page.home.title[0]}</span>
          <span>{page.home.title[1]}</span>
          <div className="flex flex-col sm:flex-row">
            <span>{page.home.title[2]}&nbsp;</span>
            <span>{page.home.title[3]}</span>
          </div>
        </div>
        <h2 className="font-semibold text-xs sm:text-base pt-5" dangerouslySetInnerHTML={{ __html: page.home.subtitle }} />
      </section>
      <section className="max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <HomepageCarousel />
      </section>
      <section className="mx-auto max-w-2xl py-4 sm:py-10 lg:py-14 flex flex-col items-center">
        <Image 
          src={cross} 
          alt={"Cross"}
          width={'100'}
          height={'100'}
          className="max-h-32 sm:max-h-full w-auto"
        />
        <div className="text-center">
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-5">
            <Card
              title="About"
              description="About our parish and saints."
              url={`${lang}/about`}
            />
            <Card
              title="Contact"
              description="Find out how to contact us and where we are located."
              url={`${lang}/contact`}
            />
            <Card
              title="Services"
              description="Upcoming service schedule."
              url={`${lang}/services`}
            />
            <Card
              title="Donate"
              description="Donate to out parish."
              url={`${lang}/donate`}
            />
          </div> */}
          <p
            className="mt-6 text-sm sm:text-lg px-5 leading-8 text-gray-600"
            dangerouslySetInnerHTML={{
              __html: page.home.description.replace(/<Link/g, '<a').replace(/<\/Link>/g, '</a>'),
            }}
          />
        </div>
      </section>
      <section>
        <h1 className='text-2xl font-bold mb-2 mx-5'>News</h1>
        <NewsFeed lang={lang} words={page.news} />
        <div className="flex flex-col-reverse sm:flex-row gap-2 mx-5 mb-5">
          <Image 
            src={"https://utfs.io/f/b2fd5163-c8dd-42a1-86c3-aa73ac2ea971-z87e25.jpg"} 
            alt={"Poster"} 
            width={500}
            height={500}
            className="h-auto sm:h-64 w-2/3 mx-auto sm:w-auto"
          />
          <div className="flex flex-col gap-1">
            {page.home.poster.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}