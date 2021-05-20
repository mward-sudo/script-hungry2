import { FC } from 'react'
import Link from 'next/link'
import { NavigationLink } from '@/types/navigations-links'
import styles from './desktop.module.css'

type ConditionalLinkProps = {
  href: string
}

const ConditionalLink: FC<ConditionalLinkProps> = ({ href, children }) => {
  const externalHref = href.indexOf('http') === 0

  return externalHref ? (
    <a href={href} className={styles.navLink}>
      {children}
    </a>
  ) : (
    <Link href={href} passHref>
      <a className={styles.navLink}>{children}</a>
    </Link>
  )
}

type NavDesktopProps = {
  navLinks: NavigationLink[]
}

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
