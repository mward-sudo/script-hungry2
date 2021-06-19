import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { motion, Variants } from 'framer-motion'
import { fadeInAndUp } from '@/animations/animations'
import styles from './media-card.module.css'

const hoverImgVariant: Variants = {
  initial: {
    transform: 'scale(1)',
  },
  hover: {
    transform: 'scale(1.05)',
  },
  tap: {
    transform: 'scale(0.95)',
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
  return (
    <motion.div variants={fadeInAndUp()}>
      <Link href={link}>
        <a className={styles.mediaCard}>
          <motion.div
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            variants={hoverImgVariant}
          >
            <motion.div className={styles.img}>
              <Image
                layout="responsive"
                src={image}
                height={imageHeight}
                width={imageWidth}
                alt={imageAlt}
              />
            </motion.div>
            <div className={styles.text}>{linkText} &gt;</div>
          </motion.div>
        </a>
      </Link>
    </motion.div>
  )
}

export default HomeMediaCard
