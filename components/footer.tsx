import { Locale } from "@/i18n.config"
import { getDictionary } from "@/lib/dictionary"

export default async function Footer({ lang }: { lang: Locale }) {
  const { footer } = await getDictionary(lang)
  return (
    <footer className="bg-yellow-50 px-24 py-5">
      <p className="text-sm text-center" dangerouslySetInnerHTML={{ __html: footer.title }} />
    </footer>
  )
}
