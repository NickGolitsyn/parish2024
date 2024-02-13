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
import { client } from "@/sanity/lib/client";
import { Services } from "@/typings";
import { groq } from "next-sanity";


const query = groq`
*[_type == 'services']
`;
export const revalidate = 60;

export default async function page() {
  const services: Services[] = await client.fetch(query);
  return (
    <main className="p-24">
      {/* <div>
        {services.map((item: Services) => (
          <div key={item._id}>
            <h1>{item.fastingCode}</h1>
            <p>{item.description.en}</p>
          </div>
        ))}
      </div> */}
      <Tabs defaultValue="upcoming" className="flex flex-col">
        <TabsList className="w-fit mx-auto">
          <TabsTrigger value="upcoming">Upcoming services</TabsTrigger>
          <TabsTrigger value="past">Past services</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <Table className="">
            <TableCaption>A list of upcoming services</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead className="text-nowrap">Fasting code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[100px]">Bible reading</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((item: Services) => ( 
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item.date}</TableCell>
                  <TableCell>{item.fastingCode}</TableCell>
                  <TableCell>{item.description.en}</TableCell>
                  <TableCell>{item.bibleReadings.en}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="past">
          <Table>
            <TableCaption>A list of past services</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </main>
  )
}
