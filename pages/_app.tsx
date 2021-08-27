import type { AppProps } from 'next/app'
import { ReactBricks } from 'react-bricks'
import Head from 'next/head'
import config from '@/react-bricks/config'
import 'tailwindcss/tailwind.css'
import '../styles/global.sass'
import {
  AnimateSharedLayout,
  AnimatePresence,
  domMax,
  LazyMotion,
  m,
} from 'framer-motion'

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const reactBricksConfig = {
    ...config,
    contentClassName: 'antialiased font-content',
  }

  return (
    <>
      <Head>
        <title>My page</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="194x194"
          href="/favicon-194x194.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d52b2b" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <AnimatePresence>
        <ReactBricks {...reactBricksConfig}>
          <LazyMotion features={domMax}>
            <AnimateSharedLayout type="crossfade">
              <m.div
                initial="initial"
                animate="animate"
                exit="initial"
                key={router.route}
              >
                <main>
                  <Component {...pageProps} key={router.route} />
                </main>
              </m.div>
            </AnimateSharedLayout>
          </LazyMotion>
        </ReactBricks>
      </AnimatePresence>
    </>
  )
}

export default MyApp
