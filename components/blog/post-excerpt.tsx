import { FC } from 'react'
import Link from 'next/link'
import { Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { sanitize as sanitizer } from 'isomorphic-dompurify'
import { motion } from 'framer-motion'
import iFeaturedImage from '@/types/featured-image'
import { fadeInAndUp } from '@/animations/animations'
import { Author } from '@/types/graphcms-api'
import PostHeader from './post-header'

type PostExcerptProps = {
  /** Title of the blog post excerpt */
  title: string
  /** Blog post excerpt text */
  excerpt: string
  /** Slug of the full blog post */
  slug: string
  /** Hero image for the blog post */
  featuredImage?: iFeaturedImage
  /** Author of the blog post */
  author: Author
}

/** Component to display an excerpt of a blog post */
export const PostExcerpt: FC<PostExcerptProps> = ({
  title,
  excerpt,
  slug,
  featuredImage,
  author,
}) => {
  const useStyles = makeStyles(() => ({
    blogPost: {
      margin: '5em 0',
    },
    body: {
      fontSize: 16,
      '& p': {
        marginTop: 0,
      },
    },
  }))
  const classes = useStyles()

  const url = `/blog/posts/${slug}`

  return (
    <motion.div variants={fadeInAndUp()}>
      <Box className={classes.blogPost}>
        <PostHeader
          title={title}
          image={featuredImage}
          link={url}
          author={author}
        />
        <div
          className={classes.body}
          dangerouslySetInnerHTML={{ __html: sanitizer(excerpt) }}
        />

        <Link href={url} passHref>
          <Button variant="outlined" color="primary">
            Read more…
          </Button>
        </Link>
      </Box>
    </motion.div>
  )
}

export default PostExcerpt
