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
  const { email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await DB.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await DB.createUser({ email, password: hashedPassword });

    // Set session or cookie
    req.session.userId = newUser.id; // Save user ID in session
    req.session.userEmail = newUser.email; // Optionally save the email as well
    res.json({ msg: 'User created and logged in' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

//this one logs in an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await DB.getUserByEmail(email); // Fetch user by email from DB
    if (!user) {
      return res.status(401).json({ msg: 'User not found, please sign up first.' });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // If password matches, set session or cookie (example using Express session)
    req.session.userId = user.id; // Save user ID in session
    req.session.userEmail = user.email; // Optionally save the email as well
    res.json({ msg: 'Logged in successfully' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ msg: 'Server error' });
  }
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