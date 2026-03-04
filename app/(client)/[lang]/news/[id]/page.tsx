'use client'
import { Locale } from '@/i18n.config'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { News } from '@/typings'
import { groq } from 'next-sanity'
import { use, useEffect, useState } from 'react'
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/sanity/lib/image'

export default function Page({ params }: { params: Promise<{ lang: Locale; id: string }> }) {
  const { lang, id } = use(params)
  const query = groq`*[_type == "news" && slug.current == "${id}"][0]`
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
  }, [id, lang])

  if (loading) {
    return <div>Loading...</div>
  }

  const imgRef =
    news?.imagedata?.image?.[lang]?.asset?._ref ??
    news?.imagedata?.image?.en?.asset?._ref;

  return (
    <main className="pt-36 mb-20 px-5 max-w-screen-md mx-auto">
      {imgRef && (
        <Image
          src={urlForImage(imgRef)}
          width={500}
          height={500}
          alt="News"
          className="rounded-sm h-80 w-auto mx-auto mb-5"
        />
      )}
      <h1 className="text-2xl font-bold mb-2">{news?.title?.[lang] ?? news?.title?.en}</h1>
      <div className="prose lg:prose-xl">
        <PortableText value={news?.content?.[lang] ?? news?.content?.en ?? []} />
      </div>
    </main>
  )
}