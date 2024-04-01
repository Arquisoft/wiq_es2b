const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: String,
    correctAnswer: String,
    userAnswer: String
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
