import { Container, Box } from '@material-ui/core'
import { InferGetStaticPropsType, GetStaticProps } from 'next'
import Head from 'next/head'
import { getAllPostsForHome } from '../../lib/api'
import Header from '../../components/header'
import PostExcerptList from '../../components/post-excerpt-list'
import Copyright from '../../components/copyright'
import Constants from '../../lib/consts'
import { edges as PostEdges } from '../../types/posts'

type IndexProps = {
  allPosts: {
    edges: PostEdges[]
  }
}

const Index: InferGetStaticPropsType<typeof getStaticProps> = ({ allPosts }: IndexProps) => (
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
  const allPosts:IndexProps = await getAllPostsForHome()
  return {
    props: { allPosts },
    revalidate: 60,
  }
}

export default Index
