import React, { FC, useState, useEffect, useContext } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import Head from 'next/head'
import Button from '@/components/button'
import { iNavigationLinks } from '@/types/graphcms-api'
import getNavigationLinks from '@/lib/navigation-links'
import Loader from '@/components/loader'
import Header from '@/components/header'
import Constants from '@/lib/consts'
// import 'highlight.js/styles/default.css'
import 'highlight.js/styles/github-dark.css'
import config from '@/react-bricks/config'
import {
  cleanPage,
  fetchPage,
  fetchPages,
  PageViewer,
  ReactBricksContext,
  types,
} from 'react-bricks'
import ErrorNoKeys from '@/components/errorNoKeys'
import ErrorNoHomePage from '@/components/errorNoHomePage'

hljs.registerLanguage('javascript', javascript)

const Disqus = dynamic(() => import('@/components/blog/disqus'), {
  ssr: false,
  loading: function Disqus() {
    return (
      <div className="text-center">
        <Loader />
      </div>
    )
  },
})

type PostProps = {
  navLinks: iNavigationLinks
  page: types.Page
  error: string
}

const Post: FC<PostProps> = ({ navLinks, page, error }) => {
  const [showComments, setShowComments] = useState(false)

  const router = useRouter()

  useEffect(() => {
    hljs.configure({ languages: ['javascript'] })
    hljs.highlightAll()
  }, [])

  // Clean the received content
  // Removes unknown or not allowed bricks
  const { pageTypes, bricks } = useContext(ReactBricksContext)

  const pageOk = page ? cleanPage(page, pageTypes, bricks) : null

  const url = `https://scripthungry.com/blog/post/${page?.slug}`

  return (
    <>
      <Head>
        <title>{page?.meta.title}</title>
        <meta name="description" content={page?.meta.description} />
        <link rel="canonical" href={url} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twcard" />
        {/* <meta
          name="twitter:creator"
          content={page?.author.firstName}
          key="twhandle"
        /> */}
        <meta property="og:url" content={url} key="ogurl" />
        <meta
          property="og:image"
          content={page?.meta.featuredImage}
          key="ogimage"
        />
        <meta
          property="og:site_name"
          content={Constants.SITE_NAME}
          key="ogsitename"
        />
        <meta property="og:title" content={page?.meta.title} key="ogtitle" />
        <meta
          property="og:description"
          content={page?.meta.description}
          key="ogdesc"
        />
      </Head>

      <Header element="p" navLinks={navLinks} />

      {pageOk && (
        <>
          <PageViewer page={pageOk} />
          <div className="max-w-3xl mx-auto">
            <div className="my-16">
              {showComments && page?.meta.title ? (
                <Disqus
                  key={page?.slug}
                  pageTitle={page?.meta.title}
                  pageID={page?.slug}
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
      )}
      {error === 'NOKEYS' && <ErrorNoKeys />}
      {error === 'NOPAGE' && <ErrorNoHomePage />}
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let reactBricksProps: Record<string, any>

  let slug = ''
  if (params?.slug) {
    if (Array.isArray(params.slug)) {
      slug = params.slug[0]
    } else if (typeof params.slug === 'string') {
      slug = params.slug
    }
  }

  if (!config.apiKey) {
    reactBricksProps = { error: 'NOKEYS' }
  }
  try {
    const page = await fetchPage(slug, config.apiKey)
    reactBricksProps = { page }
  } catch {
    reactBricksProps = { error: 'NOPAGE' }
  }

  const navLinks = await getNavigationLinks()

  return {
    props: { ...reactBricksProps, navLinks },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await fetchPages(config.apiKey, { type: 'blog post' })
  const paths = pages.map((page) => ({
    params: { slug: page.slug },
  }))

  return {
    paths,
    fallback: true,
  }
}

export default Post
