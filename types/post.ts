import iAuthor from './author'

export default interface iPost {
  title: string
  excerpt: string
  slug: string
  date: string
  author: iAuthor
  coverImage?: {
    url: string
    height: number
    width: number
  }
}

export interface iPostWithContent extends iPost {
  content: {
    html: string
  }
}
