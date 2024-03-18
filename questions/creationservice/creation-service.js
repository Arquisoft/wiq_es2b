const express = require('express');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const app = express();
const port = 8005;

app.use(express.json());

const optionsNumber = 4;

// It will be the country of the question
var questionObject= "";
// It will be the correct capital of the question
var correctOption = "";
// It will be the different options for the answers
var answerOptions = [];

var randomQuerySelector; 
// Array of the possible queries
var queries = ['SELECT DISTINCT ?questionObject ?questionObjectLabel ?answer ?answerLabel WHERE { ?questionObject wdt:P31 wd:Q6256. ?questionObject wdt:P36 ?answer. SERVICE wikibase:label {bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es".}}'];
// Array of the possible questions
var questions = ["¿Cual es la capital de "];

// Recieves the information of the query and select wich data use on the question (country and capitals)
function getQuestionInfo(info){
  answerOptions = [];
  var fourRows = [];
  const numEles = info.length;

  // Select 4 random rows of the data
  for (let i = 0; i<optionsNumber; i++){
    var indexRow = Math.floor(Math.random() * numEles);
    fourRows.push(info[indexRow]);
    // Store the 4 posible answers
    answerOptions.push(info[indexRow].answerLabel.value);
  }
  
  // Select the row where it will extract the country and capital
  var indexQuestion = Math.floor(Math.random() * optionsNumber);
  // Store the country choosen and its capital
  questionObject= questions[randomQuerySelector] + fourRows[indexQuestion].questionObjectLabel.value + "?";
  correctOption = fourRows[indexQuestion].answerLabel.value;
}

function selectRandomQuery(){
  randomQuerySelector = Math.floor(Math.random() * queries.length);
}

app.post('/createquestion', async (req, res) => {
  selectRandomQuery();
  const apiUrl = `https://query.wikidata.org/sparql?query=${encodeURIComponent(queries[randomQuerySelector])}&format=json`;

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
      responseQuestionObject : questionObject,
      responseCorrectOption : correctOption,
      responseAnswerOptions : answerOptions
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
