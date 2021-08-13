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
import PostLayout from '@/components/blog/layout'
import PostExcerpt from '@/components/blog/post-excerpt'
import Constants from '@/lib/consts'
import { fadeIn } from '@/animations/animations'

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
  navLinks: iNavigationLinks
}

const Post: FC<PostProps> = ({ post, navLinks }) => {
  const [showComments, setShowComments] = useState(false)

  const router = useRouter()

  useEffect(() => {
    hljs.initHighlighting()
  }, [])

  return (
    <>
      <PostLayout
        pageTitle={`${post?.title} | ${Constants.SITE_NAME}`}
        navLinks={navLinks}
        restrainWidth
      >
        <div className="-m-5 p5 mb-0 md:m-0 md:p-0">
          <PostExcerpt
            title={post?.title}
            author={post?.author}
            excerpt={post?.excerpt}
            slug={post?.slug}
            coverImage={post?.coverImage}
            hoverImageEffect={false}
          />
        </div>

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
      </PostLayout>
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
