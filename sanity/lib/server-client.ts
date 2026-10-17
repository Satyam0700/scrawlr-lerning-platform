import 'server-only'

import { createClient, type QueryParams } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

const token = process.env.SANITY_API_READ_TOKEN

/**
 * Server-only Sanity client.
 * Configured with private read token and useCdn: false to safely query private datasets
 * without ever leaking credentials or unreleased content to client bundles.
 */
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

/**
 * Type-safe server-side fetch wrapper.
 * In development, disables aggressive caching so updates in Sanity Studio reflect immediately.
 * In production, supports time-based revalidation (default 60s) and tags.
 */
export async function serverSanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
}): Promise<T> {
  const isDev = process.env.NODE_ENV === 'development'

  return serverClient.fetch<T>(query, params, {
    next: {
      revalidate: isDev ? 0 : (revalidate === false ? false : revalidate),
      tags,
    },
    ...(isDev ? { cache: 'no-store' as const } : {}),
  })
}
