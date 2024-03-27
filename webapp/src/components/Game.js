
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Paper} from '@mui/material';

import './Game.css';

const colorPreguntas= 'rgba(51, 139, 173, 0.764)';
const colorOnMousePreguntas= 'rgba(28, 84, 106, 0.764)';

const Game = () => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const [questionObject, setQuestionObject] = useState('');
  const [correctOption, setCorrectOption] = useState('');
  const [answerOptions, setAnswerOptions] = useState([]);
  const [correctCounter, setCorrectCounter] = useState(0);
  const [numberOfOptions, setNumberOfOptions] = useState();

  const [questionCounter, setQuestionCounter] = useState(0);
  const [incorrectCounter, setIncorrectCounter] = useState(0);

  // Temporizador
  const [seconds, setSeconds] = useState(120); // 2 minutes



  useEffect(() => {
    handleShowQuestion();
  }, []);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  
  // This method will call the create question service
  const  handleShowQuestion = async () => {
    try{
      // It makes a petition to the api and store the response
      const response = await axios.post(`${apiEndpoint}/createquestion`, { });
      // Extract all the info of the response and store it
      setQuestionObject(response.data.responseQuestionObject);
      setCorrectOption(response.data.responseCorrectOption);
      setAnswerOptions(response.data.responseAnswerOptions);
      const buttons = document.querySelectorAll('button[title="btnsPreg"]');
      buttons.forEach(button => {
        button.name = "sinContestar";
        button.disabled = false;
        button.style.backgroundColor = colorPreguntas;
        button.onmouse = colorOnMousePreguntas;
      });

      incrementQuestion();
    }catch (error){
      console.error('Error:', error);
    }    
  }

  // Method that checks if the answer clicked is the correct one
  const handleAnswerClick = (option, index) => {
    // Get what component is the button to change its color later
    if(option === correctOption) {
      const buttonId = `button_${index}`;
      const correctButton = document.getElementById(buttonId);
      if (correctButton) {
        correctButton.style.backgroundColor = "rgba(79, 141, 18, 0.726)";
        incrementCorrect();
      }
    }else{
      const buttonId = `button_${index}`;
      const incorrectButton = document.getElementById(buttonId);
      incorrectButton.style.backgroundColor = "rgba(208, 22, 22, 0.952)";
      incrementIncorrect();
    }

    const buttons = document.querySelectorAll('button[title="btnsPreg"]');
    buttons.forEach(button => {
      button.disabled = true;
      button.onmouse = null;
    });

    // Cambiar a la siguiente pregunta después de 3 segundos
    setTimeout(() => {
      handleShowQuestion();
    }, 1500);
  }

  const incrementCorrect = () => {
    setCorrectCounter(correctCounter + 1);
  };

  const incrementIncorrect = () => {
    setIncorrectCounter(incorrectCounter + 1);
  }

  const incrementQuestion = () => {
    setQuestionCounter(questionCounter + 1);
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Saber y Ganar Juego
        </Typography>
        <Typography variant="body1" paragraph>
          Pregunta {questionCounter}: ¿Cuál es la capital de {questionObject}?
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', marginTop: '2em' }}>
          {answerOptions.map((option, index) => (
            <Button  id={`button_${index}`} title="btnsPreg" key={index} variant="contained" color="primary" onClick={() => handleAnswerClick(option,index)} >
              {option}
            </Button>
          ))}
        </div>
      </Paper>

      <Button title="contador" onMouseEnter={null} variant="contained" color="primary" disabled={true}>
        Correctas: {correctCounter}
      </Button>

      <Button title="contador" onMouseEnter={null} variant="contained" color="primary" disabled={true}>
        Incorrectas: {incorrectCounter}
      </Button>

      <div>
        <svg data-testid="TimerIcon"></svg>

        <div>
          <span>Time Remaining: {Math.floor(seconds / 60)}:{(seconds % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })}</span>
        </div>
      </div>

    </Container>
  );
};

export default Game;