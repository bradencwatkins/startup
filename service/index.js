const port = process.argv.length > 2 ? process.argv[2] : 4000;

const express = require('express');
const path = require('path');
const uuid = require('uuid');
const app = express();
const cors = require('cors');

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../')));
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// import { defineConfig } from 'vite';

// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': 'http://localhost:4000',
//     },
//   },
// });

let users = {};
let movies = [
    { id: 1, name: 'Jurassic Park', votes: 0, appearances: 0 },
    { id: 2, name: 'Star Wars', votes: 0, appearances: 0 },
    { id: 3, name: 'Harry Potter', votes: 0, appearances: 0 },
    { id: 4, name: 'Jaws', votes: 0, appearances: 0 },
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

    console.log('Randomized Movies:', randomizedMovies);
    res.send(randomizedMovies); 
});

function getRandomMovies() {
    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    console.log('Shuffled Movies:', shuffled);
    return shuffled.slice(0, 2);
  }

//this on esubmits a vote for a movie or book on the vote page
apiRouter.post('/vote', (req, res) => {
    const { id } = req.body;

    const movie = movies.find(movie => movie.id === id);
  
    if (movie) {
      movie.votes += 1;
      movie.appearances += 1;

      res.json({
        updatedMovies: movies,
      });
    } else {
      res.status(404).json({ msg: 'Movie not found' });
    }
});

//This one resets all votes and appearances
apiRouter.post('/reset', (_req, res) => {
    movies.forEach(movie => {
        movie.votes = 0;
        movie.appearances = 0;
    });

    res.send({ msg: 'Data has been reset.' });
});

//this one gets voting results from the results page
apiRouter.get('/results', (_req, res) => {
    const sortedMovies = [...movies].sort((a, b) => b.votes - a.votes);
    console.log(sortedMovies);
    res.send(sortedMovies);
});

apiRouter.delete('/auth/logout', (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.body.token);
    if (user) {
      delete user.token; // Remove the token to log out the user
    }
    res.status(204).end(); // No content response for successful logout
});

app.use((_req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});