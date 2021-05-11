import { FC } from 'react'
import Link from 'next/link'
import iFeaturedImage from '@/types/featured-image'
import PostHeaderImage from './post-header-image'

type featuredImageBoxProps = {
  featuredImage?: iFeaturedImage
  url: string
  customClass: string
}

const FeaturedImageBox: FC<featuredImageBoxProps> = ({
  featuredImage,
  url,
  customClass,
}) =>
  featuredImage ? (
    <div className={customClass}>
      <Link href={url}>
        <a>
          <PostHeaderImage
            url={featuredImage?.node.sourceUrl}
            height={featuredImage?.node.mediaDetails?.height}
            width={featuredImage?.node.mediaDetails?.width}
          />
        </a>
      </Link>
    </div>
  ) : (
    <></>
  )

export default FeaturedImageBox
