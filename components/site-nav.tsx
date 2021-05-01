import { FC } from 'react'
import { Hidden, Drawer } from '@material-ui/core'
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles'
import MenuDrawer from './menu-drawer'
import { DRAWER_WIDTH } from '../lib/consts'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
    toolbar: theme.mixins.toolbar,
  })
)

type SiteNavProps = {
  handleDrawerToggle: VoidFunction
  mobileOpen: boolean
}

const SiteNav: FC<SiteNavProps> = ({ handleDrawerToggle, mobileOpen }) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <MenuDrawer />
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <MenuDrawer />
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default SiteNav
