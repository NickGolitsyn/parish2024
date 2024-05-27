import React from 'react';
import Link from 'next/link';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { client } from '@/sanity/lib/client';
import { Services } from '@/typings';
import { groq } from 'next-sanity';
import { Metadata } from 'next';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { lang } = params;
  const title = {
    en: 'Services',
    ro: 'Programul slujbelor'
  };

  return {
    title: lang === 'ro' ? title.ro : title.en,
    alternates: {
      canonical: 'https://www.parohianorwich.org/en/services',
      languages: {
        'en': 'https://www.parohianorwich.org/en/services',
        'ro': 'https://www.parohianorwich.org/ro/services',
      },
    },
  };
}

const query = groq`*[_type == 'services']`;

export default async function page({ params: { lang } }: { params: { lang: Locale } }) {
  const { page } = await getDictionary(lang);
  const services: Services[] = await client.fetch(query);

  // Get today's date to filter upcoming and past services
  const today = new Date();

  // Filter and sort upcoming services
  const upcomingServices = services
    .filter((item: Services) => new Date(item.date as string) >= today)
    .sort((a: Services, b: Services) => new Date(a.date as string).getTime() - new Date(b.date as string).getTime());

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
    }

    return new Intl.DateTimeFormat(lang === 'ro' ? 'ro' : 'en-UK', options).format(date);
  };

  // Helper function to convert description to link if it has square brackets
  const convertDescriptionToLink = (description: string) => {
    const regex = /\[text: "(.*?)"; link: "(.*?)"\]/;
    const matches = description.match(regex);
  
    if (matches) {
      const [_, text, link] = matches;
      return (
        <>
          {description.split(regex)[0]}
          <Link href={link} className='underline text-amber-600'>{text}</Link>
        </>
      );
    }
  
    return description;
  };

  return (
    <main className="pt-36 px-5 max-w-screen-md mx-auto">
      <div className="mb-5">
        <h1 className="text-2xl font-bold mb-2 text-center">{page.services.mainTitle}</h1>
        <p className="text-sm sm:text-base text-center">{page.services.mainDescription}</p>
      </div>
      <Table>
        <TableCaption>{page.services.upcomingTableDesc}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">{page.services.date}</TableHead>
            <TableHead>{page.services.description}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {upcomingServices.map((item: Services) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium first-letter:capitalize">{formatDate(item.date as string, 'dddd D MMM')}</TableCell>
              <TableCell>{convertDescriptionToLink(item.description[lang])}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}

export const revalidate = 500;