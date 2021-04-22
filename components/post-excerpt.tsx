import { FC } from 'react'
import Link from 'next/link'
import { Typography, Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import iFeaturedImage from '../types/featured-image'
import FeaturedImageBox from './featured-image-box'

type PostExcerptProps = {
  title: string
  excerpt: string
  slug: string
  featuredImage: iFeaturedImage
}

const PostExcerpt: FC<PostExcerptProps> = ({
  title, excerpt, slug, featuredImage,
}) => {
  const useStyles = makeStyles(() => ({
    blogPost: {
      margin: '5em 0',
    },
    postHeading: {
      marginBottom: 0,
    },
    postHeadingLink: {
      fontSize: 24,
      fontWeight: 600,
      color: 'red',
      textDecoration: 'none',
    },
    featuredImage: {
      marginBottom: '1em',
    },
    body: {
      fontSize: 16,
      '& p': {
        marginTop: 0,
      },
    },
  }))
  const classes = useStyles()

  const url = `/posts/${slug}`

  return (
    <Box className={classes.blogPost}>
      <Typography variant="h5" component="h2" className={classes.postHeading}>
        <Link href={url}>
          <a className={classes.postHeadingLink}>{title}</a>
        </Link>
      </Typography>
      <FeaturedImageBox featuredImage={featuredImage} url={url} customClass={classes.featuredImage} />
      <div
        className={classes.body}
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />

      <Link href={url} passHref>
        <Button variant="outlined" color="primary">
          Read more…
        </Button>
      </Link>
    </Box>
  )
}

export default PostExcerpt
