import { draftMode } from 'next/headers'
import { client, previewClient } from './client'

/**
 * Server-only function to get the appropriate Sanity client
 * based on draft mode status. Only use this in Server Components.
 */
export function getClient() {
  const isDraft = draftMode().isEnabled
  return isDraft ? previewClient : client
}
