import Image from 'next/image'
import { FC } from 'react'
import { m } from 'framer-motion'
import { iPicture } from '@/types/graphcms-api'
import PostTitle from './post-title'

type PostHeaderProps = {
  /** Title of the blog post excerpt */
  title: string
  /** Slug of the full blog post */
  slug: string
  /** Hero image for the blog post */
  coverImage?: iPicture
  /** Excerpt */
  isExcerpt?: boolean
}

const PostHeader: FC<PostHeaderProps> = ({
  title,
  slug,
  coverImage,
  isExcerpt,
}) => (
  <m.div className="relative" layoutId={`post-${slug}`}>
    <PostTitle slug={slug} title={title} />
    {coverImage && (
      /** Display if there is an image supplied */
      <m.div
        className="overflow-hidden"
        layoutId={`post-img-${slug}`}
        style={{ aspectRatio: '16 / 7' }}
      >
        <Image
          src={coverImage.url}
          layout="responsive"
          height={coverImage.height}
          width={coverImage.width}
          className={`${isExcerpt ? 'rounded-t-lg' : ''}`}
        />
      </m.div>
    )}
  </m.div>
)

export default PostHeader
