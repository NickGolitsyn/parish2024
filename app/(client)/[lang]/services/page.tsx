'use client'
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { client } from "@/sanity/lib/client";
import { Services } from "@/typings";
import { groq } from "next-sanity";

const query = groq`
*[_type == 'services']
`;

export default async function page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { page } = await getDictionary(lang);
  const services: Services[] = await client.fetch(query);

  // Get today's date to filter upcoming and past services
  const today = new Date();

  // Filter and sort upcoming services
  const upcomingServices = services
    .filter((item: Services) => new Date(item.date as string) >= today)
    .sort((a: Services, b: Services) => new Date(a.date as string).getTime() - new Date(b.date as string).getTime());

  const pastServices = services
    .filter((item: Services) => new Date(item.date as string) < today)
    .sort((a: Services, b: Services) => new Date(b.date as string).getTime() - new Date(a.date as string).getTime());


  return (
    <main className="py-24 px-5 max-w-screen-md mx-auto">
      <Tabs defaultValue="upcoming" className="flex flex-col">
        <TabsList className="w-fit mx-auto">
          <TabsTrigger value="upcoming">{page.services.upcoming}</TabsTrigger>
          <TabsTrigger value="past">{page.services.past}</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          {/* Render upcoming services */}
          <Table>
            <TableCaption>{page.services.upcomingTableDesc}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">{page.services.date}</TableHead>
                <TableHead className="text-nowrap w-10">{page.services.fastingCode}</TableHead>
                <TableHead>{page.services.description}</TableHead>
                <TableHead className="text-nowrap w-[100px]">{page.services.bibleReading}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingServices.map((item: Services) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item.date}</TableCell>
                  <TableCell>{item.fastingCode}</TableCell>
                  <TableCell>{item.description[lang]}</TableCell>
                  <TableCell>{item.bibleReadings[lang]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="past">
          {/* Render past services */}
          <Table>
            <TableCaption>{page.services.pastTableDesc}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">{page.services.date}</TableHead>
                <TableHead className="text-nowrap w-10">{page.services.fastingCode}</TableHead>
                <TableHead>{page.services.description}</TableHead>
                <TableHead className="text-nowrap w-[100px]">{page.services.bibleReading}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pastServices.map((item: Services) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item.date}</TableCell>
                  <TableCell>{item.fastingCode}</TableCell>
                  <TableCell>{item.description[lang]}</TableCell>
                  <TableCell>{item.bibleReadings[lang]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </main>
  );
}

export const revalidate = 500;