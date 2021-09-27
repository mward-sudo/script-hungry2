import VerticalParallax from '@/components/vertical-parallax'
import { FC, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/header'
import { GetStaticProps } from 'next'
import getNavigationLinks from '@/lib/navigation-links'
import { iNavigationLinks } from '@/types/graphcms-api'
import bg from '@/public/assets/parallax/BG.png'
import Trees1 from '@/public/assets/parallax/Trees1.png'
import Trees2 from '@/public/assets/parallax/Trees2.png'
import Trees3 from '@/public/assets/parallax/Trees3.png'
import Trees4 from '@/public/assets/parallax/Trees4.png'
import Link from 'next/link'

type ParallaxProps = {
  navLinks: iNavigationLinks
}

const Parallax: FC<ParallaxProps> = ({ navLinks }) => {
  useEffect(() => {
    const container = document.getElementById('moonscape')
    if (container !== null) {
      container.style.height = `${window.innerHeight * 1.5}px`
    }
  }, [])

  return (
    <>
      <Header element="p" navLinks={navLinks} />
      <div style={{ backgroundColor: 'rgb(40, 3, 3)' }} id="moonscape">
        <VerticalParallax id="moonscape" maxScrollMultiplier={2}>
          <Image src={bg} alt="" layout="responsive" />
          <h1
            className="absolute w-full text-center text-white text-headingVwL bold font-display text-shadow-lg"
            style={{
              paddingTop: '12%',
            }}
          >
            Parallax Demo
          </h1>
          <Image src={Trees4} alt="" layout="responsive" />
          <Image src={Trees3} alt="" layout="responsive" />
          <Image src={Trees2} alt="" layout="responsive" />
          <Image src={Trees1} alt="" layout="responsive" />
        </VerticalParallax>
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
    revalidate: 60,
  }
}

export default Parallax
