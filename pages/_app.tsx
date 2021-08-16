import { FC } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import {
  m,
  LazyMotion,
  AnimateSharedLayout,
  AnimatePresence,
  domMax,
} from 'framer-motion'
import 'tailwindcss/tailwind.css'
import '../styles/global.sass'

const MyApp: FC<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <LazyMotion features={domMax}>
        <AnimateSharedLayout type="crossfade">
          <AnimatePresence exitBeforeEnter>
            <m.div
              initial="initial"
              animate="animate"
              exit="initial"
              key={router.route}
            >
              <main>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Component {...pageProps} key={router.route} />
              </main>
            </m.div>
          </AnimatePresence>
        </AnimateSharedLayout>
      </LazyMotion>
    </>
  )
}

export default MyApp
