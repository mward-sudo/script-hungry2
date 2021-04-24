import { FC } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Image from 'next/image'

const HomeIntro: FC = () => {
  const useStyles = makeStyles(() => ({
    intro: {
      backgroundColor: 'black',
      position: 'relative',
      textAlign: 'center',
      overflow: 'hidden',
      maxHeight: '60vh',
    },
    text: {
      borderRadius: 2,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) rotate(-5deg)',
      zIndex: 1,
      fontFamily: '"Proza Libre", sans-serif',
      fontStyle: 'italic',
      color: 'rgba(255,255,255,0.9)',
      fontSize: 48,
      textShadow: '2px 2px 2px rgba(0,0,0,0.7)',
      lineHeight: 1,
      backgroundColor: 'red',
      margin: 0,
      padding: 0,
    },
    unrotate: {
      transform: 'rotate(6.5deg)',
    },
    smaller: {
      fontSize: 24,
      fontStyle: 'normal',
      fontWeight: 400,
    },
  }))
  const classes = useStyles()

  return (
    <section className={classes.intro}>
      <Typography variant="h4" component="h3" className={classes.text}>
        <div className={classes.unrotate}>
          <span className={classes.smaller}>Michael Ward&rsquo;s</span>
          <br />
          scriptHungry
        </div>
      </Typography>
      <Image src="https://scripthungry.cloudaccess.host/wp-content/uploads/2021/04/123A0A22-8417-43E5-AE1F-27B2D300B35B.jpeg" width="2560" height="1707" layout="responsive" />
    </section>
  )
}

export default HomeIntro
