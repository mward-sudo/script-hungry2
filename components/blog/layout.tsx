import { FC } from 'react'
import Head from 'next/head'
import Copyright from '@/components/copyright'
import Header from '@/components/header'
import 'highlight.js/styles/dark.css'
import { iNavigationLinks } from '@/types/graphcms-api'

type PostLayoutProps = {
  pageTitle: string
  navLinks: iNavigationLinks
  restrainWidth?: boolean
}

const PostLayout: FC<PostLayoutProps> = ({
  pageTitle,
  navLinks,
  restrainWidth = false,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header element="p" navLinks={navLinks} />
      <div className={`container mx-auto ${restrainWidth && 'max-w-4xl'}`}>
        <div className="m-4">
          {children}
          <Copyright />
        </div>
      </div>
    </>
  )
}

export default PostLayout
