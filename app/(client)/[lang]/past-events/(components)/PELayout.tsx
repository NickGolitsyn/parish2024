'use client';

import { Locale } from '@/i18n.config';
import { client } from '@/sanity/lib/client';
import { News } from '@/typings';
import { groq } from 'next-sanity';
import { useEffect, useState } from 'react';
import { NewsCard } from '@/components/NewsCard';

const query = groq`
  *[_type == 'news' && archived == true] | order(orderRank asc, _createdAt desc)
`;

export default function PELayout({ lang, words }: { lang: Locale; words?: { read?: string } }) {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: News[] = await client.fetch(query);
        setNews(data);
      } catch (error) {
        console.error('Error fetching archived news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] w-full">
        <div className="w-8 h-8 border-4 border-t-transparent border-yellow-200 rounded-full animate-spin" />
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <p className="text-center text-muted-foreground mt-5">
        No archived news yet.
      </p>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-10 mt-5">
      {news.map((item) => (
        <NewsCard key={item._id} item={item} lang={lang} words={words} />
      ))}
    </div>
  );
}

export const revalidate = 5000;
