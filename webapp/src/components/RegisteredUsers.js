import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import Navbar from './Navbar';

const RegisteredUsers = () => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    handleShowHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowHistory = async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/getregisteredusers`, {});
      setRegisteredUsers(response.data);
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

  const paginatedRegisteredUsers = registeredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }} className='contenedor' >
        <div>
          <Typography component="h2" style={{ marginTop: '1rem', marginBottom: '1rem' }} className='fs-2 main-title animate__animated animate__backInLeft' variant="h2" sx={{ textAlign: 'center' }}>
            Usuarios registrados
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className='text-center custom-td'>Nombre de usuario</TableCell>
                  <TableCell className='text-center custom-td'>Fecha de registro</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRegisteredUsers.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{cell}</TableCell>
                  ))}
                   </TableRow>
                   ))}
              </TableBody>

            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={registeredUsers.length}
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

export default RegisteredUsers;
