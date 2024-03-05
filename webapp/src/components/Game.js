
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Paper } from '@mui/material';

const Game = () => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const [country, setCountry] = useState('');
  const [capitalCorrect, setCapitalCorrect] = useState('');
  const [capitalOptions, setcapitalOptions] = useState([]);
  
  // This method will call the create question service
  const  handleShowQuestion = async () => {
    try{
      // It makes a petition to the api and store the response
      const response = await axios.post(`${apiEndpoint}/createquestion`, { });
      // Extract all the info of the response and store it
      setCountry(response.data.responseCountry);
      setCapitalCorrect(response.data.responseCapitalCorrect);
      setcapitalOptions(response.data.responseCapitalOptions);
    }catch (error){
      console.error('Error:', error);
    }    
  }

  // Method that checks if the answer clicked is the correct one
  const handleAnswerClick = (option, index) => {
    // Get what component is the button to change its color later
    //const button = document.getElementById(`button_${index}`);
    if(option === capitalCorrect){
      //button.style.backgroundColor = "green";
      alert("CORRECTO");
    }else{
      //button.style.backgroundColor = "red";
      alert("INCORRECTO");
    }
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Saber y Ganar Juego
        </Typography>
        <Typography variant="body1" paragraph>
          Pregunta: ¿Cuál es la capital de {country}?
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        {capitalOptions.map((option, index) => (
          <Button id={`button_${index}`} key={index} variant="contained" color="primary" onClick={() => handleAnswerClick(option,index)} >
            {option}
          </Button>
        ))}
      </div>
      </Paper>
      <Button variant="contained" color="primary" onClick={handleShowQuestion}>
        Genera pregunta
      </Button>
    </Container>
  );
};

export default Game;