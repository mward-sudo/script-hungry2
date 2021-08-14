import { iBlogCategoriesData } from '@/types/graphcms-api'
import { callGraphCMS } from '@/lib/graphcms-api'
import narrowType from '@/lib/narrow-type'

/**
 * Get cards for home page. Async
 */
export const getBlogCategories = async (): Promise<iBlogCategoriesData> => {
  /** GraphQL query to be executed */
  const query = `
    query {
      blogCategories(orderBy: name_ASC) {
        slug
        name
        description {
          html
        }
      }
    }
  `

  const response = await callGraphCMS(query)
  /** Return response or throw error if response is undefined OR null */
  if (narrowType<iBlogCategoriesData>(response)) return response
  throw new Error('No response from CMS for BlogCategories')
}
