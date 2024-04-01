// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Declara las variables (izquierda) y el metodo que la modifica (derecha). Se inicializa a false (useState)
  const navigate = useNavigate();

  

  const loginUser = async () => {
    try {
      await axios.post(`${apiEndpoint}/login`, { username, password });
      localStorage.setItem('username',username);
      setLoginSuccess(true);

      setOpenSnackbar(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
      {/* Los operadores logicos funcionan de la manera: 
      condicion ? (lo que se hace si se cumple) : (lo que se hace si no se cumple) */}
      {loginSuccess ? (
        navigate("/MainPage")
      ) : (
        <div>
          <Typography component="h1" variant="h5">
            Inicio de sesión
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
          <Button variant="contained" color="primary" onClick={loginUser}>
            Iniciar sesión
          </Button>
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message="Login successful" />
          {error && (
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
          )}
        </div>
      )}
    </Container>
  );
};

export default Login;
