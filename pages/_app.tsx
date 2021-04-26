import { useEffect, FC } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../components/theme'
import '@fontsource/roboto/100.css'
import '@fontsource/roboto/500.css'
import '@fontsource/proza-libre/600-italic.css'
import '@fontsource/proza-libre/400.css'

const MyApp: FC<AppProps> = ({ Component, pageProps, router }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles?.parentElement?.removeChild(jssStyles)
  }, [])

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </ThemeProvider>
    </>
  )
}

export default MyApp
