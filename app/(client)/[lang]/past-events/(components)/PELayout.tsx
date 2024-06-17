'use client'
import Slideshow from "@/components/Slideshow";
import PastNews from "@/components/pastNews";
import { Locale } from "@/i18n.config";
import { client } from "@/sanity/lib/client";
import { PastEvents } from "@/typings";
import { groq } from "next-sanity";
import { useEffect, useState } from "react";

const query = groq`
*[_type == 'pastevents'] | order(_createdAt desc)
`;

export default function PageLayout({ lang }: { lang: Locale }) {
  const [data, setData] = useState<PastEvents[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const sanityData: PastEvents[] = await client.fetch(query);
        setData(sanityData);
        console.log(data);
      } catch (error) {
        console.error('Error fetching past events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  });
  return (
    <div>
      {isLoading && (
        <div className="flex justify-center items-center h-screen w-screen">
          <div className="w-8 h-8 border-4 border-t-transparent border-yellow-200 rounded-full animate-spin"></div>
        </div>
      )}
      {!isLoading && (
        <div className="space-y-10 mt-5">
          {data.map((e: PastEvents) => (
            <div key={e._id}>
              {e.title && <h2 className="mb-3 sm:mb-5 font-semibold sm:text-lg">{e.title[lang]}</h2>}
              {e.slideshow && (
                <Slideshow imageData={e.slideshow} />
              )}
              {e.screening?.news && (
                <PastNews lang={lang} newsID={e.screening.news._ref} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const revalidate = 5000;