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
                <Card className={classes.card}>
                  <Link href="/blog/" passHref>
                    <CardActionArea>
                      <CardMedia>
                        <Image src="https://scripthungry.cloudaccess.host/wp-content/uploads/2021/04/img_0058-scaled.jpg" width="2560" height="1440" layout="responsive" />
                      </CardMedia>
                      <CardContent className={classes.cardContent}>
                        <Button variant="text">Blog &gt;</Button>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card className={classes.card}>
                  <Link href="/portfolio/" passHref>
                    <CardActionArea>
                      <CardMedia>
                        <Image src="https://scripthungry.cloudaccess.host/wp-content/uploads/2021/04/img_0055.jpg" width="1199" height="674" layout="responsive" />
                      </CardMedia>
                      <CardContent className={classes.cardContent}>
                        <Button variant="text">Portfolio &gt;</Button>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card className={classes.card}>
                  <CardActionArea href="https://github.com/mward-sudo">
                    <CardMedia>
                      <Image src="https://scripthungry.cloudaccess.host/wp-content/uploads/2021/04/img_0057.jpg" width="1917" height="1078" layout="responsive" />
                    </CardMedia>
                    <CardContent className={classes.cardContent}>
                      <Button variant="text">Github &gt;</Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card className={classes.card}>
                  <CardActionArea href="https://www.linkedin.com/in/michael-ward-ba003622">
                    <CardMedia>
                      <Image src="https://scripthungry.cloudaccess.host/wp-content/uploads/2021/04/img_0056-scaled.jpg" width="2560" height="1440" layout="responsive" />
                    </CardMedia>
                    <CardContent className={classes.cardContent}>
                      <Button variant="text">LinkedIn &gt;</Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
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
