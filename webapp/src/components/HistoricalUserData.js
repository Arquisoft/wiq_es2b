import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import Navbar from './Navbar';
import './HistoricalUserData.css';


const HistoricalUserData = () => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const [gameHistory, setGameHistory] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedGameHistory = gameHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Navbar />

      <Typography component="h2" style={{ marginTop: '1rem' }} className='fs-2 main-title animate__animated animate__backInLeft' variant="h2" sx={{ textAlign: 'center' }}>
          Historial de partidas de { localStorage.getItem('username')}
      </Typography>

      <Container component="main" sx={{ marginTop: 2, maxHeight: '400px', overflowX: 'auto' }} className='containerTable'>
        <div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Tiempo de partida</TableCell>
                  <TableCell>Porcentaje de Aciertos</TableCell>
                  <TableCell>Número de Preguntas</TableCell>
                  <TableCell>Número de Aciertos</TableCell>
                  <TableCell>Número de Fallos</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedGameHistory.map((game, index) => (
                  <React.Fragment key={game.id}>
                    <TableRow onClick={() => toggleRow(index)}>
                      <TableCell><button onClick={handleClick} type="button" class="btn-show-more">+</button></TableCell>
                      <TableCell className="custom-td">{formatDate(game.date)}</TableCell>
                      <TableCell className="custom-td">{game.duration} segundos</TableCell>
                      <TableCell className="custom-td">{game.percentage.toFixed(2)}%</TableCell>
                      <TableCell className="custom-td">{game.totalQuestions}</TableCell>
                      <TableCell className="custom-td">{game.correctAnswers}</TableCell>
                      <TableCell className="custom-td">{game.incorrectAnswers}</TableCell>
                    </TableRow>
                    {expandedRows.includes(index) && game.questions && game.questions.map((question, qIndex) => (
                      <TableRow key={qIndex}>
                        <TableCell colSpan="7" style={{ backgroundColor: question.correctAnswer === question.userAnswer ? '#b8deb8' : '#daaeae' }}>
                          <p><strong>Pregunta {qIndex + 1}:</strong> {question.question}</p>
                          <p>Respuesta Correcta: {question.correctAnswer}</p>
                          <p>Respuesta del Usuario: {question.userAnswer}</p>
                          <p>La respuesta fue: {question.correctAnswer === question.userAnswer ? 'Correcta' : 'Incorrecta'}</p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={gameHistory.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 15]}
          />
        </div>
      </Container>
    </>
  );

};

export default HistoricalUserData;
