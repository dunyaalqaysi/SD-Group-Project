import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import { ColorModeContext } from "src/App";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { LightMode, Brightness3 } from "@mui/icons-material";

const Navbar = () => {
  const theme = useTheme();
  const context = React.useContext(ColorModeContext);
  return (
    <AppBar position="static">
      <CssBaseline enableColorScheme />
      <Toolbar variant="dense">
        <Typography variant="h5" className="logo">
          Fuel Quote
        </Typography>
        <div className="navlinks">
          <Link to="/profile" className="link">
            Profile
          </Link>
          <Link to="/quote" className="link">
            Get a Quote
          </Link>
          <Link to="/" className="link">
            Sign out
          </Link>
          <IconButton
            sx={{ ml: 1, pt: 0.5 }}
            onClick={context.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? <LightMode /> : <Brightness3 />}
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
