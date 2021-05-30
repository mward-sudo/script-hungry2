import { PostData } from '@/types/graphcms-api'
import { callGraphCMS } from '@/lib/graphcms-api'
import narrowType from '@/lib/narrow-type'

/**
 * Gets data for a single blog post, referenced by its' slug. Async
 */
export const getPostBySlug = async (slug: string): Promise<PostData> => {
  /** GraphQL query to be executed */
  const query = `
    query PostQuery {
      post(where: {slug: "${slug}"}, stage: PUBLISHED) {
        author {
          name
        }
        content {
          html
        }
        date
        excerpt
        slug
        title
      }
    }  
  `

  /** GraphQL JSON response */
  const response = await callGraphCMS(query)

  /** Return response or throw error if response is undefined OR null */
  if (narrowType<PostData>(response)) return response
  throw new Error('No response from CMS for getPostBySlug')
}
