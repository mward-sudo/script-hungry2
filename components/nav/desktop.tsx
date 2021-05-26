import { FC } from 'react'
import Link from 'next/link'
import { NavigationLink } from '@/types/navigations-links'
import styles from './desktop.module.css'

type ConditionalLinkProps = {
  /** URL for ConditionalLink */
  href: string
}

const ConditionalLink: FC<ConditionalLinkProps> = ({ href, children }) => {
  /** External link if it begins with http */
  const externalHref = href.indexOf('http') === 0

  return externalHref ? (
    /** Use a tag for external link */
    <a href={href} className={styles.navLink}>
      {children}
    </a>
  ) : (
    /** Use next/Link for internal link */
    <Link href={href} passHref>
      <a className={styles.navLink}>{children}</a>
    </Link>
  )
}

type NavDesktopProps = {
  /** Navigation links for page header */
  navLinks: NavigationLink[]
}

/** Component for desktop nav links */
const NavDesktop: FC<NavDesktopProps> = ({ navLinks }) => {
  return (
    <>
      {navLinks.map(({ url, linkText }) => (
        <ConditionalLink href={url} key={linkText}>
          {linkText}
        </ConditionalLink>
      ))}
    </>
  )
}

export default NavDesktop
