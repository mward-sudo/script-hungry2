import { FC } from 'react'
import Link from 'next/link'
import { NavigationLink } from '@/types/navigations-links'

type ConditionalLinkProps = {
  /** URL for ConditionalLink */
  href: string
}

const ConditionalLink: FC<ConditionalLinkProps> = ({ href, children }) => {
  /** External link if it begins with http */
  const externalHref = href.indexOf('http') === 0

  return externalHref ? (
    /** Use a tag for external link */
    <a
      href={href}
      className="box-border inline-block px-4 py-2 text-gray-700 no-underline transition-all duration-200 ease-in-out border-red-600 border-solid hover:border-b-4"
    >
      {children}
    </a>
  ) : (
    /** Use next/Link for internal link */
    <Link href={href} passHref>
      <a className="box-border inline-block px-4 py-2 text-gray-700 no-underline transition-all duration-200 ease-in-out border-red-600 border-solid hover:border-b-4">
        {children}
      </a>
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
