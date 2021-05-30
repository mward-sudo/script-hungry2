import { PostSlugs } from '@/types/graphcms-api'
import { callGraphCMS } from '@/lib/graphcms-api'
import narrowType from '@/lib/narrow-type'

/** Gets post slugs for all first 1000 published posts */
export const getAllPostSlugs = async (): Promise<PostSlugs> => {
  /** GraphQL query to be executed */
  const query = `
    query Slugs {
      posts(stage: PUBLISHED, orderBy: date_DESC, first: 1000) {
        slug
      }
    }    
  `

  const response = await callGraphCMS(query)

  /** Return response or throw error if response is undefined OR null */
  if (narrowType<PostSlugs>(response)) return response
  throw new Error('No response from CMS for getAllPostSlugs')
}
