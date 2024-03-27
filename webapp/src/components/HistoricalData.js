import axios from 'axios';
import React, { useState} from 'react';
import { useNavigate} from 'react-router-dom';
import { Container, Typography, Button} from '@mui/material';

const HistoricalData = () => {
  const navigate = useNavigate();
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const [questionsHistory, setQuestionsHistory] = useState([]);

  const  handleShowHistory = async () => {
    try{
      // It makes a petition to the api and store the response
      const response = await axios.post(`${apiEndpoint}/getquestionshistory`, { });
      setQuestionsHistory(response.data);
    }catch (error){
      console.error('Error:', error);
    }    
  }

  const  handlePreviousPage = async () => {
    let path= '/MainPage';
    navigate(path); 
  }

  return (
    
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
      
      <div>
        <Button variant="contained" color="primary" onClick={handlePreviousPage}> 
          Página anterior
        </Button>

        <Button variant="contained" color="primary" onClick={handleShowHistory}> 
          Cargar histórico
        </Button>
    </div>
    <div>
        <table>
          <thead>
            <tr>
              <th>Pregunta</th>
              <th>Opción correcta</th>
              <th>Opción incorrecta 1</th>
              <th>Opción incorrecta 2</th>
              <th>Opción incorrecta 3</th>
            </tr>
          </thead>
          <tbody>
            {questionsHistory.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  </Container>

  );
};

export default HistoricalData;