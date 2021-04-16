import { FC, ElementType } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

type HeaderProps = {
  element?: ElementType;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: "5em"
    },
    appBar: {
      display: "sticky",
      backgroundColor: "rgba(255,255,255,0.75)",
      backdropFilter: "blur(6px)",
      zIndex: 1000
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      fontFamily: "monospace",
      fontSize: 20,
      flexGrow: 1,
      color: "#333"
    }
  })
);

const Header: FC<HeaderProps> = ({ element = "h1" }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
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
            scriptHungry
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
