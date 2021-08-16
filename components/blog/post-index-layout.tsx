import { FC } from 'react'
import Head from 'next/head'
import Copyright from '@/components/copyright'
import Header from '@/components/header'
import { iNavigationLinks } from '@/types/graphcms-api'

type PostIndexLayoutProps = {
  pageTitle: string
  navLinks: iNavigationLinks
}

const PostIndexLayout: FC<PostIndexLayoutProps> = ({
  pageTitle,
  navLinks,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header element="p" navLinks={navLinks} />
      <div className="container mx-auto">
        <div className="m-4">
          {children}
          <Copyright />
        </div>
      </div>
    </>
  )
}

export default PostIndexLayout
