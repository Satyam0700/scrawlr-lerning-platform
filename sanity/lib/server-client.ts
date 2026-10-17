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
 * Provides caching and Next.js revalidation tag support.
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
  return serverClient.fetch<T>(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  })
}
