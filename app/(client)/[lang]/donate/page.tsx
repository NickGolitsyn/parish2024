import { Button } from '@/components/ui/button'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { Metadata } from 'next';
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Donate",
};

export default async function page({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { page } = await getDictionary(lang)
  return (
    <main className="text-sm sm:text-base py-24 px-5 max-w-screen-md mx-auto flex flex-col items-center">
      <h1 className='text-2xl font-bold mb-2'>{page.donate.title}</h1>
      <p className='text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <Button asChild className='mt-3'>
        <Link href="https://www.paypal.com/" target='_blank'>{page.donate.title}</Link>
      </Button>
    </main>
  )
}
