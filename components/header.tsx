import { FC, ElementType, useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { m } from 'framer-motion'
import { iNavigationLinks } from '@/types/graphcms-api'
import NavMobileToggle from './nav/mobile-toggle'
import NavDesktop from './nav/desktop'

/** Mobile nav links component ready to be dynamically loaded if required */
const NavMobile = dynamic(() => import('./nav/mobile'))

type Size = {
  /** Pixel width */
  height: number | undefined
  /** Pixel height */
  width: number | undefined
}

function useWindowSize(): Size {
  /**
   * Initialize state with undefined width/height so server and client renders match
   * Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
   */
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

/**
 * Returns true if width is undefined or over 600
 * Undefined is handled for server side rendering purposes
 * @param width - CSS pixel width
 */
const isDesktop = (width: number | undefined): boolean =>
  width === undefined || width > 600

type HeaderProps = {
  /** The element for the site name, defaults to h1 */
  element?: ElementType
  /** The navigation links to display on this section of the site */
  navLinks: iNavigationLinks
}

/** Component to display the site wide header */
const Header: FC<HeaderProps> = ({ element = 'h1', navLinks }) => {
  /** CSS pixel width of the page from the state */
  const { width } = useWindowSize()

  // Tracks the state of the mobile menu
  const [menuOpen, setMenuOpen] = useState(false)

  /** Mobile menu state toggle */
  const menuToggle = (): void => {
    setMenuOpen(!menuOpen)
  }

  /** Set menuOpen state to false by default */
  useEffect(() => {
    setMenuOpen(false)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 bg-white bg-opacity-75 backdrop-filter backdrop-blur h-16 py-4 px-2 shadow-md">
        <div className="container mx-auto">
          <div className="grid grid-cols-4">
            <Link href="/">
              <a className="inline-block px-2">
                {element === 'h1' ? (
                  <h1 className="font-display text-2xl lh-1">scriptHungry</h1>
                ) : (
                  <p className="font-display text-2xl lh-1 my-0">
                    scriptHungry
                  </p>
                )}
              </a>
            </Link>

            <div className="justify-self-end col-start-2 col-span-3">
              {isDesktop(width) && navLinks ? (
                /** Using desktop nav - default for server side rendering */
                <>
                  <NavDesktop navLinks={navLinks?.data.navigationLinks} />
                </>
              ) : (
                /** Toggle control for mobile nav menu */
                <>
                  <m.div animate={menuOpen ? 'open' : 'closed'}>
                    <NavMobileToggle toggle={menuToggle} />
                  </m.div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      {!isDesktop(width) && navLinks && (
        /** Nav links for mobile menu */
        <NavMobile
          navLinks={navLinks?.data.navigationLinks}
          menuOpen={menuOpen}
        />
      )}
    </>
  )
}

export default Header
