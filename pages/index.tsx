import { FC } from 'react'
import { Container, Box, Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Head from 'next/head'
import { motion } from 'framer-motion'
import Header from '@/components/header'
import HomeIntro from '@/components/home/intro'
import Copyright from '@/components/copyright'
import Constants from '@/lib/consts'
import { stagger } from '@/animations/animations'
import { NavigationLinks } from '@/types/navigations-links'
import { GetStaticProps } from 'next'
import getNavigationLinks from '@/lib/navigation-links'
import HomeMediaCard from '@/components/home/media-card'
import { HomePageCards, HomePageHero } from '@/types/graphcms-api'
import { getHomePageHero } from '@/lib/blog/home-page-hero'
import { getHomePageCards } from '@/lib/blog/home-page-cards'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
)

type IndexPropTypes = {
  navLinks: NavigationLinks
  homePageHero: HomePageHero
  homePageCards: HomePageCards
}

const Index: FC<IndexPropTypes> = ({
  navLinks,
  homePageHero,
  homePageCards,
}) => {
  const classes = useStyles()

  return (
    <>
      <Head>
        <title>{Constants.SITE_NAME}</title>
      </Head>
      <Header navLinks={navLinks} />
      <HomeIntro homePageHero={homePageHero} />
      <Container maxWidth="lg">
        <Box my={4}>
          <motion.div variants={stagger()} className={classes.root}>
            <Grid container spacing={3}>
              {homePageCards.data.homePageCards.map((card) => (
                <Grid item xs={6} sm={3} key={card.url}>
                  <HomeMediaCard
                    image={card.image.url}
                    imageHeight={card.image.height}
                    imageWidth={card.image.width}
                    imageAlt={card.image.caption}
                    link={card.url}
                    linkText={card.text}
                    key={card.url}
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

export const getStaticProps: GetStaticProps = async () => {
  const navLinks = await getNavigationLinks()
  const homePageHero = await getHomePageHero()
  const homePageCards = await getHomePageCards()

  return {
    props: { navLinks, homePageHero, homePageCards },
  }
}

export default Index
