const express = require('express');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const app = express();
const port = 8005;

app.use(express.json());

// It will be the country of the question
var country= "";
// It will be the correct capital of the question
var capitalCorrect = "";
// It will be the different options for the answers
var capitalOptions = [];

// Recieves the information of the query and select wich data use on the question (country and capitals)
function getQuestionInfo(info){
  capitalOptions = [];
  fourRows = [];
  const numEles = info.length;

  // Select 4 random rows of the data
  for (let i = 0; i<4; i++){
    var indexRow = Math.floor(Math.random() * numEles);
    fourRows.push(info[indexRow]);
    // Store the 4 posible answers
    capitalOptions.push(info[indexRow].capitalLabel.value);
  }
  
  // Select the row where it will extract the country and capital
  const indexQuestion = Math.floor(Math.random() * 4);
  // Store the country choosen and its capital
  country=fourRows[indexQuestion].countryLabel.value;
  capitalCorrect = fourRows[indexQuestion].capitalLabel.value;
}

app.post('/createquestion', async (req, res) => {
  const sparqlQuery = 'SELECT DISTINCT ?country ?countryLabel ?capital ?capitalLabel WHERE { ?country wdt:P31 wd:Q6256. ?country wdt:P36 ?capital. SERVICE wikibase:label {bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es".}}';
  const apiUrl = `https://query.wikidata.org/sparql?query=${encodeURIComponent(sparqlQuery)}&format=json`;

  try {

    // Makes the petition to the url
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json'
      }
    });

    // Check if everything was good on the petition
    if (!response.ok) {
      console.error('Error al realizar la consulta a Wikidata:', response.statusText);
      return;
    }

    // Parse the response 
    const data = await response.json();

    // Send the parsed response to be selected
    getQuestionInfo(data.results.bindings);

    // Declare what will be return 
    solution = {
      responseCountry : country,
      responseCapitalCorrect : capitalCorrect,
      responseCapitalOptions : capitalOptions
    };
    
    // Return the resoult with a 200 status
    res.status(200).json(solution);
  } catch (error) {
    console.error('Error al realizar la consulta:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const server = app.listen(port, () => {
  console.log(`Creation Service listening at http://localhost:${port}`);
});

server.on('close', () => {
  mongoose.connection.close();
});

module.exports = server;
