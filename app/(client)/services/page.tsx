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

export default function page() {
  return (
    <main className="p-24">
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
              <TableRow>
                <TableCell className="font-medium">05/05/2024</TableCell>
                <TableCell>f2</TableCell>
                <TableCell>Easter Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet lectus ac massa rhoncus, eleifend laoreet risus interdum. Sed ac urna sit amet mi accumsan malesuada nec nec nibh. Mauris quis felis a ligula sollicitudin porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</TableCell>
                <TableCell>Eph. 6:10-17; Matt. 4:1-11</TableCell>
              </TableRow>
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
