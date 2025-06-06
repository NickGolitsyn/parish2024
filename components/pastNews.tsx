'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { groq } from 'next-sanity';
import { News } from '@/typings';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import Link from 'next/link';
import { Locale } from "@/i18n.config";
import { PortableText } from '@portabletext/react';
import React from 'react';

const query = groq`*[_type == 'news'] | order(_createdAt desc)`;

export const revalidate = 500;

export default function NewsFeed({ lang, newsID }: { lang: Locale, newsID: string }) {
  const query = groq`*[_type == 'news' && _id == '${newsID}']`;
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: News[] = await client.fetch(query);
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  });

  const [visibleCounter, setVisibleCounter] = useState(3);

  const loadMore = () => {
    setVisibleCounter((prevCount) => prevCount + 2);
  }

  const formatDate = (dateString: string, format: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {};

    if (format === 'D MMM') {
      options.day = 'numeric';
      options.month = 'short';
    } else if (format === 'dddd D MMM') {
      options.weekday = 'long';
      options.day = 'numeric';
      options.month = 'long';
    } else if (format === 'D MMM, hh:mm') {
      options.day = 'numeric';
      options.month = 'long';
    }

    return new Intl.DateTimeFormat(lang === 'ro' ? 'ro' : 'en-UK', options).format(date);
  };

  const renderSkeleton = () => (
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 rounded-sm border py-3 px-5 animate-pulse">
      <div className="bg-gray-300 rounded-sm h-40 w-40"></div>
      <div>
        <div className="h-6 bg-gray-300 rounded w-64 mb-4"></div>
        <div className="flex flex-col space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-70%"></div>
        </div>
      </div>
    </div>
  );
  return (
    <section className='mx-5 mb-16'>
      <div className='space-y-5 sm:space-y-10'>
        {loading ? renderSkeleton() : news.slice(0, visibleCounter).map((e:any) => (
          <div key={e?._id} className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 rounded-sm border py-3 px-5'>
            <div className='text-center sm:hidden'>
              <h3 className='font-semibold text-xl text-center'>
                {e?.title[lang].split('\\n').map((line: any, index: any) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h3>
              <time className='text-sm'>{formatDate(e?._createdAt as string, 'D MMM, hh:mm')}</time>
            </div>
            <Image 
              src={urlForImage(e?.imagedata.image[lang].asset._ref)} 
              width={500}
              height={500}
              alt={'News image'}
              className="h-auto sm:h-64 w-2/3 mx-auto sm:w-auto rounded-sm"
            />
            <div className='flex flex-col gap-2 w-full'>
              {/* <h1 className='hidden font-semibold sm:block text-xl'>{e?.title[lang]}</h1> */}
              <div className='hidden sm:block'>
                <h3 className='font-semibold text-xl'>{e?.title[lang].replace(/\\n/g, ' ')}</h3>
                <time className='text-sm'>{formatDate(e?._createdAt as string, 'D MMM, hh:mm')}</time>
              </div>
              <div className='text-center sm:text-left'>
                <PortableText value={e?.description[lang]} />
              </div>
              {/* {e?.button && (
                <Button asChild className='w-min mx-auto sm:mx-0'>
                  <Link href={`${lang}/news/${e?.slug.current}`}>{words.read}</Link>
                </Button>
              )} */}
            </div>
          </div>
        ))}

        {/* {arr.slice(0, visibleCounter).map((index) => (
          <div key={index} className='flex flex-col sm:flex-row items-center space-y-4 sm:space-x-4 rounded-sm border py-3 px-5'>
            <Image 
              src={placeholder} 
              alt={'News image'}
              className='rounded-sm h-40 w-auto'
            />
            <div>
              <h1 className='font-semibold sm:text-xl'>Easter Services</h1>
              <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        ))} */}
        {visibleCounter < news.length && (
          <div className='flex justify-center'>
            <Button onClick={loadMore} variant={'outline'}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
