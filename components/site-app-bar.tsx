import { FC, ElementType } from 'react'
import Link from 'next/link'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import { DRAWER_WIDTH } from '../lib/consts'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'sticky',
      top: 0,
      zIndex: theme.zIndex.drawer + 1,
    },
    appBar: {
      backgroundColor: 'rgba(255,255,255,0.75)',
      backdropFilter: 'blur(6px)',
      zIndex: theme.zIndex.drawer + 1,
      [theme.breakpoints.up('md')]: {
        marginLeft: -DRAWER_WIDTH,
        width: `calc(100% + ${DRAWER_WIDTH}px)`,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    title: {
      fontFamily: '"Proza Libre", sans-serif',
      fontSize: 20,
      flexGrow: 1,
      color: '#333',
    },
    homeLink: {
      color: 'inherit',
      textDecoration: 'inherit',
    },
  })
)

type SiteAppBarProps = {
  element: ElementType
  handleDrawerToggle: VoidFunction
}

const SiteAppBar: FC<SiteAppBarProps> = ({ element, handleDrawerToggle }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="primary"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component={element}
            variant="h6"
            className={classes.title}
          >
            <Link href="/">
              <a className={classes.homeLink}>scriptHungry</a>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default SiteAppBar
