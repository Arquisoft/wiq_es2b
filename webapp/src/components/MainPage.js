import React, {  } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

import Navbar from './Navbar';

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

    const handleShowRegisteredUsers = () => {
        let path= '/RegisteredUsers';
        navigate(path);
    };


    return (
        <>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js"></script>
        <Navbar />
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
                <Button variant="contained" color="primary" onClick={handleShowRegisteredUsers}> 
                    Usuarios registrados
                </Button>
            </div>
          </Container>
        </>
    )
}

export default MainPage;