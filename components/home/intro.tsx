import { FC } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { fadeInAndUp, stagger } from '@/animations/animations'

/** Component that renders the home page hero section */
const HomeIntro: FC = () => {
  /** Component styles */
  const useStyles = makeStyles(() => ({
    intro: {
      position: 'relative',
      maxHeight: '60vh',
      backgroundColor: 'black',
      overflow: 'hidden',
    },
    gridContainer: {
      position: 'absolute',
      top: 0,
      height: '100%',
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'auto',
      textAlign: 'center',
      justifyContent: 'center',
      alignContent: 'center',
    },
    heading: {
      transform: 'rotate(-5deg)',
      zIndex: 1,
      fontFamily: '"Proza Libre", sans-serif',
      fontStyle: 'italic',
      color: 'rgba(255,255,255,0.9)',
      textShadow: '1px 1px 1px rgba(0,0,0,0.7)',
      lineHeight: 1,
      backgroundColor: 'red',
      margin: 0,
      padding: '0.4em',
    },
    unrotate: {
      transform: 'rotate(5deg)',
    },
    bigger: {
      display: 'block',
      fontSize: '8vw',
    },
    smaller: {
      display: 'block',
      fontSize: '3vw',
      fontStyle: 'normal',
      fontWeight: 400,
    },
  }))
  const classes = useStyles()

  return (
    <section className={classes.intro}>
      <Image
        src="https://scripthungry.cloudaccess.host/wp-content/uploads/2021/04/123A0A22-8417-43E5-AE1F-27B2D300B35B.jpeg"
        width="2560"
        height="1707"
        layout="responsive"
      />

      <motion.div variants={stagger()} className={classes.gridContainer}>
        <motion.div
          variants={fadeInAndUp({ initialYOffset: 400, duration: 1 })}
        >
          <Typography variant="h4" component="h3" className={classes.heading}>
            <motion.div
              variants={fadeInAndUp({ initialYOffset: 400, duration: 1 })}
            >
              <div className={classes.unrotate}>
                <span className={classes.smaller}>Michael Ward presents</span>
                <span className={classes.bigger}>scriptHungry</span>
              </div>
            </motion.div>
          </Typography>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HomeIntro
