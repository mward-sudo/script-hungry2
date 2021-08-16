import React, { FC, useState, useEffect } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { sanitize as sanitizer } from 'isomorphic-dompurify'
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '@/components/button'
import { getPostBySlug } from '@/lib/blog/post'
import { getAllPostSlugs } from '@/lib/blog/post-slugs'
import {
  iNavigationLinks,
  iPost,
  iPostData,
  iPostSlugs,
} from '@/types/graphcms-api'
import getNavigationLinks from '@/lib/navigation-links'
import Loader from '@/components/loader'
import { fadeIn } from '@/animations/animations'
import PostHeader from '@/components/blog/post-header'
import Head from 'next/head'
import Header from '@/components/header'
import Constants from '@/lib/consts'

hljs.registerLanguage('javascript', javascript)

const Disqus = dynamic(() => import('@/components/blog/disqus'), {
  loading: () => (
    <div className="text-center">
      <Loader />
    </div>
  ),
})

type PostProps = {
  post: iPost
  slug: string
  navLinks: iNavigationLinks
}

const Post: FC<PostProps> = ({ post, slug, navLinks }) => {
  const [showComments, setShowComments] = useState(false)

  const router = useRouter()

  useEffect(() => {
    hljs.initHighlighting()
  }, [])

  return (
    <>
      <Head>
        <title>{post?.title}</title>
        <meta name="description" content={post?.excerpt} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta
          name="twitter:creator"
          content={post?.author.twitterHandle}
          key="twhandle"
        />
        <meta
          property="og:url"
          content={`https://scripthungry.com/blog/post/${post?.slug}`}
          key="ogurl"
        />
        <meta
          property="og:image"
          content={post?.coverImage?.url}
          key="ogimage"
        />
        <meta
          property="og:site_name"
          content={Constants.SITE_NAME}
          key="ogsitename"
        />
        <meta property="og:title" content={post?.title} key="ogtitle" />
        <meta property="og:description" content={post?.excerpt} key="ogdesc" />
      </Head>
      <Header element="p" navLinks={navLinks} />

      <PostHeader
        title={post?.title}
        coverImage={post?.coverImage}
        slug={slug}
      />

      <div className="max-w-3xl mx-auto">
        <AnimatePresence>
          <motion.div variants={fadeIn()}>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizer(post?.content?.html),
              }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="my-16">
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
              width="full"
            />
          )}
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

  const post: iPostData = await getPostBySlug(slug)
  return {
    props: {
      post: post?.data.post,
      slug,
      navLinks,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postSlugs: iPostSlugs | null = await getAllPostSlugs()
  const paths: Array<string> =
    postSlugs !== null
      ? postSlugs?.data.posts.map((post) => `/blog/post/${post.slug}`)
      : []

  return {
    paths,
    fallback: true,
  }
}

export default Post
