import { FC } from 'react'
import Head from 'next/head'
import { m } from 'framer-motion'
import { GetStaticProps } from 'next'
import Header from '@/components/header'
import HomeIntro from '@/components/home/intro'
import Copyright from '@/components/copyright'
import Constants from '@/lib/consts'
import { fadeIn, stagger } from '@/animations/animations'
import getNavigationLinks from '@/lib/navigation-links'
import HomeMediaCard from '@/components/home/media-card'
import {
  iHomePageCards,
  iHomePageHero,
  iNavigationLinks,
} from '@/types/graphcms-api'
import { getHomePageHero } from '@/lib/blog/home-page-hero'
import { getHomePageCards } from '@/lib/blog/home-page-cards'

type IndexPropTypes = {
  navLinks: iNavigationLinks
  homePageHero: iHomePageHero
  homePageCards: iHomePageCards
}

const Index: FC<IndexPropTypes> = ({
  navLinks,
  homePageHero,
  homePageCards,
}) => (
  <>
    <Head>
      <title>{Constants.SITE_NAME}</title>
    </Head>
    <Header navLinks={navLinks} />
    <m.div variants={fadeIn()}>
      <HomeIntro homePageHero={homePageHero} />
      <div className="container mx-auto">
        <div className="my-4">
          <m.div variants={stagger({ staggerTime: 0.1 })} className="flex-grow">
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
              {homePageCards.data.homePageCards.map((card) => (
                <HomeMediaCard
                  image={card.image.url}
                  imageHeight={card.image.height}
                  imageWidth={card.image.width}
                  imageAlt={card.image.caption}
                  link={card.url}
                  linkText={card.text}
                  key={card.url}
                />
              ))}
            </div>
          </m.div>
          <Copyright />
        </div>
      </div>
    </m.div>
  </>
)

export const getStaticProps: GetStaticProps = async () => {
  const navLinks = await getNavigationLinks()
  const homePageHero = await getHomePageHero()
  const homePageCards = await getHomePageCards()

  return {
    props: { navLinks, homePageHero, homePageCards },
  }
}

export default Index
