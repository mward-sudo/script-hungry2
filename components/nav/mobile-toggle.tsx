import { FC } from 'react'
import { m, Transition, Variants } from 'framer-motion'

type PathProps = {
  /** framer motion Variants */
  variants: Variants
  /** framer motion Transition type */
  transition?: Transition | undefined
  /** SVG path definition */
  d?: string | undefined
}

/** Returns a m.path component */
const Path: FC<PathProps> = ({ variants, transition, d }) => (
  <m.path
    strokeWidth="3"
    strokeLinecap="round"
    variants={variants}
    transition={transition}
    d={d}
  />
)

type NavMobileToggleProps = {
  /** Function to toggle the navigation menu state */
  toggle: VoidFunction
}

/** Component that renders the burger menu toggle button */
const NavMobileToggle: FC<NavMobileToggleProps> = ({ toggle }) => (
  <button
    onClick={toggle}
    type="button"
    className="inline-block border-0 pt-2 px-2 pb-0 m-0 no-underline bg-transparent cursor-pointer text-center appearance-none"
  >
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      className=" text-gray-800 dark:text-gray-300 stroke-current"
    >
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </button>
)

export default NavMobileToggle
