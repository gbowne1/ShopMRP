import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [darkMode, setDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AppContext.Provider
      value={{ darkMode, setDarkMode, isAuthenticated, setIsAuthenticated }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

/*
import React from 'react';

const AppContext = React.createContext();

class AppContextProvider extends React.Component {
  state = {};

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
*/

export default AppContext;