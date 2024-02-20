import { Locale } from "@/i18n.config"
import { getDictionary } from "@/lib/dictionary"

export default async function Footer({ lang }: { lang: Locale }) {
  const { footer } = await getDictionary(lang)
  return (
    <footer className="bg-yellow-50 py-5 px-5">
      <p className="sm:text-sm text-xs max-w-2xl mx-auto text-center" dangerouslySetInnerHTML={{ __html: footer.title }} />
    </footer>
  )
}
