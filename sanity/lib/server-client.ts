import { draftMode } from 'next/headers'
import { client, previewClient } from './client'

/**
 * Server-only function to get the appropriate Sanity client
 * based on draft mode status. Only use this in Server Components.
 */
export async function getClient() {
  const isDraft = (await draftMode()).isEnabled
  return isDraft ? previewClient : client
}
