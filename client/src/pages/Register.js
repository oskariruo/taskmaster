import React, { useState } from "react";
import { TextField, Button, Container, Paper, Typography } from "@mui/material";
import { registerUser } from "../auth/api";
import { Link } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        try {

            if (password !== confirmPassword) {
                console.log('Passwords do not match');
                return;
              }

            const response = await registerUser(username, password);

            const token = response.token;

            localStorage.setItem('token', token);

            console.log('Registration successful');
        } catch (error) {
        console.log('Registration failed', error);
    } 
    }

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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
            margin="normal"
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button 
              variant="contained" 
              onClick={handleRegister}
            >
              Register
            </Button>
            <Typography>
            Already have an account? <Link to="/login">Login</Link>
        </Typography>
          </Paper>
        </Container>
      );
};

export default Register;
