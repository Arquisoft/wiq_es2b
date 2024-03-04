import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();

    const handleShowGame = () => {
        let path= '/Game';
        navigate(path);
    };

    const handleShowHistoricalData = () => {
        let path= '/HistoricalData';
        navigate(path);
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
            <div>
                <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
                Hello !
                </Typography>
                <Typography component="p" variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
                Your account was created on .
                </Typography>

                {/* Se declaran los botones en los q al hacer click se ejecuta el metodo especificado en onClick*/}
                <Button variant="contained" color="primary" onClick={handleShowGame}>
                Empieza juego
                </Button>
                <Button variant="contained" color="primary" onClick={handleShowHistoricalData}> 
                Historico de partidas de jugador
                </Button>
            </div>
          </Container>
    )
}

export default MainPage;