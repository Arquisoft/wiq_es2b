const express = require('express');
const mongoose = require('mongoose');
const Question = require('./questionshistory-model')

const app = express();
const port = 8004;

app.use(express.json());

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questiondb';
mongoose.connect(mongoUri);


app.post('/getquestionshistory', async (req, res) => {
  const questions = await Question.find({});
  
  var solution = [];
  questions.forEach(row => {
    solution.push([row.question,row.correctAnswer,row.incorrectAnswer1,row.incorrectAnswer2,row.incorrectAnswer3]);
  });

  res.status(200).json(solution);
});

const server = app.listen(port, () => {
  console.log(`Creation Service listening at http://localhost:${port}`);
});

server.on('close', () => {
  mongoose.connection.close();
});

module.exports = server;
