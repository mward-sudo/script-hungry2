import { Container, Box } from '@material-ui/core'
import { InferGetStaticPropsType, GetStaticProps } from 'next'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { getAllPostsForHome } from '../../lib/api'
import Header from '../../components/header'
import Copyright from '../../components/copyright'
import Constants from '../../lib/consts'
import { edges as PostEdges } from '../../types/posts'
import { stagger } from '../../animations/animations'
import PostExcerpt from '../../components/post-excerpt'

type IndexProps = {
  allPosts: {
    edges: PostEdges[]
  }
}

const Index: InferGetStaticPropsType<typeof getStaticProps> = ({
  allPosts,
}: IndexProps) => (
  <>
    <Head>
      <title>{Constants.SITE_NAME}</title>
    </Head>
    <Header />
    <Container maxWidth="sm">
      <Box my={4}>
        <motion.div variants={stagger({ staggerTime: 1 })}>
          {allPosts.edges.map((post: PostEdges) => {
            const { title, excerpt, slug, featuredImage, author } = post.node
            return (
              <PostExcerpt
                key={slug}
                title={title}
                excerpt={excerpt}
                slug={slug}
                featuredImage={featuredImage}
                author={author.node}
              />
            )
          })}
        </motion.div>
        <Copyright />
      </Box>
    </Container>
  </>
)

export const getStaticProps: GetStaticProps = async () => {
  const allPosts: IndexProps = await getAllPostsForHome()
  return {
    props: { allPosts },
    revalidate: 60,
  }
}

export default Index
