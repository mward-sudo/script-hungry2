import { useEffect, FC } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Theme,
  ThemeProvider,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../components/theme'
import '@fontsource/roboto/100.css'
import '@fontsource/roboto/500.css'
import '@fontsource/proza-libre/600-italic.css'
import '@fontsource/proza-libre/400.css'
import { fadeIn } from '../animations/animations'
import { DRAWER_WIDTH } from '../lib/consts'

const useStyles = makeStyles((muiTheme: Theme) =>
  createStyles({
    content: {
      [muiTheme.breakpoints.up('md')]: {
        marginLeft: DRAWER_WIDTH,
      },
      flexGrow: 1,
    },
  })
)

const MyApp: FC<AppProps> = ({ Component, pageProps, router }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles?.parentElement?.removeChild(jssStyles)
  }, [])

  const classes = useStyles()

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
          <motion.div
            initial="initial"
            animate="animate"
            exit="initial"
            variants={fadeIn()}
            key={router.route}
          >
            <main className={classes.content}>
              <Component {...pageProps} key={router.route} />
            </main>
          </motion.div>
        </AnimatePresence>
      </ThemeProvider>
    </>
  )
}

export default MyApp
