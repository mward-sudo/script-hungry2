import { iShowcaseCards } from '@/types/graphcms-api'
import { callGraphCMS } from '@/lib/graphcms-api'
import narrowType from '@/lib/narrow-type'

/**
 * Get cards for showcase. Async
 */
export const getShowcaseCards = async (): Promise<iShowcaseCards> => {
  /** GraphQL query to be executed */
  const query = `
    query {
      showcaseCards(stage: PUBLISHED) {
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
  if (narrowType<iShowcaseCards>(response)) return response
  throw new Error('No response from CMS for ShowcaseCards')
}
