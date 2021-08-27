import { useContext, FC } from 'react'
import Head from 'next/head'
import { m } from 'framer-motion'
import { GetStaticProps } from 'next'
import Header from '@/components/header'
import Copyright from '@/components/copyright'
import Constants from '@/lib/consts'
import { fadeIn } from '@/animations/animations'
import getNavigationLinks from '@/lib/navigation-links'
import {
  ReactBricksContext,
  PageViewer,
  cleanPage,
  types,
  fetchPage,
} from 'react-bricks'
import { iNavigationLinks } from '@/types/graphcms-api'

import config from '@/react-bricks/config'
import ErrorNoKeys from '@/components/errorNoKeys'
import ErrorNoHomePage from '@/components/errorNoHomePage'

type IndexPropTypes = {
  navLinks: iNavigationLinks
  page: types.Page
  error: string
}

const Index: FC<IndexPropTypes> = ({ navLinks, page, error }) => {
  // Clean the received content
  // Removes unknown or not allowed bricks
  const { pageTypes, bricks } = useContext(ReactBricksContext)

  const pageOk = page ? cleanPage(page, pageTypes, bricks) : null

  return (
    <>
      <Head>
        <title>{Constants.SITE_NAME}</title>
      </Head>

      {pageOk && (
        <>
          <Head>
            <title>{page.meta.title}</title>
            <meta name="description" content={page.meta.description} />
          </Head>
          <m.div variants={fadeIn()}>
            <Header navLinks={navLinks} />
            <PageViewer page={pageOk} />

            <div className="container mx-auto">
              <div className="my-4">
                <Copyright />
              </div>
            </div>
          </m.div>
        </>
      )}
      {error === 'NOKEYS' && <ErrorNoKeys />}
      {error === 'NOPAGE' && <ErrorNoHomePage />}
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  let reactBricksProps: Record<string, any>

  if (!config.apiKey) {
    reactBricksProps = { error: 'NOKEYS' }
  }
  try {
    const page = await fetchPage('home', config.apiKey)
    reactBricksProps = { page }
  } catch {
    reactBricksProps = { error: 'NOPAGE' }
  }

  const navLinks = await getNavigationLinks()

  return {
    props: { ...reactBricksProps, navLinks },
  }
}

export default Index
