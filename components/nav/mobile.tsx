import { FC } from 'react'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { NavigationLink } from '@/types/navigations-links'
import styles from './mobile.module.css'

/** Framer motion Variants for open and closed menu states */
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

  return externalHref ? (
    <motion.div variants={menuLinkVariants}>
      <a href={href} className={styles.navLink}>
        {children}
      </a>
    </motion.div>
  ) : (
    <motion.div variants={menuLinkVariants}>
      <Link href={href}>
        <a className={styles.navLink}>{children}</a>
      </Link>
    </motion.div>
  )
}

type MobileNavProps = {
  navLinks: NavigationLink[]
  menuOpen: boolean
}

/** Component that renders the mobile navigation pane */
const MobileNav: FC<MobileNavProps> = ({ navLinks, menuOpen }) => {
  return (
    <motion.div
      initial={false}
      animate={menuOpen ? 'open' : 'closed'}
      variants={menuRootVariants}
      className={styles.navRoot}
    >
      {navLinks.map(({ url, linkText }) => (
        <ConditionalLink href={url} key={linkText}>
          {linkText}
        </ConditionalLink>
      ))}
    </motion.div>
  )
}

export default MobileNav
