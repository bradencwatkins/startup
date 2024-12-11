const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');
const path = require('path');
const fs = require('fs');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('movie-voting');
const userCollection = db.collection('user');
const movieCollection = db.collection('movies');

const moviesFilePath = path.join(__dirname, 'movies.json');

async function initializeMovies() {
    try {
      const moviesData = readMovies(); // Read movies from the local JSON file
      const moviesCount = await movieCollection.countDocuments(); // Check if movies are already in the DB
  
      if (moviesCount === 0) {
        // If no movies in DB, insert movies from file
        await movieCollection.insertMany(moviesData);
        console.log("Movies initialized in the database.");
      }
    } catch (error) {
      console.error("Error initializing movies:", error);
    }
}

function readMovies() {
    try {
      const moviesData = fs.readFileSync(path.join(__dirname, 'movies.json'), 'utf-8');
      return JSON.parse(moviesData);
    } catch (error) {
      console.error('Error reading movies file:', error);
      return [];
    }
}

async function clearMovies() {
    try {
      await movieCollection.deleteMany({}); // Delete all documents in the movies collection
      console.log("All movies cleared from the database.");
    } catch (error) {
      console.error("Error clearing movies:", error);
    }
}

async function reinitializeMovies() {
    try {
      // First, clear existing movies
      await clearMovies();
      
      // Now, reinsert the movies from the JSON file
      const moviesData = readMovies();
      await movieCollection.insertMany(moviesData);
      console.log("Movies reinitialized in the database.");
    } catch (error) {
      console.error("Error reinitializing movies:", error);
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
    try {
      const movies = await movieCollection.aggregate([{ $sample: { size: 2 } }]).toArray(); // Get 2 random movies
      return movies;
    } catch (error) {
      console.error('Error fetching random movies:', error);
      return [];
    }
}

// Increment the appearance count of a movie
async function incrementMovieAppearance(movieId) {
    try {
      await movieCollection.updateOne(
        { id: movieId },
        { $inc: { appearances: 1 } } // Increment the appearances field by 1
      );
    } catch (error) {
      console.error('Error incrementing movie appearance:', error);
    }
}

// Increment the vote count of a movie
async function incrementMovieVote(movieId) {
    try {
      await movieCollection.updateOne(
        { id: movieId },
        { $inc: { votes: 1 } } // Increment the votes field by 1
      );
    } catch (error) {
      console.error('Error incrementing movie vote:', error);
    }
  }

  async function getMoviesSortedByVotes() {
    try {
      const sortedMovies = await movieCollection.find().sort({ votes: -1 }).toArray(); // Sort by votes in descending order
      return sortedMovies;
    } catch (error) {
      console.error('Error fetching sorted movies:', error);
      return [];
    }
  }

async function resetVotesAndAppearances() {
    await movieCollection.updateMany({}, { $set: { votes: 0, appearances: 0 } });
  }

module.exports = {
    getUser,
    getUserByToken,
    createUser,
    getRandomMovies,
    incrementMovieAppearance,
    incrementMovieVote,
    getMoviesSortedByVotes,
    resetVotesAndAppearances,
    initializeMovies,
    clearMovies,
    reinitializeMovies,
  };