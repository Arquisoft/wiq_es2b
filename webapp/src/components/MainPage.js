import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import './MainPage.css';

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

    const handleShowHistoricalUserData = () => {
        let path= '/HistoricalUserData';
        navigate(path);
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
            <div title='main'>
                <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
                ¡Bienvenido a WIQ 2024!
                </Typography>

                <Typography component="p" variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
                Puedes comenzar la partida o ver tu historial.
                </Typography>

                <Button variant="contained" color="primary" onClick={handleShowGame}>
                Empezar juego
                </Button>
                <Button variant="contained" color="primary" onClick={handleShowHistoricalData}> 
                Histórico de preguntas
                </Button>
                <Button variant="contained" color="primary" onClick={handleShowHistoricalUserData}> 
                Histórico del usuario
                </Button>
            </div>
          </Container>
    )
}

export default MainPage;