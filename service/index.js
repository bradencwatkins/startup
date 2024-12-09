const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public'));

const express = require('express');
const uuid = require('uuid');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

let users = {};
let movies = [
    { id: 1, name: 'Jurassic Park', votes: 0 },
    { id: 2, name: 'Star Wars', votes: 0 },
    { id: 3, name: 'Harry Potter', votes: 0 },
    { id: 4, name: 'Jaws', votes: 0 },
];

//this one creates a new user
apiRouter.post('/auth/create', async (req, res) => {
    const user = users[req.body.email];
    if (user) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
      users[user.email] = user;
      res.send({ token: user.token });
    }
  });

//this one logs in an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = users[req.body.email];
    if (user && req.body.password === user.password) {
      user.token = uuid.v4();
      res.send({ token: user.token });
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  });

//this one logs out an existing user
apiRouter.delete('/auth/logout', (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.body.token);
    if (user) {
      delete user.token;
    }
    res.status(204).end();
  });

//this one gets a random option when someone clicks one
apiRouter.get('/vote', (_req, res) => {
    const randomizedMovies = getRandomMovies();
    res.send(randomizedMovies);
});

function getRandomMovies() {
    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }

//this on esubmits a vote for a movie or book on the vote page
apiRouter.post('/vote', (req, res) => {
    const movieId = req.body.id;
    const movie = movies.find(m => m.id === movieId);
    if (movie) {
      movie.votes += 1; 
      const updatedMovies = getRandomMovies();
      res.send({ updatedMovies });
    } else {
      res.status(404).send({ msg: 'Movie not found' });
    }
  });

//this one gets voting results from the results page
apiRouter.get('/results', (_req, res) => {
    const sortedMovies = [...movies].sort((a, b) => b.votes - a.votes);
    res.send(sortedMovies);
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});