import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type PostHeaderImageProps = {
  url: string
  height: number
  width: number
  link?: string
}

const PostHeaderImage: FC<PostHeaderImageProps> = ({
  url,
  height,
  width,
  link,
}) => {
  const image = (
    <Image src={url} height={height} width={width} layout="responsive" />
  )
  return (
    <>
      {link ? (
        <Link href={link}>
          <a>{image}</a>
        </Link>
      ) : (
        image
      )}
    </>
  )
}

export default PostHeaderImage
