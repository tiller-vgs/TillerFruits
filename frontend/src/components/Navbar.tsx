import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { authClient } from "../utils/auth-client";

export default function Navbar() {
  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#679436" }}>
        <Toolbar className="flex w-full">
          <NavLink
            to="/"
            style={{ color: "inherit", textDecoration: "none" }}
            className="flex-1"
          >
            <Typography variant="h6" component="div">
              TillerFruits
            </Typography>
          </NavLink>
          <div className="flex gap-2">
            <NavLink
              to="/home"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Button color="inherit">Home</Button>
            </NavLink>
            <NavLink
              to="/login"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Button color="inherit">Login</Button>
            </NavLink>

            <Button color="inherit" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
