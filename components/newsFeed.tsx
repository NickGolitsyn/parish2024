'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { groq } from 'next-sanity';
import { News } from '@/typings';
import { client } from '@/sanity/lib/client';
import { Locale } from '@/i18n.config';
import { NewsCard } from '@/components/NewsCard';

const query = groq`*[_type == 'news' && archived != true] | order(orderRank asc, _createdAt desc)`;

export const revalidate = 500;

export default function NewsFeed({ lang, words }: { lang: Locale; words: { read?: string } }) {
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
  }, []);

  const [visibleCounter, setVisibleCounter] = useState(3);

  const loadMore = () => {
    setVisibleCounter((prevCount) => prevCount + 2);
  };

  const renderSkeleton = () => (
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 rounded-sm border py-3 px-5 animate-pulse">
      <div className="bg-gray-300 rounded-sm h-40 w-40" />
      <div>
        <div className="h-6 bg-gray-300 rounded w-64 mb-4" />
        <div className="flex flex-col space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-5/6" />
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-4 bg-gray-300 rounded w-3/4" />
        </div>
      </div>
    </div>
  );

  return (
    <section className="mx-5 mb-16">
      <div className="space-y-5 sm:space-y-10">
        {loading
          ? renderSkeleton()
          : news.slice(0, visibleCounter).map((item) => (
              <NewsCard key={item._id} item={item} lang={lang} words={words} />
            ))}
        {visibleCounter < news.length && (
          <div className="flex justify-center">
            <Button onClick={loadMore} variant="outline">
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
