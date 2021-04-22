import iFeaturedImage from './featured-image'
import iAuthor from './author'

export default interface iPost {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  featuredImage: iFeaturedImage;
  author: {
    node: iAuthor;
  }
}
