import iAuthor from './author'

export default interface iPost {
  title: string
  excerpt: string
  slug: string
  date: string
  author: iAuthor
}

export interface iPostWithContent extends iPost {
  content: {
    html: string
  }
}
