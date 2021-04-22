import { FC } from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PostHeaderImage from './post-header-image'
import iFeaturedImage from '../types/featured-image'

type PostHeaderWithImageProps = {
  title: string
  image: iFeaturedImage
}

const PostHeaderWithImage: FC<PostHeaderWithImageProps> = ({ title, image }) => {
  const useStyles = makeStyles(() => ({
    positionRoot: {
      position: 'relative',
    },
    heading: {
      position: 'absolute',
      width: '50%',
      top: '1em',
      left: '1em',
      zIndex: 100,
      transform: 'rotate(-2.5deg)',
    },
    headingSpan: {
      backgroundColor: 'rgba(255,0,0,0.75)',
      color: '#fff',
      lineHeight: '1.4',
    },
  }))
  const classes = useStyles()

  return (
    <Box className={classes.positionRoot}>
      <Typography variant="h5" component="h1" className={classes.heading}>
        <span className={classes.headingSpan}>{title}</span>
      </Typography>
      <PostHeaderImage
        url={image.node.sourceUrl}
        height={image.node.mediaDetails?.height}
        width={image.node.mediaDetails?.width}
      />
    </Box>
  )
}

export default PostHeaderWithImage
