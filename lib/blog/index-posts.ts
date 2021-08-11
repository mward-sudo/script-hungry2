import { iIndexPostsData } from '@/types/graphcms-api'
import { postsPerPage, callGraphCMS } from '@/lib/graphcms-api'
import narrowType from '@/lib/narrow-type'

/**
 * Get paginated posts for index page. Async
 */
export const getIndexPosts = async (pageNo = 1): Promise<iIndexPostsData> => {
  /** GraphQL query to be executed */
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
          picture {
            url(transformation: {image: {resize: {height: 100, width: 100}}})
            height
            width
          }
        }
        excerpt
        slug
        title
        content {
          html
        }
        coverImage {
          url
          height
          width
        }
      }
      postsConnection(stage: PUBLISHED) {
        aggregate {
          count
        }
      }
    }
  `

  console.log(query)

  const response = await callGraphCMS(query)
  /** Return response or throw error if response is undefined OR null */
  if (narrowType<iIndexPostsData>(response)) return response
  throw new Error('No response from CMS for IndexPostsData')
}
