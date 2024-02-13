'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { client } from "@/sanity/lib/client";
import { Services } from "@/typings";
import { groq } from "next-sanity";

const query = groq`
*[_type == 'services']
`;
export const revalidate = 60;

export default async function page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { page } = await getDictionary(lang)
  const services: Services[] = await client.fetch(query);
  return (
    <main className="p-24">
      <Tabs defaultValue="upcoming" className="flex flex-col">
        <TabsList className="w-fit mx-auto">
          <TabsTrigger value="upcoming">{page.services.upcoming}</TabsTrigger>
          <TabsTrigger value="past">{page.services.past}</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
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
              {services.map((item: Services) => ( 
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
              {services.map((item: Services) => ( 
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
  )
}
