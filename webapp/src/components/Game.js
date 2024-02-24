import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';

const Game = () => {

  const [askForQuestion, setAskForQuestion] = useState(false);
  const [pais, setpais] = useState('');
  const [capital, setcapital] = useState('');

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
  
  // Esta es la llamada al servicio de generar las preguntas
  const  handleShowQuestion = async () => {
    //setAskForQuestion(true);
    try{
      // Se declara esta variable unicamente para probar cosas con ella en la peticion
      const eyou = "aa"
      // Se hace una peticion a la api (llega a gateway-service.js) con la opcion createquestion
      // y los parametros de entrada aa, aa
      const response = await axios.post(`${apiEndpoint}/createquestion`, { eyou, eyou });
      console.log(response);
    }catch (error){
      console.error('Error:', error);
    }    
  }

  // TODO ESTO ES LO QUE ESTA COMENTADO EN CREATION-SERVICE.JS
  // CREO QUE DEBERIA IR ALLI PERO COMO NO FUNCIONA LO PROBE AQUI
  const deberiaIrEnelServicio = async () => {
    setAskForQuestion(true);
    const sparqlQuery = 'SELECT DISTINCT ?country ?countryLabel ?capital ?capitalLabel WHERE { ?country wdt:P31 wd:Q6256. ?country wdt:P36 ?capital. SERVICE wikibase:label {bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es".}}';
    const apiUrl = `https://query.wikidata.org/sparql?query=${encodeURIComponent(sparqlQuery)}`;
    const headers = { "Accept": "application/json" }
    const respuestaWikidata = await fetch(apiUrl, {headers});
    if (respuestaWikidata.ok) {
    const data = await respuestaWikidata.json();
    const numEles = data.results.bindings.length;
    const index = Math.floor(Math.random() * numEles);
    const result = data.results.bindings[index];
    setpais(result.countryLabel.value);
    setcapital(result.capitalLabel.value);
    } else {
      console.error("Error al realizar la consulta en Wikidata. Estado de respuesta:", respuestaWikidata.status);
    }
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
      <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
        Esta sería la pagina del juego
      </Typography>
      <Button variant="contained" color="primary" onClick={handleShowQuestion}>
        Genera pregunta NO FUNCIONA AUNQUE DEBERIA
      </Button>
      <Button variant="contained" color="primary" onClick={deberiaIrEnelServicio}>
        Genera pregunta FUNCIONA
      </Button>
      {askForQuestion ? (
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
          Pais {pais} capital {capital}
        </Typography>
      ) : (
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
          Dale al boton
        </Typography>
      ) }
    </Container>
  );
};

export default Game;