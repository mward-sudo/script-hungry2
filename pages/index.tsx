import { FC } from 'react'
import {
  Container, Box, Link,
} from '@material-ui/core'
import Head from 'next/head'
import Header from '../components/header'
import HomeIntro from '../components/home-intro'
import Copyright from '../components/copyright'
import Constants from '../lib/consts'

const Index: FC = () => (
  <>
    <Head>
      <title>{Constants.SITE_NAME}</title>
    </Head>
    <Header />
    <HomeIntro />
    <Container maxWidth="sm">
      <Box my={4}>
        <p><Link href="/blog"><a>Go to Blog</a></Link></p>
        <Copyright />
      </Box>
    </Container>
  </>
)

export default Index
