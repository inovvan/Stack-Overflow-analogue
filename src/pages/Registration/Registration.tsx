import React, { useContext, useLayoutEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { AuthContext } from "@/context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import * as styles from "./Registration.module.scss";
import { registration } from "@/services/authApi";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRepeatedPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatedPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (password !== repeatedPassword) {
        setError("Passwords do not match!");
      } else {
        await registration(username, password);
        navigate("/login");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 20 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Registration
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            label="username"
            type="username"
            value={username}
            onChange={handleUsername}
            error={Boolean(error)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="password"
            type="password"
            value={password}
            onChange={handlePassword}
            error={Boolean(error)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="repeat password"
            type="password"
            value={repeatedPassword}
            onChange={handleRepeatedPassword}
            error={Boolean(error)}
          />
          {error && (
            <Typography color="error" align="center" gutterBottom>
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Registration
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
