// Juego.js
import React from 'react';
import { Button, Typography, Container, Paper } from '@mui/material';

function Juego() {
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Saber y Ganar Juego
        </Typography>
        <Typography variant="body1" paragraph>
          Pregunta: ¿Cuál es la capital de Francia?
        </Typography>
        {/* Botones de opción */}
        <Button variant="outlined" style={{ margin: '0.5rem' }}>
          Opción A
        </Button>
        <Button variant="outlined" style={{ margin: '0.5rem' }}>
          Opción B
        </Button>
        <Button variant="outlined" style={{ margin: '0.5rem' }}>
          Opción C
        </Button>
        <Button variant="outlined" style={{ margin: '0.5rem' }}>
          Opción D
        </Button>
      </Paper>
    </Container>
  );
}

export default Juego;
