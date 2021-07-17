import { FC } from 'react'
import { motion } from 'framer-motion'
import { fadeInAndUp, stagger } from '@/animations/animations'
import { HomePageHero } from '@/types/graphcms-api'

type HomeIntroProps = {
  homePageHero: HomePageHero
}

/** Component that renders the home page hero section */
const HomeIntro: FC<HomeIntroProps> = ({ homePageHero }) => {
  return (
    <section
      className="relative bg-black overflow-hidden mb-8"
      style={{ maxHeight: '50vh' }}
    >
      <div className="overflow-hidden relative" style={{ height: '60vh' }}>
        <motion.div
          style={{
            background:
              'linear-gradient(115deg, rgb(211, 255, 215) 0%, rgb(0, 0, 0) 100%), radial-gradient(90% 100% at 50% 0%, rgb(200, 200, 200) 0%, rgb(22, 0, 45) 100%), radial-gradient(100% 100% at 80% 0%, rgb(250, 255, 0) 0%, rgb(36, 0, 0) 100%), radial-gradient(150% 210% at 100% 0%, rgb(112, 255, 0) 0%, rgb(20, 175, 125) 0%, rgb(0, 10, 255) 100%), radial-gradient(100% 100% at 100% 30%, rgb(255, 77, 0) 0%, rgba(0, 200, 255, 1) 100%), linear-gradient(60deg, rgb(255, 0, 0) 0%, rgb(120, 86, 255) 100%)',
            backgroundBlendMode:
              'overlay, overlay, difference, difference, difference, normal',
            height: '120vh',
            width: '200%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          variants={{
            animate: {
              left: ['-100%', '0%', '-100%'],
              top: ['-100%', '0%', '-100%', '0%', '-100%'],
              transform: ['deg(0)', 'deg(360)'],
              filter: [
                'hue-rotate(0)',
                'hue-rotate(360deg)',
                'hue-rotate(0deg)',
              ],
              transition: {
                duration: 60,
                repeat: Infinity,
              },
            },
          }}
          animate="animate"
        />
      </div>

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
