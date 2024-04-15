import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import Navbar from './Navbar';
import './HistoricalUserData.css';


const HistoricalUserData = () => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const [gameHistory, setGameHistory] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  
  
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
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleRow = (index) => {
    const newExpandedRows = [...expandedRows];
    if (newExpandedRows.includes(index)) {
      // Si la fila ya está expandida, la contraemos
      newExpandedRows.splice(newExpandedRows.indexOf(index), 1);
    } else {
      // Si la fila no está expandida, la expandimos
      newExpandedRows.push(index);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleClick = (event) => {
    const buttonText = event.target.textContent;
    event.target.textContent = buttonText === '+' ? '-' : '+';
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <>
      <Navbar />

      <Typography component="h2" style={{ marginTop: '1rem' }} className='fs-2 main-title animate__animated animate__backInLeft' variant="h2" sx={{ textAlign: 'center' }}>
          Historial de partidas de { localStorage.getItem('username')}
      </Typography>



      <Container component="main" sx={{ marginTop: 2, maxHeight: '400px', overflowY: 'auto' }}>
        <div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Fecha</th>
                <th>Tiempo de partida</th>
                <th>Porcentaje de Aciertos</th>
                <th>Número de Preguntas</th>
                <th>Número de Aciertos</th>
                <th>Número de Fallos</th>
              </tr>
            </thead>
            <tbody>
              {gameHistory.map((game, index) => (
                <React.Fragment key={game.id}>
                  <tr onClick={() => toggleRow(index)}>
                    <button onClick={handleClick} type="button" class="btn-show-more">+</button>
                    <td className="custom-td">{formatDate(game.date)}</td>
                    <td className="custom-td">{game.duration} segundos</td>
                    <td className="custom-td">{game.percentage.toFixed(2)}%</td>
                    <td className="custom-td">{game.totalQuestions}</td>
                    <td className="custom-td">{game.correctAnswers}</td>
                    <td className="custom-td">{game.incorrectAnswers}</td>
                  </tr>
                  {expandedRows.includes(index) && game.questions && game.questions.map((question, qIndex) => (
                    <tr key={qIndex}>
                      <td colSpan="7" style={{ backgroundColor: question.correctAnswer === question.userAnswer ? '#b8deb8' : '#daaeae' }}>
                        <p><strong>Pregunta {qIndex + 1}:</strong> {question.question}</p>
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
    </>
  );

};

export default HistoricalUserData;
