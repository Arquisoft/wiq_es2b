const express = require('express');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const app = express();
const port = 8004;

app.use(express.json());

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questiondb';
mongoose.connect(mongoUri);



app.post('/getquestionshistory', async (req, res) => {
  
  res.status(200).json('todo bien');
});

const server = app.listen(port, () => {
  console.log(`Creation Service listening at http://localhost:${port}`);
});

server.on('close', () => {
  mongoose.connection.close();
});

module.exports = server;
