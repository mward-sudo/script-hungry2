import iFeaturedImage from './featured-image'
import iAuthor from './author'

export default interface iPost {
  id: string
  title: string
  excerpt: string
  slug: string
  date: string
  featuredImage: iFeaturedImage
  author: {
    node: iAuthor
  }
}

export interface iPostWithContent extends iPost {
  content: string
}
