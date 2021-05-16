import { PostSlugs } from '@/types/graphcms-api'
import { callGraphCMS } from '@/lib/graphcms-api'

/**
 * Type check for PostSlugs, required to convert from unknown type.
 * @param {any} post
 * @returns {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isPostSlugs = (slugs: any): slugs is PostSlugs => {
  // Checks for the required data structure
  return slugs && 'data' in slugs && 'posts' in slugs.data
}
/**
 * Asynchronous function returns the number total number of
 * blog posts
 * @returns {Promise<PostSlugs | null>}
 */

export const getAllPostSlugs = async (): Promise<PostSlugs | null> => {
  /**
   * @constant {string} query GraphQL query to execute
   */
  const query = `
    query Slugs {
      posts(stage: PUBLISHED, orderBy: date_DESC, first: 1000) {
        slug
      }
    }    
  `

  /**
   * @constant {unknown} response GraphQL JSON response
   */
  const response = await callGraphCMS(query)
  // Type check the response
  if (response && isPostSlugs(response)) {
    // The post data
    return response
  }
  // Fallback if the query didn't work or returned an unexpected shape
  return null
}
