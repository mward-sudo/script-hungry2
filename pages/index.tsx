import { FC } from 'react'
import { Container, Box, Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Head from 'next/head'
import Header from '../components/header'
import HomeIntro from '../components/home-intro'
import HomeMediaCard from '../components/home-media-card'
import Copyright from '../components/copyright'
import Constants from '../lib/consts'
import { cards } from '../data/cards'

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
      <Container maxWidth="sm">
        <Box my={4}>
          <div className={classes.root}>
            <Grid container spacing={3}>
              {cards.map((card, i) => (
                <Grid item xs={6} sm={3}>
                  <HomeMediaCard
                    href={card.href}
                    imgSrc={card.imgSrc}
                    imgWidth={card.imgWidth}
                    imgHeight={card.imgHeight}
                    btnText={card.btnText}
                    key={card.href}
                    delayLength={0.5 + i * 0.2}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
          <Copyright />
        </Box>
      </Container>
    </>
  )
}

export default Index
