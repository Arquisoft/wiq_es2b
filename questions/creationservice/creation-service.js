const express = require('express');
const mongoose = require('mongoose');

const app = express();
// Puerto en el que escuchará el servicio
const port = 8005; 

// Middleware to parse JSON in request body
app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
mongoose.connect(mongoUri);


app.post('/createquestion', async (req, res) => {

  // TODO LO COMENTADO ES UN INTENTO DE HACER LAS QUERIES
  // PERO COMO SALTA UN ERROR ANTES, NO SE PRUEBA CON ELLAS

  const sparqlQuery = 'SELECT DISTINCT ?country ?countryLabel ?capital ?capitalLabel WHERE { ?country wdt:P31 wd:Q6256. ?country wdt:P36 ?capital. SERVICE wikibase:label {bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es".}}';
  const apiUrl = `https://query.wikidata.org/sparql?query=${encodeURIComponent(sparqlQuery)}`;
  const headers = { "Accept": "application/json" };
  
  try {
    const respuestaWikidata = await fetch(apiUrl, {headers});
    console.log('eyou4');
    if (respuestaWikidata.ok) {
      console.log('Entro al if');
      const data = await respuestaWikidata.json();//obtengo los datos en json
      const numEles = data.results.bindings.length;
      const index = Math.floor(Math.random() * numEles);//index al azar
      
      res = data.results.bindings[index];
      // Hardcodeo el resultado para hacer pruebas
      // res.json({ token: 'asdf'});
    }else{
      console.log('no entra al if');
      console.log('la peticion tiene un status:' ,respuestaWikidata.status);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Creation Service listening at http://localhost:${port}`);
});

server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });

module.exports = server
