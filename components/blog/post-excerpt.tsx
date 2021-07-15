import { FC } from 'react'
import Button from '@/components/button'
import { sanitize as sanitizer } from 'isomorphic-dompurify'
import { motion } from 'framer-motion'
import iFeaturedImage from '@/types/featured-image'
import { fadeInAndUp } from '@/animations/animations'
import { Author } from '@/types/graphcms-api'
import PostHeader from './post-header'
import styles from './post-excerpt.module.css'

type PostExcerptProps = {
  /** Title of the blog post excerpt */
  title: string
  /** Blog post excerpt text */
  excerpt: string
  /** Slug of the full blog post */
  slug: string
  /** Hero image for the blog post */
  featuredImage?: iFeaturedImage
  /** Author of the blog post */
  author: Author
}

/** Component to display an excerpt of a blog post */
export const PostExcerpt: FC<PostExcerptProps> = ({
  title,
  excerpt,
  slug,
  featuredImage,
  author,
}) => {
  const url = `/blog/posts/${slug}`

  return (
    <motion.div variants={fadeInAndUp()}>
      <div className="my-20">
        <PostHeader
          title={title}
          image={featuredImage}
          link={url}
          author={author}
        />
        <div
          className={`${styles.blogPost} text-base`}
          dangerouslySetInnerHTML={{ __html: sanitizer(excerpt) }}
        />

        <Button variant="secondary" text="Read more…" url={url} />
      </div>
    </motion.div>
  )
}

export default PostExcerpt
