import { FC, ElementType, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'sticky',
      top: 0,
    },
    appBar: {
      backgroundColor: 'rgba(255,255,255,0.75)',
      backdropFilter: 'blur(6px)',
    },
    menuButton: {
      marginRight: theme.spacing(2),
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
    siteNavLink: {
      color: '#999',
      textTransform: 'none',
      '&:hover': {
        borderBottom: '4px solid red',
        borderTop: '2px solid red',
      },
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

const handleDrawerToggle = (): void => {
  console.log('nothing')
}

type HeaderProps = {
  element: ElementType
}

const Header: FC<HeaderProps> = ({ element = 'h1' }) => {
  const { width } = useWindowSize()
  const classes = useStyles()
  return (
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
              <Link href="/blog/" passHref>
                <Button className={classes.siteNavLink}>Blog</Button>
              </Link>
              <Link href="/porfolio/" passHref>
                <Button className={classes.siteNavLink}>Portfolio</Button>
              </Link>
              <Link href="/" passHref>
                <Button className={classes.siteNavLink}>Github</Button>
              </Link>
              <Link href="/" passHref>
                <Button className={classes.siteNavLink}>LinkedIn</Button>
              </Link>
            </>
          ) : (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="primary"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
