import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Route } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Tabs } from "@mui/material";
import { IconButton } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { CloseRounded } from "@mui/icons-material";
import { makeStyles } from "@mui/material/styles";

// application imports
import EmployeeCreate from "./components/EmployeeCreate";
import EmployeeList from "./components/EmployeeList";
import EmployeeDetail from "./components/EmployeeDetail";
import theme from "../theme";
import theme from "../theme2";

const useStyles = makeStyles((theme) => ({
  tabs: {
    backgroundColor: theme.palette.background.paper,
    padding: "0",
    borderRight: "1px solid",
    borderBottom: "1px solid",
  },
  selectedTab: {
    backgroundColor: theme.palette.background.paper,
    padding: "0",
    borderRight: "1px solid",
    borderBottom: "0",
  },

  tabHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
  },
  tabLabel: {
    // padding: "0 10px",
    // flexGrow: 1,
  },
  closeIconContainer: {
    padding: "0",
  },
  closeIcon: {
    fontSize: "16px",
  },
  tabPanel: {
    backgroundColor: theme.palette.background.paper,
    padding: "0",
  },
}));

const newTab = {
  icon: "users",
  label: "Employees",
  dataURL: "/employees",
  ID: "1",
};
const newTab2 = {
  icon: "cogs",
  label: "Parts",
  dataURL: "/parts",
  ID: "2",
};

const Content = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [tabs, setTabs] = useState([newTab, newTab2]);
  const [selectedTab, setSelectedTab] = useState("1");

  const addTab = (tab) => setTabs((tabs) => [...tabs, tab]);

  const removeTab = (e, tabID) => {
    e.stopPropagation();
    setTabs(tabs.filter((tab) => tab.ID !== tabID));
  };

  useEffect(() => {
    addTab(newTab);
    addTab(newTab2);
  }, []);

  console.log("TABS:", tabs);
  return (
    <main>
      <Toolbar variant="dense" />
      <TabContext value={selectedTab}>
        <TabList
          onChange={(e, tabSelected) => {
            setSelectedTab(tabSelected);
          }}
          // textColor="black"
          indicatorColor={theme.palette.background.paper}
        >
          {tabs.map((tab, index) => (
            <Tabs
              classes={{ wrapper: classes.tabHeader }}
              icon={
                <>
                  <FontAwesomeIcon icon={tab.icon} />
                  <Typography variant="body2" className={classes.tabLabel}>
                    {tab.label}
                  </Typography>
                  <IconButton
                    className={classes.closeIconContainer}
                    onClick={(e) => removeTab(e, tab.ID)}
                    color="secondary"
                  >
                    <CloseRounded className={classes.closeIcon} />
                  </IconButton>
                </>
              }
              value={tab.ID}
              className={
                selectedTab === tab.ID ? classes.selectedTab : classes.tabs
              }
            />
          ))}
        </TabList>
        <TabPanel value="1" className={classes.tabPanel}>
          <Route path="/employees/create">
            <EmployeeCreate />
          </Route>
          <Route path="/employees/:id">
            <EmployeeDetail />
          </Route>

          <Route path="/employees">
            <EmployeeList />
          </Route>
        </TabPanel>
      </TabContext>
    </main>
  );
};

export default Content;
