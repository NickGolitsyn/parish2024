import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const redirectParam = url.searchParams.get('redirect')
  let redirectPath = '/'
  if (redirectParam) {
    redirectPath = redirectParam
  }

  (await draftMode()).disable()
  redirect(redirectPath)
}
