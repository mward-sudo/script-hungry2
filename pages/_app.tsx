import { FC } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { AnimatePresence, motion } from 'framer-motion'
import '@fontsource/roboto/100.css'
import '@fontsource/roboto/500.css'
import '@fontsource/proza-libre/600-italic.css'
import '@fontsource/proza-libre/400.css'
import 'tailwindcss/tailwind.css'
import { fadeIn } from '@/animations/animations'

const MyApp: FC<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          initial="initial"
          animate="animate"
          exit="initial"
          variants={fadeIn()}
          key={router.route}
        >
          <main>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} key={router.route} />
          </main>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default MyApp
