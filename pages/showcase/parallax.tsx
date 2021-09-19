import React, { FC, useEffect } from 'react'
import { ReactComponent as BG } from '@/public/svg-assets/moonscape/bg.svg'
import { ReactComponent as Trees1 } from '@/public/svg-assets/moonscape/trees1.svg'
import { ReactComponent as Trees2 } from '@/public/svg-assets/moonscape/trees2.svg'
import { ReactComponent as Trees3 } from '@/public/svg-assets/moonscape/trees3.svg'
import { ReactComponent as Trees4 } from '@/public/svg-assets/moonscape/trees4.svg'
import { ReactComponent as Trees5 } from '@/public/svg-assets/moonscape/trees5.svg'
import Link from 'next/link'
import Header from '@/components/header'
import { GetStaticProps } from 'next'
import getNavigationLinks from '@/lib/navigation-links'
import { iNavigationLinks } from '@/types/graphcms-api'

type ParallexElem = {
  domElem: HTMLElement | null
  scrollMultiplier: number
  startTop?: number
}

type ParallaxProps = {
  navLinks: iNavigationLinks
}

const Parallax: FC<ParallaxProps> = ({ navLinks }) => {
  useEffect(() => {
    const parallaxElems: Map<string, ParallexElem> = new Map([
      [
        'trees1',
        {
          domElem: document.getElementById('trees1'),
          scrollMultiplier: 5.2,
        },
      ],
      [
        'trees2',
        {
          domElem: document.getElementById('trees2'),
          scrollMultiplier: 4.1,
        },
      ],
      [
        'trees3',
        {
          domElem: document.getElementById('trees3'),
          scrollMultiplier: 2.9,
        },
      ],
      [
        'trees4',
        {
          domElem: document.getElementById('trees4'),
          scrollMultiplier: 2.1,
        },
      ],
      [
        'trees5',
        {
          domElem: document.getElementById('trees5'),
          scrollMultiplier: 1.6,
        },
      ],
      [
        'heading',
        {
          domElem: document.getElementById('heading'),
          scrollMultiplier: 1.3,
        },
      ],
    ])

    parallaxElems.forEach((parallaxElem) => {
      if (parallaxElem.domElem) {
        parallaxElem.startTop = parseInt(parallaxElem.domElem?.style.top)
      }
    })

    const frame = document.getElementById('frame')
    let frameStartHeight: number
    if (frame) {
      frameStartHeight = parseInt(frame.style.height)
    }

    const handleResize = () => {
      const container = document.getElementById('moonscape')
      if (container) {
        container.style.height = `${window.outerHeight * 2}px`
      }
    }

    const handleScroll = () => {
      const windowOffset = window.pageYOffset
      parallaxElems.forEach((parallaxElem, key) => {
        if (
          parallaxElem.domElem &&
          parallaxElem.startTop &&
          parallaxElem.startTop > 0
        ) {
          const offsetAdjustmet = windowOffset * parallaxElem.scrollMultiplier
          const offset = parallaxElem.startTop - offsetAdjustmet
          parallaxElem.domElem.style.top = `${offset}px`
          if (key === 'trees1' && frame && frameStartHeight) {
            frame.style.height = `${frameStartHeight - offsetAdjustmet}px`
          }
        }
      })
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)

    handleResize()
    handleScroll()
  }, [])

  return (
    <>
      <Header element="p" navLinks={navLinks} />
      <div style={{ backgroundColor: 'rgb(40, 3, 3)' }} id="moonscape">
        <div
          className="relative mb-16 overflow-hidden"
          style={{ height: '900px' }}
          id="frame"
        >
          <BG id="bg" />
          <div
            id="heading"
            className="absolute w-full text-center text-white text-headingVwL bold font-display text-shadow-lg"
            style={{ top: '340px' }}
          >
            Parallax Demo
          </div>
          <Trees4 className="absolute" style={{ top: '460px' }} id="trees4" />
          <Trees5 className="absolute" style={{ top: '480px' }} id="trees5" />
          <Trees3 className="absolute" style={{ top: '500px' }} id="trees3" />
          <Trees2 className="absolute" style={{ top: '520px' }} id="trees2" />
          <Trees1 className="absolute" style={{ top: '540px' }} id="trees1" />
        </div>
        <div className="mt-8 text-center text-white">
          <p>
            A demonstration of vertical parallax scrolling using a combination
            of text and SVG elements, implemented using Next.js.
          </p>
          <Link href="https://www.vecteezy.com/free-vector/nature">
            <a
              className="block p-8 mx-auto mt-20 border-2 border-white rounded-md w-80 hover:bg-red-900"
              target="_blank"
            >
              Nature Vectors by Vecteezy
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const navLinks = await getNavigationLinks()

  return {
    props: { navLinks },
  }
}

export default Parallax
