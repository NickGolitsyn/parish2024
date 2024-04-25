'use client'
import { Locale } from '@/i18n.config'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { News } from '@/typings'
import { groq } from 'next-sanity'
import { useEffect, useState } from 'react'
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/sanity/lib/image'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { lang } = params;
  const title = {
    en: 'Sunday school',
    ro: 'Școala de duminică'
  };

  return {
    title: lang === 'ro' ? title.ro : title.en
  };
}

export default function Page({ params: { lang, id } }: { params: { lang: Locale, id: String } }) {
  const query = groq`*[_type == "sundayschool" && slug.current == "${id}"][0]`
  const [news, setNews] = useState<News>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: News = await client.fetch(query)
        setNews(data)
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <main className="pt-36 mb-20 px-5 max-w-screen-md mx-auto">
      {news?.imagedata && 
        <Image 
          src={urlForImage(news?.imagedata.image.asset._ref)} 
          width={500}
          height={500}
          alt={'News image'}
          className='rounded-sm h-80 w-auto mx-auto mb-5'
        />
      }
      <h1 className='text-2xl font-bold mb-2'>{news?.title[lang]}</h1>
      <div className="prose lg:prose-xl">
        <PortableText value={news?.content[lang]} />
      </div>
    </main>
  )
}