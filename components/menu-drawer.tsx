import { FC } from 'react'
import Link from 'next/link'
import {
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import HomeIcon from '@material-ui/icons/Home'
import BookIcon from '@material-ui/icons/Book'

const useStyles = makeStyles({
  drawerContainer: {
    overflow: 'auto',
  },
})

const MenuDrawer: FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.drawerContainer}>
      <Toolbar />
      <List>
        <Link href="/" passHref>
          <ListItem button key="Home" component="a">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link href="/blog/" passHref>
          <ListItem button key="Blog" component="a">
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary="Blog" />
          </ListItem>
        </Link>
      </List>
    </div>
  )
}

export default MenuDrawer
