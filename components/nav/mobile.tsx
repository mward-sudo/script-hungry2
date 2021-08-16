import { FC } from 'react'
import Link from 'next/link'
import { m, Variants } from 'framer-motion'
import { iNavigationLink } from '@/types/graphcms-api'

const menuRootVariants: Variants = {
  closed: {
    opacity: 0,
    x: '100%',
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

/** Framer motion Variants for links in the open and closed menu states */
const menuLinkVariants: Variants = {
  closed: {
    opacity: 0,
    x: 200,
  },
  open: {
    opacity: 1,
    x: 0,
  },
}

type ConditionalLinkProps = {
  /** URL for ConditionalLink */
  href: string
}

const ConditionalLink: FC<ConditionalLinkProps> = ({ href, children }) => {
  const externalHref = href.indexOf('http') === 0
  const navLinkClasses =
    'block text-center py-6 px-0 text-5xl text-white no-underline'

  return externalHref ? (
    <m.div variants={menuLinkVariants}>
      <a href={href} className={navLinkClasses}>
        {children}
      </a>
    </m.div>
  ) : (
    <m.div variants={menuLinkVariants}>
      <Link href={href}>
        <a className={navLinkClasses}>{children}</a>
      </Link>
    </m.div>
  )
}

type MobileNavProps = {
  navLinks: iNavigationLink[]
  menuOpen: boolean
}

/** Component that renders the mobile navigation pane */
const MobileNav: FC<MobileNavProps> = ({ navLinks, menuOpen }) => {
  return (
    <m.div
      initial={false}
      animate={menuOpen ? 'open' : 'closed'}
      variants={menuRootVariants}
      className="fixed top-16 right-0 bottom-0 left-0 bg-black bg-opacity-90 z-50 grid justify-center content-center"
    >
      {navLinks.map(({ url, linkText }) => (
        <ConditionalLink href={url} key={linkText}>
          {linkText}
        </ConditionalLink>
      ))}
    </m.div>
  )
}

export default MobileNav
