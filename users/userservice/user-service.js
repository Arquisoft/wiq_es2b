// user-service.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('./user-model')
const Game = require('./playedGame-model')
const Question = require('./question-model')

const app = express();
const port = 8001;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
mongoose.connect(mongoUri);



// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
    for (const field of requiredFields) {
        if (!(field in req.body)) {
            throw new Error(`Missing required field: ${field}`);
        }
    }
}

app.post('/adduser', async (req, res) => {
    try {
        // Check if required fields are present in the request body
        validateRequiredFields(req, ['username', 'password']);

        // Encrypt the password before saving it
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
        });

        await newUser.save();
        res.json(newUser);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

app.post('/addgame', async (req, res) => {
    try {
        // Obtener los datos del juego desde el cuerpo de la solicitud
        const gameData = req.body;

        // Convertir las preguntas del juego en ObjectId
        const questionIds = await Promise.all(gameData.questions.map(async (question) => {
            const existingQuestion = await Question.findOne({
                question: question.question,
                correctAnswer: question.correctAnswer,
                userAnswer: question.userAnswer
            });
            if (existingQuestion) {
                return existingQuestion._id;
            } else {
                const newQuestion = new Question(question);
                await newQuestion.save();
                return newQuestion._id;
            }
        }));

        // Reemplazar las preguntas en el juego con sus ObjectId
        gameData.questions = questionIds;

        // Crear una nueva instancia del modelo de juego con los datos proporcionados
        const newGame = new Game(gameData);

        // Guardar el nuevo juego en la base de datos
        await newGame.save();

        // Enviar una respuesta de éxito
        res.status(200).json({ message: "Partida guardada exitosamente" });
    } catch (error) {
        // Manejar errores y enviar una respuesta de error con el mensaje de error
        console.error("Error al guardar el juego:", error);
        res.status(400).json({ error: error.message });
    }
});

  

app.get('/getgamehistory/:username', async (req, res) => {
    try {
        const username = req.params.username;
        console.log("se esta intentnado encontrar el hisotrial del usuario  "+username);
        // Buscar las partidas asociadas al nombre de usuario proporcionado
        const games = await Game.find({ username });
        console.log("se encontro para "+username+"  estos juegos " +games);
        res.json(games);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

const server = app.listen(port, () => {
    console.log(`User Service listening at http://localhost:${port}`);
});



// Listen for the 'close' event on the Express.js server
server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
});

module.exports = server