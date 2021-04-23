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
      fontSize: 'calc(1em + 3vh)',
      position: 'absolute',
      width: '50%',
      minWidth: '9em',
      top: '.5em',
      left: '.5em',
      zIndex: 100,
      transform: 'rotate(-5deg)',
      textAlign: 'center',
    },
    headingSpan: {
      display: 'inline-block',
      backgroundColor: 'rgba(255,0,0,0.75)',
      color: '#fff',
      lineHeight: '1.4',
    },
    headingReset: {
      display: 'inline-block',
      transform: 'rotate(5deg)',
    },
  }))
  const classes = useStyles()

  return (
    <Box className={classes.positionRoot}>
      <Typography variant="h5" component="h1" className={classes.heading}>
        <span className={classes.headingSpan}>
          <span className={classes.headingReset}>
            {title}
          </span>
        </span>
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
