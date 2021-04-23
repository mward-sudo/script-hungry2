import { FC, useState } from 'react'
import { Box, Container, Button } from '@material-ui/core'
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Copyright from '../../../components/copyright'
import Header from '../../../components/header'
import PostHeaderWithImage from '../../../components/post-header-with-image'
import PostHeader from '../../../components/post-header'
import { getAllPostsWithSlug, getPost } from '../../../lib/api'
import Constants from '../../../lib/consts'
import { iPostWithContent } from '../../../types/post'

const Disqus = dynamic(() => import('../../../components/disqus'), {
  loading: () => <p>...</p>,
})

type PostProps = {
  post: iPostWithContent
}

const Post: InferGetStaticPropsType<typeof getStaticProps> = ({ post }: PostProps) => {
  const [showComments, setShowComments] = useState(false)

  const router = useRouter()

  return (
    <>
      <Head>
        <title>
          {post?.title}
          {' '}
          |
          {' '}
          {Constants.SITE_NAME}
        </title>
      </Head>
      <Header element="p" />
      <Container maxWidth="sm">
        <Box my={4}>
          {post?.featuredImage ? (
            <PostHeaderWithImage
              title={post?.title}
              image={post?.featuredImage}
            />
          ) : (
            <PostHeader title={post?.title} />
          )}
          <div dangerouslySetInnerHTML={{ __html: post?.content }} />
          {showComments ? (
            <Disqus
              key={post?.id}
              pageTitle={post?.title}
              pageID={post?.id}
              pageURL={`https://scripthungry.com${router.asPath}`}
            />
          ) : (
            <Button
              variant="outlined"
              onClick={() => setShowComments(true)}
              fullWidth
              color="primary"
            >
              Show Comments
            </Button>
          )}
          <Copyright />
        </Box>
      </Container>
    </>
  )
}

export const getStaticProps:GetStaticProps = async ({ params }) => {
  const data = await getPost(params?.slug)
  return {
    props: {
      post: data.post,
    },
    revalidate: 60,
  }
}

type nodesType = {
  slug: string
}
type postNodes = {
  node: nodesType
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts.edges.map(({ node }: postNodes) => (`/blog/posts/${node?.slug}` || [])),
    fallback: true,
  }
}

export default Post