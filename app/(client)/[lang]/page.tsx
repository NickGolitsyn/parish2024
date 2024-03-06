import Image from "next/image";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import HomepageCarousel from "@/components/homepageCarousel";
import { Home } from "@/typings";
import cross from "@/public/cross.png"

export default async function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { page } = await getDictionary(lang);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-36 mx-auto max-w-2xl">
      <div className="text-center pb-10">
        <h1 className="font-semibold sm:text-xl px-5" dangerouslySetInnerHTML={{ __html: page.home.title }} />
        <h2 className="font-semibold text-xs sm:text-base pt-5" dangerouslySetInnerHTML={{ __html: page.home.subtitle }} />
      </div>
      <div className="max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <HomepageCarousel />
      </div>
      <div className="mx-auto max-w-2xl py-4 sm:py-10 lg:py-14 flex flex-col items-center">
        <Image 
          src={cross} 
          alt={"Cross"}
          width={'100'}
          height={'100'}
          className="max-h-32 sm:max-h-full w-auto"
        />
        <div className="text-center">
          <p
            className="mt-6 text-sm sm:text-lg px-5 leading-8 text-gray-600"
            dangerouslySetInnerHTML={{
              __html: page.home.description.replace(/<Link/g, '<a').replace(/<\/Link>/g, '</a>'),
            }}
          />
        </div>
      </div>
    </main>
  );
}