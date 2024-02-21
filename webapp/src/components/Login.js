// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import Game from './Game';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [createdAt, setCreatedAt] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Declara la variable showGame y el metodo que la modifica. Se inicializa a false
  const [showGame, setShowGame] = useState(false);

  // Declara la variable showHistoricalData y el metodo que la modifica. Se inicializa a false
  const [showHistoricalData, setShowHistoricaData] = useState(false);

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const loginUser = async () => {
    try {
      const response = await axios.post(`${apiEndpoint}/login`, { username, password });

      // Extract data from the response
      const { createdAt: userCreatedAt } = response.data;

      setCreatedAt(userCreatedAt);
      setLoginSuccess(true);

      setOpenSnackbar(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleShowGame = () => {
    setShowGame(true);
  };

  const handleShowHistoricalData = () => {
    setShowHistoricaData(true);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
      {loginSuccess ? (
        showGame ? (
          <Game/>
        ) : (
          <div>
            <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
              Hello {username}!
            </Typography>
            <Typography component="p" variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
              Your account was created on {new Date(createdAt).toLocaleDateString()}.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleShowGame}>
              Empieza juego
            </Button>
            <Button variant="contained" color="primary" onClick={handleShowHistoricalData}>
              Historico de partidas de jugador
            </Button>
          </div>
        )
      ) : (
        <div>
          <Typography component="h1" variant="h5">
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
          <Button variant="contained" color="primary" onClick={loginUser}>
            Login
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
