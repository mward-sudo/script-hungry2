import { FC } from 'react'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { iPicture } from '@/types/graphcms-api'

const hoverImgVariant: Variants = {
  initial: {
    transform: 'scale(1)',
  },
  hover: {
    transform: 'scale(1.05)',
  },
  tap: {
    transform: 'scale(1)',
  },
}

type PostHeaderProps = {
  /** Title of post */
  title: string
  /** Hero image for post */
  image?: iPicture
}

/** Component that renders a Blog Post header */
const PostHeader: FC<PostHeaderProps> = ({ title, image }) => {
  return (
    <>
      <h1
        className="text-center font-display bg-red-600 italic text-shadow transform rotate-1
          text-3xl font-semibold text-white -mt-8 pt-8 -mx-6 px-6 pb-4 mb-4 z-10 relative"
      >
        <span className="transform -rotate-1 block">{title}</span>
      </h1>
      {image && (
        /** Display if there is an image supplied */
        <div className="overflow-hidden -mx-4 -mt-8">
          <motion.div variants={hoverImgVariant}>
            <Image
              src={image.url}
              height={image.height}
              width={image.width}
              layout="responsive"
            />
          </motion.div>
        </div>
      )}
    </>
  )
}

export default PostHeader
