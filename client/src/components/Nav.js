import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, Toolbar } from '@mui/material';

export default function Nav({ toggleTheme, isAuthenticated }) {
  return (
    <AppBar position='static'>
      <Toolbar sx={{ justifyContent: 'center' }}>
        {!isAuthenticated && (
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
        )}
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        {isAuthenticated && (
          <>
            <Button color="inherit" component={Link} to="/yesterday">
              Yesterday
            </Button>
            <Button color="inherit" component={Link} to="/today">
              Today
            </Button>
            <Button color="inherit" component={Link} to="/tomorrow">
              Tomorrow
            </Button>
          </>
        )}
        <Button onClick={toggleTheme} color="inherit">
          Theme
        </Button>
      </Toolbar>
    </AppBar>
  );
}