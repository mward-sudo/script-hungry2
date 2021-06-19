import { HomePageCards } from '@/types/graphcms-api'
import { callGraphCMS } from '@/lib/graphcms-api'
import narrowType from '@/lib/narrow-type'

/**
 * Get cards for home page. Async
 */
export const getHomePageCards = async (): Promise<HomePageCards> => {
  /** GraphQL query to be executed */
  const query = `
    query {
      homePageCards(stage: PUBLISHED) {
        image {
          height
          width
          url
          caption
        }
        text
        url
      }
    }
  `

  const response = await callGraphCMS(query)
  /** Return response or throw error if response is undefined OR null */
  if (narrowType<HomePageCards>(response)) return response
  throw new Error('No response from CMS for HomePageCards')
}
