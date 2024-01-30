import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Button, Toolbar } from "@mui/material";
import useAuth from "../auth/auth";
export default function Nav({ toggleTheme }) {
  //authentication and loggin out from useauth
  const { authenticated, handleLogout } = useAuth();
  const navigate = useNavigate();
  // Logging the current authentication status.
  console.log("Authenticated:", authenticated);

  //handling logout attempt
  const handleLogoutAttempt = async () => {
    try {
      await handleLogout();

      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "center" }}>
        <Button color="inherit" component={Link} to="/yesterday">
          Yesterday
        </Button>
        <Button color="inherit" component={Link} to="/today">
          Today
        </Button>
        <Button color="inherit" component={Link} to="/tomorrow">
          Tomorrow
        </Button>
        <Button onClick={toggleTheme} color="inherit">
          Theme
        </Button>
        <Button color="inherit" onClick={handleLogoutAttempt}>
          Log out!
        </Button>
      </Toolbar>
    </AppBar>
  );
}
