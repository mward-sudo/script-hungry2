import { FC } from 'react'
import Image from 'next/image'
import { sanitize as sanitizer } from 'isomorphic-dompurify'
import { motion } from 'framer-motion'
import { iAuthor, iPicture } from '@/types/graphcms-api'
import ExcerptHeader from './excerpt-header'

type PostExcerptProps = {
  /** Title of the blog post excerpt */
  title: string
  /** Blog post excerpt text */
  excerpt: string
  /** Slug of the full blog post */
  slug: string
  /** Hero image for the blog post */
  coverImage?: iPicture
  /** Author of the blog post */
  author: iAuthor
  /** Hover image effect */
  hoverImageEffect?: boolean
}

/** Component to display an excerpt of a blog post */
const PostExcerpt: FC<PostExcerptProps> = ({
  title,
  excerpt,
  slug,
  coverImage,
  author,
  hoverImageEffect = true,
}) => (
  <motion.div
    className="bg-white mb-4 p-4 rounded-lg drop-shadow-xl border-2 border-gray-200 hover:bg-gray-50"
    layoutId={`post-box-${slug}`}
  >
    <motion.div initial="initial" whileHover="hover" whileTap="tap">
      <ExcerptHeader
        title={title}
        image={coverImage}
        hoverImageEffect={hoverImageEffect}
        slug={slug}
      />
      <motion.div
        className="text-base mt-10 mb-4"
        layoutId={`post-excerpt-${slug}`}
        dangerouslySetInnerHTML={{ __html: sanitizer(excerpt) }}
      />
      <motion.div
        className="flex items-center m-0 justify-end"
        layoutId={`post-author-${slug}`}
      >
        <motion.div
          className="mr-4 font-extralight"
          layoutId={`post-author-name-${slug}`}
        >
          {author?.name}
        </motion.div>
        <motion.div layoutId={`post-author-image-${slug}`}>
          {author?.picture && (
            <Image
              src={author?.picture.url}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  </motion.div>
)

export default PostExcerpt
