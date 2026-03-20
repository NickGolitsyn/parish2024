'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { Button } from './ui/button';
import { urlForImage } from '@/sanity/lib/image';
import { getBlockContentPlainText, getTruncatedBlockContent } from '@/lib/portableText';
import type { News } from '@/typings';
import type { Locale } from '@/i18n.config';

const READ_MORE_CHAR_THRESHOLD = 220;

const newsCardPortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="whitespace-pre-line m-0">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    bold: ({ children }) => <strong className="font-bold">{children}</strong>,
  },
  hardBreak: () => <br />,
};

function formatDate(dateString: string, lang: Locale) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(lang === 'ro' ? 'ro' : 'en-UK', {
    day: 'numeric',
    month: 'long',
  }).format(date);
}

type NewsCardProps = {
  item: News;
  lang: Locale;
  words?: { read?: string };
};

export function NewsCard({ item, lang, words }: NewsCardProps) {
  const contentBlocks = Array.isArray(item?.content?.[lang] ?? item?.content?.en)
    ? (item?.content?.[lang] ?? item?.content?.en ?? [])
    : [];
  const plainText = getBlockContentPlainText(contentBlocks);
  const showReadMore = plainText.length > READ_MORE_CHAR_THRESHOLD;
  const plainSnippet = showReadMore
    ? plainText.slice(0, READ_MORE_CHAR_THRESHOLD).trim() + '...'
    : plainText;
  const snippetBlocks = getTruncatedBlockContent(contentBlocks, READ_MORE_CHAR_THRESHOLD);
  const readLabel = words?.read ?? 'Read';

  const roRef = item?.imagedata?.image?.[lang]?.asset?._ref;
  const enRef = item?.imagedata?.image?.en?.asset?._ref;
  const imgRef = roRef ?? enRef;
  const titleText = (item?.title?.[lang] ?? item?.title?.en ?? '').replace(/\\n/g, '\n');

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 rounded-sm border py-3 px-5">
      <div className="text-center sm:hidden">
        <h3 className="font-semibold text-xl text-center whitespace-pre-line">{titleText}</h3>
        <time className="text-sm">{formatDate(item?._createdAt ?? '', lang)}</time>
      </div>
      {imgRef ? (
        <Image
          src={urlForImage(imgRef)}
          width={500}
          height={500}
          alt="News"
          className="h-auto sm:h-64 w-2/3 mx-auto sm:w-auto rounded-sm"
        />
      ) : null}
      <div className="flex flex-col gap-2 w-full">
        <div className="hidden sm:block">
          <h3 className="font-semibold text-xl whitespace-pre-line">{titleText}</h3>
          <time className="text-sm">{formatDate(item?._createdAt ?? '', lang)}</time>
        </div>
        <div className="text-center sm:text-left">
          {snippetBlocks.length > 0 ? (
            <PortableText value={snippetBlocks} components={newsCardPortableTextComponents} />
          ) : (
            <p className="whitespace-pre-line">{plainSnippet}</p>
          )}
        </div>
        {showReadMore && item?.slug?.current && (
          <Button asChild className="w-min mx-auto sm:mx-0">
            <Link href={`/${lang}/news/${item.slug.current}`}>{readLabel}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
