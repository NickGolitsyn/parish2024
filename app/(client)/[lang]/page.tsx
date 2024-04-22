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
        {/* <h1 className="font-semibold sm:text-xl text-sm px-5 text-nowrap" dangerouslySetInnerHTML={{ __html: page.home.title }} /> */}
        <h1 className="font-semibold sm:text-xl text-base px-5 text-nowrap">
          {page.home.title.split(/<sm:br\/?>/g).map((part, index) => (
            <React.Fragment key={index}>
              {part.includes('<i>') ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: part.replace(/<i>/g, '').replace(/<\/i>/g, ''),
                  }}
                  className="italic"
                />
              ) : (
                part
              )}
              {index < page.home.title.split(/<sm:br\/?>/g).length - 1 && (
                <React.Fragment>
                  {/* Render line break only on small screens */}
                  <span className="sm:hidden">
                    <br />
                  </span>
                  {/* Render space for larger screens */}
                  <span className="hidden sm:inline"> </span>
                </React.Fragment>
              )}
            </React.Fragment>
          ))}
        </h1>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-5">
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
          </div>
          {/* <p
            className="mt-6 text-sm sm:text-lg px-5 leading-8 text-gray-600"
            dangerouslySetInnerHTML={{
              __html: page.home.description.replace(/<Link/g, '<a').replace(/<\/Link>/g, '</a>'),
            }}
          /> */}
        </div>
      </section>
      <section>
        <h1 className='text-2xl font-bold mb-2 mx-5'>News</h1>
        <NewsFeed lang={lang} words={page.news} />
      </section>
    </main>
  );
}