import { FC } from 'react'
import { Container, Box, Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Head from 'next/head'
import { motion } from 'framer-motion'
import Header from '@root/components/header'
import HomeIntro from '@root/components/home-intro'
import HomeMediaCard from '@root/components/home-media-card'
import Copyright from '@root/components/copyright'
import Constants from '@root/lib/consts'
import { cards } from '@root/data/cards'
import { stagger } from '@root/animations/animations'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
)

const Index: FC = () => {
  const classes = useStyles()

  return (
    <>
      <Head>
        <title>{Constants.SITE_NAME}</title>
      </Head>
      <Header />
      <HomeIntro />
      <Container maxWidth="lg">
        <Box my={4}>
          <motion.div variants={stagger()} className={classes.root}>
            <Grid container spacing={3}>
              {cards.map((card) => (
                <Grid item xs={6} sm={3} key={card.href}>
                  <HomeMediaCard
                    href={card.href}
                    imgSrc={card.imgSrc}
                    imgWidth={card.imgWidth}
                    imgHeight={card.imgHeight}
                    btnText={card.btnText}
                    key={card.href}
                  />
                </Grid>
              ))}
            </Grid>
          </motion.div>
          <Copyright />
        </Box>
      </Container>
    </>
  )
}

export default Index
