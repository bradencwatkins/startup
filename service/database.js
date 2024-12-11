const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('movie-voting');


const moviesFilePath = path.join(__dirname, 'movies.json');

function readMovies() {
    try {
      const moviesData = fs.readFileSync(moviesFilePath, 'utf-8');
      return JSON.parse(moviesData);
    } catch (error) {
      console.error('Error reading movies file:', error);
      return [];
    }
  }

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

// Fetch the user from the database by their email
function getUser(email) {
  return userCollection.findOne({ email: email });
}

// Fetch the user by their token
function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

// Create a new user by hashing the password and storing the token
async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

// Get random movies to display for voting
async function getRandomMovies() {
    const movies = readMovies();
    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }

// Increment the appearance count of a movie
async function incrementMovieAppearance(movieId) {
    const movies = readMovies();
    const movie = movies.find((m) => m.id === movieId);
    if (movie) {
      movie.appearances += 1;
      fs.writeFileSync(moviesFilePath, JSON.stringify(movies, null, 2));
    }
  }

// Increment the vote count of a movie
async function incrementMovieVote(movieId) {
    const movies = readMovies(); // Get current movies from JSON
    const movie = movies.find((m) => m.id === movieId); // Find the movie by its ID
    if (movie) {
      movie.votes += 1; // Increment the vote count
      fs.writeFileSync(moviesFilePath, JSON.stringify(movies, null, 2)); // Save changes back to the file
    }
  }


module.exports = {
  getUser,
  getUserByToken,
  createUser,
  getRandomMovies,
  incrementMovieAppearance,
  incrementMovieVote,
};