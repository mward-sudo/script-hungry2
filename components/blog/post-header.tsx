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
  /** Image hover effect */
  hoverImageEffect?: boolean
}

/** Component that renders a Blog Post header */
const PostHeader: FC<PostHeaderProps> = ({
  title,
  image,
  hoverImageEffect = true,
}) => {
  return (
    <>
      <motion.div>
        <h1
          className="text-center font-display bg-red-600 italic text-shadow transform -rotate-1
            text-3xl font-semibold text-white z-10 relative pt-8 -mt-8 -mx-6 px-6 pb-4"
        >
          <span className="transform rotate-1 block">{title}</span>
        </h1>
        {image && (
          /** Display if there is an image supplied */
          <div className="overflow-hidden -mx-4 -mt-4">
            <motion.div variants={hoverImageEffect ? hoverImgVariant : {}}>
              <Image
                src={image.url}
                height={image.height}
                width={image.width}
                layout="responsive"
              />
            </motion.div>
          </div>
        )}
      </motion.div>
    </>
  )
}

export default PostHeader
