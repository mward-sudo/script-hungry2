import { callGraphCMS } from '@/lib/graphcms-api'
import { NavigationLinks } from '@/types/navigations-links'
import narrowType from './narrow-type'

/**
 * Get navigation links from CMS.
 * @async
 */
const getNavigationLinks = async (): Promise<NavigationLinks> => {
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
  if (narrowType<NavigationLinks>(response)) return response
  throw new Error('No response from CMS for NavigationLinks')
}

export default getNavigationLinks
