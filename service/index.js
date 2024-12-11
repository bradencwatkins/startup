const port = process.argv.length > 2 ? process.argv[2] : 4000;

const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const app = express();
const cors = require('cors');
const DB = require('./database.js');

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../')));
var apiRouter = express.Router();
app.use(`/api`, apiRouter);
app.use(cookieParser());
app.set('trust proxy', true);

(async () => {
  await DB.initializeMovies();
})();

const authCookieName = 'token';

function readMovies() {
  const moviesData = fs.readFileSync(path.join(__dirname, 'movies.json'), 'utf-8');
  return JSON.parse(moviesData);
}

function writeMovies(movies) {
  fs.writeFileSync(path.join(__dirname, 'movies.json'), JSON.stringify(movies, null, 2));
}

//this one creates a new user
apiRouter.post('/auth/create', async (req, res) => {
  try {
    console.log("Received request to create user:", req.body);
    if (await DB.getUser(req.body.email)) {
      console.log(`User ${req.body.email} already exists`);
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await DB.createUser(req.body.email, req.body.password);
      console.log(`User ${req.body.email} created successfully`);

      // Set the cookie
      setAuthCookie(res, user.token);

      res.send({
        id: user._id,
      });
    }
  } catch (error) {
    console.error("Error in /auth/create endpoint:", error);
    res.status(500).send({ msg: 'Internal Server Error' });
  }
});

//this one logs in an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

//this one gets a random option when someone clicks one
apiRouter.get('/vote', async (req, res) => {
  try {
    const shuffledMovies = await DB.getRandomMovies(); // Fetch random movies from DB
    for (const movie of shuffledMovies) {
      await DB.incrementMovieAppearance(movie.id); // Increment appearance count in DB
    }
    res.json(shuffledMovies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ msg: 'An error occurred while fetching movies.' });
  }
});


//this on esubmits a vote for a movie or book on the vote page
apiRouter.post('/vote', async (req, res) => {
  const { id } = req.body;
  try {
    const movie = await DB.getRandomMovies({ id }); // Find the movie in the DB by ID
    if (movie) {
      await DB.incrementMovieVote(id); // Increment vote in DB
    }

    // After voting, send new random movie options to the user
    const shuffledMovies = await DB.getRandomMovies();
    // Increment the appearance count of the new random movies
    for (const movie of shuffledMovies) {
      await DB.incrementMovieAppearance(movie.id);
    }

    res.json({ updatedMovies: shuffledMovies });
  } catch (error) {
    console.error('Error voting:', error);
    res.status(500).json({ msg: 'An error occurred while processing your vote.' });
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
apiRouter.get('/results', async (_req, res) => {
  try {
    const sortedMovies = await DB.getMoviesSortedByVotes(); // Get movies sorted by votes from DB
    res.send(sortedMovies);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).send({ msg: 'An error occurred while fetching results.' });
  }
});

apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

apiRouter.post('/reset', async (_req, res) => {
  try {
    await DB.resetVotesAndAppearances();
    res.send({ msg: 'Data has been reset.' });
  } catch (error) {
    console.error('Error resetting data:', error);
    res.status(500).send({ msg: 'An error occurred while resetting data.' });
  }
});

app.post('/reinitialize-movies', async (req, res) => {
  try {
    await DB.reinitializeMovies(); // Reinitialize movies
    res.json({ msg: 'Movies have been cleared and reinitialized.' });
  } catch (error) {
    console.error('Error reinitializing movies:', error);
    res.status(500).json({ msg: 'An error occurred while reinitializing movies.' });
  }
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

function getRandomMovies(movies) {
  const shuffled = [...movies].sort(() => 0.5 - Math.random());
  console.log('Shuffled Movies:', shuffled);
  return shuffled.slice(0, 2);
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});