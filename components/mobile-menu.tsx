import { FC } from 'react'
import { Button } from '@material-ui/core'
import { motion } from 'framer-motion'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  menuItems: {
    opacity: 0,
  },
})

const menuItemsVariants = {
  open: {
    opacity: 1,
    x: 0,
  },
  close: {
    opacity: 0,
    x: 200,
  },
}

type MobileMenuProps = {
  closeMenu: VoidFunction
}

const MobileMenu: FC<MobileMenuProps> = ({ closeMenu }) => {
  const classes = useStyles()
  return (
    <motion.div variants={menuItemsVariants} className={classes.menuItems}>
      <Button type="button" onClick={closeMenu}>
        Close Menu
      </Button>
    </motion.div>
  )
}

export default MobileMenu
