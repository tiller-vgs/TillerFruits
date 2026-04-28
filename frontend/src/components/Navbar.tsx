import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: '#679436' }}>
        <Toolbar className="flex w-full">
          <NavLink to="/" style={{ color: 'inherit', textDecoration: 'none' }} className="flex-1">
            <Typography variant="h6" component="div">
              TillerFruits
            </Typography>
          </NavLink>
          <div className="flex gap-2">
            <NavLink to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Button color="inherit">Login</Button>
            </NavLink>
            <NavLink to="/signup" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Button color="inherit">Sign Up</Button>
            </NavLink>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}