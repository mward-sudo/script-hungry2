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

type ExcerptHeaderProps = {
  /** Title of post */
  title: string
  /** Hero image for post */
  image?: iPicture
  /* Slug */
  slug: string
  /** Image hover effect */
  hoverImageEffect?: boolean
}

/** Component that renders a Blog Post header */
const ExcerptHeader: FC<ExcerptHeaderProps> = ({
  title,
  image,
  slug,
  hoverImageEffect = true,
}) => {
  return (
    <>
      <motion.div className="relative" layoutId={`post-${slug}`}>
        {image && (
          /** Display if there is an image supplied */
          <motion.div
            className="-mx-4 -mt-4 rounded-t-lg overflow-hidden"
            layoutId={`post-img-${slug}`}
          >
            <motion.div variants={hoverImageEffect ? hoverImgVariant : {}}>
              <Image
                src={image.url}
                height={image.height}
                width={image.width}
                objectFit="cover"
                objectPosition="top"
              />
            </motion.div>
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

export default ExcerptHeader
