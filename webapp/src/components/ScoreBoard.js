import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from '@mui/material';

const ScoreBoard = () => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
  const navigate = useNavigate();
  const [scoreboard, setScoreboard] = useState([]);

  useEffect(() => {
    loadScoreboard();
  }, []);

  const loadScoreboard = async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/getScoreBoard`);
      setScoreboard(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handlePreviousPage = async () => {
    let path = '/MainPage';
    navigate(path);
  };
  return (
    <Container component="main" maxWidth="md" sx={{ marginTop: 4 }}>
      <Button variant="contained" color="primary" onClick={handlePreviousPage}> 
          Página anterior
        </Button>
      <div>
        <h2>Tabla de Puntuaciones</h2>
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Preguntas Totales Acertadas</th>
              <th>Preguntas Totales Falladas</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody>
            {scoreboard.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.totalCorrect}</td>
                <td>{user.totalIncorrect}</td>
                <td>{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default ScoreBoard;
