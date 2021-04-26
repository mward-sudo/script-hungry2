import { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

type PostHeaderProps = {
  title: string
}

const PostHeader: FC<PostHeaderProps> = ({ title }) => {
  const useStyles = makeStyles(() => ({
    heading: {
      display: 'inline-block',
      fontFamily: '"Proza Libre", sans-serif',
      fontStyle: 'italic',
      backgroundColor: 'red',
      color: '#fff',
      textShadow: '1px 1px 1px rgba(0,0,0,0.7)',
      transform: 'rotate(-2deg)',
    },
    headingSpan: {
      display: 'inline-block',
      transform: 'rotate(2deg)',
    },
  }))
  const classes = useStyles()

  return (
    <Typography variant="h5" component="h1">
      <span className={classes.heading}>
        <span className={classes.headingSpan}>{title}</span>
      </span>
    </Typography>
  )
}

export default PostHeader
