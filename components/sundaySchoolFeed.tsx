'use client'
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { groq } from 'next-sanity';
import { SundaySchool } from '@/typings';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { Locale } from "@/i18n.config";
import { toPlainText } from '@portabletext/react';

const query = groq`*[_type == 'sundayschool']`;

export const revalidate = 500;

export default function NewsFeed({ lang, words }: { lang: Locale, words: any }) {
  const [sundaySchoolPosts, setSundaySchoolPosts] = useState<SundaySchool[]>([]);
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
        const data: SundaySchool[] = await client.fetch(query);
        setSundaySchoolPosts(data);
      } catch (error) {
        console.error('Error fetching Sunday School posts:', error);
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
    <div className="flex flex-col items-start space-y-4 rounded-sm border py-3 px-5 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-64"></div>
      <div className="flex flex-col space-y-2 w-full">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-70%"></div>
      </div>
    </div>
  );
  return (
    <section className='mx-5 mb-16'>
      <div className='space-y-5'>
        {loading ? renderSkeleton() : sundaySchoolPosts.slice(0, visibleCounter).map((post) => (
          <div key={post?._id} className='flex flex-col items-start space-y-4 rounded-sm border py-3 px-5'>
            <div className='flex flex-col gap-2 w-full'>
              <h1 className='font-semibold sm:text-xl'>{post?.title[lang]}</h1>
              <p className='text-sm'>
                {post?.content[lang] &&
                  capitalizeFirstLetterOfSentences(toPlainText(post.content[lang]))
                    .split(' ')
                    .slice(0, 70)
                    .join(' ')}...
              </p>
              <Button asChild className='w-min'>
                <Link href={`./sunday-school/${post?.slug.current}`}>{words.read}</Link>
              </Button>
            </div>
          </div>
        ))}
        {visibleCounter < sundaySchoolPosts.length && (
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
