import { FC } from 'react'
import Image from 'next/image'
import { iPicture } from '@/types/graphcms-api'
import { motion } from 'framer-motion'

type PostHeaderProps = {
  /** Title of post */
  title: string
  /** Slug */
  slug: string
  /** Hero image for post */
  image?: iPicture
}

/** Component that renders a Blog Post header */
const PostHeader: FC<PostHeaderProps> = ({ title, slug, image }) => {
  return (
    <>
      <div className="h-96" />
      <motion.div
        className="absolute top-16 left-0 right-0 h-96 overflow-hidden z-10"
        layoutId={`post-${slug}`}
      >
        {image && (
          /** Display if there is an image supplied */
          <motion.div
            className="overflow-hidden -mx-4 -mt-4"
            layoutId={`post-img-${slug}`}
          >
            <Image
              src={image.url}
              layout="fill"
              objectFit="cover"
              objectPosition="top"
            />
          </motion.div>
        )}
        <div className="absolute top-0 h-full w-full grid text-center justify-center content-center">
          <motion.h1
            className="text-center font-display bg-red-600 italic text-shadow transform -rotate-1
            text-3xl font-semibold text-white px-4 py-2"
            layoutId={`post-title-${slug}`}
          >
            <span className="transform rotate-1 block">{title}</span>
          </motion.h1>
        </div>
      </motion.div>
    </>
  )
}

export default PostHeader
