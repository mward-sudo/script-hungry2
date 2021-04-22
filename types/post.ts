import iFeaturedImage from './featured-image'
import iAuthor from './author'

export default interface iPost {
  id?: string;
  title: string;
  excerpt: string;
  content?: string;
  slug: string;
  date: string;
  featuredImage: iFeaturedImage;
  author: {
    node: iAuthor;
  }
}
