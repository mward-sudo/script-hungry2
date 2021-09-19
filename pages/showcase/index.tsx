import { FC } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import Header from '@/components/header'
import getNavigationLinks from '@/lib/navigation-links'
import { iNavigationLinks, iShowcaseCards } from '@/types/graphcms-api'
import { getShowcaseCards } from '@/lib/blog/showcase-cards'
import { m } from 'framer-motion'
import { stagger } from '@/animations/animations'
import MediaCard from '@/components/media-card'

type IndexPropTypes = {
  navLinks: iNavigationLinks
  showcaseCards: iShowcaseCards
}

const Index: FC<IndexPropTypes> = ({ navLinks, showcaseCards }) => (
  <>
    <Head>
      <title>Showcase - Michael Ward</title>
    </Head>
    <Header element="p" navLinks={navLinks} />
    <div className="container mx-auto dark:text-gray-300">
      <h1>Showcase</h1>
      <div className="container mx-auto">
        <div className="my-4">
          <m.div variants={stagger({ staggerTime: 0.1 })} className="flex-grow">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {showcaseCards.data.showcaseCards.map((card) => (
                <MediaCard
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
        </div>
      </div>
    </div>
  </>
)

export const getStaticProps: GetStaticProps = async () => {
  const navLinks = await getNavigationLinks()
  const showcaseCards = await getShowcaseCards()

  console.log(showcaseCards)

  return {
    props: { navLinks, showcaseCards },
  }
}

export default Index
