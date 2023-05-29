// library imports
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "../fontawesome"; // this is used! Library for fontawesome icons
import { NavLink } from "react-router-dom";

// material ui imports
import { makeStyles, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Box, Hidden } from "@mui/material";
import { TreeView, TreeItem } from "@mui/lab";

// material ui icons
import { ExpandMore, ChevronRight } from "@mui/icons-material";

// application imports
import DarkMode from "./DarkMode.jsx";
import { AppContext } from "../context/AppContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  menuIcon: {
    marginRight: theme.spacing(1),
    color: "var(--tree-item-color)",
  },
}));

const menuItems = [
  {
    icon: "industry",
    label: "Inventory",
    color: "FireBrick",
    children: [
      { icon: "chart-pie", label: "Dashboard", to: "/inventory" },
      {
        icon: "exchange-alt",
        mask: "industry",
        transform: "shrink-10 down-3",
        label: "Stock Movements",
        children: [
          { icon: "truck", label: "Goods In", to: "/goods-in" },
          { icon: "dolly-flatbed", label: "Requisitions", to: "/requisitions" },
          {
            icon: "undo-alt",
            mask: "truck",
            transform: "shrink-6 left-4 up-2",
            label: "Goods Returns",
            to: "/goods-returns",
          },
          {
            icon: "edit",
            mask: "industry",
            transform: "shrink-10 down-3",
            label: "Adjustments",
            to: "/stock-adjustments",
          },
        ],
      },
      {
        icon: "shopping-cart",
        label: "Purchases",
        children: [
          {
            icon: "file-invoice",
            label: "Purchase Orders",
            to: "/purchases/orders",
          },
          { icon: "users-cog", label: "Sources", to: "/sources" },
          { icon: "users", label: "Suppliers", to: "/suppliers" },
        ],
      },
      { icon: "cogs", label: "Parts", to: "/parts" },
      { icon: "warehouse", label: "Locations", to: "/locations" },
    ],
  },
  {
    icon: "coins",
    label: "Sales",
    color: "DodgerBlue",
    children: [
      { icon: "chart-pie", label: "Dashboard", to: "/sales" },
      { icon: "chart-line", label: "Orders", to: "/sales/orders" },
    ],
  },
  {
    icon: "users",
    label: "Human Resources",
    color: "ForestGreen",
    children: [
      { icon: "chart-pie", label: "Dashboard", to: "/hr" },
      { icon: "users", label: "Employees", to: "/employees" },
    ],
  },
  {
    icon: "cogs",
    label: "System",
    color: "DarkRed",
    children: [{ icon: "sign-out-alt", label: "Sign Out", to: "/logout" }],
  },
];

const TreeItems = ({ menuItems }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      {menuItems.map((menu, index) => (
        <>
          {menu.children && <Divider />}
          <NavLink
            to={menu.to ? menu.to : "#"}
            // style={{
            //   textDecoration: "none",
            //   color: theme.palette.primary.main,
            // }}
          >
            <TreeItem
              nodeId={menu.label}
              key={menu.label}
              style={{ "--tree-item-color": menu.color }}
              label={
                <Box className={classes.labelRoot}>
                  <FontAwesomeIcon
                    icon={menu.icon}
                    mask={menu.mask}
                    transform={menu.transform}
                    className={classes.menuIcon}
                  />
                  <Typography>{menu.label}</Typography>
                </Box>
              }>
              {menu.children && <TreeItems menuItems={menu.children} />}
            </TreeItem>
          </NavLink>
        </>
      ))}
      <Divider />
    </>
  );
};

const SideBar = () => {
  const classes = useStyles();
  const { setDarkMode } = useContext(AppContext);

  return (
    <nav>
      <Hidden xsDown implementation='css'>
        <Drawer
          variant='permanent'
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}>
          <Toolbar />
          <TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRight />}>
            <TreeItems menuItems={menuItems} />
          </TreeView>

          <Divider />
          {/* <List subheader={<ListSubheader>Settings</ListSubheader>}>
            <ListItem>
              <DarkMode onChange={(dm) => setDarkMode(dm)} />
            </ListItem>
          </List> */}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default SideBar;
