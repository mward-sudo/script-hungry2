import { CallGraphCMS } from '@/types/graphcms-api'
import Constants from './consts'

export const postsPerPage = Constants.POSTS_PER_PAGE

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
    throw new Error('Could not fetch data from GraphCMS!')
  }
}
