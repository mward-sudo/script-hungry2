import { FC } from 'react'
import Link from 'next/link'
import iFeaturedImage from '@/types/featured-image'
import iAuthor from '@/types/author'
import PostHeaderImage from './post-header-image'

type PostHeaderProps = {
  /** Title of post */
  title: string
  /** Hero image for post */
  image?: iFeaturedImage
  /** Post URL */
  link?: string
  /** Post author */
  author?: iAuthor
}

/** Component that renders a Blog Post header */
const PostHeader: FC<PostHeaderProps> = ({ title, image, link, author }) => (
  <>
    <h1>
      <span className="text-center mb-0 inline-block font-display bg-red-600 italic text-shadow rotate-2">
        {link ? (
          <Link href={link}>
            <a className="inline-block text-3xl font-semibold text-white no-underline rotate-2 font-display">
              {title}
            </a>
          </Link>
        ) : (
          <span className="inline-block text-3xl font-semibold text-white no-underline rotate-2 font-display">
            {title}
          </span>
        )}
      </span>
      {author && (
        <div className="inline-block font-display text-lg text-gray-600 mb-4 pl-2">
          {' '}
          {author.name}
        </div>
      )}
    </h1>
    {image && (
      /** Display if there is an image supplied */
      <PostHeaderImage
        url={image.node.sourceUrl}
        height={image.node.mediaDetails?.height}
        width={image.node.mediaDetails?.width}
        link={link}
      />
    )}
  </>
)

export default PostHeader
