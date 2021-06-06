import { FC } from 'react'
import { Container, Box, Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Head from 'next/head'
import { motion } from 'framer-motion'
import Header from '@/components/header'
import HomeIntro from '@/components/home/intro'
import Copyright from '@/components/copyright'
import Constants from '@/lib/consts'
import { cards } from '@/data/cards'
import { stagger } from '@/animations/animations'
import { NavigationLinks } from '@/types/navigations-links'
import { GetStaticProps } from 'next'
import getNavigationLinks from '@/lib/navigation-links'
import HomeMediaCard from '@/components/home/media-card'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
)

type IndexPropTypes = {
  navLinks: NavigationLinks
}

const Index: FC<IndexPropTypes> = ({ navLinks }) => {
  const classes = useStyles()

  return (
    <>
      <Head>
        <title>{Constants.SITE_NAME}</title>
      </Head>
      <Header navLinks={navLinks} />
      <HomeIntro />
      <Container maxWidth="lg">
        <Box my={4}>
          <motion.div variants={stagger()} className={classes.root}>
            <Grid container spacing={3}>
              {cards.map((card) => (
                <Grid item xs={6} sm={3} key={card.href}>
                  <HomeMediaCard
                    image={card.imgSrc}
                    imageHeight={card.imgHeight}
                    imageWidth={card.imgWidth}
                    link={card.href}
                    linkText={card.btnText}
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

export const getStaticProps: GetStaticProps = async () => {
  const navLinks = await getNavigationLinks()

  return {
    props: { navLinks },
  }
}

export default Index
