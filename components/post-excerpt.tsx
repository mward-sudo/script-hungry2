import { FC } from 'react'
import Link from 'next/link'
import { Typography, Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { sanitize as sanitizer } from 'isomorphic-dompurify'
import iFeaturedImage from '../types/featured-image'
import FeaturedImageBox from './featured-image-box'
import iAuthor from '../types/author'

type PostExcerptProps = {
  title: string
  excerpt: string
  slug: string
  featuredImage: iFeaturedImage
  author: iAuthor
}

const PostExcerpt: FC<PostExcerptProps> = ({
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
    postHeading: {
      textAlign: 'center',
      marginBottom: 0,
      display: 'inline-block',
      fontFamily: '"Proza Libre", sans-serif',
      backgroundColor: 'red',
      fontStyle: 'italic',
      textShadow: '1px 1px 1px rgba(0,0,0,0.7)',
      transform: 'rotate(-2deg)',
    },
    postHeadingLink: {
      display: 'inline-block',
      fontSize: 32,
      fontWeight: 600,
      color: 'white',
      textDecoration: 'none',
      transform: 'rotate(2deg)',
    },
    byLine: {
      display: 'inline-block',
      fontFamily: '"Proza Libre", sans-serif',
      fontSize: 18,
      color: '#999',
      marginBottom: '1em',
      paddingRight: '1em',
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

  const url = `/blog/posts/${slug}`

  return (
    <Box className={classes.blogPost}>
      <Typography variant="h5" component="h2">
        <span className={classes.postHeading}>
          <Link href={url}>
            <a className={classes.postHeadingLink}>{title}</a>
          </Link>
        </span>{' '}
        <Typography
          variant="subtitle1"
          component="p"
          className={classes.byLine}
        >
          by {author?.name}
        </Typography>
      </Typography>
      <FeaturedImageBox
        featuredImage={featuredImage}
        url={url}
        customClass={classes.featuredImage}
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
  )
}

export default PostExcerpt
