import Image from "next/image";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import HomepageCarousel from "@/components/homepageCarousel";
import cross from "@/public/cross.png";
import NewsFeed from "@/components/newsFeed";
import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { VideoSection } from "@/components/videoSection";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { lang } = params;
  const title = {
    en: "Parohia Norwich | Home",
    ro: "Parohia Norwich | Acasă",
  };

  return {
    title: lang === "ro" ? title.ro : title.en,
    alternates: {
      canonical: "https://www.parohianorwich.org/en",
      languages: {
        en: "https://www.parohianorwich.org/en",
        ro: "https://www.parohianorwich.org/ro",
      },
    },
  };
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-36 mx-auto max-w-2xl">
      <section className="text-center pb-10">
        <h1 className="font-semibold text-2xl md:text-3xl flex flex-col px-5 text-nowrap">
          <span className="italic text-lg md:text-xl">
            {page.home.title[0]}&nbsp;
          </span>
          <span>{page.home.title[1]}</span>
          <div className="flex flex-col sm:flex-row">
            <span>{page.home.title[2]}&nbsp;</span>
            <span>{page.home.title[3]}</span>
          </div>
        </h1>
        <h2 className="font-semibold text-base pt-3 flex flex-col">
          {page.home.subtitle.map((text, index) => (
            <span key={index}>{text}</span>
          ))}
        </h2>
      </section>
      <section className="max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <HomepageCarousel />
      </section>
      <section className="mx-auto max-w-2xl py-4 sm:py-10 lg:py-14 flex flex-col items-center">
        <Image
          src={cross}
          alt={"Cross"}
          width={"100"}
          height={"100"}
          className="max-h-32 sm:max-h-full w-auto"
        />
        <div className="text-center">
          <p
            className="mt-6 text-sm sm:text-lg px-5 text-gray-600"
            dangerouslySetInnerHTML={{
              __html: page.home.description
                .replace(/<Link/g, "<a")
                .replace(/<\/Link>/g, "</a>"),
            }}
          />
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4 mx-5 text-center">
          {page.news.title}
        </h2>
        <div className="w-full">
          <div className="px-5 pb-4">
            <VideoSection />
          </div>
        </div>
        <NewsFeed lang={lang} words={page.news} />
        {/* <div className="flex flex-col-reverse sm:flex-row gap-2 mx-5 mb-5">
          <Image
            src={"https://utfs.io/f/b2fd5163-c8dd-42a1-86c3-aa73ac2ea971-z87e25.jpg"}
            alt={"Poster"}
            width={500}
            height={500}
            className="h-auto sm:h-64 w-2/3 mx-auto sm:w-auto"
          />
          <div className="flex flex-col gap-1">
            {page.home.poster.map((text, index) => (
              <p className="text-sm sm:text-base" key={index}>{text}</p>
            ))}
          </div>
        </div> */}
      </section>
      <section className="my-5">
        <Link href={`${lang}/donate`}>
          <Image
            src={page.donate.image}
            alt={"Donate to the Parish"}
            width={500}
            height={500}
            className="h-auto sm:h-64 w-2/3 mx-auto sm:w-auto rounded-sm"
          />
        </Link>
      </section>
    </main>
  );
}
