import { FC } from 'react'
import Head from 'next/head'
import Copyright from '@/components/copyright'
import Header from '@/components/header'
import Constants from '@/lib/consts'
import { iPostWithContent } from '@/types/post'
import { NavigationLinks } from '@/types/navigations-links'
// import 'highlight.js/styles/default.css'
import 'highlight.js/styles/dark.css'

type PostProps = {
  post: iPostWithContent
  navLinks: NavigationLinks
}

const PostLayout: FC<PostProps> = ({ post, navLinks, children }) => {
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
          {children}
          <Copyright />
        </div>
      </div>
    </>
  )
}

export default PostLayout
