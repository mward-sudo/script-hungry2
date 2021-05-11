import {
  CallGraphCMS,
  IndexPostsData,
  PostData,
  PostsTotal,
  PostSlugs,
} from '@/types/graphcms-api'
import Constants from './consts'

const postsPerPage = Constants.POSTS_PER_PAGE

/**
 * Sends query string parameter to GraphCMS enpoint and returns
 * the results of the query as JSON.
 * @param {string} query string GraphQL Query string
 * @returns {Promise<unknown>} JSON result of query
 */
export const callGraphCMS: CallGraphCMS = async (query) => {
  const fetchUrl = process.env.GRAPHCMS_ENDPOINT || ''

  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  }

  try {
    const data = await fetch(fetchUrl, fetchOptions).then((response) =>
      response.json()
    )
    return data
  } catch (error) {
    throw new Error('Could not fetch data from Contentful!')
  }
}

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
