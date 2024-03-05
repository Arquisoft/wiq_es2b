import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Paper } from '@mui/material';

const Game = () => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const [pais, setpais] = useState('');
  const [capitalCorrecta, setcapital] = useState('');
  const [capitalIcnorrecta1, setcapitalIcnorrecta1] = useState('');
  const [capitalIcnorrecta2, setcapitalIcnorrecta2] = useState('');
  const [capitalIcnorrecta3, setcapitalIcnorrecta3] = useState('');
  
  // This method will call the create question service
  const  handleShowQuestion = async () => {
    try{
      // It makes a petition to the api and store the response
      const response = await axios.post(`${apiEndpoint}/createquestion`, { });
    }catch (error){
      console.error('Error:', error);
    }    
  }

  // TODO ESTO ES LO QUE ESTA COMENTADO EN CREATION-SERVICE.JS
  // CREO QUE DEBERIA IR ALLI PERO COMO NO FUNCIONA LO PROBE AQUI
  const deberiaIrEnelServicio = async () => {
    const sparqlQuery = 'SELECT DISTINCT ?country ?countryLabel ?capital ?capitalLabel WHERE { ?country wdt:P31 wd:Q6256. ?country wdt:P36 ?capital. SERVICE wikibase:label {bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es".}}';
    const apiUrl = `https://query.wikidata.org/sparql?query=${encodeURIComponent(sparqlQuery)}`;
    const headers = { "Accept": "application/json" }
    const respuestaWikidata = await fetch(apiUrl, {headers});
    if (respuestaWikidata.ok) {
    const data = await respuestaWikidata.json();
    const numEles = data.results.bindings.length;
    const indexCapCorre = Math.floor(Math.random() * numEles);
    const result = data.results.bindings[indexCapCorre];
    setpais(result.countryLabel.value);
    setcapital(result.capitalLabel.value);

    const indexCapIncorre1 = Math.floor(Math.random() * numEles);
    const indexCapIncorre2 = Math.floor(Math.random() * numEles);
    const indexCapIncorre3 = Math.floor(Math.random() * numEles);
    setcapitalIcnorrecta1(data.results.bindings[indexCapIncorre1].capitalLabel.value);
    setcapitalIcnorrecta2(data.results.bindings[indexCapIncorre2].capitalLabel.value);
    setcapitalIcnorrecta3(data.results.bindings[indexCapIncorre3].capitalLabel.value);
    } else {
      console.error("Error al realizar la consulta en Wikidata. Estado de respuesta:", respuestaWikidata.status);
    }
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Saber y Ganar Juego
        </Typography>
        <Typography variant="body1" paragraph>
          Pregunta: ¿Cuál es la capital de {pais}?
        </Typography>
        {/* Botones de opción */}
        <Button variant="outlined" style={{ margin: '0.5rem' }}>
          {capitalCorrecta}
        </Button>
        <Button variant="outlined" style={{ margin: '0.5rem' }}>
          {capitalIcnorrecta1}
        </Button>
        <Button variant="outlined" style={{ margin: '0.5rem' }}>
          {capitalIcnorrecta2}
        </Button>
        <Button variant="outlined" style={{ margin: '0.5rem' }}>
          {capitalIcnorrecta3}
        </Button>
      </Paper>
      <Button variant="contained" color="primary" onClick={handleShowQuestion}>
        Genera pregunta NO FUNCIONA AUNQUE DEBERIA
      </Button>
      <Button variant="contained" color="primary" onClick={deberiaIrEnelServicio}>
        Genera pregunta FUNCIONA
      </Button>
    </Container>
  );
};

export default Game;