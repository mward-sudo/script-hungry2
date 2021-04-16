import { FC } from "react";
import Image from "next/image";

type PostHeaderImageProps = {
  url: string;
  height: number;
  width: number;
};

const PostHeaderImage: FC<PostHeaderImageProps> = ({ url, height, width }) => {
  return (
    <>
      <Image src={url} height={height} width={width} />
    </>
  );
};

export default PostHeaderImage;
