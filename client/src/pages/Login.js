import React, { useState } from "react";
import { TextField, Button, Container, Paper, Typography } from "@mui/material";
import { loginUser } from "../auth/api";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/auth";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = useAuth(); // Use the handleLogin function
  const navigate = useNavigate();

  const handleLoginAttempt = async () => {
    try {
      const response = await loginUser(username, password);
      const token = response.token;
      localStorage.setItem('token', token);

      console.log('Login successful');
      handleLogin();
      navigate("/today")
    } catch (error) {
      console.log('Login failed', error);
    }
  };

  return (
    <Container>
      <Paper>
        <Typography>
          Login
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
          variant="contained" 
          onClick={handleLoginAttempt}
        >
          Login
        </Button>
        <Typography>
            Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;