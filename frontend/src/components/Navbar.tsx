import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeButton from "./buttons/darkModeButton";

import { NavLink } from "react-router-dom";
import { authClient } from "../utils/auth-client";

import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import type { Session } from "../utils/auth-client";

const ADMIN_ROLES = ["teacher", "admin"];

export default function Navbar() {
  const { data: session } = authClient.useSession() as { data: Session | null };
  const isAdminOrTeacher = ADMIN_ROLES.includes(session?.user?.role as string);
  console.log("session:", session);
  console.log("session:", session);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };
  const drawerContent = (
    <Box
      sx={{
        width: 260,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.5,
          bgcolor: "var(--color-sage-green-nav)",
          color: "white",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          TillerFruits
        </Typography>
        <IconButton
          onClick={() => setDrawerOpen(false)}
          sx={{ color: "white" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <List sx={{ flexGrow: 1, pt: 1 }}>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/me/schoolwork"
            onClick={() => setDrawerOpen(false)}
            sx={{ borderRadius: 2, mx: 1, mb: 0.5 }}
          >
            <AccountCircleIcon
              sx={{ mr: 1.5, fontSize: 20, color: "var(--color-sage-green-nav)" }}
            />
            <ListItemText primary="Min Side" />
          </ListItemButton>
        </ListItem>

        <Divider sx={{ my: 1 }} />

        {!session?.user ? (
          <>
            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                to="/login"
                onClick={() => setDrawerOpen(false)}
                sx={{ borderRadius: 2, mx: 1, mb: 0.5 }}
              >
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                to="/login"
                onClick={() => setDrawerOpen(false)}
                sx={{ borderRadius: 2, mx: 1, mb: 0.5 }}
              >
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            {isAdminOrTeacher && (
              <ListItem disablePadding>
                <ListItemButton
                  component={NavLink}
                  to="/admin"
                  onClick={() => setDrawerOpen(false)}
                  sx={{ borderRadius: 2, mx: 1, mb: 0.5 }}
                >
                  <ListItemText primary="Admin" />
                </ListItemButton>
              </ListItem>
            )}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setDrawerOpen(false);
                  handleSignOut();
                }}
                sx={{ borderRadius: 2, mx: 1, mb: 0.5, color: "error.main" }}
              >
                <ListItemText primary="Sign Out" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "var(--color-sage-green-nav)" }}>
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
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {!session?.user ? (
              <>
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
                  <Button
                    color="inherit"
                    variant="outlined"
                    sx={{ borderColor: "white" }}
                  >
                    Sign Up
                  </Button>
                </NavLink>
              </>
            ) : (
              <>
                {isAdminOrTeacher && (
                  <NavLink
                    to="/admin"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <Button color="inherit">Admin</Button>
                  </NavLink>
                )}
                <Button color="inherit" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            )}
            <NavLink
              to="/me/schoolwork"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Button color="inherit">
                <AccountCircleIcon style={{ marginRight: 5 }} />
                Min Side
              </Button>
            </NavLink>
            <DarkModeButton />
          </Box>

          <Box
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >
            <DarkModeButton />
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        hideBackdrop
        disableScrollLock
        sx={{ "& .MuiDrawer-paper": { boxShadow: 3 } }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
