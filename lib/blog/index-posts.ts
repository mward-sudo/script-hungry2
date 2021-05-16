import { IndexPostsData } from '@/types/graphcms-api'
import { postsPerPage, callGraphCMS } from '@/lib/graphcms-api'

/**
 * Type check for IndexPosts, required to convert from unknown type.
 * @param {any} indexPosts
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isIndexPosts = (indexPosts: any): indexPosts is IndexPostsData => {
  // Checks for the required data structure
  return (
    indexPosts &&
    'data' in indexPosts &&
    'posts' in indexPosts.data &&
    'postsConnection' in indexPosts.data &&
    'aggregate' in indexPosts.data.postsConnection &&
    'count' in indexPosts.data.postsConnection.aggregate
  )
}
/**
 * Asynchronous function returns the number total number of
 * blog posts
 * @returns {Promise<IndexPostsData | null>}
 */

export const getIndexPosts = async (
  pageNo = 1
): Promise<IndexPostsData | null> => {
  /**
   * @constant {string} query GraphQL query to return
   */
  const query = `
    query IndexPostsQuery {
      posts(
        first: ${postsPerPage}, 
        stage: PUBLISHED, 
        skip: ${(pageNo - 1) * postsPerPage},
        orderBy: date_DESC
      ) {
        author {
          name
        }
        excerpt
        slug
        title
      }
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
  if (response && isIndexPosts(response)) {
    // The value of the total number of blog posts
    return response
  }
  // Fallback if the query didn't work or returned an unexpected shape
  return null
}
