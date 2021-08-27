import { Text, types } from 'react-bricks'
import { m } from 'framer-motion'
import styles from './SuperHeroUnit.module.css'
import { fadeInAndUp, stagger } from '@/animations/animations'

//=============================
// Local Types
//=============================

interface SuperHeroUnitProps {
  title: string
  text: string
}

//=============================
// Component to be rendered
//=============================
const SuperHeroUnit: types.Brick<SuperHeroUnitProps> = ({}) => {
  return (
    <>
      <section
        className="relative mb-8 overflow-hidden bg-black"
        style={{ maxHeight: '50vh' }}
      >
        <div className="relative overflow-hidden" style={{ height: '50vh' }}>
          <div className={styles.introBackground} />
        </div>

        <m.div
          variants={stagger()}
          className="absolute top-0 grid content-center justify-center w-full h-full text-center"
        >
          <m.div variants={fadeInAndUp({ initialYOffset: 400, duration: 1 })}>
            <h3 className="z-10 p-2 m-0 italic leading-none text-white transform bg-red-600 font-display -rotate-6 text-shadow-md">
              <m.div
                variants={fadeInAndUp({ initialYOffset: 400, duration: 1 })}
              >
                <div className="transform rotate-6">
                  <Text
                    renderBlock={({ children }) => (
                      <span className="block not-italic font-normal text-headingVwS">
                        {children}
                      </span>
                    )}
                    placeholder="Type some text..."
                    propName="intro"
                  />
                  <Text
                    renderBlock={({ children }) => (
                      <span className="block font-bold text-headingVwL">
                        {children}
                      </span>
                    )}
                    placeholder="Type a title..."
                    propName="title"
                  />
                </div>
              </m.div>
            </h3>
          </m.div>
        </m.div>
      </section>
    </>
  )
}

//=============================
// Block Schema
//=============================
SuperHeroUnit.schema = {
  name: 'superhero-unit',
  label: 'Superhero Unit',
  getDefaultProps: () => ({
    title: 'scriptHungry.com',
    intro: 'Michael Ward presents',
  }),
}

export default SuperHeroUnit
