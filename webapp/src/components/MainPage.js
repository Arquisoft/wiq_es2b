import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

import Navbar from './Navbar';

const MainPage = () => {
    const navigate = useNavigate();

    const handleShowGame = () => {
        let path = '/Game';
        navigate(path);
    };

    const handleShowHistoricalData = () => {
        let path = '/HistoricalData';
        navigate(path);
    };

    const handleShowHistoricalUserData = () => {
        let path = '/HistoricalUserData';
        navigate(path);
    };

    const handleShowRegisteredUsers = () => {
        let path = '/RegisteredUsers';
        navigate(path);
    };

    return (
        <>
            <Navbar />

            <div title='main-title'>
                <Typography component="h1" className='main-title' variant="h5" sx={{ textAlign: 'center' }}>
                    ¡Bienvenido a
                </Typography>
                <Typography component="h2" className='main-title animate__animated animate__backInLeft animate__tada' variant="h5" sx={{ textAlign: 'center' }}>
                    WIQ 2024!
                </Typography>
            </div>

            <Container component="main" maxWidth="md" sx={{ marginTop: 4 }}>
                
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <div className="img-container">
                            <img src='/questions-illustration.png' alt='Imagen de prueba' className="img-fluid" />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div title='main'>
                            <Button variant="contained" color="primary" fullWidth onClick={handleShowGame}  >
                                Empezar juego
                            </Button>
                            <Button variant="contained" color="primary" fullWidth onClick={handleShowHistoricalData}  >
                                Histórico de preguntas
                            </Button>
                            <Button variant="contained" color="primary" fullWidth onClick={handleShowHistoricalUserData}  >
                                Histórico del usuario
                            </Button>
                            <Button variant="contained" color="primary" fullWidth onClick={handleShowRegisteredUsers}  >
                                Usuarios registrados
                            </Button>
                            </div>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default MainPage;
