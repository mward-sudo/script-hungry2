import { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Link from 'next/link'
import iFeaturedImage from '@root/types/featured-image'
import iAuthor from '@root/types/author'
import PostHeaderImage from './post-header-image'

type PostHeaderProps = {
  title: string
  image?: iFeaturedImage
  link?: string
  author?: iAuthor
}

const PostHeader: FC<PostHeaderProps> = ({ title, image, link, author }) => {
  const useStyles = makeStyles(() => ({
    heading: {
      textAlign: 'center',
      marginBottom: 0,
      display: 'inline-block',
      fontFamily: '"Proza Libre", sans-serif',
      backgroundColor: 'red',
      fontStyle: 'italic',
      textShadow: '1px 1px 1px rgba(0,0,0,0.7)',
      transform: 'rotate(-2deg)',
    },
    headingLink: {
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
      paddingLeft: '0.5em',
    },
  }))
  const classes = useStyles()

  return (
    <>
      <Typography variant="h5" component="h1">
        <span className={classes.heading}>
          {link ? (
            <Link href={link}>
              <a className={classes.headingLink}>{title}</a>
            </Link>
          ) : (
            <span className={classes.headingLink}>{title}</span>
          )}
        </span>
        {author && <div className={classes.byLine}> {author.name}</div>}
      </Typography>
      {image && (
        <PostHeaderImage
          url={image.node.sourceUrl}
          height={image.node.mediaDetails?.height}
          width={image.node.mediaDetails?.width}
          link={link}
        />
      )}
    </>
  )
}

export default PostHeader
