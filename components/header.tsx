import { ElementType, FC } from 'react'
import Link from 'next/link'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

type HeaderProps = {
  element?: ElementType
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    position: 'sticky',
    top: 0,
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: 'rgba(255,255,255,0.75)',
    backdropFilter: 'blur(6px)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontFamily: 'monospace',
    fontSize: 20,
    flexGrow: 1,
    color: '#333',
  },
  homeLink: {
    color: 'inherit',
    textDecoration: 'inherit',
  },
  toolbar: {
    padding: 0,
  },
}))

const Header: FC<HeaderProps> = ({ element = 'h1' }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="relative" className={classes.appBar}>
        <Container maxWidth="sm">
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="primary"
              aria-label="menu"
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
        </Container>
      </AppBar>
    </div>
  )
}

export default Header
