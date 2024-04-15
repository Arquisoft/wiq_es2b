import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import Navbar from './Navbar';

const ScoreBoard = () => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
  const [scoreboard, setScoreboard] = useState([]);

  useEffect(() => {
    loadScoreboard();
    // eslint-disable-next-line
  }, []);

  const loadScoreboard = async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/getScoreBoard`);
      setScoreboard(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (

    <>
    <Navbar />
    <Container component="main" maxWidth="md" sx={{ marginTop: 4,  overflowY: 'auto' }} className='containerTable'>
      <div>
        <Typography component="h2" style={{ marginTop: '1rem', marginBottom: '1rem' }} className='fs-2 main-title animate__animated animate__backInLeft' variant="h2" sx={{ textAlign: 'center' }}>
          Ranking de Puntuaciones
        </Typography>
        <table>
          <thead>
            <tr>
              <th>Puesto</th>
              <th>Usuario</th>
              <th>Preguntas Totales Acertadas</th>
              <th>Preguntas Totales Falladas</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody>
            {scoreboard.map((user, index) => (
              <tr key={index}>
                <td className="custom-td">{index + 1}</td>
                <td className="custom-td">{user.username}</td>
                <td className="custom-td">{user.totalCorrect}</td>
                <td className="custom-td">{user.totalIncorrect}</td>
                <td className="custom-td">{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
    </>
  );
};

export default ScoreBoard;
