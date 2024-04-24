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
import { toPlainText } from '@portabletext/react';

const query = groq`*[_type == 'news']`;

export const revalidate = 500;

export default function NewsFeed({ lang, words }: { lang: Locale, words: any }) {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  function capitalizeFirstLetterOfSentences(text: String) {
    const sentences = text.split(/[.!?]\s+/);
    const capitalizedSentences = sentences.map((sentence) => {
      const words = sentence.split(' ');
      const capitalizedWords = words.map((word, index) => {
        if (index === 0) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        return word.toLowerCase();
      });
      return capitalizedWords.join(' ');
    });
    return capitalizedSentences.join('. ');
  }

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
  }, []);

  const [visibleCounter, setVisibleCounter] = useState(3);

  const loadMore = () => {
    setVisibleCounter((prevCount) => prevCount + 2);
  }

  const renderSkeleton = () => (
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-x-4 rounded-sm border py-3 px-5 animate-pulse">
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
      <div className='space-y-5'>
        {loading ? renderSkeleton() : news.slice(0, visibleCounter).map((e:any) => (
          <div key={e?._id} className='flex flex-col sm:flex-row items-center space-y-4 sm:space-x-4 rounded-sm border py-3 px-5'>
            <Image 
              src={urlForImage(e?.imagedata.image.asset._ref)} 
              width={500}
              height={500}
              alt={'News image'}
              className='rounded-sm h-48 sm:h-32 w-auto'
            />
            <div className='flex flex-col gap-2 w-full'>
              <h1 className='font-semibold sm:text-xl'>{e?.title[lang]}</h1>
              {/* <p className='text-sm'>
                {e?.content[lang] && toPlainText(e.content[lang]).split(' ').slice(0, 50).join(' ')}...
              </p> */}
              <p className='text-sm'>
                {e?.content[lang] &&
                  capitalizeFirstLetterOfSentences(toPlainText(e.content[lang]))
                    .split(' ')
                    .slice(0, 10)
                    .join(' ')}...
              </p>
              <Button asChild className='w-min'>
                <Link href={`${lang}/news/${e?.slug.current}`}>{words.read}</Link>
              </Button>
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
