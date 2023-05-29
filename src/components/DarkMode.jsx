// library imports
import React, { useState, useEffect } from "react";

// material ui imports
import { Grid, Switch } from "@mui/material";

const DarkMode = ({ onChange }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    onChange(darkMode);
  }, [darkMode, onChange]);

  return (
    <Grid container alignItems='center'>
      <Grid item>Light</Grid>
      <Grid item>
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      </Grid>
      <Grid item>Dark</Grid>
    </Grid>
  );
};

export default DarkMode;
