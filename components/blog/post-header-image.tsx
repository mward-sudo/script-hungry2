import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type PostHeaderImageProps = {
  /** URL of image */
  url: string
  /** Height of image, used for ratio calculation */
  height: number
  /** Width of image, used for ratio caluclation */
  width: number
  /** URL for image link */
  link?: string
}

/** Component for post header hero image */
const PostHeaderImage: FC<PostHeaderImageProps> = ({
  url,
  height,
  width,
  link,
}) => {
  /** Image JSX code */
  const image = (
    <Image src={url} height={height} width={width} layout="responsive" />
  )
  return (
    <>
      {link ? (
        /** Image with link */
        <Link href={link}>
          <a>{image}</a>
        </Link>
      ) : (
        /** Image with no link */
        image
      )}
    </>
  )
}

export default PostHeaderImage
