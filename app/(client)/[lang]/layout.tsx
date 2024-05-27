import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import '@/app/globals.css'
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Locale, i18n } from "@/i18n.config";
import { Analytics } from '@vercel/analytics/react';

const playfair = Playfair_Display({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Parish | Home page",
//   description: "Romanian Parish of Holy Martyr Philothea & Saint Bede the Venerable | Discover the Romanian Christian Orthodox parish in Gillingham, Norfolk, serving the Romanian community with spiritual guidance, services, and events. Learn more about our parish and how to get involved.",
//   keywords: ["",],
//   alternates: {
//     canonical: 'https://parohianorwich.org/en',
//     languages: {
//       'en': 'https://www.parohianorwich.org/en',
//       'ro': 'https://www.parohianorwich.org/ro',
//     },
//   },
// };

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { lang } = params;
  const title = {
    en: 'Parohia Norwich',
    ro: 'Parohia Norwich'
  };
  const description = {
    en: 'Romanian Orthodox Parish of Holy Martyr Philothea & Saint Bede the Venerable | Discover the Romanian Christian Orthodox parish in Gillingham, Norfolk, serving the Romanian community. Learn more about our parish.',
    ro: 'Parohia Ortodoxă Română Sfânta Muceniță Filoteea și Sfântul Beda Venerabilul | Descoperiți parohia creștin-ortodoxă română din Gillingham, Norfolk, care servește comunitatea românească. Aflați mai multe despre parohia noastră.'
  };
  const keywords = ["Romanian orthodox church", "Biserica românească Romanian ortodoxă", "Christian Orthodox church", "Norwich", "Beccles", "Norfolk", "Suffolk", "East Anglia", "NR parohie", "parohia", "parish", "Saint Bede the Venerable", "Sfântul Cuv Beda", "Sfânta Muceniță Filoteea", "Sfânta Muceniță Filofteea", "Holy Martyr Philothea", "services", "slujbe preot român comunitate românească"]

  return {
    title: lang === 'ro' ? title.ro : title.en,
    description: lang === 'ro' ? description.ro : description.en,
    keywords,
  };
}

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang}>
      <body className={`${playfair.className} flex flex-col min-h-screen`}>
        <div className="flex-grow">
          <Navbar lang={params.lang} />
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#fdff70] to-[#ff9c67] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          {/* <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#fdff70] to-[#ff9c67] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div> */}
          {children}
        </div>
        <Analytics />
        <Footer lang={params.lang} />
      </body>
    </html>
  );
}
