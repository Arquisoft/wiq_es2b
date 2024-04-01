import axios from 'axios';
import React, { useState} from 'react';
import { useNavigate} from 'react-router-dom';
import { Container, Button} from '@mui/material';

const HistoricalQuestions = () => {
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
        
    </div>
  </Container>

  );
};

export default HistoricalQuestions;