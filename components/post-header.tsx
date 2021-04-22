import { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

type PostHeaderProps = {
  title: string
}

const PostHeader: FC<PostHeaderProps> = ({ title }) => {
  const useStyles = makeStyles(() => ({
    headingSpan: {
      color: '#fff',
      backgroundColor: 'red',
    },
  }))
  const classes = useStyles()

  return (
    <Typography variant="h5" component="h1">
      <span className={classes.headingSpan}>{title}</span>
    </Typography>
  )
}

export default PostHeader
