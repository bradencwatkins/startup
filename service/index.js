const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public'));

const express = require('express');
const uuid = require('uuid');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let users = {};
let votes = [];
let results = [
    { id: 1, name: 'Jurassic Park', votes: 0 },
    { id: 2, name: 'Star Wars', votes: 0 },
    { id: 3, name: 'Harry Potter', votes: 0 },
    { id: 4, name: 'Jaws', votes: 0 },
];


//this one saves users into the database
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).send({ message: 'Email and password are required' });
    }
  
    if (users[email]) {
      return res.status(409).send({ message: 'User already exists' });
    }
  
    const token = uuid.v4();
    users[email] = { email, password, token };
  
    res.status(201).send({ email, token });
  });

//this one logs in the user
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: 'Email and password are required' });
    }

    const user = users[email];

    if (!user || user.password !== password) {
        return res.status(401).send({ message: 'Invalid email or password' });
    }

    res.status(200).send({ email, token: user.token });
});

//this one submits votes >:)
app.post('/api/vote', (req, res) => {
    const { email, movieId } = req.body;
  
    if (!email || !movieId) {
      return res.status(400).send({ message: 'Email and movie ID are required' });
    }
  
    if (!users[email]) {
      return res.status(401).send({ message: 'User not authenticated' });
    }
  
    const movie = results.find((movie) => movie.id === movieId);
    if (movie) {
      movie.votes += 1;
      return res.status(200).send({ message: 'Vote recorded successfully' });
    }
  
    return res.status(404).send({ message: 'Movie not found' });
  });

//this one gets the vote results from the result page
app.get('/api/results', (req, res) => {
    const sortedResults = [...results].sort((a, b) => b.votes - a.votes);
    const totalVotes = results.reduce((total, movie) => total + movie.votes, 0);

    const resultsWithPercentage = sortedResults.map((movie) => {
        const percentage = totalVotes > 0 ? (movie.votes / totalVotes) * 100 : 0;
        return { ...movie, percentage: percentage.toFixed(2) };
    });

    res.status(200).json(resultsWithPercentage);
});

//this one starts the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});