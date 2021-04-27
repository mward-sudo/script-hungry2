import { FC } from 'react'
import { Container, Box, Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Head from 'next/head'
import Header from '../components/header'
import HomeIntro from '../components/home-intro'
import HomeMediaCard from '../components/home-media-card'
import Copyright from '../components/copyright'
import Constants from '../lib/consts'

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
              <Grid item xs={6} sm={3}>
                <HomeMediaCard
                  href="/blog/"
                  imgSrc="https://scripthungry.cloudaccess.host/wp-content/uploads/2021/04/img_0058-scaled.jpg"
                  imgWidth={2560}
                  imgHeight={1440}
                  btnText="Blog"
                  key="/blog/"
                  delayLength={0.5}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <HomeMediaCard
                  href="/portfolio/"
                  imgSrc="https://scripthungry.cloudaccess.host/wp-content/uploads/2021/04/img_0055.jpg"
                  imgWidth={1199}
                  imgHeight={674}
                  btnText="Portfolio"
                  key="/portfolio/"
                  delayLength={0.7}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <HomeMediaCard
                  href="https://github.com/mward-sudo"
                  imgSrc="https://scripthungry.cloudaccess.host/wp-content/uploads/2021/04/0981F9B0-84D5-4987-95B4-08592290985C.png"
                  imgWidth={1917}
                  imgHeight={1078}
                  btnText="Github"
                  key="github"
                  delayLength={0.9}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <HomeMediaCard
                  href="https://www.linkedin.com/in/michael-ward-ba003622"
                  imgSrc="https://scripthungry.cloudaccess.host/wp-content/uploads/2021/04/img_0056-scaled.jpg"
                  imgWidth={2560}
                  imgHeight={1440}
                  btnText="LinkedIn"
                  key="linkedin"
                  delayLength={1.1}
                />
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
