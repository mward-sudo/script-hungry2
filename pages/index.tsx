import { FC } from 'react'
import {
  Container, Box, Grid, Card, CardContent, CardMedia, CardActionArea, Button,
} from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/header'
import HomeIntro from '../components/home-intro'
import HomeMediaCard from '../components/home-media-card'
import Copyright from '../components/copyright'
import Constants from '../lib/consts'

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  card: {
    fontSize: 12,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardContent: {
    padding: '.5em',
  },
}))

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
              <Grid item xs={6} sm={3}>
                <HomeMediaCard href="/blog/" imgSrc="https://scripthungry.cloudaccess.host/wp-content/uploads/2021/04/img_0058-scaled.jpg" imgWidth={2560} imgHeight={1440} btnText="Blog" />
              </Grid>
              <Grid item xs={6} sm={3}>
                <HomeMediaCard href="/portfolio/" imgSrc="https://scripthungry.cloudaccess.host/wp-content/uploads/2021/04/img_0055.jpg" imgWidth={1199} imgHeight={674} btnText="Portfolio" />
              </Grid>
              <Grid item xs={6} sm={3}>
                <HomeMediaCard href="https://github.com/mward-sudo" imgSrc="https://scripthungry.cloudaccess.host/wp-content/uploads/2021/04/img_0057.jpg" imgWidth={1917} imgHeight={1078} btnText="Github" />
              </Grid>
              <Grid item xs={6} sm={3}>
                <HomeMediaCard href="https://www.linkedin.com/in/michael-ward-ba003622" imgSrc="https://scripthungry.cloudaccess.host/wp-content/uploads/2021/04/img_0056-scaled.jpg" imgWidth={2560} imgHeight={1440} btnText="LinkedIn" />
              </Grid>

            </Grid>
          </div>
          <Copyright />
        </Box>
      </Container>
    </>
  )
}

export default Index
