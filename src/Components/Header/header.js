import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
/**
 * Function to set Heading Label
 * @param {string} label
 * @returns {null}
 */

function appBarLabel(label) {
  return (
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
    </Toolbar>
  );
}

/**
 * Header for the application
 * @returns {null}
 */

const Header = () => {
  return (
    <div className="adminUI-container">
      <AppBar position="static" color="primary" sx={{ marginTop: 1 }}>
        {appBarLabel("Admin Portal")}
      </AppBar>
    </div>
  );
};

export default Header;
