import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, TablePagination  } from '@mui/material';
import './HistoricalData.css';
import Navbar from './Navbar';

const HistoricalData = () => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const [questionsHistory, setQuestionsHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const paginatedData = questionsHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  

  useEffect(() => {
    handleShowHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const  handleShowHistory = async () => {
    try{
      // It makes a petition to the api and store the response
      const response = await axios.get(`${apiEndpoint}/getquestionshistory`, { });
      setQuestionsHistory(response.data);
    }catch (error){
      console.error('Error:', error);
    }    
  }

  return (

    <>
    <Navbar />
    
    <Container component="main" className='contenedor' >
    <div>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Pregunta</TableCell>
              <TableCell>Opción correcta</TableCell>
              <TableCell>Opción incorrecta 1</TableCell>
              <TableCell>Opción incorrecta 2</TableCell>
              <TableCell>Opción incorrecta 3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, rowIndex) => (
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
        count={questionsHistory.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  </Container>

  </>

  );
};

export default HistoricalData;