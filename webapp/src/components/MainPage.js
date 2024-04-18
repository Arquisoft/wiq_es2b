import React, { useState } from 'react';
import { Container, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Toolbar, AppBar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

import { ConfigProvider } from './ConfigContext';


import Navbar from './Navbar';
import Footer from './Footer';

const MainPage = () => {
    const navigate = useNavigate();

    // Configuración de la partida
    const [open, setOpen] = useState(false);
    const [numQuestions, setNumQuestions] = useState(5);
    const [timePerQuestion, setTimePerQuestion] = useState(10);


    const handleNumQuestionsChange = (event) => {
        setNumQuestions(event.target.value);
    };

    const handleTimePerQuestionChange = (event) => {
        setTimePerQuestion(event.target.value);
    };

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    // Función para manejar cambios en el valor del campo de entrada
    const handleInputChange = (event) => {
        // Evita actualizar el estado si el usuario intenta ingresar manualmente
        event.preventDefault();
    };



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

    const handleRanking = () => {
        let path = '/ScoreBoard';
        navigate(path);
    }

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

            <Container component="main" maxWidth="md" sx={{ marginTop: 4, marginBottom: 10 }}>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <div className="img-container">
                            <img src='/questions-illustration.png' alt='Imagen de prueba' className="img-fluid" />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div title='main'>
                            <Button variant="contained" color="primary" fullWidth onClick={handleShowGame}  >
                                Nuevo juego
                            </Button>
                            <Button variant="contained" color="primary" fullWidth onClick={handleRanking}  >
                                Ranking
                            </Button>
                            <Button variant="contained" color="primary" fullWidth onClick={handleOpenDialog}  >
                                Configuración
                            </Button>

                        </div>
                    </Grid>
                </Grid>
            </Container>

            <Dialog open={open} onClose={handleCloseDialog}>
                <div className="dialogContainer">
                    <DialogTitle className="dialogTitle">
                        <h2>Configuración del juego</h2>
                    </DialogTitle>
                    <DialogContent className="dialogContent">
                        <div className="dialogImage">
                            <img src="./questions-illustration.png" alt="Descripción de la imagen" />
                        </div>
                        <Typography variant="body1">Ingrese el número de preguntas:</Typography>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="numQuestions"
                            label="Número de preguntas (min. 5)"
                            type="number"
                            fullWidth
                            value={numQuestions}
                            onChange={handleNumQuestionsChange}
                            inputProps={{ min: 5, onKeyDown: handleInputChange }}
                            className="dialogTextField"
                        />

                        <Typography variant="body1">Ingrese el tiempo por pregunta (segundos):</Typography>
                        <TextField
                            margin="dense"
                            id="timePerQuestion"
                            label="Tiempo por pregunta (mín. 10 segundos)"
                            type="number"
                            fullWidth
                            value={timePerQuestion}
                            onChange={handleTimePerQuestionChange}
                            inputProps={{ min: 10, onKeyDown: handleInputChange }}
                            className="dialogTextField"
                        />
                    </DialogContent>
                    <DialogActions className="dialogButton">
                        <Button variant="contained" color="primary" fullWidth onClick={handleCloseDialog}  >
                            Aceptar
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>




            <Footer />


        </>
    )
}

export default MainPage;
