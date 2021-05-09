import { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { Box, Container } from '@material-ui/core'
import { motion } from 'framer-motion'
import { getTotalPostsNumber, getIndexPosts } from '../../../lib/graphcms-api'
import Constants from '../../../lib/consts'
import { PostExcerpt } from '../../../types/graphcms-api'
import Header from '../../../components/header'
import { PostExcerpt as PostExcerptComponent } from '../../../components/post-excerpt'
import Copyright from '../../../components/copyright'
import { stagger } from '../../../animations/animations'
import Pagination from '../../../components/pagination'

type BlogIndexPageProps = {
  indexPosts: PostExcerpt[]
  pagesTotal: number
  currentPage: number
}

const BlogIndexPage: FC<BlogIndexPageProps> = ({
  indexPosts,
  pagesTotal,
  currentPage,
}) => {
  const nextDisabled = currentPage === pagesTotal
  return (
    <>
      <>
        <Head>
          <title>{Constants.SITE_NAME}</title>
        </Head>
        <Header />
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
              currentPage={currentPage}
              totalPages={pagesTotal}
              nextDisabled={nextDisabled}
            />
            <Copyright />
          </Box>
        </Container>
      </>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPosts = await getTotalPostsNumber()
  const totalPages = Math.ceil(totalPosts / Constants.POSTS_PER_PAGE)

  const paths = []

  /**
   * Start from page 2, so we don't replicate /blog
   * which is page 1
   */
  for (let page = 2; page <= totalPages; page += 1) {
    paths.push({ params: { page: page.toString() } })
  }

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Type wrangling
  let pageNo: number
  if (params?.page === typeof 'array') {
    pageNo = parseInt(params.page[0], 10)
  } else if (params?.page === typeof 'number') {
    pageNo = parseInt(params.page, 10)
  } else {
    pageNo = 2
  }

  const indexPosts = await getIndexPosts(pageNo)
  const postsTotal = indexPosts?.data.postsConnection.aggregate.count || 1
  const pagesTotal = Math.ceil(postsTotal / Constants.POSTS_PER_PAGE)

  return {
    props: {
      indexPosts: indexPosts?.data.posts,
      pagesTotal,
      currentPage: pageNo,
    },
  }
}

export default BlogIndexPage
