import { Author } from './graphcms-api'

export default interface iPostExcerpt {
  title: string
  excerpt: string
  coverImage?: {
    url: string
    height: number
    width: number
  }
  author: Author
}
