import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from '@mui/material';

const HistoricalUserData = () => {
  const navigate = useNavigate();
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const [gameHistory, setGameHistory] = useState([]);
  
  
  useEffect(() => {
    handleLoadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleLoadHistory = async () => {
    try {
      const username = localStorage.getItem('username');
    const response = await axios.get(`${apiEndpoint}/getgamehistory/${username}`);

    // Ordenar la lista de historial de partidas por fecha (de más reciente a más antigua)
    const sortedHistory = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));

    setGameHistory(sortedHistory);

      console.log("el historial actual es  "+gameHistory);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const  handlePreviousPage = async () => {
    let path= '/MainPage';
    navigate(path); 
  }


  return (
    <Container component="main" maxWidth="md" sx={{ marginTop: 4 }}>
      <Button variant="contained" color="primary" onClick={handlePreviousPage}> 
          Página anterior
        </Button>
     
      <div>
        <h2>Historial de Partidas:</h2>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tiempo de partida (s)</th>
              <th>Porcentaje de Aciertos</th>
              <th>Número de Preguntas</th>
              <th>Número de Aciertos</th>
              <th>Número de Fallos</th>
            </tr>
          </thead>
          <tbody>
            {gameHistory.map((game) => (
              <React.Fragment key={game.id}>
                <tr>
                  <td>{game.date}</td>
                  <td>{game.duration}</td>
                  <td>{game.percentage}%</td>
                  <td>{game.totalQuestions}</td>
                  <td>{game.correctAnswers}</td>
                  <td>{game.incorrectAnswers}</td>
                </tr>
                {game.questions && game.questions.map((question, index) => (
                  <tr key={index}>
                    <td colSpan="6">
                      <p>Pregunta {index + 1}: {question.question}</p>
                      <p>Respuesta Correcta: {question.correctAnswer}</p>
                      <p>Respuesta del Usuario: {question.userAnswer}</p>
                      <p>La respuesta fue: {question.correctAnswer === question.userAnswer ? 'Correcta' : 'Incorrecta'}</p>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
  
};

export default HistoricalUserData;
