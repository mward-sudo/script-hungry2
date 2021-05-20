import { FC } from 'react'
import Head from 'next/head'
import { Container } from '@material-ui/core'
import Header from '@/components/header'
import { GetStaticProps } from 'next'
import getNavigationLinks from '@/lib/navigation-links'
import { NavigationLinks } from '@/types/navigations-links'

type IndexPropTypes = {
  navLinks: NavigationLinks
}

const Index: FC<IndexPropTypes> = ({ navLinks }) => (
  <>
    <Head>
      <title>Portfolio - Michael Ward</title>
    </Head>
    <Header element="p" navLinks={navLinks} />
    <Container maxWidth="sm">
      <h1>Under development</h1>
    </Container>
  </>
)

export const getStaticProps: GetStaticProps = async () => {
  const navLinks = await getNavigationLinks()

  return {
    props: { navLinks },
  }
}

export default Index
