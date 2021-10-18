import { FC } from 'react'
import { m } from 'framer-motion'
import { fadeInAndUp, stagger } from '@/animations/animations'
import { iHomePageHero } from '@/types/graphcms-api'

type HomeIntroProps = {
  homePageHero: iHomePageHero
}

/** Component that renders the home page hero section */
const HomeIntro: FC<HomeIntroProps> = ({ homePageHero }) => {
  return (
    <section className="relative mb-40 text-center mt-28">
      <m.div variants={stagger()} className="w-3/4 mx-auto">
        <m.div variants={fadeInAndUp({ initialYOffset: 400, duration: 1 })}>
          <h3 className="block p-2 m-0 italic leading-none text-white transform bg-red-600 shadow-2xl font-display -rotate-3 text-shadow-md">
            <m.div variants={fadeInAndUp({ initialYOffset: 400, duration: 1 })}>
              <div className="transform rotate-3">
                <span className="block not-italic font-normal text-headingVwS">
                  {homePageHero.lineOneText}
                </span>
                <span className="block font-bold text-headingVwL">
                  {homePageHero.lineTwoText}
                </span>
              </div>
            </m.div>
          </h3>
        </m.div>
      </m.div>
    </section>
  )
}

export default HomeIntro
