const express = require('express');
const axios = require('axios');
const cors = require('cors');
const promBundle = require('express-prom-bundle');

const app = express();
const port = 8000;

const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:8002';
const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:8001';
const creationServiceUrl = process.env.CREATION_SERVICE_URL || 'http://localhost:8005';

app.use(cors());
app.use(express.json());

//Prometheus configuration
const metricsMiddleware = promBundle({includeMethod: true});
app.use(metricsMiddleware);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'OK' });
});

app.post('/login', async (req, res) => {
  try {
    // Crea una peticion a la url (le llegará a auth-service.js) con la opcion /login 
    // y los parametros req.body
    const authResponse = await axios.post(authServiceUrl+'/login', req.body);
    // Almacena en un Json la respuesta de la anterior peticion
    res.json(authResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.post('/adduser', async (req, res) => {
  try {
    // Crea una peticion a la url (le llegará a user-service.js) con la opcion /login 
    // y los parametros req.body
    const userResponse = await axios.post(userServiceUrl+'/adduser', req.body);
    // Almacena en un Json la respuesta de la anterior peticion
    res.json(userResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.post('/createquestion', async (req, res) => {
  try {
    // Crea una peticion a la url (le llegará a creation-service.js) con la opcion /login 
    // y los parametros req.body
    const questionResponse = await axios.post(creationServiceUrl+'/createquestion', req.body);
    // Almacena en un Json la respuesta de la anterior peticion
    res.json(questionResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

// Start the gateway service
const server = app.listen(port, () => {
  console.log(`Gateway Service listening at http://localhost:${port}`);
});

module.exports = server
