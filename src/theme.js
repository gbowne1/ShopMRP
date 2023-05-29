import { createTheme } from "@mui/material/styles";

const theme = (darkMode) =>
  createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          a: {
            textDecoration: "none",
            color: darkMode ? "white" : "black",
          },
        },
      },
    },
    wrapper: {
      width: "100%",
    },
  });

export default theme;