import { useState } from 'react'
import { Box, Container, Button } from '@material-ui/core'
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { sanitize as sanitizer } from 'isomorphic-dompurify'
import Copyright from '@/components/copyright'
import Header from '@/components/header'
import PostHeader from '@/components/blog/post-header'
import Constants from '@/lib/consts'
import { iPostWithContent } from '@/types/post'
import { getAllPostSlugs, getPostBySlug } from '@/lib/graphcms-api'
import { PostData, PostSlugs } from '@/types/graphcms-api'

const Disqus = dynamic(() => import('@/components/blog/disqus'), {
  loading: () => <p>...</p>,
})

type PostProps = {
  post: iPostWithContent
}

const Post: InferGetStaticPropsType<typeof getStaticProps> = ({
  post,
}: PostProps) => {
  const [showComments, setShowComments] = useState(false)

  const router = useRouter()

  return (
    <>
      <Head>
        <title>
          {post?.title} | {Constants.SITE_NAME}
        </title>
      </Head>
      <Header element="p" />
      <Container maxWidth="sm">
        <Box my={4}>
          <PostHeader
            title={post?.title}
            // image={post?.featuredImage}
            author={post?.author}
          />
          <div
            dangerouslySetInnerHTML={{ __html: sanitizer(post?.content?.html) }}
          />
          {showComments ? (
            <Disqus
              key={post?.slug}
              pageTitle={post?.title}
              pageID={post?.slug}
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let slug = ''
  if (params !== undefined && params.slug !== undefined) {
    if (typeof params.slug === 'string') {
      slug = params.slug
    } else if (typeof params.slug === 'object') {
      // eslint-disable-next-line prefer-destructuring
      slug = params.slug[0]
    }
  }

  const post: PostData = await getPostBySlug(slug)
  return {
    props: {
      post: post.data.post,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postSlugs: PostSlugs | null = await getAllPostSlugs()
  const paths: Array<string> =
    postSlugs !== null
      ? postSlugs?.data.posts.map((post) => `/blog/posts/${post.slug}`)
      : []

  return {
    paths,
    fallback: true,
  }
}

export default Post
