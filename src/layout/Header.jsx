// library imports
import React from "react";

// material ui imports
import { Typography, AppBar, IconButton, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/material/styles";

// material ui icon imports
import MenuIcon from "@mui/icons-material/Menu";

// application imports
import UserIcon from "./UserIcon.jsx";

const useStyles = makeStyles((theme) => ({
  menuIcon: {
    marginRight: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const Header = ({ title }) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={classes.menuIcon}
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title}>{title}</Typography>
        <UserIcon />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
