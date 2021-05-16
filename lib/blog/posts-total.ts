import { PostsTotal } from '@/types/graphcms-api'
import { callGraphCMS } from '@/lib/graphcms-api'

/**
 * Type check for PostsTotal, required to convert from unknown type.
 * @param {any} postsTotal
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isPostsTotal = (postsTotal: any): postsTotal is PostsTotal => {
  // Checks for the required data structure
  return (
    'data' in postsTotal &&
    'postsConnection' in postsTotal.data &&
    'aggregate' in postsTotal.data.postsConnection &&
    'count' in postsTotal.data.postsConnection.aggregate
  )
}
/**
 * Asynchronous function returns the number total number of
 * blog posts
 * @returns {Promise<number>}
 */

export const getTotalPostsNumber = async (): Promise<number> => {
  /**
   * @constant {string} query GraphQL query to return the total number of posts
   */
  const query = `
    query MyQuery {
      postsConnection(stage: PUBLISHED) {
        aggregate {
          count
        }
      }
    }
  `

  /**
   * @constant {unknown} response GraphQL JSON response
   */
  const response = await callGraphCMS(query)
  // Type check the response
  if (response && isPostsTotal(response)) {
    // The value of the total number of blog posts
    return response.data.postsConnection.aggregate.count
  }
  // Fallback if the query didn't work or returned an unexpected shape
  return 0
}
