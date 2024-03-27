const express = require('express');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const app = express();
const port = 8004;

app.use(express.json());

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questiondb';
mongoose.connect(mongoUri);



app.post('/retrievequestion', async (req, res) => {
  /*const apiUrl = `https://query.wikidata.org/sparql?query=${encodeURIComponent(queries[randomQuerySelector])}&format=json`;

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

    saveQuestion();
    
    // Return the resoult with a 200 status
    res.status(200).json(solution);
  } catch (error) {
    console.error('Error al realizar la consulta:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }*/
});

const server = app.listen(port, () => {
  console.log(`Creation Service listening at http://localhost:${port}`);
});

server.on('close', () => {
  mongoose.connection.close();
});

module.exports = server;
