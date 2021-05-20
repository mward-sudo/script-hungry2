import { PostsTotal } from '@/types/graphcms-api'
import { callGraphCMS } from '@/lib/graphcms-api'
import narrowType from '@/lib/narrow-type'

/**
 * Gets total number of published blog posts
 * @async
 */
export const getTotalPostsNumber = async (): Promise<number> => {
  /** GraphQL query to be executed */
  const query = `
    query MyQuery {
      postsConnection(stage: PUBLISHED) {
        aggregate {
          count
        }
      }
    }
  `

  /** GraphQL JSON response */
  const response = await callGraphCMS(query)
  /** Return total or throw error if response is undefined OR null */
  if (narrowType<PostsTotal>(response)) {
    return response.data.postsConnection.aggregate.count
  }
  throw new Error('No response from CMS for getTotalPostsNumber')
}
