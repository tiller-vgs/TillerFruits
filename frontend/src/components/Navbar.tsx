import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeButton from "./darkModeButton";

import { NavLink } from "react-router-dom";
import { authClient } from "../utils/auth-client";

export default function Navbar() {
  const { data: session } = authClient.useSession();
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
          <div className="flex gap-5 min-w-1/3 justify-end items-center">
            <NavLink
              to="/upload"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Button color="inherit">Upload</Button>
            </NavLink>
            {!session?.user ? (
              <div className="flex gap-2">
                <NavLink
                  to="/login"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <Button color="inherit">Login</Button>
                </NavLink>
                <NavLink
                  to="/login"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <Button color="inherit">Sign Up</Button>
                </NavLink>
              </div>
            ) : (
              <Button color="inherit" onClick={handleSignOut}>
                Sign Out
              </Button>
            )}

            <Button color="inherit" onClick={handleSignOut}>
              Sign Out
            </Button>

            <NavLink to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Button color="inherit">Sign Up</Button>
            </NavLink>

            <NavLink
              to="/me/assignments"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Button color="inherit">
                <AccountCircleIcon style={{ marginRight: 5 }} />
                Min Side
              </Button>
            </NavLink>

            <DarkModeButton />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
