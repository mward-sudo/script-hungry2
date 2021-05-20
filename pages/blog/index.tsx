import { Container, Box } from '@material-ui/core'
import { InferGetStaticPropsType, GetStaticProps } from 'next'
import Head from 'next/head'
import { motion } from 'framer-motion'
import Header from '@/components/header'
import { PostExcerpt as PostExcerptComponent } from '@/components/blog/post-excerpt'
import Copyright from '@/components/copyright'
import Constants from '@/lib/consts'
import { stagger } from '@/animations/animations'
import { getIndexPosts } from '@/lib/blog/index-posts'
import { PostExcerpt } from '@/types/graphcms-api'
import Pagination from '@/components/blog/pagination'
import getNavigationLinks from '@/lib/navigation-links'
import { NavigationLinks } from '@/types/navigations-links'

type IndexProps = {
  indexPosts: PostExcerpt[]
  pagesTotal: number
  navLinks: NavigationLinks
}

const Index: InferGetStaticPropsType<typeof getStaticProps> = ({
  indexPosts,
  pagesTotal,
  navLinks,
}: IndexProps) => {
  const nextDisabled = pagesTotal <= 1

  return (
    <>
      <Head>
        <title>{Constants.SITE_NAME}</title>
      </Head>
      <Header navLinks={navLinks} />
      <Container maxWidth="sm">
        <Box my={4}>
          <motion.div variants={stagger({ staggerTime: 1 })}>
            {indexPosts.map((post: PostExcerpt) => {
              const { title, excerpt, slug, author } = post
              return (
                <PostExcerptComponent
                  key={slug}
                  title={title}
                  excerpt={excerpt}
                  slug={slug}
                  author={author}
                />
              )
            })}
          </motion.div>
          <Pagination
            currentPage={1}
            totalPages={pagesTotal}
            nextDisabled={nextDisabled}
            prevDisabled
          />
          <Copyright />
        </Box>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const navLinks = await getNavigationLinks()
  const indexPostsData = await getIndexPosts(1)
  const postsTotal: number = indexPostsData?.data?.postsConnection?.aggregate
    ?.count
    ? indexPostsData.data.postsConnection.aggregate.count
    : 1

  const pagesTotal = Math.ceil(postsTotal / Constants.POSTS_PER_PAGE)
  const indexPosts = indexPostsData?.data.posts
  return {
    props: { indexPosts, pagesTotal, navLinks },
    revalidate: 60,
  }
}

export default Index
