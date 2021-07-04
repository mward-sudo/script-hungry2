import { FC } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { fadeInAndUp, stagger } from '@/animations/animations'
import { HomePageHero } from '@/types/graphcms-api'

type HomeIntroProps = {
  homePageHero: HomePageHero
}

/** Component that renders the home page hero section */
const HomeIntro: FC<HomeIntroProps> = ({ homePageHero }) => {
  return (
    <section
      className="relative bg-black overflow-hidden"
      style={{ maxHeight: '60vh' }}
    >
      <Image
        src={homePageHero.backgroundImage.url}
        width={homePageHero.backgroundImage.width}
        height={homePageHero.backgroundImage.height}
        layout="responsive"
      />

      <motion.div
        variants={stagger()}
        className="absolute top-0 h-full w-full grid text-center justify-center content-center"
      >
        <motion.div
          variants={fadeInAndUp({ initialYOffset: 400, duration: 1 })}
        >
          <h3 className="font-display bg-red-600 transform -rotate-6 z-10 italic text-white m-0 p-2 leading-none text-shadow-md">
            <motion.div
              variants={fadeInAndUp({ initialYOffset: 400, duration: 1 })}
            >
              <div className="transform rotate-6">
                <span className="block text-headingVwS not-italic font-normal">
                  {homePageHero.lineOneText}
                </span>
                <span className="block text-headingVwL">
                  {homePageHero.lineTwoText}
                </span>
              </div>
            </motion.div>
          </h3>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HomeIntro
