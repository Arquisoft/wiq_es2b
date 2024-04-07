import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Paper} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './Game.css';

import '../Timer.css';

const colorPreguntas= 'rgba(51, 139, 173, 0.764)';
const colorOnMousePreguntas= 'rgba(28, 84, 106, 0.764)';

const Game = () => {
  const navigate = useNavigate();
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const [questionObject, setQuestionObject] = useState('');
  const [correctOption, setCorrectOption] = useState('');
  const [answerOptions, setAnswerOptions] = useState([]);
  const [correctCounter, setCorrectCounter] = useState(0);

  const [questionCounter, setQuestionCounter] = useState(0);
  const [incorrectCounter, setIncorrectCounter] = useState(0);
  
  const [numberOfQuestions] = useState(6);
  const [questionsToAnswer, setQuestionsToAnswer] = useState(6);
  const [isFinished, setFinished] = useState(false);

  // Porcentaje de aciertos
  const [percentage, setPercentage] = useState(0);


  //para el final de partida 
  const [gameUserOptions, setGameUserOptions] = useState([]);
  const [gameCorrectOptions, setGameCorrectOptions] = useState([]);
  const [gameQuestions, setGameQuestions] = useState([]);

  const [seconds, setSeconds] = useState(120);




  // Temporizador desde 20 segundos
  const [time, setTime] = useState(20);
  const [isTimedOut, setTimedOut] = useState(false);

  // Estado para controlar si el temporizador está activo o no
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      if (isTimerActive) { // Solo decrementa el tiempo si el temporizador está activo
        setTime((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            // Se acabó el tiempo
            setTimedOut(true);
            const buttons = document.querySelectorAll('button[title="btnsPreg"]');
            buttons.forEach(button => {
              button.disabled = true;
              button.onmouse = null;
            });
          }
        });
      }
    }, 1000);

    return () => clearInterval(id);
  }, [isTimerActive]);


  // Calcular el porcentaje de tiempo transcurrido para el círculo del temporizador
  const percentageTime = ((20 - time) / 20) * 100;


  // Detener el temporizador
  const stopTimer = () => {
    setIsTimerActive(false);
  };

  // Activar el temporizador
  const restartTimer = () => {
    setTime(20); // Reiniciar el tiempo a 20 segundos
    setIsTimerActive(true);
  };


  useEffect(() => {
    handleShowQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("eyou");
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  
  useEffect(() => {
    if (isGameFinished() && !isFinished){
      finishGame();
      setFinished(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [correctCounter]);

  useEffect(() => {
    if (isGameFinished() && !isFinished){
      finishGame();
      setFinished(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incorrectCounter]);
  
  // This method will call the create question service
  const  handleShowQuestion = async () => {
    try{
      // It makes a petition to the api and store the response
      const response = await axios.get(`${apiEndpoint}/createquestion`, { });
      // Extract all the info of the response and store it
      setQuestionObject(response.data.responseQuestionObject);
      setCorrectOption(response.data.responseCorrectOption);
      setAnswerOptions(response.data.responseAnswerOptions);

      //guardar para el final 
      // Actualizar las preguntas del juego
      setGameQuestions(prevQuestions => [...prevQuestions, response.data.responseQuestionObject]);
      // Actualizar las opciones correctas del juego
      setGameCorrectOptions(prevCorrectOptions => [...prevCorrectOptions, response.data.responseCorrectOption]);


      const buttons = document.querySelectorAll('button[title="btnsPreg"]');
      buttons.forEach(button => {
        button.name = "sinContestar";
        button.disabled = false;
        button.style.backgroundColor = colorPreguntas;
        button.onmouse = colorOnMousePreguntas;
      });

      incrementQuestion();

      // Resetear temporizador a 20 segundos
      restartTimer();

    }catch (error){
      console.error('Error:', error);
    }    
  }

  // Method that checks if the answer clicked is the correct one
  const handleAnswerClick = (option, index) => {
    // Almacenar la opción seleccionada por el usuario en gameUserOptions
    setGameUserOptions(prevUserOptions => [...prevUserOptions, option]);

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

      // parar el temporizador
      stopTimer();

      // mostrar la correcta
      for (let correctIndex = 0; correctIndex < 4; correctIndex++){
        const buttonIdCorrect = `button_${correctIndex}`;
        const correctButton = document.getElementById(buttonIdCorrect);

        console.log("BOTON A COMPROBAR: " + correctButton.textContent);

        if (correctButton.textContent === correctOption) {
          correctButton.style.backgroundColor = "rgba(79, 141, 18, 0.726)";
        }
      }

      incrementIncorrect();
    }

    const buttons = document.querySelectorAll('button[title="btnsPreg"]');
    buttons.forEach(button => {
      button.disabled = true;
      button.onmouse = null;
    });
    

    decrementQuestionsToAnswer();

    if (!isGameFinished()) {
      setTimeout(() => {
        handleShowQuestion();
      }, 1000);
    }
  }

  const isGameFinished = () => {
    return questionCounter >= numberOfQuestions;
  }
  const handleMainPage = () => {
    let path= '/mainPage';
    navigate(path);
};

const getQuestions = () => {
  const questionsList = [];

  // Iterar sobre cada pregunta generada dinámicamente y agregarla a la lista
  for (let i = 0; i < gameQuestions.length; i++) {
    const questionObject = gameQuestions[i];
    const correctAnswer = gameCorrectOptions[i];
    const userAnswer = gameUserOptions[i] || ''; // Establecer la respuesta del usuario como cadena vacía si no hay respuesta
    questionsList.push({ question: questionObject, correctAnswer, userAnswer });
  }

  return questionsList;
};




  const finishGame = () => {
    const buttons = document.querySelectorAll('button[title="btnsPreg"]');
    buttons.forEach(button => {
      button.disabled = true;
      button.onmouse = null;
    });
    console.log("finishGame " + correctCounter);
    var correctas = (correctCounter / numberOfQuestions) * 100;
    console.log("corr1 " + correctas);
    if (!Number.isInteger(percentage)){
      correctas = correctas.toFixed(2);
      console.log("dentro " + correctas);
    }
    console.log("corr2 " + correctas);
    setPercentage(correctas);
    
    //a partir de aqui guardar la partida 
    const username=localStorage.getItem('username');
    const newGame = {
      username: username, 
      duration: seconds, 
      questions: getQuestions() ,
      percentage: correctas,
     totalQuestions: numberOfQuestions,
      correctAnswers: correctCounter,
      incorrectAnswers: numberOfQuestions-correctCounter
    };
    console.log("Se va a guardar la siguiente partida:");
    console.log("Username:", newGame.username);
    console.log("Duración:", newGame.duration);
    console.log("Preguntas:", newGame.questions);
    console.log("Porcentaje de Aciertos:", newGame.percentage);
    console.log("Número Total de Preguntas:", newGame.totalQuestions);
    console.log("Número de Respuestas Correctas:", newGame.correctAnswers);
    console.log("Número de Respuestas Incorrectas:", newGame.incorrectAnswers);
    
  
  
    axios.post(`${apiEndpoint}/addgame`, newGame)
  .then(response => {
    console.log("Respuesta del servidor:", response.data);
  })
  .catch(error => {
    console.error("Error al enviar la solicitud:", error);
  });
  }
 
  const incrementCorrect = () => {
    setCorrectCounter(correct => correct + 1);
  };

  const incrementIncorrect = () => {
    setIncorrectCounter(incorrect => incorrect + 1);
  }

  const decrementQuestionsToAnswer = () => {
    setQuestionsToAnswer(toAnswer => toAnswer - 1);
  }

  const incrementQuestion = () => {
    setQuestionCounter(qc => qc + 1);
  }


  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>

      {!isFinished && (
      <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Saber y Ganar Juego
        </Typography>

        {!isFinished && (
        <Typography variant="h4" gutterBottom>
          <div>
          </div>


          <div className="Timer">
            <div className="container">
              <div className="text">{time}</div>
              <div
                style={{ transform: `rotate(${percentageTime * 3.6}deg)` }}
                className="dot"
              ></div>
              <svg>
                <circle cx="70" cy="70" r="70" />
                <circle
                  strokeDashoffset={440 - (percentageTime / 100) * 440}
                  cx="70"
                  cy="70"
                  r="70"
                />
              </svg>
            </div>

          </div>
        </Typography>

      )}

      {isTimedOut && (
        <Container>
          <Paper elevation={3} className="modal">
            <Typography variant="h6">¡Tiempo agotado!</Typography>
            <Button onClick={() => {
              setTimedOut(false);
              incrementIncorrect();
              incrementQuestion();
              decrementQuestionsToAnswer();
              restartTimer();
            }}>Cerrar</Button>
          </Paper>
        </Container>
      )}



      
        <Typography variant="body1" paragraph>
          Pregunta {questionCounter}: {questionObject}
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', marginTop: '2em' }}>
          {answerOptions.map((option, index) => (
            <Button  id={`button_${index}`} title="btnsPreg" key={index} variant="contained" color="primary" onClick={() => handleAnswerClick(option,index)} >
              {option}
            </Button>
          ))}
        </div>


      </Paper>
     )}

      {!isFinished && (
      <Button title="contador" onMouseEnter={null} variant="contained" color="primary" disabled={true}>
        Preguntas restantes: {questionsToAnswer}
      </Button>
      )}
      {!isFinished && (
      <Button title="contador" onMouseEnter={null} variant="contained" color="primary" disabled={true}>
        Correctas: {correctCounter}
      </Button>
      )}
      {!isFinished && (
      <Button title="contador" onMouseEnter={null} variant="contained" color="primary" disabled={true}>
        Incorrectas: {incorrectCounter}
      </Button>
      )}




      


      

      {isFinished && (
        <div>
        <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Partida finalizada. ¡Gracias por jugar!
          </Typography>
          <div>
            <Button title='puntuacion' onMouseEnter={null} variant="contained" color="primary" disabled={true}>
              Puntuación: {percentage} % 
            </Button>
            <Button variant="contained" color="primary" onClick={handleMainPage}>
             Ir a la página principal
          </Button>
          </div>


        </Paper>
        </div>
      )}


    </Container>
  );
};

export default Game;