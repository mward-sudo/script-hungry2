import { Container, Box } from '@material-ui/core'
import { InferGetStaticPropsType, GetStaticProps } from 'next'
import Head from 'next/head'
import { getAllPostsForHome } from '../../lib/api'
import Header from '../../components/header'
import PostExcerptList from '../../components/post-excerpt-list'
import Copyright from '../../components/copyright'
import Constants from '../../lib/consts'

const Index: InferGetStaticPropsType<typeof getStaticProps> = ({ allPosts }) => (
  <>
    <Head>
      <title>{Constants.SITE_NAME}</title>
    </Head>
    <Header />
    <Container maxWidth="sm">
      <Box my={4}>
        <PostExcerptList posts={allPosts} />
        <Copyright />
      </Box>
    </Container>
  </>
)

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPostsForHome()
  return {
    props: { allPosts },
    revalidate: 60,
  }
}

export default Index
