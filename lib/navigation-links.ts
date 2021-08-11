import { callGraphCMS } from '@/lib/graphcms-api'
import { iNavigationLinks } from '@/types/graphcms-api'
import narrowType from './narrow-type'

/**
 * Get navigation links from CMS.
 */
const getNavigationLinks = async (): Promise<iNavigationLinks> => {
  /** GraphQL query to be executed */
  const query = `{
    navigationLinks(stage: PUBLISHED) {
      url
      linkText
    }
  }`

  /** GraphQL JSON response */
  const response = await callGraphCMS(query)

  /** Return response or throw error if response is undefined OR null */
  if (narrowType<iNavigationLinks>(response)) return response
  throw new Error('No response from CMS for NavigationLinks')
}

export default getNavigationLinks
