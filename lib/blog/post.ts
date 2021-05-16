import { PostData } from '@/types/graphcms-api'
import { callGraphCMS } from '@/lib/graphcms-api'

/**
 * Type check for Post, required to convert from unknown type.
 * @param {any} post
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isPost = (post: any): post is PostData => {
  // Checks for the required data structure
  return post && 'data' in post && 'post' in post.data
}
/**
 * Asynchronous function returns the number total number of
 * blog posts
 * @returns {Promise<PostData | null>}
 */

export const getPostBySlug = async (slug: string): Promise<PostData | null> => {
  /**
   * @constant {string} query GraphQL query to execute
   */
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

  /**
   * @constant {unknown} response GraphQL JSON response
   */
  const response = await callGraphCMS(query)
  // Type check the response
  if (response && isPost(response)) {
    // The post data
    return response
  }
  // Fallback if the query didn't work or returned an unexpected shape
  return null
}
