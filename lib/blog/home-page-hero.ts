import { HomePageHero, HomePageHeroes } from '@/types/graphcms-api'
import { callGraphCMS } from '@/lib/graphcms-api'
import narrowType from '@/lib/narrow-type'

/**
 * Get paginated posts for index page. Async
 */
export const getHomePageHero = async (): Promise<HomePageHero> => {
  /** GraphQL query to be executed */
  const query = `
    query {
      homePageHeroes(last: 1, orderBy: createdAt_DESC, stage: PUBLISHED) {
        backgroundImage {
          url
          width
          height
        }
        lineOneText
        lineTwoText
      }
    }  
  `

  const response = await callGraphCMS(query)
  /** Return response or throw error if response is undefined OR null */
  if (narrowType<HomePageHeroes>(response))
    return response.data.homePageHeroes[0]
  throw new Error('No response from CMS for HomePageHeroes')
}
