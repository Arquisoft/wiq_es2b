const express = require('express');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const app = express();
const port = 8005;

app.use(express.json());

const query = async (SPARQL) => {
  const apiUrl = `https://query.wikidata.org/sparql?query=${encodeURIComponent(SPARQL)}&format=json`;

  const response = await fetch(apiUrl, {
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    console.error('Error al realizar la consulta a Wikidata:', response.statusText);
    return;
  }

  const datos = await response.json();

  const resultados = datos.results.bindings.map((resultado) => {
    const resultadoFormateado = {};
    Object.keys(resultado).forEach((clave) => {
      resultadoFormateado[clave] = resultado[clave].value;
    });

    return resultadoFormateado;
  });

  return resultados;
};

const surroundWithCache = (func) => {
  let cache = {};

  return async (param) => {
    if (param in cache) {
      return cache[param];
    }

    let res = await func(param);

    cache[param] = res;

    return res;
  };
};

const cachedQuery = surroundWithCache(query);

app.post('/createquestion', async (req, res) => {
  const sparqlQuery = 'SELECT DISTINCT ?country ?countryLabel ?capital ?capitalLabel WHERE { ?country wdt:P31 wd:Q6256. ?country wdt:P36 ?capital. SERVICE wikibase:label {bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es".}}';

  try {
    const data = await cachedQuery(sparqlQuery);
    const numEles = data.length;

    if (numEles > 0) {
      const index = Math.floor(Math.random() * numEles);
      const result = data[index];
      res.json(result);
    } else {
      console.log('No se encontraron resultados en Wikidata.');
      res.status(404).json({ error: 'No se encontraron resultados en Wikidata.' });
    }
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
