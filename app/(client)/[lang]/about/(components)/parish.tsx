'use client'
import { useEffect, useState } from 'react';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import { Locale } from "@/i18n.config";
import React from 'react';

const query = groq`
  *[_type == 'about'][0]{
    parish, embed
  }
`;

export const revalidate = 5000;

export default function Parish({ lang, words }: { lang: Locale, words: any }) {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any = await client.fetch(query);
        setData(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center min-h-32 max-h-screen w-full">
          <div className="w-8 h-8 border-4 border-t-transparent border-yellow-200 rounded-full animate-spin"></div>
        </div>
      )}
      {!loading && (
        <div className='flex flex-col items-center mt-10'>
          <h1 className='text-2xl font-bold mb-2'>{words.about.parish}</h1>
          <div className='space-y-2'>
            <p className='text-sm sm:text-base'>{data.parish[lang]}</p>
          </div>
          {/* {data.embed && data.embed.map((e: any) => (
            <div key={e._id}>
            </div>
          ))} */}
        </div>
      )}
    </>
  )
}
