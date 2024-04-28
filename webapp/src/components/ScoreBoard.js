import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import Navbar from './Navbar';

const ScoreBoard = () => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
  const [scoreboard, setScoreboard] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    loadScoreboard();
    // eslint-disable-next-line
  }, []);

  const loadScoreboard = async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/getScoreBoard`);
      const sortedScoreboard = response.data.sort((a, b) => b.points - a.points);

    setScoreboard(sortedScoreboard);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedScoreboard = scoreboard.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="md" sx={{ marginTop: 4, overflowY: 'auto' }} className='containerTable'>
        <div>
          <Typography component="h2" style={{ marginTop: '1rem', marginBottom: '1rem' }} className='fs-2 main-title animate__animated animate__backInLeft' variant="h2" sx={{ textAlign: 'center' }}>
            Ranking de Puntuaciones
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Puesto</TableCell>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Preguntas Totales Acertadas</TableCell>
                  <TableCell>Preguntas Totales Falladas</TableCell>
                  <TableCell>Puntos</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedScoreboard.map((user, id) => (
                  <TableRow key={user.id}>
                    <TableCell>{id + 1}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.totalCorrect}</TableCell>
                    <TableCell>{user.totalIncorrect}</TableCell>
                    <TableCell>{user.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={scoreboard.length}
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

export default ScoreBoard;
