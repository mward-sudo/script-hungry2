import { ElementType, FC, useState } from 'react'
import SiteAppBar from './site-app-bar'
import SiteNav from './site-nav'

type HeaderProps = {
  element?: ElementType
}

const Header: FC<HeaderProps> = ({ element = 'h1' }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <>
      <SiteAppBar element={element} handleDrawerToggle={handleDrawerToggle} />
      <SiteNav
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
    </>
  )
}

export default Header
