import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const lang = searchParams.get('lang') || 'en'

  // Check the secret and next parameters
  // This should match the secret in your Sanity Presentation Tool config
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  // Enable Draft Mode by setting the cookie
  draftMode().enable()

  // Redirect to the path from the query parameter, or default to home
  const redirectPath = slug || `/${lang}/sunday-school`
  redirect(redirectPath)
}
