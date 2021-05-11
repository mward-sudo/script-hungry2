import { FC } from 'react'
import Link from 'next/link'
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
  navLinks: {
    href: string
    text: string
  }[]
}

const NavDesktop: FC<NavDesktopProps> = ({ navLinks }) => {
  return (
    <>
      {navLinks.map(({ href, text }) => (
        <ConditionalLink href={href} key={href}>
          {text}
        </ConditionalLink>
      ))}
    </>
  )
}

export default NavDesktop
