import { iBlogCategoryWithPostExceprtsData } from '@/types/graphcms-api'
import { callGraphCMS } from '@/lib/graphcms-api'
import narrowType from '@/lib/narrow-type'

/**
 * Get cards for home page. Async
 */
export const getBlogCategoryWithPostExcerpts = async (
  slug: string
): Promise<iBlogCategoryWithPostExceprtsData> => {
  /** GraphQL query to be executed */
  const query = `
    query {
      blogCategory(where: {slug: "${slug}"}) {
        name
        slug
        description {
          html
        }
        posts {
          author {
            name
            twitterHandle
            picture {
              height
              width
              url
            }
          }
          coverImage {
            url
            height
            width
          }
          excerpt
          slug
          title
        }
      }
    }
  `

  const response = await callGraphCMS(query)
  /** Return response or throw error if response is undefined OR null */
  if (narrowType<iBlogCategoryWithPostExceprtsData>(response)) return response
  throw new Error('No response from CMS for BlogCategories')
}
