const express = require('express')
const cors = require('cors');
const app = express();
const fs = require('fs');

app.use(cors())
app.use(express.json())


const questions = JSON.parse(fs.readFileSync('questions.json'))
console.log(questions);

app.get('/quiz', (req, res) => {
    if(questions.length > 0) {
        res.json(questions)
    } else {
        res.status(404).json({error: 'No questions found'});
    }
});

const PORT = 2999;

app.listen(PORT, () => {
    console.log('Server running at https://quiz.webcodes.ee/quiz');
    // console.log('Server running at http://localhost:2999/quiz');
});
