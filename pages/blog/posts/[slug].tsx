import { FC, useState } from 'react'
import Button from '@/components/button'
import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { sanitize as sanitizer } from 'isomorphic-dompurify'
import Copyright from '@/components/copyright'
import Header from '@/components/header'
import PostHeader from '@/components/blog/post-header'
import Constants from '@/lib/consts'
import { iPostWithContent } from '@/types/post'
import { getPostBySlug } from '@/lib/blog/post'
import { getAllPostSlugs } from '@/lib/blog/post-slugs'
import { PostData, PostSlugs } from '@/types/graphcms-api'
import getNavigationLinks from '@/lib/navigation-links'
import { NavigationLinks } from '@/types/navigations-links'

const Disqus = dynamic(() => import('@/components/blog/disqus'), {
  loading: () => <p>...</p>,
})

type PostProps = {
  post: iPostWithContent
  navLinks: NavigationLinks
}

const Post: FC<PostProps> = ({ post, navLinks }) => {
  const [showComments, setShowComments] = useState(false)

  const router = useRouter()

  return (
    <>
      <Head>
        <title>
          {post?.title} | {Constants.SITE_NAME}
        </title>
      </Head>
      <Header element="p" navLinks={navLinks} />
      <div className="container mx-auto">
        <div className="my-4">
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
              variant="secondary"
              onClick={() => setShowComments(true)}
              text="Show Comments"
            />
          )}
          <Copyright />
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const navLinks = await getNavigationLinks()

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
      navLinks,
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
