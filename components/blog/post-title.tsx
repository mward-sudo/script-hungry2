import { m } from 'framer-motion'
import { FC } from 'react'

type PostTitleProps = {
  slug: string
  title: string
}

const PostTitle: FC<PostTitleProps> = ({ slug, title }) => (
  <div
    className="-rotate-1"
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 10,
      maxWidth: '30em',
    }}
  >
    <m.div layoutId={`post-title-${slug}`}>
      <h1
        className="text-center font-display bg-red-600 italic text-shadow
      text-xl md:text-3xl font-semibold text-white px-4 py-2 transform-gpu -rotate-2"
      >
        <span className="block transform-gpu rotate-2">{title}</span>
      </h1>
    </m.div>
  </div>
)

export default PostTitle
