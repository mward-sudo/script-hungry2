import { FC } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const HomeIntro: FC = () => {
  const useStyles = makeStyles(() => ({
    intro: {
      background: 'red',
      height: '100vh',
      textAlign: 'center',
    },
  }))
  const classes = useStyles()

  return (
    <section className={classes.intro}>
      <Typography variant="h4" component="h3">Michael Ward Portfolio &amp; Blog</Typography>
    </section>
  )
}

export default HomeIntro
