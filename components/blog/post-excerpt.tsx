import { FC } from 'react'
import Image from 'next/image'
import { sanitize as sanitizer } from 'isomorphic-dompurify'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeInAndUp } from '@/animations/animations'
import { iAuthor, iPicture } from '@/types/graphcms-api'
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
  coverImage?: iPicture
  /** Author of the blog post */
  author: iAuthor
}

/** Component to display an excerpt of a blog post */
export const PostExcerpt: FC<PostExcerptProps> = ({
  title,
  excerpt,
  slug,
  coverImage,
  author,
}) => {
  const url = `/blog/posts/${slug}`

  return (
    <Link href={url}>
      <a>
        <motion.div
          variants={fadeInAndUp()}
          className="bg-white mb-4 p-4 rounded-lg drop-shadow-xl border-2 border-gray-200 overflow-hidden hover:bg-gray-50"
        >
          <motion.div initial="initial" whileHover="hover" whileTap="tap">
            <PostHeader title={title} image={coverImage} />
            <div
              className={`${styles.blogPost} text-base mt-10 mb-4`}
              dangerouslySetInnerHTML={{ __html: sanitizer(excerpt) }}
            />
            <div className="flex items-center m-0 justify-end">
              <div className="mr-4 font-extralight">{author.name}</div>
              <Image
                src={author.picture.url}
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </a>
    </Link>
  )
}

export default PostExcerpt
