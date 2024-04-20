'use client'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { client } from '@/sanity/lib/client';
import { News } from '@/typings';
import { groq } from 'next-sanity';
import { useEffect, useState } from 'react';

export default function page({ params: { lang, id } }: { params: { lang: Locale, id: String } }) {
  const query = groq`*[_type == "news" && slug.current == "${id}"][0]`;
  const [news, setNews] = useState<News>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: News = await client.fetch(query);
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (news) {
      console.log(news);
    }
  }, [news]);

  return (
    <main className="pt-36 mb-20 px-5 max-w-screen-md mx-auto">
      <h1>{id}</h1>
      <h1>{news?.title.en}</h1>
    </main>
  );
}