import { FC, ElementType, useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { motion } from 'framer-motion'
import { navLinks } from '@root/data/nav-links'
import MenuToggle from './menu-toggle'
import DesktopNavLinks from './desktop-nav-links'

const MobileNavLinks = dynamic(() => import('./mobile-nav-links'))

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    appBar: {
      backgroundColor: 'rgba(255,255,255,0.75)',
      backdropFilter: 'blur(6px)',
    },
    toolbar: theme.mixins.toolbar,
    title: {
      fontFamily: '"Proza Libre", sans-serif',
      fontSize: 20,
      flexGrow: 1,
      color: '#333',
    },
    homeLink: {
      color: 'inherit',
      textDecoration: 'inherit',
    },
  })
)

type Size = {
  height: number | undefined
  width: number | undefined
}

function useWindowSize(): Size {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  })
  useEffect(() => {
    // Handler to call on window resize
    function handleResize(): void {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    // Add event listener
    window.addEventListener('resize', handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}

function isDesktop(width: number | undefined): boolean {
  return width === undefined || width > 600
}

type HeaderProps = {
  element?: ElementType
}

const Header: FC<HeaderProps> = ({ element = 'h1' }) => {
  const { width } = useWindowSize()
  const classes = useStyles()

  // Tracks the state of the mobile menu
  const [menuOpen, setMenuOpen] = useState(false)

  const menuToggle = (): void => {
    setMenuOpen(!menuOpen)
  }

  useEffect(() => {
    setMenuOpen(false)
  }, [])

  return (
    <>
      <div className={classes.root}>
        <AppBar position="relative" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography
              component={element}
              variant="h6"
              className={classes.title}
            >
              <Link href="/">
                <a className={classes.homeLink}>scriptHungry</a>
              </Link>
            </Typography>
            {isDesktop(width) ? (
              <>
                <DesktopNavLinks navLinks={navLinks} />
              </>
            ) : (
              <>
                <motion.div animate={menuOpen ? 'open' : 'closed'}>
                  <MenuToggle toggle={menuToggle} />
                </motion.div>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
      {!isDesktop(width) && (
        <MobileNavLinks navLinks={navLinks} menuOpen={menuOpen} />
      )}
    </>
  )
}

export default Header
