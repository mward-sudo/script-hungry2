import Image from 'next/image'
import Link from 'next/link'
import useDimensions from 'react-cool-dimensions'
import { FC } from 'react'
import { m, Variants } from 'framer-motion'
import { fadeInAndUp } from '@/animations/animations'

const hoverImgVariant: Variants = {
  initial: {
    transform: 'scale(1)',
  },
  hover: {
    transform: 'scale(1.1)',
  },
  tap: {
    transform: 'scale(1.05)',
  },
}

type MediaCardProps = {
  /** URL */
  link: string
  /** Text for media card link */
  linkText: string
  /** Image url */
  image: string
  /** Image width in pixels, used for ratio calculation */
  imageWidth: number
  /** Image height in pixels, used for ratio calculation */
  imageHeight: number
  /** Alternative text for image */
  imageAlt?: string
}

const HomeMediaCard: FC<MediaCardProps> = ({
  link,
  linkText,
  image,
  imageWidth,
  imageHeight,
  imageAlt = '',
}) => {
  const { observe, width } = useDimensions<HTMLDivElement | null>()

  return (
    <m.div variants={fadeInAndUp()}>
      <Link href={link}>
        <a className="no-underline uppercase text-base">
          <m.div
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="border-2 border-solid border-gray-200 rounded-lg overflow-hidden drop-shadow-sm bg-white"
          >
            <div style={{ overflow: 'hidden' }}>
              <m.div variants={hoverImgVariant} ref={observe}>
                <Image
                  layout="responsive"
                  src={image}
                  height={imageHeight}
                  width={imageWidth}
                  alt={imageAlt}
                  sizes={
                    width !== undefined ? `${Math.round(width)}px` : '100vw'
                  }
                  priority
                />
              </m.div>
            </div>
            <div className="text-black text-center no-underline py-1 px-4">
              {linkText} &gt;
            </div>
          </m.div>
        </a>
      </Link>
    </m.div>
  )
}

export default HomeMediaCard
