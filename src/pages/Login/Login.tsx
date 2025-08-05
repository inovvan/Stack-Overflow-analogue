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
import { Navigate, Link } from "react-router-dom";
import * as styles from "./Login.module.scss";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { user, login } = useContext(AuthContext);

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(username, password);
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
          Login
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
          {error && (
            <Typography color="error" align="center" gutterBottom>
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Войти
          </Button>
          <Link className={styles.login__link} to="/registration">Create account</Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;