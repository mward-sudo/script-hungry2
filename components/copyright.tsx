import { FC } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const Copyright: FC = () => {
  const useStyles = makeStyles(() => ({
    copyright: {
      marginTop: '3em',
      fontSize: 10,
    },
  }))
  const classes = useStyles()

  return (
    <Typography
      variant="body2"
      className={classes.copyright}
      color="textSecondary"
      align="center"
    >
      &copy; Copyright Michael Ward
      {' '}
      {new Date().getFullYear()}
    </Typography>
  )
}
export default Copyright
