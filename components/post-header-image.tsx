import { FC } from 'react'
import Image from 'next/image'

type PostHeaderImageProps = {
  url: string
  height: number
  width: number
};

const PostHeaderImage: FC<PostHeaderImageProps> = ({ url, height, width }) => (
  <>
    <Image src={url} height={height} width={width} layout="responsive" />
  </>
)

export default PostHeaderImage
